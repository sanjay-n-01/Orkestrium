import React, { useState, useEffect, useRef } from 'react';
import { Home, Trophy, Clapperboard, Calendar, Users, Bookmark, type LucideIcon } from 'lucide-react';
import { useLenis } from 'lenis/react';

interface MobileBottomNavProps {
  myListCount: number;
  onOpenMyList: () => void;
}

type NavSection = 'home' | 'top5' | 'arenas' | 'schedule' | 'crew' | 'mylist';

interface NavItemConfig {
  id: NavSection;
  label: string;
  elementId: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'home', label: 'Home', elementId: 'hero', icon: Home },
  { id: 'top5', label: 'Top 5', elementId: 'top5', icon: Trophy },
  { id: 'arenas', label: 'Arenas', elementId: 'arenas', icon: Clapperboard },
  { id: 'schedule', label: 'Schedule', elementId: 'schedule', icon: Calendar },
  { id: 'crew', label: 'Crew', elementId: 'cast', icon: Users },
  { id: 'mylist', label: 'My List', elementId: 'mylist', icon: Bookmark },
];

// Document order for scrollspy detection
const SCROLL_SECTIONS: { id: NavSection; elementId: string; fallbackId?: string }[] = [
  { id: 'home', elementId: 'hero' },
  { id: 'top5', elementId: 'top5' },
  { id: 'arenas', elementId: 'arenas' },
  { id: 'schedule', elementId: 'schedule' },
  { id: 'mylist', elementId: 'mylist' },
  { id: 'crew', elementId: 'cast', fallbackId: 'staff-coordinators' },
];

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  myListCount,
  onOpenMyList,
}) => {
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const isClickScrolling = useRef(false);
  const clickScrollTimer = useRef<number | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      if (isClickScrolling.current) return;

      // 1. Near the very top of page
      if (window.scrollY < 180) {
        setActiveSection('home');
        return;
      }

      // 2. Near bottom of document -> highlight Crew
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 120) {
        setActiveSection('crew');
        return;
      }

      // 3. Scan sections in reverse document order
      const triggerY = 220; // px from top of viewport

      for (let i = SCROLL_SECTIONS.length - 1; i >= 0; i--) {
        const item = SCROLL_SECTIONS[i];
        let el = document.getElementById(item.elementId);
        if (!el && item.fallbackId) {
          el = document.getElementById(item.fallbackId);
        }

        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY) {
            setActiveSection(item.id);
            return;
          }
        }
      }

      setActiveSection('home');
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickScrollTimer.current) {
        window.clearTimeout(clickScrollTimer.current);
      }
    };
  }, []);

  const handleItemClick = (e: React.MouseEvent, item: NavItemConfig) => {
    e.preventDefault();

    setActiveSection(item.id);
    isClickScrolling.current = true;
    if (clickScrollTimer.current) {
      window.clearTimeout(clickScrollTimer.current);
    }
    clickScrollTimer.current = window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);

    if (item.id === 'home') {
      if (lenis) {
        lenis.scrollTo(0, { immediate: false, duration: 1 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (item.id === 'mylist') {
      onOpenMyList();
      return;
    }

    let el = document.getElementById(item.elementId);
    if (!el && item.id === 'crew') {
      el = document.getElementById('staff-coordinators') || document.getElementById('cast');
    }

    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { offset: -70, duration: 1.1 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-[#121212]/95 backdrop-blur-xl border-t border-white/10 px-1 flex items-center justify-around shadow-2xl shadow-black select-none"
      aria-label="Mobile Bottom Navigation"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <a
            key={item.id}
            href={`#${item.elementId}`}
            onClick={(e) => handleItemClick(e, item)}
            className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-200 group ${
              isActive
                ? 'text-[#E50914]'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Red Indicator Line on top of the active tab */}
            {isActive && (
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2.5px] bg-[#E50914] rounded-full shadow-[0_0_10px_rgba(229,9,20,0.9)] animate-in fade-in duration-200"
                aria-hidden="true"
              />
            )}

            {/* Subtle red ambient glow behind active item */}
            {isActive && (
              <span
                className="absolute inset-x-1 inset-y-1.5 bg-gradient-to-t from-[#E50914]/15 via-[#E50914]/5 to-transparent rounded-lg pointer-events-none"
                aria-hidden="true"
              />
            )}

            {/* Icon with glowing red lines when active */}
            <div className="relative flex items-center justify-center">
              <Icon
                className={`w-4 h-4 transition-all duration-200 ${
                  isActive
                    ? 'text-[#E50914] stroke-[#E50914] drop-shadow-[0_0_8px_rgba(229,9,20,0.7)] scale-110'
                    : 'text-neutral-400 group-hover:text-neutral-200'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />

              {/* Bookmark badge counter */}
              {item.id === 'mylist' && myListCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-[#E50914] text-white text-[9px] font-black px-1 min-w-[14px] text-center rounded-full leading-tight shadow-[0_0_6px_rgba(229,9,20,0.6)] border border-[#121212]">
                  {myListCount}
                </span>
              )}
            </div>

            {/* Section label */}
            <span
              className={`text-[9.5px] mt-1 transition-all duration-200 ${
                isActive
                  ? 'font-black text-[#E50914] drop-shadow-[0_0_4px_rgba(229,9,20,0.3)] tracking-tight'
                  : 'font-semibold text-neutral-400 group-hover:text-neutral-200'
              }`}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
};
