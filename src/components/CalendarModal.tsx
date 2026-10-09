import React, { useEffect } from 'react';
import { SiteConfig } from '../types/symposium';
import { getGoogleCalendarUrl, downloadIcsFile } from '../lib/calendarExport';
import { X, Calendar as CalendarIcon, Download, ArrowRight } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: SiteConfig;
  onShowToast: (msg: string) => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  site,
  onShowToast,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGoogleCalendar = () => {
    const url = getGoogleCalendarUrl(site);
    window.open(url, '_blank');

    onClose();
  };

  const handleIcsDownload = () => {
    const success = downloadIcsFile(site);
    if (success) {

    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendar-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-gradient-to-br from-[#1e1e1e] to-[#111111] border border-white/15 rounded-xl shadow-2xl shadow-black p-6 sm:p-7">
        <button
          onClick={onClose}
          aria-label="Close calendar options"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-xs font-black tracking-widest text-[#E50914] uppercase">
          Premiere Airdate // 31 Oct 2026
        </span>
        <h2 id="calendar-modal-title" className="font-bebas text-3xl text-white tracking-wide mt-1 mb-2">
          Sync to Your Calendar
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
          Never miss the opening ceremony or your arena call time. Choose your calendar provider or download the invite file:
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleCalendar}
            className="w-full flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-[#E50914] hover:bg-[#E50914]/10 transition-all text-left group"
          >
            <div className="p-2.5 rounded-md bg-white/10 text-amber-500 group-hover:bg-[#E50914] group-hover:text-white transition-colors">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <strong className="block text-sm font-bold text-white">Google Calendar</strong>
              <span className="text-xs text-neutral-400">Open event directly in Google Calendar (Web & Mobile)</span>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>

          <button
            type="button"
            onClick={handleIcsDownload}
            className="w-full flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-[#E50914] hover:bg-[#E50914]/10 transition-all text-left group"
          >
            <div className="p-2.5 rounded-md bg-white/10 text-red-500 group-hover:bg-[#E50914] group-hover:text-white transition-colors">
              <Download className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <strong className="block text-sm font-bold text-white">Download iCalendar (.ics)</strong>
              <span className="text-xs text-neutral-400">Universal file for Apple Calendar, Outlook, iOS & Android</span>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
