
import { formatApiError, type ApiErrorPayload } from '../../lib/error'; // adjust path to where formatApiError is located

export interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <div className="mx-auto h-2 w-48 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-full animate-pulse bg-gradient-to-r from-blue-200 via-blue-500 to-emerald-300" />
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-700">{message}</p>
      <p className="mt-1 text-xs text-slate-500">Preparing a polished experience...</p>
    </div>
  );
}

export interface LoadingOverlayProps {
  show?: boolean;
  message?: string;
}

export function LoadingOverlay({ show = false, message = 'Loading...' }: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/20 backdrop-blur-[1px]">
      <div className="w-[min(92vw,420px)] overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-2xl">
        <div className="relative h-1.5 w-full overflow-hidden bg-blue-100">
          <div className="absolute inset-0 h-full w-1/2 -translate-x-full animate-[globalLoading_1.1s_ease-in-out_infinite] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />
        </div>
        <div className="px-5 py-4">
          <p className="text-sm font-semibold text-slate-800">{message}</p>
          <p className="mt-1 text-xs text-slate-500">Please wait while we refresh data.</p>
        </div>
      </div>
      <style>{`
        @keyframes globalLoading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(220%); }
        }
      `}</style>
    </div>
  );
}

export interface SkeletonCardsProps {
  count?: number;
}

export function SkeletonCards({ count = 6 }: SkeletonCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="h-36 w-full rounded-lg bg-slate-200" />
          <div className="mt-3 h-4 w-3/4 rounded bg-slate-200" />
          <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
          <div className="mt-4 h-3 w-full rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

export interface ErrorStateProps {
  message?: string | ApiErrorPayload;
  status?: number;
}

export function ErrorState({ message = 'Something went wrong.', status }: ErrorStateProps) {
  const payload: ApiErrorPayload =
    typeof message === 'string' ? { message } : message || { message: 'Something went wrong.' };

  const rawFallback = typeof message === 'string' ? message : '';
  const text = formatApiError(payload, status ?? 0, rawFallback || 'Something went wrong.');

  // Check explicit status prop first, then look for embedded status in raw strings
  const resolvedStatus: number | null =
    status ??
    (() => {
      const match = typeof message === 'string' ? message.match(/\bstatus\s+(\d{3})\b/i) : null;
      return match ? Number(match[1]) : null;
    })();

  const isServerError = resolvedStatus !== null && resolvedStatus >= 500;
  const isNotFoundError = resolvedStatus === 404;

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
      <p>{text}</p>
      {isServerError && (
        <button
          type="button"
          onClick={() => window.location.assign('/error/500')}
          className="mt-3 rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
        >
          Open Error Page
        </button>
      )}
      {isNotFoundError && (
        <button
          type="button"
          onClick={() => window.location.assign('/not-found')}
          className="mt-3 rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
        >
          Open Not Found Page
        </button>
      )}
    </div>
  );
}

export interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = 'No data found.' }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500 shadow-sm">
      <p className="font-semibold text-slate-700">Nothing here yet</p>
      <p className="mt-1">{message}</p>
    </div>
  );
}