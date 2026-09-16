import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 pb-20 pt-24">
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <User className="mx-auto h-10 w-10 text-blue-600" />
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Your profile</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to manage your saved hostels and listings.</p>
        <Link to="/auth" className="mt-6 inline-flex rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">Sign in</Link>
      </div>
    </main>
  );
}
