import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { SymposiumEvent, AttendeePersona } from '../types/symposium';
import { PERSONA_PROFILES } from '../data/symposiumData';
import { ChevronLeft, ChevronRight, Play, Plus, Check, ThumbsUp, Info } from 'lucide-react';

interface TopRankedRowProps {
  events: SymposiumEvent[];
  currentPersona: AttendeePersona;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onSelectEvent: (event: SymposiumEvent) => void;
  onShowToast: (msg: string) => void;
}

export const TopRankedRow: React.FC<TopRankedRowProps> = ({
  events,
  currentPersona,
  bookmarkedIds,
  onToggleBookmark,
  onSelectEvent,
  onShowToast,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const activePersonaObj = PERSONA_PROFILES.find((p) => p.id === currentPersona) || PERSONA_PROFILES[0];

  const getMatchScore = (event: SymposiumEvent): number => {
    return activePersonaObj.matchScores[event.id] ?? event.matchScore;
  };

  // Sort events by match score when persona is specific, otherwise default rank order
  const rankedEvents = [...events].sort((a, b) => getMatchScore(b) - getMatchScore(a));

  // We no longer need manual scroll since it's an auto-looping marquee

  const getShapeContent = (index: number) => {
    switch (index % 5) {
      case 0:
        return (
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#E50914] via-[#FF4D4D] to-amber-500 shadow-[0_0_35px_rgba(229,9,20,0.8)] animate-float-slow" />
        );
      case 1:
        return (
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-900 shadow-[0_0_35px_rgba(6,182,212,0.7)] animate-float-slow" />
        );
      case 2:
        return (
          <div className="w-18 h-18 bg-gradient-to-br from-amber-400 to-orange-600 rotate-45 shadow-[0_0_35px_rgba(245,158,11,0.8)] animate-rotate-slow" />
        );
      case 3:
        return (
          <div className="w-20 h-20 rounded-full border-4 border-dashed border-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.7)] animate-rotate-slow" />
        );
      case 4:
      default:
        return (
          <div className="w-18 h-18 bg-gradient-to-tr from-emerald-400 to-teal-700 rounded-xl rotate-12 shadow-[0_0_35px_rgba(16,185,129,0.8)] animate-float-slow" />
        );
    }
  };

  return (
    <motion.section
      id="top5"
      className="relative py-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide uppercase">
              Top 5 Arenas in Orkestrim Today
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Ranked for {activePersonaObj.name} · Live Match Scores
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            {/* Arrows removed since cards scroll automatically */}
          </div>
        </div>

        {/* Auto-scrolling Marquee */}
        <div className="flex overflow-hidden group py-4">
          {/* First set of cards */}
          <div className="flex animate-marquee gap-6 pr-6 w-max items-stretch">
            {rankedEvents.slice(0, 5).map((event, idx) => {
              const rank = idx + 1;
              const match = getMatchScore(event);
              const inList = bookmarkedIds.includes(event.id);

              return (
                <div
                  key={event.id}
                  className="group/card relative flex-none w-64 sm:w-72 flex items-center select-none"
                >
                  <div
                    className={`stroke-numeral font-display text-[150px] sm:text-[180px] font-black leading-none absolute bottom-0 z-0 pointer-events-none select-none ${
                      rank === 1 ? 'left-3 sm:left-5' : '-left-2 sm:-left-4'
                    }`}
                  >
                    {rank}
                  </div>
                  <div
                    onClick={() => onSelectEvent(event)}
                    className="relative z-10 ml-12 sm:ml-16 w-full bg-[#181818] border border-white/15 rounded-lg overflow-hidden shadow-xl shadow-black/80 hover:border-[#E50914] hover:shadow-[0_12px_35px_rgba(229,9,20,0.35)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative h-40 bg-gradient-to-b from-[#1c1c1c] to-[#0e0e0e] flex items-center justify-center overflow-hidden">
                      <span className="absolute top-2 left-2 z-20 text-[10px] font-black tracking-wider bg-[#E50914] text-white px-1.5 py-0.5 rounded">
                        TOP {rank}
                      </span>
                      {getShapeContent(idx)}
                    </div>
                    <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between bg-[#181818]">
                      <div>
                        <h3 className="font-bebas text-xl text-white tracking-wide truncate">
                          {event.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <span className="text-emerald-400 font-extrabold">{match}% Match</span>
                          <span className="text-neutral-500">·</span>
                          <span className="text-[10px] text-neutral-300 border border-white/20 px-1 rounded">
                            {event.rating}
                          </span>
                          <span className="text-neutral-500">·</span>
                          <span className="text-neutral-400 text-[11px]">{event.duration}</span>
                        </div>
                      </div>
                      <div
                        className="flex items-center gap-2 pt-2 border-t border-white/10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => onSelectEvent(event)}
                          className="w-8 h-8 rounded-full bg-white text-black hover:bg-[#E50914] hover:text-white flex items-center justify-center transition-colors shadow-md"
                          title="View Arena & Register"
                        >
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onToggleBookmark(event.id);
                            onShowToast(inList ? "Removed from My List" : "✓ Added to My List");
                          }}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                            inList ? 'bg-[#E50914] text-white border-[#E50914]' : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-black'
                          }`}
                          title="Bookmark Arena"
                        >
                          {inList ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {}}
                          className="w-8 h-8 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black flex items-center justify-center transition-all"
                          title="Like Arena"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onSelectEvent(event)}
                          className="ml-auto w-8 h-8 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black flex items-center justify-center transition-all"
                          title="More Information"
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Duplicated set for seamless loop */}
          <div className="flex animate-marquee gap-6 pr-6 w-max items-stretch" aria-hidden="true">
            {rankedEvents.slice(0, 5).map((event, idx) => {
              const rank = idx + 1;
              const match = getMatchScore(event);
              const inList = bookmarkedIds.includes(event.id);

              return (
                <div
                  key={`dup-${event.id}`}
                  className="group/card relative flex-none w-64 sm:w-72 flex items-center select-none"
                >
                  <div
                    className={`stroke-numeral font-display text-[150px] sm:text-[180px] font-black leading-none absolute bottom-0 z-0 pointer-events-none select-none ${
                      rank === 1 ? 'left-3 sm:left-5' : '-left-2 sm:-left-4'
                    }`}
                  >
                    {rank}
                  </div>
                  <div
                    onClick={() => onSelectEvent(event)}
                    className="relative z-10 ml-12 sm:ml-16 w-full bg-[#181818] border border-white/15 rounded-lg overflow-hidden shadow-xl shadow-black/80 hover:border-[#E50914] hover:shadow-[0_12px_35px_rgba(229,9,20,0.35)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative h-40 bg-gradient-to-b from-[#1c1c1c] to-[#0e0e0e] flex items-center justify-center overflow-hidden">
                      <span className="absolute top-2 left-2 z-20 text-[10px] font-black tracking-wider bg-[#E50914] text-white px-1.5 py-0.5 rounded">
                        TOP {rank}
                      </span>
                      {getShapeContent(idx)}
                    </div>
                    <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between bg-[#181818]">
                      <div>
                        <h3 className="font-bebas text-xl text-white tracking-wide truncate">
                          {event.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <span className="text-emerald-400 font-extrabold">{match}% Match</span>
                          <span className="text-neutral-500">·</span>
                          <span className="text-[10px] text-neutral-300 border border-white/20 px-1 rounded">
                            {event.rating}
                          </span>
                          <span className="text-neutral-500">·</span>
                          <span className="text-neutral-400 text-[11px]">{event.duration}</span>
                        </div>
                      </div>
                      <div
                        className="flex items-center gap-2 pt-2 border-t border-white/10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => onSelectEvent(event)}
                          className="w-8 h-8 rounded-full bg-white text-black hover:bg-[#E50914] hover:text-white flex items-center justify-center transition-colors shadow-md"
                          title="View Arena & Register"
                        >
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onToggleBookmark(event.id);
                            onShowToast(inList ? "Removed from My List" : "✓ Added to My List");
                          }}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                            inList ? 'bg-[#E50914] text-white border-[#E50914]' : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-black'
                          }`}
                          title="Bookmark Arena"
                        >
                          {inList ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {}}
                          className="w-8 h-8 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black flex items-center justify-center transition-all"
                          title="Like Arena"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onSelectEvent(event)}
                          className="ml-auto w-8 h-8 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white hover:text-black flex items-center justify-center transition-all"
                          title="More Information"
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
