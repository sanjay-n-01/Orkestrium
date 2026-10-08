import React from 'react';
import { motion } from 'motion/react';
import { PhoenixWordmark } from './PhoenixLogo';
import { Play } from 'lucide-react';

interface FinaleCtaProps {
  registrationLink: string;
}

export const FinaleCta: React.FC<FinaleCtaProps> = ({ registrationLink }) => {
  return (
    <motion.section
      className="relative py-20 px-4 text-center overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#141414] via-[#1a0c0e] to-[#0e0e0e]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Background fiery burst */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#E50914]/20 via-amber-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-5">
        <div className="flex flex-col items-center justify-center gap-3">
          <img src="/assets/logo-mark.svg" alt="Orkestrim Logo" className="w-[58px] h-[58px] object-contain drop-shadow-[0_0_20px_rgba(229,9,20,0.6)]" />
          <PhoenixWordmark className="text-4xl" />
        </div>

        <h2 className="font-bebas text-3xl sm:text-5xl text-white tracking-wide leading-none">
          Ready to Stream the Victory?
        </h2>
        <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Assemble your squad, lock in your research paper, prepare your buzzer reflexes, and claim the championship crowns at Orkestrim 2K26.
        </p>

        <div className="pt-2">
          <a
            href={registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded bg-[#E50914] hover:bg-[#F40612] text-white font-black text-base transition-all shadow-xl shadow-red-950/60 active:scale-95"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Register Now for Orkestrim</span>
          </a>
        </div>
      </div>
    </motion.section>
  );
};
