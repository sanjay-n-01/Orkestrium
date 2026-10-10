/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { SITE_CONFIG, OFFICIAL_EVENTS } from './data/symposiumData';
import { CategoryFilter, SymposiumEvent } from './types/symposium';
import { Navbar } from './components/Navbar';
import { BillboardHero } from './components/BillboardHero';
import { GenreFilterBar } from './components/GenreFilterBar';
import { TopRankedRow } from './components/TopRankedRow';
import { ArenasRow } from './components/ArenasRow';
import { ScheduleSection } from './components/ScheduleSection';
import { MyListSection } from './components/MyListSection';
import { VenueSection } from './components/VenueSection';
import { CrewSection } from './components/CrewSection';
import { FinaleCta } from './components/FinaleCta';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ArenaDetailModal } from './components/ArenaDetailModal';
import { CalendarModal } from './components/CalendarModal';
import { Toast } from './components/Toast';
import { Preloader } from './components/Preloader';
import Faqs02 from './components/ui/faqs-02';
import { ReactLenis, useLenis } from 'lenis/react';

function ScrollToTopOnMount() {
  const lenis = useLenis();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const resetToHero = () => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    resetToHero();

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const t1 = setTimeout(resetToHero, 50);
    const t2 = setTimeout(resetToHero, 250);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [lenis]);

  return null;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('orkestrim_my_list') || '[]');
    } catch {
      return [];
    }
  });

  const [selectedEvent, setSelectedEvent] = useState<SymposiumEvent | null>(null);
  const [isCalModalOpen, setIsCalModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('orkestrim_my_list', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Keyboard shortcut: '/' opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const scrollToMyList = () => {
    const el = document.getElementById('mylist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ReactLenis root>
      <ScrollToTopOnMount />
      <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col selection:bg-[#E50914] selection:text-white pb-14 md:pb-0">
        <Preloader />
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        myListCount={bookmarkedIds.length}
        onOpenMyList={scrollToMyList}
        registrationLink={SITE_CONFIG.registrationLink}
      />

      {/* Main Streaming Portal Body */}
      <main className="flex-1 flex flex-col">
        {/* Billboard Hero */}
        <BillboardHero
          startISO={SITE_CONFIG.startISO}
          registrationLink={SITE_CONFIG.registrationLink}
          onOpenCalModal={() => setIsCalModalOpen(true)}
        />

        {/* Sticky Category Filter Bar */}
        <div className="relative z-10 bg-[#0e0e0e] rounded-t-3xl sm:rounded-t-[3rem] pt-6 -mt-[80vh] sm:-mt-[100vh] shadow-[0_-25px_60px_rgba(0,0,0,0.95)] border-t border-white/5">
          <GenreFilterBar
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

        {/* Row 1: The Iconic Top 5 Ranked Arenas */}
        <TopRankedRow
          events={OFFICIAL_EVENTS}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={handleToggleBookmark}
          onSelectEvent={setSelectedEvent}
          onShowToast={showToast}
        />

        {/* Row 2: Original Arenas Catalog Grid */}
        <ArenasRow
          events={OFFICIAL_EVENTS}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={handleToggleBookmark}
          onSelectEvent={setSelectedEvent}
          onShowToast={showToast}
        />

        {/* Row 3: Binge the Schedule (Episodes Timeline) */}
        <ScheduleSection
          site={SITE_CONFIG}
          onShowToast={showToast}
        />

        {/* Row 4: My List (Personalized Lineup) */}
        <MyListSection
          events={OFFICIAL_EVENTS}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={handleToggleBookmark}
          onSelectEvent={setSelectedEvent}
          onShowToast={showToast}
        />

        {/* Row 5: Venue & Map (Now Showing At) */}
        <VenueSection site={SITE_CONFIG} />

        {/* Row 6: Cast & Crew (Staff Coordinators & Office Bearers) */}
        <CrewSection site={SITE_CONFIG} />

        {/* FAQs */}
        <Faqs02 />

        {/* Grand Finale CTA */}
        <FinaleCta registrationLink={SITE_CONFIG.registrationLink} />
        </div>
      </main>

      {/* Netflix Footer */}
      <Footer site={SITE_CONFIG} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        myListCount={bookmarkedIds.length}
        onOpenMyList={scrollToMyList}
      />

      {/* Detail Modal (More Info) */}
      <ArenaDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        isBookmarked={selectedEvent ? bookmarkedIds.includes(selectedEvent.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onShowToast={showToast}
      />

      {/* Calendar Selection Modal */}
      <CalendarModal
        isOpen={isCalModalOpen}
        onClose={() => setIsCalModalOpen(false)}
        site={SITE_CONFIG}
        onShowToast={showToast}
      />

      {/* Dynamic Toast Popover */}
      <Toast message={toastMessage} />
      </div>
    </ReactLenis>
  );
}
