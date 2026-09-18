import { BookmarkCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import HostelCard from '../Components/UI/HostelCard';
import { useAuth } from '../auth/AuthContext';

export default function Saved() {
  const { savedHostels } = useAuth();
  if (savedHostels.length > 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-slate-900">Your saved hostels</h1>
          <p className="mt-2 text-sm text-slate-600">Listings you saved for later.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {savedHostels.map((hostel) => <HostelCard key={hostel.id} {...hostel} />)}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 pb-20 pt-24">
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <BookmarkCheck className="mx-auto h-10 w-10 text-blue-600" />
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Your saved hostels</h1>
        <p className="mt-2 text-sm text-slate-600">Save listings while you browse to compare them later.</p>
        <Link to="/hostels" className="mt-6 inline-flex rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">Browse hostels</Link>
      </div>
    </main>
  );
}
