import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

export interface HostelTag {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface HostelCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  pricePerYear: number;
  currency?: string;
  image: string;
  tags?: HostelTag[];
}

export default function HostelCard({
  id,
  name,
  location,
  rating,
  pricePerYear,
  currency = 'GHC',
  image,
  tags = [],
}: HostelCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs transition hover:-translate-y-0.5 hover:shadow-lg">
      {/* Thumbnail & Rating Overlay */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-xs font-bold text-slate-800 shadow-sm backdrop-blur-xs">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {rating.toFixed(1)}
        </div>
      </div>

      {/* Details Body */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600">
            {name}
          </h3>
          <p className="mt-1 text-xs text-slate-500 line-clamp-1">{location}</p>

          {/* Feature / Amenity Tags */}
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((tag, idx) => {
                const IconComponent = tag.icon;
                return (
                  <span
                    key={idx}
                    className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                  >
                    <IconComponent className="h-3 w-3 text-slate-400" />
                    {tag.label}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Pricing & CTA Link */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
          <div>
            <span className="text-base font-bold text-slate-900">
              {currency} {pricePerYear.toLocaleString()}
            </span>
            <span className="text-xs font-normal text-slate-400"> / year</span>
          </div>

          <Link
            to={`/hostels/${id}`}
            aria-label={`View details for ${name}`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}