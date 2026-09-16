import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 pb-20 pt-24">
      <div className="max-w-lg rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wider text-red-600">500</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Something went wrong</h1>
        <p className="mt-2 text-sm text-slate-600">We could not complete that request. Please try again or return home.</p>
        <Link to="/" className="mt-6 inline-flex rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">Return home</Link>
      </div>
    </main>
  );
}
