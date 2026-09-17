import React, { useState, useId, useMemo } from 'react';
import {
  Search,
  MapPin,
  Users,
  Wifi,
  Shirt,
  ShieldCheck,
  Utensils,
  BookOpen,
  Car,
  RotateCcw,
} from 'lucide-react';
import HostelCard from '../Components/UI/HostelCard';

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
  capacity: number;
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
    capacity: 1,
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
    capacity: 2,
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
    capacity: 1,
    lat: 5.112,
    lng: -1.295,
  },
  {
    id: '4',
    name: 'Star View Hostel',
    rating: 4.6,
    location: 'Ayensu, Cape Coast',
    pricePerYear: 3600,
    currency: 'GHC',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Wi-Fi', icon: Wifi },
      { label: 'Meals', icon: Utensils },
      { label: 'Laundry', icon: Shirt },
    ],
    gender: 'mixed',
    capacity: 3,
    lat: 5.122,
    lng: -1.288,
  },
];

export default function FindHostelsPage() {
  const [searchInput, setSearchInput] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [guests, setGuests] = useState('all');

  const [priceMax, setPriceMax] = useState(6000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [hostelType, setHostelType] = useState<string>('all');
  const [sortBy, setSortBy] = useState('popular');

  const guestsId = useId();
  const sortById = useId();

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setActiveSearch(searchInput.trim());
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setActiveSearch('');
    setGuests('all');
    setPriceMax(6000);
    setSelectedAmenities([]);
    setHostelType('all');
    setSortBy('popular');
  };

  const toggleAmenity = (name: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const filteredHostels = useMemo(() => {
    return SAMPLE_HOSTELS.filter((hostel) => {
      // 1. Text Search (Matches hostel name or location)
      if (activeSearch) {
        const query = activeSearch.toLowerCase();
        const matchesName = hostel.name.toLowerCase().includes(query);
        const matchesLocation = hostel.location.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation) return false;
      }

      // 2. Capacity / Guests Check
      if (guests !== 'all') {
        const guestCount = parseInt(guests, 10);
        if (guestCount >= 4) {
          if (hostel.capacity < 4) return false;
        } else if (hostel.capacity < guestCount) {
          return false;
        }
      }

      // 3. Price Filter
      if (hostel.pricePerYear > priceMax) {
        return false;
      }

      // 4. Hostel Gender Type Filter
      if (hostelType !== 'all' && hostel.gender !== hostelType) {
        return false;
      }

      // 5. Amenities Check (Hostel must match all selected amenities)
      if (selectedAmenities.length > 0) {
        const hostelAmenityLabels = hostel.tags.map((t) => t.label);
        const hasAllSelected = selectedAmenities.every((amenity) =>
          hostelAmenityLabels.includes(amenity)
        );
        if (!hasAllSelected) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerYear - b.pricePerYear;
      if (sortBy === 'price-high') return b.pricePerYear - a.pricePerYear;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.rating * 10 - a.pricePerYear * 0.001;
    });
  }, [activeSearch, guests, priceMax, hostelType, selectedAmenities, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 pt-16 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top Search Hero Card */}
        <div className="relative mb-6 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/70 p-6 sm:p-8">
          <div className="max-w-xl">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Find Hostels
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Search and filter from verified student hostels around campus.
            </p>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="mt-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-md"
          >
            <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-12">
              {/* Location / Search Term */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-2.5 focus-within:border-blue-500 sm:col-span-6 lg:col-span-7">
                <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                <div className="w-full">
                  <label className="block text-[10px] font-semibold uppercase text-slate-400">
                    Location / Hostel
                  </label>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="e.g. UCC or Ayensu"
                    className="w-full bg-transparent text-xs font-semibold text-slate-800 outline-none"
                  />
                </div>
              </div>

              {/* Room Capacity */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-2.5 focus-within:border-blue-500 sm:col-span-3 lg:col-span-3">
                <Users className="h-4 w-4 shrink-0 text-slate-400" />
                <div className="w-full">
                  <label htmlFor={guestsId} className="block text-[10px] font-semibold uppercase text-slate-400">
                    Room Capacity
                  </label>
                  <select
                    id={guestsId}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full cursor-pointer bg-transparent text-xs font-semibold text-slate-800 outline-none"
                  >
                    <option value="all">Any Capacity</option>
                    <option value="1">1 Person (Single)</option>
                    <option value="2">2 Persons (Shared)</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4+ Persons</option>
                  </select>
                </div>
              </div>

              {/* Search Submit */}
              <div className="sm:col-span-3 lg:col-span-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
                >
                  <Search className="h-4 w-4" /> Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* 2-Column Layout: Sidebar Filters + Full-Width Hostel Results Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Filters Sidebar */}
          <aside className="space-y-6 lg:col-span-4 xl:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Filters</h2>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              </div>

              {/* Price Range Slider */}
              <div className="mt-4">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Max Price / Year</span>
                  <span className="font-bold text-blue-600">GHC {priceMax.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={1500}
                  max={6000}
                  step={100}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="mt-3 w-full accent-blue-600 cursor-pointer"
                />
                <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                  <span>GHC 1,500</span>
                  <span>GHC 6,000</span>
                </div>
              </div>

              {/* Hostel Gender Type */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Hostel Type
                </h3>
                <div className="mt-3 space-y-2.5">
                  {[
                    { label: 'All Resident Types', value: 'all' },
                    { label: 'Mixed', value: 'mixed' },
                    { label: 'Male Only', value: 'male' },
                    { label: 'Female Only', value: 'female' },
                  ].map((type) => (
                    <label
                      key={type.value}
                      className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-700"
                    >
                      <input
                        type="radio"
                        name="hostelType"
                        value={type.value}
                        checked={hostelType === type.value}
                        onChange={(e) => setHostelType(e.target.value)}
                        className="h-4 w-4 border-slate-300 text-blue-600 accent-blue-600 focus:ring-0"
                      />
                      {type.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities Checklist */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Amenities
                </h3>
                <div className="mt-3 space-y-2.5">
                  {['Wi-Fi', 'Meals', 'Laundry', 'Security', 'Parking', 'Study Room'].map((amenity) => (
                    <label
                      key={amenity}
                      className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600 focus:ring-0"
                      />
                      {amenity}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results Grid Area */}
          <section className="space-y-4 lg:col-span-8 xl:col-span-9">
            {/* Status & Sort Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-semibold text-slate-700">
                Showing <span className="font-bold text-slate-900">{filteredHostels.length}</span> hostels
                {activeSearch && (
                  <span className="text-xs font-normal text-slate-500"> for "{activeSearch}"</span>
                )}
              </span>

              <div className="flex items-center gap-2">
                <label htmlFor={sortById} className="text-xs text-slate-400">
                  Sort by:
                </label>
                <select
                  id={sortById}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none"
                >
                  <option value="popular">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Hostel Cards Grid */}
            {filteredHostels.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredHostels.map((hostel) => (
                  <HostelCard key={hostel.id} {...hostel} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <div className="rounded-full bg-slate-100 p-3 text-slate-400">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-800">No hostels found</h3>
                <p className="mt-1 max-w-sm text-xs text-slate-500">
                  Try adjusting your filters, unchecking some amenities, or clearing your search keywords.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}