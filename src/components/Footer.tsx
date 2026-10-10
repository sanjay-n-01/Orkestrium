import React from 'react';
import { SiteConfig } from '../types/symposium';
import { cn } from '@/lib/utils';
import { ArrowRight, Instagram, Mail, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps extends React.ComponentProps<'footer'> {
  site: SiteConfig;
}

export const Footer: React.FC<FooterProps> = ({ site, className, ...props }) => {
  return (
    <footer
      className={cn(
        'relative bg-[#0a0a0a] border-t border-white/10 pt-10 pb-24 md:pb-10 text-neutral-400 text-xs',
        'bg-[radial-gradient(35%_128px_at_50%_0%,rgba(229,9,20,0.15),transparent)]',
        className
      )}
      {...props}
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top Header Row with Logo & Email */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo-mark.svg"
              alt="Orkestrim Logo"
              className="w-7 h-7 object-contain drop-shadow-[0_0_10px_rgba(229,9,20,0.6)]"
            />
            <div>
              <span className="font-bebas text-2xl tracking-wider text-white uppercase">
                ORKESTRIM 2K26
              </span>
              <span className="block text-[10px] tracking-widest text-[#E50914] font-bold uppercase">
                Department of EIE • National Level Symposium
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-300">
            <Mail className="w-4 h-4 text-[#E50914]" />
            <span>Questions? Write to:</span>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold underline hover:text-[#E50914] transition-colors"
            >
              {site.email}
            </a>
          </div>
        </div>

        {/* 4-Column Grid with Divider Lines */}
        <div className="relative grid grid-cols-1 border-x border-white/10 md:grid-cols-4 md:divide-x md:divide-white/10">
          {/* Column 1: Social Card + Arenas */}
          <div className="flex flex-col justify-between">
            <SocialCard
              icon={<Instagram className="w-4 h-4 text-[#E50914]" />}
              title="Instagram"
              subtitle="@orkestrim_2k26_"
              href="https://www.instagram.com/orkestrim_2k26_/?utm_source=ig_web_button_share_sheet&srtk=ZDNlZDc0MzIxNw%3D%3D"
            />
            <LinksGroup
              title="Tournament Arenas"
              links={[
                { title: "Paper Fusion (Research)", href: "#arenas" },
                { title: "CASHFLIX (Tech Quiz)", href: "#arenas" },
                { title: "Beyond Limits (Deduction)", href: "#arenas" },
                { title: "BrandBlitz (Techno Ads)", href: "#arenas" },
                { title: "The Voyage X (Treasure)", href: "#arenas" },
              ]}
            />
          </div>

          {/* Column 2: Social Card + Symposium Guide */}
          <div className="flex flex-col justify-between">
            <SocialCard
              icon={<Mail className="w-4 h-4 text-[#E50914]" />}
              title="Email Desk"
              subtitle={site.email}
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`}
            />
            <LinksGroup
              title="Symposium Guide"
              links={[
                { title: "Premiere Schedule", href: "#schedule" },
                { title: "Top 5 Rankings", href: "#top5" },
                { title: "FAQs & Regulations", href: "#faqs" },
                { title: "Venue & Transit", href: "#venue" },
                { title: "Register for Events", href: site.registrationLink, external: true },
              ]}
            />
          </div>

          {/* Column 3: Social Card + Cast & Crew */}
          <div className="flex flex-col justify-between">
            <SocialCard
              icon={<MapPin className="w-4 h-4 text-[#E50914]" />}
              title="Campus Map"
              subtitle="SRM VEC Kattankulathur"
              href={site.mapLink}
            />
            <LinksGroup
              title="Cast & Crew"
              links={[
                { title: "Faculty Patrons", href: "#staff-coordinators" },
                { title: "Staff Coordinators", href: "#staff-coordinators" },
                { title: "Office Bearers", href: "#office-bearers" },
              ]}
            />
          </div>

          {/* Column 4: Social Card + Institution */}
          <div className="flex flex-col justify-between">
            <SocialCard
              icon={<ExternalLink className="w-4 h-4 text-[#E50914]" />}
              title="SRM Valliammai"
              subtitle="Official College Portal"
              href="https://srmvalliammai.ac.in"
            />
            <LinksGroup
              title="Institution & Dept"
              links={[
                { title: "SRM Valliammai Engg College", href: "https://srmvalliammai.ac.in", external: true },
                { title: "Transit & Bus Routes", href: "#venue" },
                { title: "Back to Top", href: "#hero" },
              ]}
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-neutral-400">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} ORKESTRIM // SYMPOSIUM. Department of Electronics &amp; Instrumentation Engineering, SRM Valliammai Engineering College.
          </p>
          <div className="flex items-center gap-4 text-neutral-400">
            <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
            <span>•</span>
            <a href="#cast" className="hover:text-white transition-colors">Crew</a>
            <span>•</span>
            <a href="#arenas" className="hover:text-white transition-colors">Arenas</a>
            <span>•</span>
            <a href="#hero" className="hover:text-white transition-colors">Top</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface LinksGroupProps {
  title: string;
  links: { title: string; href: string; external?: boolean }[];
}

function LinksGroup({ title, links }: LinksGroupProps) {
  return (
    <div className="p-4 sm:p-5 flex-1">
      <h3 className="text-white mt-1 mb-3.5 text-xs font-bold tracking-wider uppercase">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.title}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-neutral-400 hover:text-white hover:underline transition-colors text-xs block py-0.5"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialCard({
  title,
  subtitle,
  href,
  icon,
}: {
  title: string;
  subtitle?: string;
  href: string;
  icon?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:bg-white/[0.06] hover:text-white flex items-center justify-between border-t border-b border-white/10 p-3 sm:p-4 text-sm md:border-t-0 transition-all group"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {icon}
        <div className="min-w-0">
          <span className="font-bold text-white text-xs block truncate">{title}</span>
          {subtitle && (
            <span className="text-[10px] text-neutral-400 block truncate group-hover:text-neutral-300">
              {subtitle}
            </span>
          )}
        </div>
      </div>
      <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-[#E50914] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
    </a>
  );
}
