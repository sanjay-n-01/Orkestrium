"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, animate, useMotionValue, useReducedMotion, useInView, type PanInfo } from "motion/react";
import { cn } from "../../lib/utils";

/*
 * Feature Carousel — a stack of photo cards: the active one in front, its
 * neighbours peeking out either side. Drag/swipe sideways, use the arrows or
 * dots, or let it autoplay.
 *
 * Adapted from uselayouts.com/docs/components/feature-carousel (MIT).
 */

export type FeatureItem = {
  id: string;
  /** Small badge above the description (e.g. a role). */
  label: string;
  image: string;
  description: string;
};

export type FeatureCarouselProps = {
  items: FeatureItem[];
  /** ms per card; 0 turns autoplay off. */
  autoplay?: number;
  className?: string;
  ariaLabel?: string;
};

const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

function shortestOffset(index: number, current: number, len: number) {
  let d = ((index - current) % len + len) % len;
  if (d > len / 2) d -= len;
  return d;
}

const cardTween = {
  type: "tween" as const,
  duration: 0.38,
  ease: [0.4, 0, 0.2, 1] as const,
};

export default function FeatureCarousel({
  items,
  autoplay = 3500,
  className,
  ariaLabel = "Photo carousel",
}: FeatureCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25 });
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const len = items.length;
  // Horizontal drag offset shared by the whole stack; springs back on release.
  const dragX = useMotionValue(0);
  const dragged = useRef(false);
  const hasEnteredRef = useRef(false);

  const currentIndex = ((step % len) + len) % len;

  const go = useCallback((delta: number) => setStep((s) => s + delta), []);

  const goTo = (index: number) => {
    const delta = shortestOffset(index, currentIndex, len);
    if (delta !== 0) go(delta);
  };

  // Reset to the very first item (Sanjay) whenever user scrolls into / lands on the section
  useEffect(() => {
    if (isInView) {
      if (!hasEnteredRef.current) {
        setStep(0);
        hasEnteredRef.current = true;
      }
    } else {
      hasEnteredRef.current = false;
    }
  }, [isInView]);

  // Also reset to item 0 if user clicks navbar or anchor link to #cast or #office-bearers
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#cast" || hash === "#office-bearers") {
        setStep(0);
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // ONLY autoplay when the carousel is actually in the viewport and not paused
  useEffect(() => {
    if (isPaused || !isInView || !autoplay || len < 2) return;
    const interval = setInterval(() => go(1), autoplay);
    return () => clearInterval(interval);
  }, [go, isPaused, isInView, autoplay, len]);

  const onPanStart = () => {
    dragged.current = true;
    setIsPaused(true);
  };
  const onPan = (_: unknown, info: PanInfo) => {
    dragX.set(info.offset.x * 0.6);
  };
  const onPanEnd = (_: unknown, info: PanInfo) => {
    setIsPaused(false);
    if (len > 1) {
      if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1);
      else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1);
    }
    animate(dragX, 0, reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 40 });
    // swallow the click that follows a drag
    setTimeout(() => (dragged.current = false), 0);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else return;
    e.preventDefault();
  };

  const getCardStatus = (index: number) => {
    const d = shortestOffset(index, currentIndex, len);
    if (d === 0) return "active";
    if (d === -1) return "prev";
    if (d === 1) return "next";
    return "hidden";
  };

  return (
    <div
      ref={containerRef}
      className={cn("w-full select-none outline-none", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="relative mx-auto flex w-full cursor-grab items-center justify-center overflow-hidden py-6 active:cursor-grabbing sm:py-10"
        style={{ touchAction: "pan-y" }}
        onPanStart={onPanStart}
        onPan={onPan}
        onPanEnd={onPanEnd}
      >
        <motion.div className="relative aspect-[4/5] w-[min(72vw,380px)]" style={{ x: dragX }}>
          {items.map((item, index) => {
            const status = getCardStatus(index);
            const isActive = status === "active";
            const isPrev = status === "prev";
            const isNext = status === "next";

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: isActive ? "0%" : isPrev ? "-58%" : isNext ? "58%" : "0%",
                  scale: isActive ? 1 : isPrev || isNext ? 0.82 : 0.7,
                  opacity: isActive ? 1 : isPrev || isNext ? 0.45 : 0,
                  rotate: isPrev ? -4 : isNext ? 4 : 0,
                  zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                }}
                transition={reduceMotion ? { duration: 0 } : cardTween}
                onClick={() => !isActive && !dragged.current && goTo(index)}
                style={{ pointerEvents: isActive || isPrev || isNext ? "auto" : "none" }}
                className={cn(
                  "absolute inset-0 origin-center overflow-hidden rounded-[1.75rem] border-4 border-[#0e0e0e] bg-[#0e0e0e] shadow-2xl sm:rounded-[2.5rem] sm:border-8",
                  !isActive && "cursor-pointer"
                )}
                aria-hidden={isActive ? undefined : true}
              >
                <img
                  src={item.image}
                  alt={item.description}
                  draggable={false}
                  width={1024}
                  height={1024}
                  className={cn(
                    "pointer-events-none block size-full object-cover transition-[filter] duration-150 ease-out",
                    isActive ? "grayscale-0 blur-0" : "grayscale blur-[2px] brightness-75"
                  )}
                />

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                      className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 pt-24 sm:p-8 sm:pt-32"
                    >
                      <div className="mb-2 w-fit rounded-full border border-white/20 bg-[#0e0e0e] px-3 py-1 text-[10px] font-normal uppercase tracking-[0.2em] text-white shadow-lg sm:mb-3 sm:px-4 sm:py-1.5 sm:text-[11px]">
                        {item.label}
                      </div>
                      <p className="mb-4 text-lg font-bold leading-tight tracking-tight text-white drop-shadow-md sm:text-2xl">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {len > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-[#0e0e0e] focus-visible:outline-2 focus-visible:outline-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to ${item.description}`}
                aria-current={index === currentIndex ? "true" : undefined}
                onClick={() => goTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentIndex ? "w-6 bg-[#E50914]" : "w-2 bg-white/30 hover:bg-white/60"
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            className="grid size-10 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-[#0e0e0e] focus-visible:outline-2 focus-visible:outline-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>
      )}

      <div className="sr-only" aria-live="polite">
        {`${currentIndex + 1} of ${len}: ${items[currentIndex]?.description ?? ""}, ${items[currentIndex]?.label ?? ""}`}
      </div>
    </div>
  );
}
