import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SiteConfig } from '../types/symposium';
import { MapPin, Navigation } from 'lucide-react';

export const VenueSection: React.FC<{ site: SiteConfig }> = ({ site }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ok = true;
    const onViolation = (e: SecurityPolicyViolationEvent) => {
      if (/google/.test(e.blockedURI || '') || /frame/.test(e.effectiveDirective || '')) {
        ok = false;
        const f = mapRef.current?.querySelector('iframe');
        if (f) f.remove();
      }
    };
    window.addEventListener('securitypolicyviolation', onViolation);

    if (mapRef.current) {
      const f = document.createElement('iframe');
      f.title = 'Map of SRM Valliammai Engineering College';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.src = 'https://maps.google.com/maps?q=SRM+Valliammai+Engineering+College,+Kattankulathur&z=15&output=embed';
      f.className = 'absolute inset-0 w-full h-full border-0 block';
      mapRef.current.appendChild(f);
    }

    return () => window.removeEventListener('securitypolicyviolation', onViolation);
  }, []);

  return (
    <motion.section
      id="venue"
      className="py-12 bg-black/30"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-[#E50914]/10 text-[#E50914] border border-[#E50914]/20">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bebas text-[28px] tracking-wide text-white uppercase leading-none">
              Now Showing At
            </h2>
            <p className="text-neutral-400 text-xs uppercase tracking-wider font-semibold">
              Headquarters & Tournament Arenas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] rounded-2xl overflow-hidden bg-[#181818] w-full shadow-2xl border border-white/10 mt-6">
          <div className="relative min-h-[320px] bg-[#f1efe9]" ref={mapRef}>
            <svg
              viewBox="0 0 400 260"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full border-0 block"
            >
              <rect width="400" height="260" fill="#f1efe9" />
              <path d="M0 205C90 185 150 235 400 208V260H0z" fill="#aadaff" />
              <rect x="30" y="25" width="120" height="70" rx="8" fill="#c8e6c9" />
              <rect x="260" y="125" width="110" height="60" rx="8" fill="#c8e6c9" />
              <g stroke="#fff" fill="none">
                <path d="M0 60H400M0 165H400M110 0V260M300 0V260" strokeWidth="7" />
                <path d="M0 112H400M205 0V260" strokeWidth="13" />
              </g>
              <path d="M0 135L400 92" stroke="#fdd663" strokeWidth="8" />
              <path d="M205 128c-11-15-16-22-16-30a16 16 0 0 1 32 0c0 8-5 15-16 30z" fill="#ea4335" />
              <circle cx="205" cy="98" r="5.5" fill="#fff" />
              <text
                x="205"
                y="148"
                textAnchor="middle"
                fontSize="11"
                fontFamily="Arial,sans-serif"
                fill="#202124"
                fontWeight="700"
              >
                SRM Valliammai Engineering College
              </text>
            </svg>
          </div>

          <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-[#1a1a1a] to-[#121212] border-t md:border-t-0 md:border-l border-white/10">
            <span className="text-[#E50914] text-xs font-bold uppercase tracking-widest mb-1">
              Venue Location
            </span>
            <b className="text-2xl text-white mb-2 font-bold tracking-tight">
              SRM Valliammai Engineering College
            </b>
            <p className="text-[#b3b3b3] leading-[1.6] text-[15px] mb-6">
              SRM Nagar, Kattankulathur, Chengalpattu district, Tamil Nadu 603203
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-6">
              <a
                className="no-underline rounded-lg bg-[#E50914] hover:bg-[#b80710] transition-colors text-white py-3 px-6 font-semibold inline-flex items-center gap-2 shadow-lg text-sm"
                href="https://www.google.com/maps/search/?api=1&query=SRM+Valliammai+Engineering+College"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#a0a0a0] leading-relaxed">
              <strong className="text-white">Note:</strong> College Transportation will not be provided. Students must use public transport facilities (Suburban train to Potheri / Kattankulathur Station).
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
