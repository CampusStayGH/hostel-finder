import React, { useState } from 'react';
import {
  Home,
  Building2,
  User,
  Menu,
  X,
  Compass,
  BookmarkCheck,
} from 'lucide-react';
import Button from './UI/Button';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navLinks: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Find Hostels', href: '/hostels', icon: Building2 },
  { label: 'Explore Campus', href: '/explore', icon: Compass },
  { label: 'Saved', href: '/saved', icon: BookmarkCheck },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-40 h-16 w-full border-b border-slate-200/80 bg-white/95 px-4 shadow-sm backdrop-blur-md md:px-6">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4">
          
          {/* Logo / Brand */}
          <a
            href="/"
            aria-label="Scout Home"
            className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-slate-900 transition hover:bg-slate-50 focus:outline-none "
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/30">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Hostel<span className="text-blue-600">Scout</span>
            </span>
          </a>

          {/* Desktop Navigation Links (WITH Borders) */}
          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Icon className="h-4 w-4 text-slate-500" />
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Section: Action & Borderless Profile */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Post/List a Hostel CTA */}
            <Button
              variant="secondary"
              className="border-slate-300 bg-white text-sm font-semibold text-slate-700 shadow-sm hover:border-slate-400 hover:bg-slate-50 lg:inline-flex"
            >
              List a Hostel
            </Button>

            {/* Profile Avatar / Login (No border) */}
            <a
              href="/profile"
              aria-label="User profile"
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                <User className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold">Account</span>
            </a>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-30 border-b border-slate-200 bg-white px-4 py-4 shadow-xl md:hidden">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
                >
                  <Icon className="h-4 w-4 text-slate-500" />
                  {link.label}
                </a>
              );
            })}

            <div className="my-1 border-t border-slate-100 pt-1" />

            {/* Mobile Account Link (No border) */}
            <a
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <User className="h-4 w-4 text-slate-500" />
              My Profile
            </a>

            <div className="pt-2">
              <Button
                variant="primary"
                className="w-full justify-center border border-blue-600 py-2 text-sm font-semibold shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                List a Hostel
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;