import React from 'react';
import { motion } from 'motion/react';
import { SymposiumEvent, CategoryFilter, AttendeePersona } from '../types/symposium';
import { PERSONA_PROFILES } from '../data/symposiumData';
import { Play, Plus, Check, Info, Film } from 'lucide-react';

interface ArenasRowProps {
  events: SymposiumEvent[];
  activeCategory: CategoryFilter;
  searchQuery: string;
  currentPersona: AttendeePersona;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onSelectEvent: (event: SymposiumEvent) => void;
  onShowToast: (msg: string) => void;
}

export const ArenasRow: React.FC<ArenasRowProps> = ({
  events,
  activeCategory,
  searchQuery,
  currentPersona,
  bookmarkedIds,
  onToggleBookmark,
  onSelectEvent,
  onShowToast,
}) => {
  const activePersonaObj = PERSONA_PROFILES.find((p) => p.id === currentPersona) || PERSONA_PROFILES[0];

  const filteredEvents = events.filter((ev) => {
    // Category match
    if (activeCategory !== 'all') {
      if (activeCategory === 'tech' && !(ev.id === 'brainiacs-battle' || ev.id === 'techno-connect')) return false;
      if (activeCategory === 'presentation' && !(ev.id === 'paper-spark' || ev.id === 'techno-ads')) return false;
      if (activeCategory === 'strategy' && !(ev.id === 'brainiacs-battle' || ev.id === 'techno-connect')) return false;
      if (activeCategory === 'nontech' && !(ev.id === 'techno-ads' || ev.id === 'techno-treasure')) return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = ev.name.toLowerCase().includes(q);
      const matchGenre = ev.genre.toLowerCase().includes(q);
      const matchTag = ev.tagline.toLowerCase().includes(q);
      const matchDesc = ev.description.toLowerCase().includes(q);
      if (!matchName && !matchGenre && !matchTag && !matchDesc) return false;
    }
    return true;
  });

  return (
    <motion.section
      id="arenas"
      className="relative py-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide uppercase">
              Original Arenas // Technical Competitions
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Season 2026 Blockbusters · High-Stakes Engineering Tournaments
            </p>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="py-12 px-6 rounded-xl bg-white/5 border border-white/10 text-center space-y-3">
            <Film className="w-10 h-10 text-neutral-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Arenas Match Your Filter</h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto">
              Try selecting &quot;All Arenas&quot; or clearing your search term &quot;{searchQuery}&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEvents.map((event) => {
              const match = activePersonaObj.matchScores[event.id] ?? event.matchScore;
              const inList = bookmarkedIds.includes(event.id);

              return (
                <article
                  key={event.id}
                  onClick={() => onSelectEvent(event)}
                  className="group bg-[#181818] border border-white/10 rounded-lg overflow-hidden shadow-lg hover:border-[#E50914] hover:shadow-[0_10px_30px_rgba(229,9,20,0.25)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                >
                  {/* Card Art Banner */}
                  <div className="relative h-36 bg-gradient-to-r from-[#201014] via-[#141414] to-[#0d0d0d] p-4 flex flex-col justify-between overflow-hidden">
                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-[10px] font-black tracking-widest text-[#E50914] bg-black/60 px-2 py-0.5 rounded">
                        {event.episode.toUpperCase()}
                      </span>
                      <span className="text-[11px] font-bold text-neutral-400">
                        {event.duration}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider">
                        {event.badge}
                      </span>
                      <h3 className="font-bebas text-2xl text-white tracking-wide truncate">
                        {event.name}
                      </h3>
                    </div>

                    {/* Subtle ambient gradient aura */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E50914]/20 rounded-full blur-2xl group-hover:bg-[#E50914]/35 transition-colors pointer-events-none" />
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                      {event.tagline}
                    </p>

                    <div className="space-y-3 pt-2 border-t border-white/10">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-extrabold">{match}% Match</span>
                        <span className="text-neutral-400 text-[11px] truncate max-w-[160px]">
                          {event.genre}
                        </span>
                      </div>

                      {/* Card Action Buttons */}
                      <div
                        className="flex items-center gap-2 pt-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            onSelectEvent(event);
                          }}
                          className="flex-1 py-1.5 px-3 rounded bg-white text-black hover:bg-[#E50914] hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                          aria-label={`Register for ${event.name}`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Register</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onToggleBookmark(event.id);
                            onShowToast(inList ? "Removed from My List" : "✓ Added to My List");
                          }}
                          className={`p-2 rounded border transition-all ${
                            inList
                              ? 'bg-[#E50914] text-white border-[#E50914]'
                              : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-black'
                          }`}
                          title="Bookmark Arena"
                          aria-label={inList ? `Remove ${event.name} from My List` : `Add ${event.name} to My List`}
                        >
                          {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => onSelectEvent(event)}
                          className="p-2 rounded bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black transition-all"
                          title="View Details"
                          aria-label={`View details for ${event.name}`}
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </motion.section>
  );
};
