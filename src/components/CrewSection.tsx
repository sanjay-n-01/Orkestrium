import React from 'react';
import { motion } from 'motion/react';
import { SiteConfig } from '../types/symposium';
import FeatureCarousel, { type FeatureItem } from './ui/feature-carousel';
import PolaroidLineCarousel, { type Slide } from './ui/polaroid-line-carousel';
import { GraduationCap, Users, ShieldCheck, Sparkles } from 'lucide-react';

export const CrewSection: React.FC<{ site: SiteConfig }> = ({ site }) => {
  const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

  // Subsection 1: Staff Coordinators (Faculty & Patrons)
  const staffSlides: Slide[] = [
    {
      title: "Dr. K. Elangovan",
      caption: "Patron & Head of Department • Department of Computer Science & Engineering",
      image: unsplash("1472099645785-5658abf4ff4e"),
    },
    {
      title: "Dr. B. Chidambararajan",
      caption: "Chief Patron & Principal • SRM Valliammai Engineering College",
      image: unsplash("1507003211169-0a1dd7228f2d"),
    },
    {
      title: "Dr. M. Senthil Kumar",
      caption: "Staff Convener & Professor • Department of CSE",
      image: unsplash("1500648767791-00dcc994a43e"),
    },
    {
      title: "Dr. A. R. Revathi",
      caption: "Staff Co-Convener & Associate Professor • Department of CSE",
      image: unsplash("1573496359142-b8d87734a5a2"),
    },
    {
      title: "Mrs. S. Shanthi",
      caption: "Staff Coordinator • Technical Arena Director",
      image: unsplash("1580489944761-15a19d654956"),
    },
    {
      title: "Mr. K. Shanmugam",
      caption: "Staff Coordinator • Non-Technical Arena Director",
      image: unsplash("1560250097-0b93528c311a"),
    },
  ];

  // Subsection 2: Office Bearers (Student Executive Council)
  const officeBearerItems: FeatureItem[] = [
    {
      id: "ob-1",
      label: "President & Lead Coordinator",
      image: unsplash("1534528741775-53994a69daeb"),
      description: site.organizers[0]?.name || "Sanjay N",
    },
    {
      id: "ob-2",
      label: "Vice President & Tech Ops Head",
      image: unsplash("1573496359142-b8d87734a5a2"),
      description: site.organizers[1]?.name || "Ananya Sharma",
    },
    {
      id: "ob-3",
      label: "General Secretary & Arena Manager",
      image: unsplash("1507003211169-0a1dd7228f2d"),
      description: site.organizers[2]?.name || "Karthik Raja",
    },
    {
      id: "ob-4",
      label: "Treasurer & Hospitality Head",
      image: unsplash("1580489944761-15a19d654956"),
      description: site.organizers[3]?.name || "Pooja Patel",
    },
    {
      id: "ob-5",
      label: "Joint Secretary • Research Arena",
      image: unsplash("1539571696357-5a69c17a67c6"),
      description: "Rahul Verma",
    },
    {
      id: "ob-6",
      label: "Joint Secretary • Logic Arena",
      image: unsplash("1517841905240-472988babdf9"),
      description: "Devika Nair",
    },
    {
      id: "ob-7",
      label: "Creative Lead • Techno Ads",
      image: unsplash("1524504388940-b1c1722653e1"),
      description: "Sneha Mukherjee",
    },
    {
      id: "ob-8",
      label: "Logistics Lead • Techno Treasure",
      image: unsplash("1506794778202-cad84cf45f1d"),
      description: "Vikramaditya S",
    },
  ];

  return (
    <section id="cast" className="py-14 bg-black/40 border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col gap-14">
        {/* Main Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2.5 mb-2">
            <span className="h-2 w-2 rounded-full bg-[#E50914] animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#E50914]">
              Leadership & Organizing Committee
            </span>
          </div>
          <h2 className="font-bebas text-5xl sm:text-4xl tracking-wide text-white uppercase">
            Cast & Crew
          </h2>
          <p className="text-neutral-400 text-sm max-w-2xl mt-1">
            Meet the faculty patrons, staff conveners, and student office bearers orchestrating Orkestrim 2K26.
          </p>
        </motion.div>

        {/* Subsection 1: Staff Coordinators */}
        <motion.div
          id="staff-coordinators"
          className="flex flex-col gap-5 scroll-mt-24"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bebas text-2xl tracking-wide text-white uppercase">
                    Staff Coordinators
                  </h3>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-neutral-300">
                    Faculty
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Academic patrons, department conveners, and faculty advisors directing symposium operations.
                </p>
              </div>
            </div>
            <div className="text-[11px] font-medium text-neutral-400 flex items-center gap-1.5 self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Department of Electroincs & Instrumentation Engineering</span>
            </div>
          </div>

          {/* Hanging Polaroid Carousel for Staff Coordinators */}
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
            <PolaroidLineCarousel
              slides={staffSlides}
              height="500px"
              background="#0a0a0a"
              ink="#ffffff"
              string="#555555"
              ariaLabel="Staff Coordinators carousel"
            />
          </div>
        </motion.div>

        {/* Subsection 2: Office Bearers */}
        <motion.div
          id="office-bearers"
          className="flex flex-col gap-5 scroll-mt-24"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#E50914]/10 text-[#E50914] border border-[#E50914]/20">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bebas text-2xl tracking-wide text-white uppercase">
                    Office Bearers
                  </h3>
                  <span className="rounded-full bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/30 px-2.5 py-0.5 text-[10px] font-bold">
                    Student Council
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Student leadership council commanding tournament execution, logistics, delegate registrations, and arena tech.
                </p>
              </div>
            </div>
            <div className="text-[11px] font-medium text-neutral-400 flex items-center gap-1.5 self-start sm:self-auto">
              <Sparkles className="w-4 h-4 text-[#E50914]" />
              <span>Executive Committee</span>
            </div>
          </div>

          {/* 3D Stacked Card Carousel for Office Bearers */}
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a] p-4 sm:p-8">
            <FeatureCarousel
              items={officeBearerItems}
              autoplay={4000}
              ariaLabel="Office Bearers carousel"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
