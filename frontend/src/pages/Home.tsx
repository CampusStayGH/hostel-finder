import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Search,
  CheckCircle2,
  Star,
  BookmarkCheck,
  Headphones,
  ArrowRight,
  Wifi,
  Shirt,
  ShieldCheck,
  Utensils,
  BookOpen,
} from 'lucide-react';

import Input from '../Components/UI/Input';

interface HostelCardData {
  id: string;
  name: string;
  location: string;
  rating: number;
  pricePerMonth: number;
  currency: string;
  image: string;
  tags: { label: string; icon: React.ComponentType<{ className?: string }> }[];
}

const FEATURED_HOSTELS: HostelCardData[] = [
  {
    id: '1',
    name: "UCC Students' Hostel",
    location: 'University of Cape Coast, Cape Coast',
    rating: 4.5,
    pricePerMonth: 250,
    currency: 'GHC',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Wi-Fi', icon: Wifi },
      { label: 'Laundry', icon: Shirt },
      { label: 'Security', icon: ShieldCheck },
    ],
  },
  {
    id: '2',
    name: 'Nkabom Hostel',
    location: 'Cape Coast, Central Region',
    rating: 4.3,
    pricePerMonth: 200,
    currency: 'GHC',
    image: 'https://images.unsplash.com/photo-1596276020587-8044fe049813?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Wi-Fi', icon: Wifi },
      { label: 'Meals', icon: Utensils },
      { label: 'Study Room', icon: BookOpen },
    ],
  },
  {
    id: '3',
    name: 'Sundown Hostel',
    location: 'Cape Coast, Central Region',
    rating: 4.0,
    pricePerMonth: 180,
    currency: 'GHC',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Wi-Fi', icon: Wifi },
      { label: 'Parking', icon: ShieldCheck },
      { label: 'Security', icon: ShieldCheck },
    ],
  },
  {
    id: '4',
    name: 'Star View Hostel',
    location: 'Cape Coast, Central Region',
    rating: 4.6,
    pricePerMonth: 300,
    currency: 'GHC',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    tags: [
      { label: 'Wi-Fi', icon: Wifi },
      { label: 'Meals', icon: Utensils },
      { label: 'Laundry', icon: Shirt },
    ],
  },
];

const VALUE_PROPS = [
  {
    icon: CheckCircle2,
    iconBg: 'bg-blue-100 text-blue-600',
    title: 'Verified Hostels',
    description: 'Only trusted and verified hostels are listed.',
  },
  {
    icon: Star,
    iconBg: 'bg-sky-100 text-sky-600',
    title: 'Real Reviews',
    description: 'Read what other students have to say.',
  },
  {
    icon: BookmarkCheck,
    iconBg: 'bg-indigo-100 text-indigo-600',
    title: 'Easy Booking',
    description: 'Book in just a few clicks.',
  },
  {
    icon: Headphones,
    iconBg: 'bg-cyan-100 text-cyan-600',
    title: '24/7 Support',
    description: "We're here to help anytime.",
  },
];

export default function HomePage() {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
<<<<<<< Updated upstream
  const [checkOut, setCheckOut] = useState('');
=======
>>>>>>> Stashed changes
  const [guests, setGuests] = useState('1 Guest');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect or search query handler
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16 text-slate-800">
      {/* ----------------- Hero Section ----------------- */}
      <section className="relative overflow-hidden">
        <div className="relative mx-4 max-w-7xl px-4 pt-4 pb-20 sm:px-6 lg:px-3">
          {/* Hero Banner Background with Overlay */}
          <div className="relative overflow-hidden rounded-md bg-slate-900 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=80"
              alt="Campus Hostel Architecture"
              className="h-[440px] w-full object-cover opacity-45 mix-blend-overlay sm:h-[480px] lg:h-[500px]"
            />
            
            {/* Hero Copy */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-16 max-w-2xl text-white">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
                Find Your <br />
                <span className="text-white">Perfect Hostel</span>
              </h1>
              <p className="mt-3 text-lg font-medium text-slate-200 sm:text-xl">
                Safe. Affordable. Comfortable.
              </p>
              <p className="mt-2 text-sm text-slate-300 max-w-md">
                Discover the best hostels near you with verified listings, real reviews, and easy booking.
              </p>
            </div>

            {/* Floating Search Bar Form */}
<<<<<<< Updated upstream
            <div className="mx-4 mb-4 rounded-2xl bg-white p-3 shadow-2xl sm:mx-8 sm:mb-8 lg:mx-12 lg:p-4">
              <form
                onSubmit={handleSearch}
                className="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-3 lg:grid-cols-5 items-center"
=======
            <div className="mx-4 mb-4 rounded-md bg-white p-3 shadow-2xl sm:mx-8 sm:mb-8 lg:mx-12 lg:p-4">
              <form
                onSubmit={handleSearch}
                className="grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-3 lg:grid-cols-4 items-center"
>>>>>>> Stashed changes
              >
                {/* Location Input */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  <MapPin className="h-5 w-5 text-slate-400 shrink-0" />
                  <div className="w-full text-left">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UCC, Cape Coast"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 outline-none"
                    />
                  </div>
                </div>

                {/* Check-In Input */}
<<<<<<< Updated upstream
=======
                

                {/* Check-Out Input */}
>>>>>>> Stashed changes
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  <Calendar className="h-5 w-5 text-slate-400 shrink-0" />
                  <div className="w-full text-left">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Check In
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
                    />
                  </div>
                </div>

<<<<<<< Updated upstream
                {/* Check-Out Input */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  <Calendar className="h-5 w-5 text-slate-400 shrink-0" />
                  <div className="w-full text-left">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Check Out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
                    />
                  </div>
                </div>

=======
>>>>>>> Stashed changes
                {/* Guests / Capacity */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  <Users className="h-5 w-5 text-slate-400 shrink-0" />
                  <div className="w-full text-left">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none cursor-pointer"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3 Guests">3 Guests</option>
                      <option value="4+ Guests">4+ Guests</option>
                    </select>
                  </div>
                </div>

                {/* Submit Search Button */}
                <div className="md:col-span-4 lg:col-span-1">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition hover:bg-blue-700 active:scale-[0.98]"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- Value Props / Guarantees ----------------- */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------- Popular Hostels Grid ----------------- */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Popular Hostels
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Check out some of the most booked hostels on our platform.
            </p>
          </div>
          <a
            href="/hostels"
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View All <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_HOSTELS.map((hostel) => (
            <div
              key={hostel.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:shadow-lg hover:-translate-y-0.5"
            >
              {/* Hostel Image with Rating Badge */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={hostel.image}
                  alt={hostel.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-xs">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {hostel.rating.toFixed(1)}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600">
                    {hostel.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                    {hostel.location}
                  </p>

                  {/* Feature Badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {hostel.tags.map((tag, tIdx) => {
                      const TagIcon = tag.icon;
                      return (
                        <span
                          key={tIdx}
                          className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                        >
                          <TagIcon className="h-3 w-3 text-slate-400" />
                          {tag.label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-base font-bold text-slate-900">
                      {hostel.currency} {hostel.pricePerMonth}
                    </span>
                    <span className="text-xs text-slate-400 font-normal"> / month</span>
                  </div>

                  <a
                    href={`/hostels/${hostel.id}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                    aria-label={`View ${hostel.name}`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}