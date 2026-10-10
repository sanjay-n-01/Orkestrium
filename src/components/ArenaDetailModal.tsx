import React, { useState, useEffect } from 'react';
import { SymposiumEvent } from '../types/symposium';
import { X, Play, Plus, Check, Download, Phone, User, Calendar, MapPin, Users, Award, Sparkles } from 'lucide-react';

interface ArenaDetailModalProps {
  event: SymposiumEvent | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const ArenaDetailModal: React.FC<ArenaDetailModalProps> = ({
  event,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'contact'>('overview');

  useEffect(() => {
    setActiveTab('overview');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (event) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  const getCoordinators = (c: typeof event.coordinator) => {
    const list: { name: string; phone?: string; role: string }[] = [];
    if (c.name) {
      list.push({
        name: c.name,
        phone: c.phone,
        role: (c.name2 || c.name3) ? "Lead Coordinator" : "Arena Coordinator"
      });
    }
    if (c.name2) {
      list.push({
        name: c.name2,
        phone: c.phone2,
        role: "Co-Coordinator"
      });
    }
    if (c.name3) {
      list.push({
        name: c.name3,
        phone: c.phone3,
        role: "Co-Coordinator"
      });
    }
    if (c.name4) {
      list.push({
        name: c.name4,
        phone: c.phone4,
        role: "Co-Coordinator"
      });
    }
    return list;
  };

  const downloadRulesText = () => {
    const content = [
      `===========================================================`,
      `  ORKESTRIM 2K26 — OFFICIAL ARENA BRIEF: ${event.name.toUpperCase()}`,
      `  Date: ${event.date} | Time: ${event.time}`,
      `  Venue: ${event.venue} | Team Size: ${event.teamSize}`,
      `===========================================================`,
      ``,
      `--- ARENA OVERVIEW ---`,
      event.description,
      ``,
      `--- OFFICIAL RULES & GUIDELINES ---`,
      ...event.rules.map((r, i) => `${i + 1}. ${r.replace(/<[^>]*>/g, '')}`),
      ...(event.highlight ? [``, `--- TECHNICAL DOMAINS & HIGHLIGHTS ---`, event.highlight] : []),
      ``,
      `--- STUDENT COORDINATOR(S) ---`,
      ...getCoordinators(event.coordinator).map((c, i) => `${i === 0 ? 'Lead Coordinator' : 'Co-Coordinator'}: ${c.name} | Phone: ${c.phone || 'N/A'}`),
      ``,
      `Registration Link: ${event.formLink || "Available at registration desk"}`,
      `===========================================================`
    ].join('\r\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Orkestrim-${event.id}-Rules.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-arena-title"
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#181818] border border-white/15 rounded-xl shadow-2xl shadow-black overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close arena details"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Billboard Banner */}
        <div className="relative h-64 sm:h-72 bg-gradient-to-br from-[#2a0e12] via-[#1a1215] to-[#141414] p-6 sm:p-8 flex flex-col justify-end overflow-hidden shrink-0">
          {/* Ambient red and amber glow streaks */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#E50914]/25 to-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/60 to-transparent" />

          <div className="relative z-10">
            <span className="text-xs font-black tracking-widest text-[#E50914] uppercase">
              Official Symposium Arena // {event.episode}
            </span>
            <h2 id="modal-arena-title" className="font-bebas text-4xl sm:text-5xl md:text-6xl text-white tracking-wide leading-none mt-1 mb-2">
              {event.name}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl line-clamp-2 mb-4">
              {event.tagline}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <a
                href={event.formLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white text-black font-extrabold text-sm hover:bg-neutral-200 transition-all shadow-lg active:scale-95"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Register Now</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  onToggleBookmark(event.id);
                  onShowToast(isBookmarked ? "Removed from My List" : "✓ Added to My List");
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded text-sm font-semibold transition-all border ${
                  isBookmarked
                    ? 'bg-[#E50914] text-white border-[#E50914]'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                {isBookmarked ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{isBookmarked ? 'In My List' : 'Add to My List'}</span>
              </button>


            </div>
          </div>
        </div>

        {/* Modal Tab Navigation */}
        <div className="px-6 border-b border-white/10 bg-[#141414] shrink-0">
          <nav className="flex gap-6 overflow-x-auto no-scrollbar" aria-label="Arena tabs">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-[#E50914] text-white'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Overview & Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('rules')}
              className={`py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'rules'
                  ? 'border-[#E50914] text-white'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Rules & Guidelines ({event.rules.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('contact')}
              className={`py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'contact'
                  ? 'border-[#E50914] text-white'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Student Coordinator
            </button>
          </nav>
        </div>

        {/* Modal Body / Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6" data-lenis-prevent="true">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#E50914] mb-2">Arena Brief</h3>
                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-black/40 border border-white/10 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-amber-500 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-neutral-400">Date & Timing</span>
                    <span className="text-sm font-semibold text-white">{event.date} • {event.time}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-[#E50914] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-neutral-400">Venue</span>
                    <span className="text-sm font-semibold text-white">{event.venue}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-cyan-400 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-neutral-400">Squad / Team Size</span>
                    <span className="text-sm font-semibold text-white">{event.teamSize}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-white/5 border border-white/10 text-emerald-400 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-neutral-400">Registration Fee</span>
                    <span className="text-sm font-semibold text-white">{event.fee}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#E50914] mb-1">
                Official Regulations
              </h3>
              <p className="text-xs text-neutral-400 mb-3">
                All participants must adhere to the following tournament codes. Failure to comply leads to forfeit.
              </p>
              {event.highlight && (
                <div className="bg-gradient-to-br from-[#E50914]/20 via-[#1e0d10] to-[#121212] border border-[#E50914]/40 rounded-lg p-4 mb-3 shadow-lg">
                  <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4 text-[#E50914]" />
                    <span>Approved Technical Domains</span>
                  </div>
                  <pre className="text-xs sm:text-sm text-neutral-200 whitespace-pre-wrap font-sans leading-relaxed">
                    {event.highlight}
                  </pre>
                </div>
              )}
              <div className="space-y-2.5">
                {event.rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-black/35 border border-white/10 border-l-4 border-l-[#E50914] rounded-md p-3.5 text-sm text-neutral-200"
                  >
                    <span className="font-black text-emerald-400 mt-0.5">✓</span>
                    <span
                      className="leading-snug"
                      dangerouslySetInnerHTML={{ __html: rule }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {getCoordinators(event.coordinator).map((coord, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-black/40 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-neutral-800 border border-white/15 flex items-center justify-center text-2xl shrink-0">
                    <User className="w-7 h-7 text-neutral-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-xs font-black tracking-wider uppercase ${
                        idx === 0 ? "text-[#E50914]" : "text-neutral-400"
                      }`}
                    >
                      {coord.role}
                    </span>
                    <h4 className="text-xl font-bold text-white mt-0.5 truncate">{coord.name}</h4>
                    <p className="text-xs text-neutral-400 mb-3">
                      {idx === 0
                        ? `Lead coordinator for ${event.name} briefing, check-in, and scoring inquiries.`
                        : `Event co-coordinator assisting with participant queries, on-ground coordination, and arena execution.`}
                    </p>
                    {coord.phone ? (
                      <a
                        href={`tel:${coord.phone}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#E50914] hover:bg-[#F40612] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#E50914]/20 active:scale-95"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call {coord.phone}</span>
                      </a>
                    ) : (
                      <span className="text-xs text-neutral-500">Phone: TBD at Help Desk</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
