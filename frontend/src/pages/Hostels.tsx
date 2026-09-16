import React, { useState, useId } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Wifi,
  Shirt,
  ShieldCheck,
  Utensils,
  BookOpen,
  Car,
  Map,
  List,
} from 'lucide-react';
import HostelCard from '../Components/UI/HostelCard';

// Defined locally so HostelCard doesn't need to export it
export interface HostelTag {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface HostelData {
  id: string;
  name: string;
  location: string;
  rating: number;
  pricePerYear: number;
  currency: string;
  image: string;
  tags: HostelTag[];
  gender: 'male' | 'female' | 'mixed';
  lat: number;
  lng: number;
}

const SAMPLE_HOSTELS: HostelData[] = [
  {
    id: '1',
    name: "UCC Students' Hostel",
    rating: 4.5,
    location: 'University of Cape Coast, Cape Coast',
    pricePerYear: 3000,
    currency: 'GHC',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Wi-Fi', icon: Wifi },
      { label: 'Laundry', icon: Shirt },
      { label: 'Security', icon: ShieldCheck },
    ],
    gender: 'mixed',
    lat: 5.1155,
    lng: -1.291,
  },
  {
    id: '2',
    name: 'Nkabom Hostel',
    rating: 4.3,
    location: 'Cape Coast, Central Region',
    pricePerYear: 2400,
    currency: 'GHC',
    image: 'https://images.unsplash.com/photo-1596276020587-8044fe049813?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Wi-Fi', icon: Wifi },
      { label: 'Meals', icon: Utensils },
      { label: 'Study Room', icon: BookOpen },
    ],
    gender: 'female',
    lat: 5.118,
    lng: -1.285,
  },
  {
    id: '3',
    name: 'Sundown Hostel',
    rating: 4.0,
    location: 'Cape Coast, Central Region',
    pricePerYear: 2160,
    currency: 'GHC',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Wi-Fi', icon: Wifi },
      { label: 'Parking', icon: Car },
      { label: 'Security', icon: ShieldCheck },
    ],
    gender: 'male',
    lat: 5.112,
    lng: -1.295,
  },
  {
    id: '4',
    name: 'Star View Hostel',
    rating: 4.6,
    location: 'Cape Coast, Central Region',
    pricePerYear: 3600,
    currency: 'GHC',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Wi-Fi', icon: Wifi },
      { label: 'Meals', icon: Utensils },
      { label: 'Laundry', icon: Shirt },
    ],
    gender: 'mixed',
    lat: 5.122,
    lng: -1.288,
  },
];

export default function FindHostelsPage() {
  const [location, setLocation] = useState('Cape Coast');
  const [checkIn, setCheckIn] = useState('2026-04-30');
  const [checkOut, setCheckOut] = useState('2026-05-05');
  const [guests, setGuests] = useState('1 Guest');

  const [priceMax, setPriceMax] = useState(5000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Wi-Fi',
    'Meals',
    'Laundry',
  ]);
  const [hostelType, setHostelType] = useState<string>('mixed');
  const [mapMode, setMapMode] = useState<'map' | 'list'>('map');
  const [sortBy, setSortBy] = useState('popular');

  const checkInId = useId();
  const checkOutId = useId();
  const guestsId = useId();
  const sortById = useId();

  const toggleAmenity = (name: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top Header Card */}
        <div className="relative mb-6 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/70 p-6 sm:p-8">
          <div className="max-w-xl">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Find Hostels
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Search and filter from our wide range of hostels around campus.
            </p>
          </div>

          {/* Top Search Filter Bar */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-md">
            <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2">
                <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none"
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2">
                <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
                <div className="w-full">
                  <label htmlFor={checkInId} className="block text-[10px] font-semibold uppercase text-slate-400">
                    Check In
                  </label>
                  <input
                    id={checkInId}
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-slate-700 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2">
                <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
                <div className="w-full">
                  <label htmlFor={checkOutId} className="block text-[10px] font-semibold uppercase text-slate-400">
                    Check Out
                  </label>
                  <input
                    id={checkOutId}
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-slate-700 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2">
                <Users className="h-4 w-4 shrink-0 text-slate-400" />
                <div className="w-full">
                  <label htmlFor={guestsId} className="block text-[10px] font-semibold uppercase text-slate-400">
                    Guests
                  </label>
                  <select
                    id={guestsId}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-slate-800 outline-none"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3 Guests">3 Guests</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Search className="h-4 w-4" /> Search
              </button>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar Filters | Hostel Cards | Map */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Filters Sidebar */}
          <aside className="space-y-6 lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => {
                    setPriceMax(5000);
                    setSelectedAmenities([]);
                    setHostelType('mixed');
                  }}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Price Range */}
              <div className="mt-4">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Price Range</span>
                  <span className="text-blue-600">GHC 1,000 - {priceMax.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={6000}
                  step={100}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="mt-3 w-full accent-blue-600"
                />
                <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                  <span>GHC 1,000</span>
                  <span>GHC 6,000</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Amenities
                </h3>
                <div className="mt-3 space-y-2.5">
                  {['Wi-Fi', 'Meals', 'Laundry', 'Security', 'Parking', 'Study Room'].map((item) => (
                    <label key={item} className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(item)}
                        onChange={() => toggleAmenity(item)}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-0"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              {/* Hostel Type */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Hostel Type
                </h3>
                <div className="mt-3 space-y-2.5">
                  {[
                    { label: 'Male Only', value: 'male' },
                    { label: 'Female Only', value: 'female' },
                    { label: 'Mixed', value: 'mixed' },
                  ].map((type) => (
                    <label key={type.value} className="flex cursor-pointer items-center gap-2.5 text-xs text-slate-700">
                      <input
                        type="radio"
                        name="hostelType"
                        value={type.value}
                        checked={hostelType === type.value}
                        onChange={(e) => setHostelType(e.target.value)}
                        className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-0"
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Hostels Section */}
          <section className="space-y-4 lg:col-span-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">
                Showing {SAMPLE_HOSTELS.length} hostels
              </span>

              <div className="flex items-center gap-2">
                <label htmlFor={sortById} className="text-xs text-slate-400">Sort by:</label>
                <select
                  id={sortById}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 outline-none"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Rendered Hostel Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {SAMPLE_HOSTELS.map((hostel) => (
                <HostelCard key={hostel.id} {...hostel} />
              ))}
            </div>
          </section>

          {/* Interactive Map Panel */}
          <aside className="lg:col-span-4">
            <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs">
              <div className="flex items-center justify-between pb-3">
                <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
                  <button
                    type="button"
                    onClick={() => setMapMode('map')}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
                      mapMode === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    <Map className="h-3.5 w-3.5" /> Map
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapMode('list')}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
                      mapMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    <List className="h-3.5 w-3.5" /> List
                  </button>
                </div>
              </div>

              {/* Map Preview */}
              <div className="relative h-[520px] w-full overflow-hidden rounded-xl bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80"
                  alt="Campus Map View"
                  className="h-full w-full object-cover opacity-80"
                />

                {/* Map Pins */}
                <div className="absolute top-1/4 left-1/3 flex items-center justify-center rounded-full bg-blue-600 p-1.5 text-white shadow-lg ring-4 ring-white">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="absolute top-1/2 left-2/3 flex items-center justify-center rounded-full bg-blue-600 p-1.5 text-white shadow-lg ring-4 ring-white">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="absolute bottom-1/3 left-1/2 flex items-center justify-center rounded-full bg-blue-600 p-1.5 text-white shadow-lg ring-4 ring-white">
                  <MapPin className="h-4 w-4" />
                </div>

                {/* Map Floating Preview Box */}
                <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-slate-200 bg-white p-2.5 shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={SAMPLE_HOSTELS[0].image}
                      alt={SAMPLE_HOSTELS[0].name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {SAMPLE_HOSTELS[0].name}
                      </h4>
                      <p className="text-[11px] font-semibold text-blue-600">
                        {SAMPLE_HOSTELS[0].currency} {SAMPLE_HOSTELS[0].pricePerYear.toLocaleString()} / year
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}