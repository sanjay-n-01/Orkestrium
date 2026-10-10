import React, { useState, useEffect, useRef } from 'react';
import { PhoenixWordmark } from './PhoenixLogo';
import { Search, X, Bell } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  myListCount: number;
  onOpenMyList: () => void;
  registrationLink: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  myListCount,
  onOpenMyList,
  registrationLink,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const target = e.target as Node;
      if (notifRef.current && !notifRef.current.contains(target)) {
        setIsNotifOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        // Only close if it's open, but we don't necessarily clear the query so they don't lose search state
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleToggleSearch = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      } else {
        onSearchChange('');
      }
      return next;
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 h-[68px] transition-all duration-300 ${isScrolled
        ? 'bg-[#141414]/95 shadow-xl shadow-black/80 border-b border-white/10 backdrop-blur-md'
        : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-full flex items-center justify-between gap-4 sm:gap-6">
        {/* Left: Brand Logo + Nav Links */}
        <div className="flex items-center gap-7 lg:gap-9 shrink-0">
          <a
            href="#hero"
            className="flex items-center gap-2 sm:gap-2.5 focus-visible:outline-none group select-none shrink-0"
            aria-label="Orkestrim Home"
          >
            <img
              src="/assets/logo-mark.svg"
              alt="Orkestrim Logo"
              className="group-hover:scale-105 transition-transform w-7 h-7 sm:w-[34px] sm:h-[34px] object-contain drop-shadow-[0_0_12px_rgba(229,9,20,0.5)] shrink-0"
            />
            <PhoenixWordmark className="text-xl sm:text-2xl md:text-3xl shrink-0" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-neutral-300" aria-label="Main Navigation">
            <a href="#hero" className="text-white hover:text-white transition-colors">
              Home
            </a>
            <a href="#top5" className="hover:text-white transition-colors">
              Top 5
            </a>
            <a href="#arenas" className="hover:text-white transition-colors">
              Arenas
            </a>
            <a href="#schedule" className="hover:text-white transition-colors">
              Episodes (Schedule)
            </a>
            <button
              type="button"
              onClick={onOpenMyList}
              className="flex items-center gap-1.5 hover:text-white transition-colors text-left"
            >
              <span>My List</span>
              <span className="bg-[#E50914] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center leading-tight">
                {myListCount}
              </span>
            </button>
            <a href="#venue" className="hover:text-white transition-colors">
              Streaming at
            </a>
            <a href="#cast" className="hover:text-white transition-colors">
              Cast & Crew
            </a>
          </nav>
        </div>

        {/* Right: Search, Notification Bell, Register Now Button */}
        <div className="flex items-center justify-end gap-2.5 sm:gap-5 min-w-0 ml-auto">
          {/* Search Toggle */}
          <div
            ref={searchContainerRef}
            className={`flex items-center rounded transition-all duration-200 min-w-0 ${isSearchOpen
              ? 'bg-black/80 border border-white/30 px-2 sm:px-2.5 py-1.5 shadow-lg'
              : 'bg-transparent border border-transparent'
              }`}
          >
            <button
              type="button"
              onClick={handleToggleSearch}
              aria-label="Search events"
              title="Search arenas"
              className="text-white hover:text-neutral-300 transition-colors p-1 shrink-0"
            >
              <Search className="w-5 h-5" />
            </button>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Titles, tags, genres..."
              className={`bg-transparent text-xs sm:text-sm text-white focus:outline-none transition-all duration-300 min-w-0 ${isSearchOpen
                ? 'w-28 min-[400px]:w-36 sm:w-48 ml-1.5 sm:ml-2 opacity-100'
                : 'w-0 opacity-0 pointer-events-none'
                }`}
            />
            {isSearchOpen && (
              <button
                type="button"
                onClick={() => {
                  if (searchQuery) {
                    onSearchChange('');
                    searchInputRef.current?.focus();
                  } else {
                    setIsSearchOpen(false);
                  }
                }}
                className="text-neutral-400 hover:text-white p-0.5 text-xs shrink-0 ml-0.5"
                aria-label="Close search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Notification Bell */}
          <div ref={notifRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              aria-label="Symposium notifications"
              title="Symposium announcements"
              className="relative p-1 text-white hover:text-neutral-300 transition-colors shrink-0"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E50914]" />
            </button>

            {isNotifOpen && (
              <div className="fixed sm:absolute top-[68px] sm:top-full left-4 sm:left-auto right-4 sm:right-0 mt-2 sm:mt-3 w-auto sm:w-80 max-w-[340px] bg-[#181818] border border-white/15 rounded-lg shadow-2xl p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs font-bold text-neutral-400 uppercase">
                  <span>Announcements</span>
                  <span className="text-[#E50914]">1 New</span>
                </div>
                <div className="space-y-2.5 text-xs text-neutral-300">
                  <div className="p-2.5 rounded bg-black/40 border border-white/5 space-y-1">
                    <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                      Registration Live
                    </span>
                    <p className="leading-snug">Registration for Orkestrim 2K26 is officially open across all 5 arenas!</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Solid Red Primary Registration Button */}
          <a
            href={registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center px-3 sm:px-5 py-1.5 sm:py-2 rounded bg-[#E50914] text-white font-bold text-xs sm:text-sm tracking-wide hover:bg-[#b80710] transition-colors shadow-lg active:scale-95 whitespace-nowrap shrink-0 ${isSearchOpen ? 'hidden sm:inline-flex' : 'inline-flex'
              }`}
          >
            Register Now
          </a>
        </div>
      </div>
    </header>
  );
};
