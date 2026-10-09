import React from 'react';
import { motion } from 'motion/react';
import { SiteConfig } from '../types/symposium';
import PolaroidLineCarousel, { type Slide } from './ui/polaroid-line-carousel';
import { Camera } from 'lucide-react';

export const BehindTheScenesSection: React.FC<{ site: SiteConfig }> = ({ site }) => {
  const carouselSlides: Slide[] = [
    {
      title: "Main Auditorium",
      caption: "Grand stage for Keynote Address, Paper Spark, and Awards Gala",
      image: "https://images.unsplash.com/photo-1573152958734-1922c188fba3?w=1200&q=80",
    },
    {
      title: "Tech Studio Labs",
      caption: "High-octane coding and Brainiac's Battle rapid-fire quiz arena",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    },
    {
      title: "Open Amphitheatre",
      caption: "Stage 2 hosting live Techno Ads theatrical marketing showdowns",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80",
    },
    {
      title: "Campus Quadrant",
      caption: "Multi-acre grounds mapped out for the Techno Treasure cipher hunt",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80",
    },
    {
      title: "Dining Pavilion",
      caption: "Banquet hall providing breakfast feast and networking lunches",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80",
    },
    {
      title: "Central Library",
      caption: "Knowledge hub for research defense review and team prep sessions",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80",
    },
  ];

  return (
    <motion.section
      id="behind-the-scenes"
      className="py-12 bg-black/20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-white/5 text-neutral-300 border border-white/10">
            <Camera className="w-5 h-5 text-[#E50914]" />
          </div>
          <div>
            <h2 className="font-bebas text-[28px] tracking-wide text-white uppercase leading-none">
              Behind The Scenes
            </h2>
            <p className="text-neutral-400 text-xs uppercase tracking-wider font-semibold">
              Live Arena Snapshots & Campus Atmosphere
            </p>
          </div>
        </div>

        <p className="text-neutral-400 text-sm mb-6 max-w-2xl">
          Pegged snapshots from across our arenas, auditoriums, and festival grounds. Drag the prints or watch them swing naturally along the line.
        </p>

        <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
          <PolaroidLineCarousel
            slides={carouselSlides}
            height="520px"
            background="#0a0a0a"
            ink="#ffffff"
            string="#444444"
          />
        </div>
      </div>
    </motion.section>
  );
};
