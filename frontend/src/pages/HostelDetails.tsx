import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, ShieldCheck } from 'lucide-react';

const HostelDetails = () => {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-24 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link to="/hostels" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"><ArrowLeft className="h-4 w-4" />Back to hostels</Link>
        <div className="mt-8 flex items-start justify-between gap-4">
          <div><p className="text-sm font-semibold text-blue-600">Verified listing</p><h1 className="mt-2 text-3xl font-extrabold text-slate-900">Hostel details</h1><p className="mt-2 text-sm text-slate-500">Listing reference: {id}</p></div>
          <ShieldCheck className="h-8 w-8 text-emerald-600" />
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5"><MapPin className="h-5 w-5 text-blue-600" /><p className="mt-3 font-semibold text-slate-900">Near University of Cape Coast</p><p className="mt-1 text-sm text-slate-600">Convenient access to campus and local amenities.</p></div>
          <div className="rounded-2xl bg-blue-50 p-5"><p className="text-sm text-slate-600">Annual rent</p><p className="mt-2 text-2xl font-bold text-slate-900">GHC 3,000</p><p className="mt-1 text-sm text-slate-600">Contact the provider for availability.</p></div>
        </div>
      </div>
    </main>
  )
}

export default HostelDetails