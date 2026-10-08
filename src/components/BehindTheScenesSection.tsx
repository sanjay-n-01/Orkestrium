import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { SiteConfig } from '../types/symposium';

export const BehindTheScenesSection: React.FC<{ site: SiteConfig }> = ({ site }) => {
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
      className="py-[22px] px-[4%]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="font-bebas text-[26px] mb-[10px] tracking-wide">Now showing at</h2>
      <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr] rounded-lg overflow-hidden bg-[#2a2a2a] max-w-[900px]">
        <div className="relative min-h-[280px] bg-[#f1efe9]" ref={mapRef}>
          <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 w-full h-full border-0 block">
            <rect width="400" height="260" fill="#f1efe9"/>
            <path d="M0 205C90 185 150 235 400 208V260H0z" fill="#aadaff"/>
            <rect x="30" y="25" width="120" height="70" rx="8" fill="#c8e6c9"/>
            <rect x="260" y="125" width="110" height="60" rx="8" fill="#c8e6c9"/>
            <g stroke="#fff" fill="none">
              <path d="M0 60H400M0 165H400M110 0V260M300 0V260" strokeWidth="7"/>
              <path d="M0 112H400M205 0V260" strokeWidth="13"/>
            </g>
            <path d="M0 135L400 92" stroke="#fdd663" strokeWidth="8"/>
            <path d="M205 128c-11-15-16-22-16-30a16 16 0 0 1 32 0c0 8-5 15-16 30z" fill="#ea4335"/>
            <circle cx="205" cy="98" r="5.5" fill="#fff"/>
            <text x="205" y="148" textAnchor="middle" fontSize="11" fontFamily="Arial,sans-serif" fill="#202124" fontWeight="700">SRM Valliammai Engineering College</text>
          </svg>
        </div>
        <div className="p-[22px] flex flex-col gap-[12px] justify-center">
          <b>SRM Valliammai Engineering College</b>
          <p className="text-[#b3b3b3] leading-[1.5] text-[14px]">SRM Nagar, Kattankulathur, Chengalpattu district, Tamil Nadu 603203</p>
          <a className="self-start no-underline rounded bg-[#e50914] text-white py-[8px] px-[16px] font-semibold inline-block" href="https://www.google.com/maps/search/?api=1&query=SRM+Valliammai+Engineering+College" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
        </div>
      </div>
    </motion.section>
  );
};
