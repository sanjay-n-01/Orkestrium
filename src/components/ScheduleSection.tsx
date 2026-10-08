import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SCHEDULE_EPISODES } from '../data/symposiumData';
import { SiteConfig } from '../types/symposium';
import { Clapperboard, MapPin, Play } from 'lucide-react';

interface ScheduleSectionProps {
  site: SiteConfig;
  onShowToast: (msg: string) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ site, onShowToast }) => {
  const [activeSlot, setActiveSlot] = useState<'all' | 'morning' | 'afternoon'>('all');

  const filteredEpisodes = activeSlot === 'all'
    ? SCHEDULE_EPISODES
    : SCHEDULE_EPISODES.filter((ep) => ep.slot === activeSlot);

  return (
    <motion.section
      id="schedule"
      className="relative py-10 bg-black/30 border-t border-white/10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide uppercase">
              Episodes // Day Schedule
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Season 2026: 24 October 2026 · Synchronized across Campus Arenas
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Slot Tabs */}
            <div className="inline-flex items-center p-1 rounded-lg bg-white/5 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveSlot('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeSlot === 'all' ? 'bg-[#E50914] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                All Slots (7)
              </button>
              <button
                type="button"
                onClick={() => setActiveSlot('morning')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeSlot === 'morning' ? 'bg-[#E50914] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Morning (4)
              </button>
              <button
                type="button"
                onClick={() => setActiveSlot('afternoon')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  activeSlot === 'afternoon' ? 'bg-[#E50914] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Afternoon (3)
              </button>
            </div>


          </div>
        </div>

        {/* Episodes List */}
        <div className="space-y-3">
          {filteredEpisodes.map((ep) => (
            <div
              key={ep.epNum}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg bg-[#181818] border border-white/10 hover:border-[#E50914] hover:bg-[#202020] transition-all cursor-pointer"
            >
              {/* Ep Number */}
              <div className="font-display font-black text-3xl sm:text-4xl text-neutral-600 group-hover:text-[#E50914] transition-colors sm:w-10 shrink-0 tabular-nums">
                {ep.epNum}
              </div>

              {/* Ep Thumbnail Preview */}
              <div className="relative w-full sm:w-36 h-20 rounded bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                <Clapperboard className="w-6 h-6 text-neutral-400 group-hover:text-amber-500 transition-colors" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-6 h-6 text-[#E50914] fill-current" />
                </div>
              </div>

              {/* Ep Details */}
              <div className="flex-1 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {ep.title}
                  </h3>
                  <span className="text-xs font-semibold text-neutral-400">
                    {ep.time} ({ep.duration})
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {ep.desc}
                </p>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-300 pt-1">
                  <MapPin className="w-3 h-3 text-[#E50914]" />
                  <span>{ep.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
