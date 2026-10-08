import { SiteConfig } from '../types/symposium';

export function getGoogleCalendarUrl(site: SiteConfig): string {
  const title = "ORKESTRIM 2K26 // National Level Technical Symposium";
  const details = "Where ideas become the main event. 5 original arenas. Department of Computer Science & Engineering.";
  const location = site.college && site.college !== "TBD" ? `${site.college}, ${site.address}` : "Campus Main Auditorium";
  const startDate = "20261024T033000Z"; // 09:00 AM IST (03:30 UTC)
  const endDate = "20261024T113000Z";   // 05:00 PM IST (11:30 UTC)

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
}

export function downloadIcsFile(site: SiteConfig): boolean {
  try {
    const title = "ORKESTRIM 2K26 // National Level Technical Symposium";
    const details = "Where ideas become the main event. 5 original arenas. Department of Computer Science & Engineering.";
    const location = site.college && site.college !== "TBD" ? `${site.college}, ${site.address}` : "Campus Main Auditorium";
    const startDate = "20261024T033000Z"; // 09:00 AM IST
    const endDate = "20261024T113000Z";   // 05:00 PM IST

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Orkestrim//Symposium 2K26//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:orkestrim-2k26-${Date.now()}@orkestrim.ac.in`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${details}`,
      `LOCATION:${location}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Orkestrim-2026.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.warn("ICS download failed:", err);
    return false;
  }
}
