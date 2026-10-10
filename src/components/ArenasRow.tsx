import React from 'react';
import { motion } from 'motion/react';
import { SymposiumEvent, CategoryFilter } from '../types/symposium';
import { Play, Plus, Check, Info, Film } from 'lucide-react';
import { BentoCard } from './ui/bento';

interface ArenasRowProps {
  events: SymposiumEvent[];
  activeCategory: CategoryFilter;
  searchQuery: string;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onSelectEvent: (event: SymposiumEvent) => void;
  onShowToast: (msg: string) => void;
}

export const ArenasRow: React.FC<ArenasRowProps> = ({
  events,
  activeCategory,
  searchQuery,
  bookmarkedIds,
  onToggleBookmark,
  onSelectEvent,
  onShowToast,
}) => {

  const filteredEvents = events.filter((ev) => {
    if (activeCategory !== 'all') {
      if (activeCategory === 'tech' && !(ev.id === 'paper-spark' || ev.id === 'brainiacs-battle')) return false;
      if (activeCategory === 'nontech' && (ev.id === 'paper-spark' || ev.id === 'brainiacs-battle')) return false;
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
      className="relative py-8 scroll-mt-20"
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
          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-6">
            {filteredEvents.map((event, index) => {
              const spanClasses = [
                "lg:col-span-3", // 1st
                "lg:col-span-3", // 2nd
                "lg:col-span-2", // 3rd
                "lg:col-span-2", // 4th
                "lg:col-span-2", // 5th
              ];
              const span = spanClasses[index % 5];
              
              // Get an unsplash image for graphic based on event id (using generic tech/event images)
              const imageUrls = [
                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
                "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
                "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
              ];
              const originalIndex = events.findIndex(e => e.id === event.id);
              const imageUrl = imageUrls[Math.max(0, originalIndex) % 5];

              const inList = bookmarkedIds.includes(event.id);

              return (
                <BentoCard
                  key={event.id}
                  onClick={() => onSelectEvent(event)}
                  className={span}
                  eyebrow={`${event.badge} // ${event.genre}`}
                  title={event.name}
                  description={event.tagline}
                  graphic={
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen transition-transform duration-500 group-hover:scale-105" 
                      style={{ backgroundImage: `url(${imageUrl})` }} 
                    />
                  }
                  actions={
                    <div
                      className="flex items-center gap-2"
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
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </motion.section>
  );
};
