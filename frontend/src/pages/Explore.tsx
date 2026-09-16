import { Compass, MapPin } from 'lucide-react';

export default function Explore() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-24 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Compass className="h-10 w-10 text-blue-600" />
        <h1 className="mt-5 text-3xl font-extrabold text-slate-900">Explore campus life</h1>
        <p className="mt-3 text-slate-600">Discover convenient accommodation around universities and plan your move with confidence.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-blue-50 p-5"><MapPin className="h-5 w-5 text-blue-600" /><h2 className="mt-3 font-bold text-slate-900">University of Cape Coast</h2><p className="mt-1 text-sm text-slate-600">Browse hostels within easy reach of campus.</p></div>
          <div className="rounded-2xl bg-slate-100 p-5"><MapPin className="h-5 w-5 text-slate-600" /><h2 className="mt-3 font-bold text-slate-900">Central Region</h2><p className="mt-1 text-sm text-slate-600">Compare neighborhoods, amenities, and prices.</p></div>
        </div>
      </div>
    </main>
  );
}
