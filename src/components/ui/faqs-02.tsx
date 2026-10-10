import React from "react";
import { Mail, Phone, ArrowRight, Plus, HelpCircle, ShieldAlert, Play } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { SITE_CONFIG } from "../../data/symposiumData";
import { cn } from "../../lib/utils";

interface FAQItem {
  q: string;
  a: string;
  highlight?: string;
}

const faqs: FAQItem[] = [
  {
    q: "Who can participate in ORKESTRIM 2k26?",
    a: "All undergraduate and postgraduate students from any branch or stream are welcome to participate. Bringing a valid physical College ID Card is mandatory for verification at the registration desk.",
  },
  {
    q: "Is there any registration fee? If so, what is it?",
    a: "Yes, there is registration fee. Students must pay ₹200 per head for each event they participate.",
  },
  {
    q: "What is the registration fee and what does it include?",
    a: "The delegate registration fee is ₹200 per head. This includes access to participate in tournament arenas, entry credentials, official participation kits, festive lunch banquet, and refreshments throughout the day.",
  },
  {
    q: "Is there any transport facility provided by the college?",
    a: "No. The college won't provide any transport facility. The college is easily reachable via trains to Potheri Station. MTC bus numbers 500 and 500D are available from Tambaram / Kilambakkam and Chengalpattu ",
  },
  {
    q: "Will food and refreshments be provided?",
    a: "Yes! A complimentary lunch will be provided for all registered delegates.",
  },
  {
    q: "What are the prizes and certificates awarded?",
    a: "Exciting cash prizes and winner trophies will be awarded across all technical and non-technical arenas during the Grand Valedictory Ceremony. Additionally, every registered participant will receive an official Certificate of Participation.",
  },
  {
    q: "Where is the symposium venue and what is the reporting time?",
    a: "ORKESTRIM 2K26 takes place on Saturday, 31 October 2026 at the Department of Electronics & Instrumentation Engineering (EIE), 10th Floor, New Building, SRM Valliammai Engineering College, Kattankulathur. Delegate check-in begins at 08:30 AM.",
  },
  {
    q: "When in doubt whom to contact?",
    a: "Respective student co-ordinators for the event can be contacted as provided in the website.",
  },
];

export default function Faqs02() {
  const leadCoordinator = SITE_CONFIG.organizers[0] || { name: "Student Desk", phone: "+91 9342176100" };

  return (
    <section id="faqs" className="bg-[#0a0a0a] text-white py-20 sm:py-28 px-4 sm:px-6 w-full border-t border-white/5 scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.45fr] lg:items-start">
          
          {/* Left Column: Netflix Header & Interactive Help Desk */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="h-2 w-2 rounded-full bg-[#E50914] animate-pulse" />
                <span className="text-xs uppercase font-bold tracking-[0.22em] text-[#E50914]">
                  Frequently Asked Questions
                </span>
              </div>
              <h2 className="font-bebas text-5xl sm:text-6xl tracking-wide text-white uppercase leading-none">
                Got Questions?
                <br />
                <span className="text-[#E50914]">We've Got Answers.</span>
              </h2>
              <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                Everything you need to know about delegate registration, tournament regulations, team guidelines, and campus amenities for Orkestrim 2K26.
              </p>
            </div>

            {/* Interactive "Need Help?" Card */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 sm:p-6 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#E50914]/15 border border-[#E50914]/30 text-[#E50914]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Need Personal Assistance?</h3>
                  <p className="text-xs text-neutral-400">Our organizing desk is live to assist delegates.</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                {/* Email Support */}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE_CONFIG.email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 text-xs text-neutral-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-[#E50914] shrink-0" />
                    <span className="truncate">{SITE_CONFIG.email}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-0.5 group-hover:text-white transition-all shrink-0" />
                </a>

                {/* Lead Coordinator Call Hotline */}
                <a
                  href={`tel:${leadCoordinator.phone || '+919342176100'}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 text-xs text-neutral-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">
                      Call Desk: {leadCoordinator.name} ({leadCoordinator.phone || "+91 93421 76100"})
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-0.5 group-hover:text-white transition-all shrink-0" />
                </a>
              </div>

              {/* Ready to Register Button */}
              <div className="pt-2">
                <a
                  href={SITE_CONFIG.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#E50914] hover:bg-[#b80710] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#E50914]/20 active:scale-[0.98]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Register for Orkestrim 2K26</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Netflix-Style Accordion List */}
          <div className="w-full">
            <AccordionPrimitive.Root type="single" collapsible className="space-y-3.5">
              {faqs.map((faq, index) => (
                <AccordionPrimitive.Item
                  key={faq.q}
                  value={`item-${index}`}
                  className="group rounded-xl border border-white/10 bg-[#161616] hover:bg-[#202020] data-[state=open]:bg-[#202020] data-[state=open]:border-[#E50914]/80 data-[state=open]:shadow-[0_0_25px_rgba(229,9,20,0.15)] transition-all duration-200 overflow-hidden"
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className="flex flex-1 items-center justify-between p-5 sm:p-6 text-left font-bold text-base sm:text-lg text-white hover:text-white transition-colors gap-4"
                    >
                      <span className="leading-snug">{faq.q}</span>
                      <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#E50914] transition-colors">
                        <Plus className="h-4 w-4 text-white group-data-[state=open]:rotate-45 transition-transform duration-200" />
                      </div>
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>

                  <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="px-5 sm:px-6 pb-6 pt-0 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-white/5 mt-1 pt-4">
                      {faq.highlight && (
                        <div className="mb-3 flex items-start gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs sm:text-sm text-amber-200">
                          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                          <span>{faq.highlight}</span>
                        </div>
                      )}
                      <p>{faq.a}</p>
                    </div>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              ))}
            </AccordionPrimitive.Root>
          </div>

        </div>
      </div>
    </section>
  );
}
