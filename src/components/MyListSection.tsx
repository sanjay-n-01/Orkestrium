import React from 'react';
import { motion } from 'motion/react';
import { SymposiumEvent } from '../types/symposium';
import { Bookmark, Share2, Download, Trash2, Play, Info } from 'lucide-react';

interface MyListSectionProps {
  events: SymposiumEvent[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onSelectEvent: (event: SymposiumEvent) => void;
  onShowToast: (msg: string) => void;
}

export const MyListSection: React.FC<MyListSectionProps> = ({
  events,
  bookmarkedIds,
  onToggleBookmark,
  onSelectEvent,
  onShowToast,
}) => {
  const bookmarkedEvents = events.filter((ev) => bookmarkedIds.includes(ev.id));

  const handleShareLineup = () => {
    const names = bookmarkedEvents.map((b) => b.name).join(', ');
    const shareUrl = window.location.href.split('#')[0];
    const text = `Hey team! I am participating in ORKESTRIM 2K26 on 31 Oct 2026. Here is my target lineup. Join my squad! Link: ${shareUrl}`;

    if (navigator.share) {
      navigator.share({
        title: 'ORKESTRIM 2K26 Lineup',
        text,
        url: shareUrl,
      }).catch(() => { });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const handleDownloadLineup = () => {
    const lines = [
      "===========================================================",
      "  ORKESTRIM 2K26 — MY OFFICIAL SYMPOSIUM LINEUP",
      "  Date: Saturday, 31 October 2026",
      "===========================================================",
      "",
      ...bookmarkedEvents.map(
        (ev, i) =>
          `Arena ${i + 1}: ${ev.name}\n` +
          `- Category: ${ev.genre}\n` +
          `- Date & Time: ${ev.date} • ${ev.time}\n` +
          `- Venue: ${ev.venue}\n` +
          `- Team Size: ${ev.teamSize}\n` +
          `- Coordinator: ${ev.coordinator.name} (${ev.coordinator.phone})${ev.coordinator.name2 ? ` | Co-Coord: ${ev.coordinator.name2} (${ev.coordinator.phone2 || 'N/A'})` : ''}${ev.coordinator.name3 ? ` | Co-Coord: ${ev.coordinator.name3} (${ev.coordinator.phone3 || 'N/A'})` : ''}\n`
      ),
      "Visit: https://orkestrim.ac.in",
      "==========================================================="
    ].join("\r\n");

    const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "My-Orkestrim-Lineup.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  };

  return (
    <motion.section
      id="mylist"
      className="relative py-10 scroll-mt-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#E50914] fill-current" />
              <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide uppercase">
                My List // Your Selected Arenas
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              {bookmarkedEvents.length > 0
                ? `You have ${bookmarkedEvents.length} arenas bookmarked in your personal competition lineup.`
                : 'Bookmark events using the ➕ icon on any card to craft your personal schedule.'}
            </p>
          </div>

          {bookmarkedEvents.length > 0 && (
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleShareLineup}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
                title="Share your lineup with your team via WhatsApp"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Lineup</span>
              </button>


            </div>
          )}
        </div>

        {bookmarkedEvents.length === 0 ? (
          <div className="py-12 px-6 rounded-xl bg-[#141414] border border-dashed border-white/15 text-center space-y-3">
            <Bookmark className="w-8 h-8 text-neutral-600 mx-auto" />
            <h3 className="text-base font-bold text-white">Your List is Currently Empty</h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto">
              Click the &quot;➕ Add to My List&quot; button on any arena card in the Top 5 or Original Arenas row to save it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bookmarkedEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className="bg-[#181818] border border-white/15 rounded-lg p-4 space-y-3 hover:border-[#E50914] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#E50914]">
                      {event.badge}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-semibold">
                      {event.time}
                    </span>
                  </div>
                  <h4 className="font-bebas text-xl text-white tracking-wide">
                    {event.name}
                  </h4>
                  <p className="text-xs text-neutral-300 line-clamp-2">
                    {event.tagline}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 font-bold">{event.venue}</span>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectEvent(event);
                      }}
                      className="p-1.5 rounded bg-white text-black hover:bg-[#E50914] hover:text-white transition-colors"
                      title="View Arena & Register"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onToggleBookmark(event.id);
                        onShowToast(`Removed ${event.name} from My List`);
                      }}
                      className="p-1.5 rounded bg-white/10 text-neutral-300 hover:bg-red-900/60 hover:text-red-400 border border-white/15 transition-colors"
                      title="Remove from My List"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectEvent(event)}
                      className="p-1.5 rounded bg-white/10 text-neutral-300 hover:bg-white/20 hover:text-white border border-white/15 transition-colors"
                      title="More Info"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};
