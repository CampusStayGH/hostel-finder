import { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Building2,
  Phone,
  Mail,
  Filter,
  Check,
  X,
  RotateCcw,
} from 'lucide-react';

export type HostelStatus = 'pending' | 'approved' | 'rejected' | 'changes_requested';

export interface PendingHostelSubmission {
  id: string;
  name: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  location: string;
  pricePerYear: number;
  currency: string;
  capacity: number;
  gender: 'male' | 'female' | 'mixed';
  submittedAt: string;
  image: string;
  status: HostelStatus;
  adminNotes?: string;
}

const INITIAL_SUBMISSIONS: PendingHostelSubmission[] = [
  {
    id: 'sub-101',
    name: 'Royal Palm Heights',
    ownerName: 'Emmanuel Mensah',
    ownerPhone: '+233 24 123 4567',
    ownerEmail: 'e.mensah@example.com',
    location: 'Ayensu Gate, UCC, Cape Coast',
    pricePerYear: 3200,
    currency: 'GHC',
    capacity: 24,
    gender: 'mixed',
    submittedAt: '2026-09-15',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    status: 'pending',
  },
  {
    id: 'sub-102',
    name: 'Grace Villa Annex',
    ownerName: 'Abena Osei',
    ownerPhone: '+233 50 987 6543',
    ownerEmail: 'abena.osei@example.com',
    location: 'Science Taxi Rank, UCC, Cape Coast',
    pricePerYear: 2800,
    currency: 'GHC',
    capacity: 16,
    gender: 'female',
    submittedAt: '2026-09-14',
    image: 'https://images.unsplash.com/photo-1596276020587-8044fe049813?auto=format&fit=crop&w=800&q=80',
    status: 'pending',
  },
  {
    id: 'sub-103',
    name: 'Campuskot Hostel',
    ownerName: 'Kofi Annan',
    ownerPhone: '+233 20 445 5667',
    ownerEmail: 'kofi.a@example.com',
    location: 'Apewosika, Cape Coast',
    pricePerYear: 1900,
    currency: 'GHC',
    capacity: 32,
    gender: 'male',
    submittedAt: '2026-09-12',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    status: 'changes_requested',
    adminNotes: 'Fire safety certificate missing and photos are low resolution.',
  },
];

export default function AdminHostelApprovalDashboard() {
  const [submissions, setSubmissions] = useState<PendingHostelSubmission[]>(INITIAL_SUBMISSIONS);
  const [selectedHostel, setSelectedHostel] = useState<PendingHostelSubmission | null>(submissions[0]);
  const [filter, setFilter] = useState<'all' | HostelStatus>('all');
  const [feedbackNote, setFeedbackNote] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<'rejected' | 'changes_requested' | null>(null);

  const updateStatus = (id: string, newStatus: HostelStatus, note?: string) => {
    setSubmissions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus, adminNotes: note ?? item.adminNotes } : item
      )
    );
    if (selectedHostel?.id === id) {
      setSelectedHostel((prev) =>
        prev ? { ...prev, status: newStatus, adminNotes: note ?? prev.adminNotes } : null
      );
    }
  };

  const handleOpenActionModal = (action: 'rejected' | 'changes_requested') => {
    setPendingAction(action);
    setFeedbackNote('');
    setShowFeedbackModal(true);
  };

  const handleConfirmModalAction = () => {
    if (!selectedHostel || !pendingAction) return;
    updateStatus(selectedHostel.id, pendingAction, feedbackNote);
    setShowFeedbackModal(false);
    setPendingAction(null);
  };

  const filteredSubmissions = submissions.filter((item) =>
    filter === 'all' ? true : item.status === filter
  );

  const getStatusBadge = (status: HostelStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            <CheckCircle className="h-3.5 w-3.5" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
            <XCircle className="h-3.5 w-3.5" /> Rejected
          </span>
        );
      case 'changes_requested':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            <AlertCircle className="h-3.5 w-3.5" /> Needs Changes
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            <Clock className="h-3.5 w-3.5" /> Pending Review
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Hostel Approvals
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Verify new property submissions before publishing them to students.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'pending', 'changes_requested', 'approved', 'rejected'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                  filter === tab
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Master-Detail Approval Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* Submission Queue (5 cols) */}
          <div className="space-y-3 lg:col-span-5">
            <div className="flex items-center justify-between px-1 text-xs font-semibold text-slate-500">
              <span>{filteredSubmissions.length} Submissions</span>
              <span className="flex items-center gap-1"><Filter className="h-3 w-3" /> Sorted by Date</span>
            </div>

            <div className="max-h-[750px] space-y-2.5 overflow-y-auto pr-1">
              {filteredSubmissions.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                  No submissions match this filter.
                </div>
              ) : (
                filteredSubmissions.map((hostel) => (
                  <div
                    key={hostel.id}
                    onClick={() => setSelectedHostel(hostel)}
                    className={`cursor-pointer rounded-xl border p-3.5 transition ${
                      selectedHostel?.id === hostel.id
                        ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={hostel.image}
                        alt={hostel.name}
                        className="h-16 w-16 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h2 className="truncate text-sm font-bold text-slate-900">
                            {hostel.name}
                          </h2>
                          {getStatusBadge(hostel.status)}
                        </div>
                        <p className="truncate text-xs text-slate-500">{hostel.location}</p>
                        <div className="mt-2 flex items-center justify-between text-xs font-medium text-slate-600">
                          <span>{hostel.currency} {hostel.pricePerYear.toLocaleString()} / yr</span>
                          <span className="text-[11px] text-slate-400">{hostel.submittedAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Submission Preview & Decision Panel (7 cols) */}
          <div className="lg:col-span-7">
            {selectedHostel ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                
                {/* Header Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900">{selectedHostel.name}</h2>
                      {getStatusBadge(selectedHostel.status)}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">Submission ID: {selectedHostel.id}</p>
                  </div>

                  {/* Decision Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateStatus(selectedHostel.id, 'approved')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700"
                    >
                      <Check className="h-4 w-4" /> Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenActionModal('changes_requested')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-amber-600"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Need Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenActionModal('rejected')}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-rose-700"
                    >
                      <X className="h-4 w-4" /> Reject
                    </button>
                  </div>
                </div>

                {/* Listing Overview Card */}
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="relative h-48 w-full overflow-hidden rounded-xl bg-slate-100">
                      <img
                        src={selectedHostel.image}
                        alt={selectedHostel.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs text-slate-600 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Price Rate:</span>
                        <span className="font-bold text-slate-900">{selectedHostel.currency} {selectedHostel.pricePerYear.toLocaleString()} / year</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Room Gender:</span>
                        <span className="font-semibold capitalize text-slate-900">{selectedHostel.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Bed Capacity:</span>
                        <span className="font-semibold text-slate-900">{selectedHostel.capacity} beds</span>
                      </div>
                    </div>
                  </div>

                  {/* Owner & Compliance Details */}
                  <div className="space-y-4">
                    <div className="rounded-xl border border-slate-200 p-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Owner Information</h3>
                      <div className="mt-3 space-y-2.5 text-xs">
                        <div className="flex items-center gap-2 font-medium text-slate-900">
                          <Building2 className="h-4 w-4 text-slate-400" /> {selectedHostel.ownerName}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="h-4 w-4 text-slate-400" /> {selectedHostel.ownerPhone}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="h-4 w-4 text-slate-400" /> {selectedHostel.ownerEmail}
                        </div>
                      </div>
                    </div>

                    {/* Admin Notes Box */}
                    {selectedHostel.adminNotes && (
                      <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                          <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" /> Feedback Attached:
                        </div>
                        <p className="mt-1 text-xs text-amber-900">{selectedHostel.adminNotes}</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm text-slate-400">
                Select a hostel from the left column to review
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rejection / Changes Feedback Dialog */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="text-base font-bold text-slate-900 capitalize">
              {pendingAction === 'changes_requested' ? 'Request Changes' : 'Reject Hostel Submission'}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Provide actionable guidance for the owner on what needs to be fixed.
            </p>

            <textarea
              rows={4}
              value={feedbackNote}
              onChange={(e) => setFeedbackNote(e.target.value)}
              placeholder="e.g. Missing business registration permit, GPS location mismatch, blurry image uploads..."
              className="mt-4 w-full rounded-xl border border-slate-200 p-3 text-xs font-medium text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowFeedbackModal(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmModalAction}
                className={`rounded-lg px-4 py-2 text-xs font-bold text-white shadow-xs ${
                  pendingAction === 'changes_requested'
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                Submit Decision
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}