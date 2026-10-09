import { clsx } from "clsx";
import { motion } from "motion/react";
import React from "react";

export function BentoCard({
  dark = false,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = [],
  onClick,
  actions,
}: {
  dark?: boolean;
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
  fade?: ("top" | "bottom")[];
  onClick?: () => void;
  actions?: React.ReactNode;
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      onClick={onClick}
      className={clsx(
        className,
        "group relative flex flex-col justify-end overflow-hidden rounded-lg cursor-pointer",
        "bg-[#111] shadow-sm ring-1 ring-white/10 transition-shadow hover:shadow-lg hover:shadow-black/50 h-[22rem]"
      )}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-white to-50% opacity-25" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-white to-50% opacity-25" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent" />
      </div>
      
      <div className="relative z-10 p-6 flex flex-col justify-end mt-auto pointer-events-none">
        <h1 className="text-xs font-black tracking-widest text-[#E50914] uppercase mb-1">{eyebrow}</h1>
        <p className="text-2xl font-bebas tracking-wide text-white">
          {title}
        </p>
        <p className="mt-1.5 text-sm/6 text-neutral-300 line-clamp-2">
          {description}
        </p>
        {actions && (
          <div className="mt-5 pointer-events-auto">
            {actions}
          </div>
        )}
      </div>
    </motion.div>
  );
}
