import React from 'react';
import { SiteConfig } from '../types/symposium';
import { Mail } from 'lucide-react';

interface FooterProps {
  site: SiteConfig;
}

export const Footer: React.FC<FooterProps> = ({ site }) => {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/10 pt-12 pb-24 md:pb-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center gap-2 text-sm text-neutral-300">
          <Mail className="w-4 h-4 text-[#E50914]" />
          <span>Questions? Contact the organizing desk:</span>
          {site.email && site.email !== "TBD" ? (
            <a
              href={`mailto:${site.email}`}
              className="text-white font-bold underline hover:text-[#E50914] transition-colors"
            >
              {site.email}
            </a>
          ) : (
            <span className="text-white font-semibold">TBD at Registration Desk</span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-neutral-400">
          <div className="space-y-2">
            <a href="#faqs" className="block hover:underline hover:text-white transition-colors">FAQs</a>
            <a href="#top5" className="block hover:underline hover:text-white transition-colors">Top 5 Rankings</a>
          </div>
          <div className="space-y-2">
            <a href="#schedule" className="block hover:underline hover:text-white transition-colors">Schedule</a>
            <a href="#cast" className="block hover:underline hover:text-white transition-colors">Cast &amp; Crew</a>
          </div>
          <div className="space-y-2">
            <a href="#arenas" className="block hover:underline hover:text-white transition-colors">Events</a>
            <a href="#hero" className="block hover:underline hover:text-white transition-colors">Back to top</a>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">

          <p className="text-center sm:text-right">
            © 2026 ORKESTRIM // SYMPOSIUM. SRM Valliammai Engineering College. Brought to you by the Department of EIE.
          </p>
        </div>
      </div>
    </footer>
  );
};
