import { Link } from 'react-router-dom';
import {
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

interface HostelCardData {
  id: string;
  name: string;
  location: string;
  rating: number;
  pricePerYear: number;
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
    pricePerYear: 3000,
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
    pricePerYear: 2400,
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
    pricePerYear: 2160,
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
    pricePerYear: 3600,
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
  return (
    <div className="min-h-screen bg-slate-50 pt-16 text-slate-800">
      {/* ----------------- Hero Section ----------------- */}
      <section className="px-2 pt-2 sm:px-4 lg:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=80"
            alt="Campus Hostel Architecture"
            className="h-[360px] w-full object-cover opacity-45 mix-blend-overlay sm:h-[420px] lg:h-[460px]"
          />

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
            <div className="mt-6">
              <Link
                to="/hostels"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition hover:bg-blue-700 active:scale-[0.98]"
              >
                Explore Hostels <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- Value Props / Guarantees ----------------- */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
          <Link
            to="/hostels"
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_HOSTELS.map((hostel) => (
            <div
              key={hostel.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:shadow-lg hover:-translate-y-0.5"
            >
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

              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600">
                    {hostel.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                    {hostel.location}
                  </p>

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

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-base font-bold text-slate-900">
                      {hostel.currency} {hostel.pricePerYear.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 font-normal"> / year</span>
                  </div>

                  <Link
                    to={`/hostels/${hostel.id}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                    aria-label={`View ${hostel.name}`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}