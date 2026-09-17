import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, MapPin, ArrowRight, Building, GraduationCap } from 'lucide-react';

const CAMPUS_LOCATIONS = [
  {
    name: 'University of Cape Coast',
    shortCode: 'UCC',
    region: 'Central Region',
    description: 'Hostels around Ayensu, Science Taxi Rank, and Amamoma.',
    badge: 'Popular',
    icon: GraduationCap,
  },
  {
    name: 'KNUST',
    shortCode: 'KNUST',
    region: 'Kumasi, Ashanti Region',
    description: 'Accommodation in Ayeduase, Kotei, Gaza, and Bomso.',
    badge: 'High Demand',
    icon: Building,
  },
  {
    name: 'University of Ghana',
    shortCode: 'UG Legon',
    region: 'Accra, Greater Accra',
    description: 'Options in Legon, Okponglo, and Haatso.',
    badge: null,
    icon: GraduationCap,
  },
  {
    name: 'Central Region Hostels',
    shortCode: 'Cape Coast',
    region: 'Cape Coast Metro',
    description: 'Quiet residential neighborhoods and affordable student spots.',
    badge: null,
    icon: MapPin,
  },
];

export default function Explore() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-20 pt-24 sm:px-6">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Compass className="h-6 w-6" />
        </div>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Explore campus life
        </h1>
        <p className="mt-2 text-slate-600">
          Select your institution or area below to jump directly into filtered hostel listings.
        </p>

        {/* Clickable Campus Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {CAMPUS_LOCATIONS.map((campus) => {
            const Icon = campus.icon;
            return (
              <Link
                key={campus.shortCode}
                to={`/hostels?location=${encodeURIComponent(campus.shortCode)}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    {campus.badge && (
                      <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                        {campus.badge}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-3 font-bold text-slate-900 group-hover:text-blue-600">
                    {campus.name}
                  </h2>
                  <p className="text-xs font-medium text-slate-400">{campus.region}</p>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {campus.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1 border-t border-slate-100 pt-3 text-xs font-semibold text-blue-600">
                  <span>Browse hostels</span>
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}