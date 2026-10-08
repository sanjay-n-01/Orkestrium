import React from 'react';
import { Home, Trophy, Clapperboard, Calendar, Bookmark } from 'lucide-react';

interface MobileBottomNavProps {
  myListCount: number;
  onOpenMyList: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  myListCount,
  onOpenMyList,
}) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-[#121212]/95 backdrop-blur-xl border-t border-white/10 px-2 flex items-center justify-around shadow-2xl shadow-black"
      aria-label="Mobile Bottom Navigation"
    >
      <a
        href="#hero"
        className="flex flex-col items-center justify-center flex-1 py-1 text-neutral-400 hover:text-white transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="text-[10px] font-bold mt-1">Home</span>
      </a>

      <a
        href="#top5"
        className="flex flex-col items-center justify-center flex-1 py-1 text-neutral-400 hover:text-white transition-colors"
      >
        <Trophy className="w-4 h-4" />
        <span className="text-[10px] font-bold mt-1">Top 5</span>
      </a>

      <a
        href="#arenas"
        className="flex flex-col items-center justify-center flex-1 py-1 text-neutral-400 hover:text-white transition-colors"
      >
        <Clapperboard className="w-4 h-4" />
        <span className="text-[10px] font-bold mt-1">Arenas</span>
      </a>

      <a
        href="#schedule"
        className="flex flex-col items-center justify-center flex-1 py-1 text-neutral-400 hover:text-white transition-colors"
      >
        <Calendar className="w-4 h-4" />
        <span className="text-[10px] font-bold mt-1">Schedule</span>
      </a>

      <button
        type="button"
        onClick={onOpenMyList}
        className="flex flex-col items-center justify-center flex-1 py-1 text-neutral-400 hover:text-white transition-colors relative"
      >
        <div className="relative">
          <Bookmark className="w-4 h-4" />
          {myListCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#E50914] text-white text-[9px] font-black px-1 rounded-full leading-tight">
              {myListCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold mt-1">My List</span>
      </button>
    </nav>
  );
};
