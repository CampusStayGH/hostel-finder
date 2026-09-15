export const GENERIC_BY_STATUS: Record<number, string> = {
  400: 'Please review your input and try again.',
  401: 'Your session is not valid. Please log in again.',
  403: 'You do not have permission to perform this action.',
  404: 'The requested resource was not found.',
  409: 'This action could not be completed due to a conflict.',
  422: 'Some submitted values are invalid.',
  429: 'Too many requests. Please wait and try again.',
  500: 'Something went wrong on the server. Please try again shortly.',
  502: 'Service is temporarily unavailable. Please try again shortly.',
  503: 'Service is temporarily unavailable. Please try again shortly.',
  504: 'Service is temporarily unavailable. Please try again shortly.',
};

export function normalizeMessage(text: unknown = ''): string {
  const raw = String(text ?? '').trim();
  if (!raw) return '';
  if (/^request failed with status \d{3}$/i.test(raw)) return '';
  if (raw.toLowerCase() === 'internal server error') return '';
  return raw;
}

export function mapKnownBusinessErrors(message: string, status: number): string | undefined {
  const text = message.toLowerCase();
  if (!text) return undefined;

  if (text.includes('cannot like an unapproved event')) {
    return 'You can only like events that are approved.';
  }
  if (text.includes('cannot comment on an unapproved event')) {
    return 'Comments are available only after an event is approved.';
  }
  if (text.includes('cannot register for your own event')) {
    return 'You cannot register for an event you created.';
  }
  if (text.includes('cannot comment on your own event')) {
    return 'You cannot comment on your own event.';
  }
  if (text.includes('cannot like your own event')) {
    return 'You cannot like your own event.';
  }
  if (text.includes('already registered')) {
    return 'You are already registered for this event.';
  }
  if (status === 401 && text.includes('invalid email or password')) {
    return 'Invalid email or password.';
  }

  // Return undefined so caller falls back to status codes / raw message
  return undefined;
}

export interface ApiErrorPayload {
  message?: string;
  error?: string | { message?: string };
  [key: string]: unknown;
}

export function formatApiError(
  payload: ApiErrorPayload | null | undefined,
  status: number,
  fallbackMessage: string = ''
): string {
  const extracted =
    (typeof payload?.error === 'object' && payload?.error !== null
      ? payload.error.message
      : undefined) ||
    payload?.message ||
    (typeof payload?.error === 'string' ? payload.error : '') ||
    fallbackMessage;

  const rawMessage = normalizeMessage(extracted);

  const mapped = mapKnownBusinessErrors(rawMessage, status);
  if (mapped) return mapped;

  // Fallback precedence: status generic -> raw cleaned message -> fallback -> default
  return (
    GENERIC_BY_STATUS[status] ||
    rawMessage ||
    fallbackMessage ||
    'Request could not be completed. Please try again.'
  );
}