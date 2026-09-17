import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  PencilLine,
  BedDouble,
  Sparkles,
  Upload,
} from 'lucide-react';

const AMENITY_OPTIONS = [
  'Wi-Fi',
  'Laundry',
  'Security',
  'Meals',
  'Study Room',
  'Parking',
  'Water Reservoir',
  'Backup Generator',
];

export default function CreateHostelPage() {
  const navigate = useNavigate();
  const steps = [1, 2, 3];

  const [formNo, setFormNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [completionMode, setCompletionMode] = useState<'draft' | 'submitted'>('submitted');

  const [data, setData] = useState({
    name: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    location: '',
    pricePerYear: '',
    capacity: '',
    gender: 'mixed',
    description: '',
    amenities: [] as string[],
    imageFile: null as File | null,
    imagePreview: '',
  });

  useEffect(() => {
    return () => {
      if (data.imagePreview) URL.revokeObjectURL(data.imagePreview);
    };
  }, [data.imagePreview]);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
  const isValidPhone = (value: string) =>
    /^[+\d][\d\s-]{6,19}$/.test(String(value || '').trim());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    setErrorMessage('');
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((item) => item !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setData((prev) => {
      if (prev.imagePreview) URL.revokeObjectURL(prev.imagePreview);
      return {
        ...prev,
        imageFile: file || null,
        imagePreview: file ? URL.createObjectURL(file) : '',
      };
    });
  };

  const next = () => {
    setErrorMessage('');

    if (!data.name.trim() || !data.ownerName.trim() || !data.ownerEmail.trim()) {
      setErrorMessage('Please fill in the hostel name, owner name, and owner email.');
      return;
    }

    if (!isValidEmail(data.ownerEmail)) {
      setFieldErrors((prev) => ({ ...prev, ownerEmail: 'Enter a valid email address.' }));
      setErrorMessage('Please fix the email address field.');
      return;
    }

    if (data.ownerPhone && !isValidPhone(data.ownerPhone)) {
      setFieldErrors((prev) => ({ ...prev, ownerPhone: 'Enter a valid phone number.' }));
      setErrorMessage('Please fix the phone number field.');
      return;
    }

    setFormNo((prev) => prev + 1);
  };

  const prev = () => {
    setErrorMessage('');
    setFormNo((prev) => prev - 1);
  };

  const submitHostel = async ({ asDraft = false } = {}) => {
    setLoading(true);
    setErrorMessage('');

    try {
      if (!data.name.trim()) {
        throw new Error('Hostel name is required.');
      }

      if (data.ownerEmail && !isValidEmail(data.ownerEmail)) {
        throw new Error('Owner email must be a valid email address.');
      }

      if (data.ownerPhone && !isValidPhone(data.ownerPhone)) {
        throw new Error('Owner phone number is invalid.');
      }

      if (!asDraft) {
        if (!data.location.trim() || !data.pricePerYear || !data.capacity) {
          throw new Error('Location, annual price, and bed capacity are required to submit.');
        }
      }

      // Simulated network/API storage
      await new Promise((resolve) => setTimeout(resolve, 800));

      setCompletionMode(asDraft ? 'draft' : 'submitted');
      setFormNo(3);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to process hostel listing.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = () => submitHostel({ asDraft: false });
  const handleSaveDraft = () => submitHostel({ asDraft: true });

  const inputClass =
    'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm shadow-xs transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100';

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6 flex justify-center items-center">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[280px_1fr]">
        {/* Left Step Indicator Aside - Aligned to HostelScout Brand Blue */}
        <aside className="rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-600 to-blue-700 p-6 text-white shadow-lg shadow-blue-600/10">
          <div className="mb-6">
           
            <h2 className="mt-3 text-xl font-bold">List a Hostel</h2>
            <p className="mt-1 text-sm text-blue-100">
              Provide your property details to publish your listing for campus students.
            </p>
          </div>

          <div className="space-y-5">
            {steps.map((step) => (
              <div key={step} className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition shadow-xs ${
                    formNo >= step
                      ? 'bg-white text-blue-600 font-extrabold shadow-sm'
                      : 'bg-blue-500/40 text-blue-200 border border-blue-400/30'
                  }`}
                >
                  {step}
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      formNo >= step ? 'text-white' : 'text-blue-100/70'
                    }`}
                  >
                    {step === 1
                      ? 'Property & Contact'
                      : step === 2
                      ? 'Pricing & Amenities'
                      : 'Submitted'}
                  </p>
                  <p className="text-xs text-blue-100/80">
                    {step === 1
                      ? 'Hostel name and owner info'
                      : step === 2
                      ? 'Location, annual rate, and features'
                      : 'Pending admin approval'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Form Container */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
              {formNo === 1 ? (
                <PencilLine className="h-5 w-5" />
              ) : formNo === 2 ? (
                <BedDouble className="h-5 w-5" />
              ) : (
                <Building2 className="h-5 w-5" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {formNo === 1 && 'Step 1: Property & Owner Details'}
                {formNo === 2 && 'Step 2: Facilities, Pricing & Photos'}
                {formNo === 3 && 'Step 3: Verification Received'}
              </h1>
              <p className="text-sm text-slate-500">
                {formNo < 3
                  ? 'Complete the highlighted fields to move to the next stage.'
                  : 'Your submission has been queued for verification.'}
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
              {errorMessage}
            </div>
          )}

          {/* STEP 1 */}
          {formNo === 1 && (
            <form className="grid gap-4 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Hostel Name
                </span>
                <input
                  name="name"
                  className={inputClass}
                  value={data.name}
                  onChange={handleChange}
                  placeholder="e.g. UCC Students' Annex"
                />
              </label>

              <label>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Manager / Owner Name
                </span>
                <input
                  name="ownerName"
                  className={inputClass}
                  value={data.ownerName}
                  onChange={handleChange}
                  placeholder="e.g. Kwesi Mensah"
                />
              </label>

              <label>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Contact Phone Number
                </span>
                <input
                  name="ownerPhone"
                  className={`${inputClass} ${
                    fieldErrors.ownerPhone ? 'border-red-400 focus:ring-red-100' : ''
                  }`}
                  value={data.ownerPhone}
                  onChange={handleChange}
                  placeholder="+233 24 123 4567"
                />
                {fieldErrors.ownerPhone && (
                  <span className="mt-1 block text-xs text-red-600">{fieldErrors.ownerPhone}</span>
                )}
              </label>

              <label className="md:col-span-2">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Official Email Address
                </span>
                <input
                  name="ownerEmail"
                  type="email"
                  className={`${inputClass} ${
                    fieldErrors.ownerEmail ? 'border-red-400 focus:ring-red-100' : ''
                  }`}
                  value={data.ownerEmail}
                  onChange={handleChange}
                  placeholder="owner@hostelscout.com"
                />
                {fieldErrors.ownerEmail && (
                  <span className="mt-1 block text-xs text-red-600">{fieldErrors.ownerEmail}</span>
                )}
              </label>

              <label className="md:col-span-2">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Hostel Resident Type
                </span>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Mixed', value: 'mixed' },
                    { label: 'Male Only', value: 'male' },
                    { label: 'Female Only', value: 'female' },
                  ].map((genderOption) => (
                    <label
                      key={genderOption.value}
                      className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                        data.gender === genderOption.value
                          ? 'border-blue-600 bg-blue-50/50 text-blue-700'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={genderOption.value}
                        checked={data.gender === genderOption.value}
                        onChange={handleChange}
                        className="accent-blue-600"
                      />
                      {genderOption.label}
                    </label>
                  ))}
                </div>
              </label>

              <div className="flex justify-end pt-3 md:col-span-2">
                <button
                  type="button"
                  onClick={next}
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700"
                >
                  Continue
                </button>
              </div>
            </form>
          )}

          {/* STEP 2 */}
          {formNo === 2 && (
            <form className="grid gap-4 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Location / Area Description
                </span>
                <input
                  name="location"
                  className={inputClass}
                  value={data.location}
                  onChange={handleChange}
                  placeholder="e.g. Science Taxi Rank, University of Cape Coast"
                />
              </label>

              <label>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Price Per Year (GHC)
                </span>
                <input
                  type="number"
                  name="pricePerYear"
                  min="0"
                  className={inputClass}
                  value={data.pricePerYear}
                  onChange={handleChange}
                  placeholder="3000"
                />
              </label>

              <label>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Total Capacity (Total Beds)
                </span>
                <input
                  type="number"
                  name="capacity"
                  min="1"
                  className={inputClass}
                  value={data.capacity}
                  onChange={handleChange}
                  placeholder="24"
                />
              </label>

              {/* Amenities checkboxes */}
              <div className="md:col-span-2">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Amenities & Facilities
                </span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {AMENITY_OPTIONS.map((amenity) => {
                    const checked = data.amenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => handleAmenityToggle(amenity)}
                        className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs font-medium transition ${
                          checked
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-white ${
                            checked ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                          }`}
                        >
                          {checked && <span className="text-[10px]">✓</span>}
                        </div>
                        {amenity}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Image Upload */}
              <label className="md:col-span-2">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Hostel Cover Image
                </span>
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </label>

              {data.imagePreview ? (
                <div className="overflow-hidden rounded-xl border border-slate-200 md:col-span-2">
                  <img
                    src={data.imagePreview}
                    alt="Hostel Preview"
                    className="h-44 w-full object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-xs text-slate-400 md:col-span-2">
                  <Upload className="mx-auto mb-1.5 h-5 w-5" />
                  Image preview will render here once selected.
                </div>
              )}

              <label className="md:col-span-2">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  General Overview / Description
                </span>
                <textarea
                  name="description"
                  rows={3}
                  className={`${inputClass} min-h-[90px]`}
                  value={data.description}
                  onChange={handleChange}
                  placeholder="Provide any extra details about curfew, water availability, room sizes, etc."
                />
              </label>

              <div className="flex justify-between pt-3 md:col-span-2">
                <button
                  type="button"
                  onClick={prev}
                  className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Back
                </button>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={loading}
                    className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Draft'}
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Hostel'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3 */}
          {formNo === 3 && (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <div className="rounded-full bg-emerald-100 p-3 text-emerald-700">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {completionMode === 'draft'
                  ? 'Hostel Draft Saved'
                  : 'Hostel Submitted for Verification'}
              </h2>
              <p className="max-w-md text-sm text-slate-600">
                {completionMode === 'draft'
                  ? 'Your draft hostel listing has been retained. You can return to edit and publish it anytime.'
                  : 'Your hostel listing has been submitted to the administration review dashboard. You will be contacted once approved.'}
              </p>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/hostels')}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700"
                >
                  Browse Hostels
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setData({
                      name: '',
                      ownerName: '',
                      ownerPhone: '',
                      ownerEmail: '',
                      location: '',
                      pricePerYear: '',
                      capacity: '',
                      gender: 'mixed',
                      description: '',
                      amenities: [],
                      imageFile: null,
                      imagePreview: '',
                    });
                    setFormNo(1);
                  }}
                  className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Submit Another
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}