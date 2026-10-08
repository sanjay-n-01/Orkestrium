import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

import { Play, LayoutGrid, Calendar as CalendarIcon, Star } from 'lucide-react';

interface BillboardHeroProps {
  startISO: string;
  registrationLink: string;
  onOpenCalModal: () => void;
}

export const BillboardHero: React.FC<BillboardHeroProps> = ({
  startISO,
  registrationLink,
  onOpenCalModal,
}) => {
  const [timeLeft, setTimeLeft] = useState({ days: 20, hours: 23, minutes: 9, seconds: 15 });
  const [isLive, setIsLive] = useState(false);

  const { scrollY } = useScroll();
  // Background moves down faster, creating depth
  const yBg = useTransform(scrollY, [0, 800], [0, 300]);
  // Content fades out and moves up slightly
  const yContent = useTransform(scrollY, [0, 600], [0, -100]);
  const opacityContent = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const target = new Date(startISO).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setIsLive(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startISO]);

  return (
    <section id="hero" className="relative min-h-[82vh] flex items-center pt-28 pb-14 overflow-hidden bg-[#141414]">
      {/* Cinematic Ambient Backdrop with Crimson Glow on right half */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none z-0">
        {/* Soft crimson ambient radial glow centered on upper-right, exactly like screenshot */}
        <div
          className="absolute -top-10 right-0 w-[60vw] h-[85vh] opacity-80"
          style={{
            background: 'radial-gradient(circle at 65% 35%, rgba(185, 20, 20, 0.42) 0%, rgba(120, 10, 15, 0.22) 40%, rgba(20, 20, 20, 0) 70%)',
          }}
        />
        {/* Left shade for high contrast readability */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-[#141414] via-[#141414]/90 to-transparent" />
        {/* Bottom subtle fade */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#141414] to-transparent" />
      </motion.div>

      <motion.div style={{ y: yContent, opacity: opacityContent }} className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 w-full flex flex-col justify-between">
        {/* Main Content Area */}
        <div className="max-w-2xl space-y-4">
          {/* Eyebrow: Logo + SYMPOSIUM // ORIGINAL */}
          <div className="inline-flex items-center gap-3">
            <img src="/assets/logo-mark.svg" alt="Orkestrim Logo" className="w-[24px] h-[24px] object-contain drop-shadow-[0_0_8px_rgba(229,9,20,0.4)]" />
            <span className="text-xs font-bold tracking-[0.22em] text-white uppercase select-none">
              S Y M P O S I U M <span className="text-[#E50914] mx-1">//</span> O R I G I N A L
            </span>
          </div>

          {/* Main Title: Exact bold white condensed "ORKESTRIM 2K26" */}
          <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-black text-white tracking-wide leading-none drop-shadow-2xl select-none">
            ORKESTRIM 2K26
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-neutral-300">
            <span className="text-[#46d369] font-black text-sm">
              99% Match
            </span>
            <span className="text-neutral-400">2026</span>
            <span className="border border-white/40 px-1.5 py-0.5 rounded text-xs font-semibold text-white">
              U/A 16+
            </span>
            <span className="text-neutral-300">5 Arenas</span>
            <span className="border border-white/30 px-1.5 py-0.5 rounded text-[11px] font-bold text-neutral-300">
              ULTRA HD 4K
            </span>
            <span className="border border-white/30 px-1.5 py-0.5 rounded text-[11px] font-bold text-neutral-300">
              5.1 SOUND
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#7a0d11]/80 border border-[#b81d24] text-white px-2.5 py-0.5 rounded text-xs font-bold shadow-sm">
              <Star className="w-3 h-3 fill-[#E50914] text-[#E50914]" />
              #1 in College Events Today
            </span>
          </div>

          {/* Synopsis */}
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-normal pt-1">
            Where ideas become the main event. Five original arenas. One grand stage for bold thinking, high-velocity engineering, and the next generation of builders. Choose your arena and take the crown.
          </p>

          {/* 3 Buttons Row matching reference image */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href={registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded bg-white text-black font-extrabold text-sm sm:text-base hover:bg-neutral-200 transition-all shadow-xl active:scale-95"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Register Now</span>
            </a>

            <a
              href="#arenas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#333333]/85 hover:bg-[#444444] text-white font-bold text-sm border border-white/20 transition-all active:scale-95"
            >
              <LayoutGrid className="w-4 h-4 text-white" />
              <span>Explore Arenas</span>
            </a>

            <button
              type="button"
              onClick={onOpenCalModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#333333]/85 hover:bg-[#444444] text-white font-bold text-sm border border-white/20 transition-all active:scale-95"
            >
              <CalendarIcon className="w-4 h-4 text-white" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Premiere Countdown Row with right-side U/A 16+ badge */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#E50914] block">
              PREMIERE AIRDATE: 24 OCT 2026 // COUNTDOWN
            </span>

            {isLive ? (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#E50914] text-white font-black text-xs tracking-wider animate-pulse">
                <span>● LIVE NOW ACROSS ARENAS</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-white">
                {/* Days */}
                <div className="flex items-baseline gap-1.5 bg-[#181818] border border-white/15 border-b-2 border-b-[#E50914] px-3 py-1.5 rounded min-w-[70px] justify-center">
                  <span className="font-bebas text-2xl tracking-wide tabular-nums font-bold">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-bold">DAYS</span>
                </div>
                <span className="text-neutral-500 font-bold text-lg">:</span>

                {/* Hours */}
                <div className="flex items-baseline gap-1.5 bg-[#181818] border border-white/15 border-b-2 border-b-[#E50914] px-3 py-1.5 rounded min-w-[70px] justify-center">
                  <span className="font-bebas text-2xl tracking-wide tabular-nums font-bold">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-bold">HRS</span>
                </div>
                <span className="text-neutral-500 font-bold text-lg">:</span>

                {/* Minutes */}
                <div className="flex items-baseline gap-1.5 bg-[#181818] border border-white/15 border-b-2 border-b-[#E50914] px-3 py-1.5 rounded min-w-[70px] justify-center">
                  <span className="font-bebas text-2xl tracking-wide tabular-nums font-bold">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-bold">MIN</span>
                </div>
                <span className="text-neutral-500 font-bold text-lg">:</span>

                {/* Seconds */}
                <div className="flex items-baseline gap-1.5 bg-[#181818] border border-white/15 border-b-2 border-b-[#E50914] px-3 py-1.5 rounded min-w-[70px] justify-center">
                  <span className="font-bebas text-2xl tracking-wide tabular-nums font-bold">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-bold">SEC</span>
                </div>
              </div>
            )}
          </div>

          {/* Right-aligned U/A 16+ rating box */}
          <div className="bg-[#141414]/90 border-l-2 border-l-neutral-400 px-3.5 py-1.5 text-xs font-bold text-neutral-300 self-start sm:self-end">
            U/A 16+
          </div>
        </div>
      </motion.div>
    </section>
  );
};
