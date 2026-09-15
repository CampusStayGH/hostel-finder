import { Compass, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="h-screen bg-slate-50 px-6 py-12 flex justify-around items-center">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-900">
          <Compass className="h-7 w-7" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">404</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Page Not Found</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
          The page you requested does not exist or may have been moved.
          Use one of the actions below to continue.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
          <button
            type="button"
            onClick={() => window.location.assign('/')}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <Home className="h-4 w-4" />
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
