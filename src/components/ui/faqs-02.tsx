import { ArrowRight, Clock, Mail, MessageCircle } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Button } from "./button";

const faqs = [
  {
    q: "Who can participate in ORKESTRIM 2K26?",
    a: "All engineering students, regardless of their department, are welcome to participate in our events.",
  },
  {
    q: "Is there a registration fee?",
    a: "Yes, standard registration applies for most events. Certain premium events may require an additional pass.",
  },
  {
    q: "Can I participate in multiple events?",
    a: "Absolutely! Just ensure the schedules for your chosen events don't overlap by checking the agenda section.",
  },
  {
    q: "Will accommodation be provided?",
    a: "No, outstation students will have to arrange their own accommodation.",
  },
  {
    q: "Are there cash prizes?",
    a: "Yes, total cash prizes worth 50K+ will be awarded across various technical and non-technical events.",
  },
];

export default function Faqs02() {
  return (
    <section id="faqs" className="bg-[#0e0e0e] text-white py-20 sm:py-28 px-[4%] w-full">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <div className="lg:sticky lg:top-32 flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300 shadow-sm shadow-black/5">
              FAQs
            </span>
            <h2
              className="text-balance font-bebas tracking-wide"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.08,
              }}
            >
              Your questions answered
            </h2>
            <p className="text-sm text-neutral-400">
              Quick answers from the team. Still stuck? Write to{" "}
              <a
                href="#"
                className="font-medium text-white underline-offset-4 hover:underline"
              >
                support@orkestrim.com
              </a>{" "}
              and a real person replies.
            </p>

          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-white/10 py-2">
                <AccordionTrigger className="text-left text-base sm:text-lg font-medium hover:no-underline hover:text-[#E50914] transition-colors">{f.q}</AccordionTrigger>
                <AccordionContent className="text-neutral-400 text-sm sm:text-base">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
