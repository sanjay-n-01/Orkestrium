"use client";

import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";

const CINEMA_IMAGES = [
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80", // Cinema auditorium & classic red seats
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80", // 35mm film reel & cinema tape
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80", // Retro neon Cinema marquee sign
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80", // Director's production clapperboard
  "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80", // Red velvet theater auditorium
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80", // Cinema projector light beam
  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80", // Cinema production camera & film set
  "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80", // Film set production slate
  "https://images.unsplash.com/photo-1518676599649-f00053ff407b?auto=format&fit=crop&w=800&q=80", // Dramatic red cinema ambiance
  "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?auto=format&fit=crop&w=800&q=80", // Cinema camera & prime anamorphic lens
  "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=800&q=80", // Classic popcorn & film reels
  "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?auto=format&fit=crop&w=800&q=80", // Cinema theater seats & screen glow
  "https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?auto=format&fit=crop&w=800&q=80", // Vintage 35mm film negatives
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80", // Movie projector beam in dark theater
  "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80", // Cinema retro premiere
  "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80", // Dramatic spotlights & haze
];

interface ImageCardProps {
  src: string;
  onLoad?: () => void;
}

const ImageCard = ({ src, onLoad }: ImageCardProps) => {
  return (
    <div className="w-full h-[220px] sm:h-[320px] md:h-[420px] flex-shrink-0 bg-[#111] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.7)] transition-all duration-300 hover:scale-[1.03] hover:border-[#E50914]/50 cursor-pointer relative will-change-transform backface-hidden preserve-3d group">
      <img
        src={src}
        alt="Cinema Showcase"
        loading="lazy"
        onLoad={onLoad}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
      />
      {/* Subtle cinematic gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};

export default function ParallaxUnfurlingGallery({ images = CINEMA_IMAGES, scrollProgress }: { images?: string[], scrollProgress?: MotionValue<number> }) {
  const [isReady, setIsReady] = useState(false);
  const loadedCountRef = useRef(0);

  const handleItemLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (!isReady && loadedCountRef.current >= 1) setIsReady(true);
  }, [isReady]);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const colMedia = useMemo(() => {
    // If no images or empty array, fallback to default for animation testing
    const sourceImages = images && images.length > 0 ? images : CINEMA_IMAGES;
    
    // Distribute images into 4 columns (cols 3 & 4 will be hidden on mobile)
    const col1Base = sourceImages.filter((_, i) => i % 4 === 0);
    const col2Base = sourceImages.filter((_, i) => i % 4 === 1);
    const col3Base = sourceImages.filter((_, i) => i % 4 === 2);
    const col4Base = sourceImages.filter((_, i) => i % 4 === 3);

    return {
      col1: [...col1Base, ...col1Base],
      col2: [...col2Base, ...col2Base],
      col3: [...col3Base, ...col3Base],
      col4: [...col4Base, ...col4Base],
    };
  }, [images]);

  // Global window scroll as fallback if no specific scrollProgress is provided
  const { scrollYProgress } = useScroll();
  const activeScrollProgress = scrollProgress || scrollYProgress;

  const smoothProgress = useSpring(activeScrollProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  // Track columns parallax animations (mapped to 0-1 of whole page scroll)
  const yCol1 = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);
  const yCol2 = useTransform(smoothProgress, [0, 1], ["-40%", "10%"]);
  const yCol3 = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);
  const yCol4 = useTransform(smoothProgress, [0, 1], ["-30%", "20%"]);

  return (
    <div className="absolute inset-0 w-full overflow-hidden pointer-events-none flex justify-center items-center opacity-40 mix-blend-screen">
      <div
        className="absolute inset-0 flex justify-center items-center pointer-events-none sm:translate-x-[25vw]"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          style={{
            rotateX: 25,
            rotateY: -25,
            rotateZ: 15,
            transformStyle: "preserve-3d",
          }}
          className="flex gap-2 sm:gap-4 md:gap-6 justify-center items-center w-[120vw] sm:w-[80vw] h-[150vh] origin-center opacity-100 will-change-transform backface-hidden"
        >
          {/* Column 1 (Visible everywhere) */}
          <motion.div style={{ y: yCol1 }} className="flex flex-col gap-2 sm:gap-4 md:gap-6 w-[45vw] sm:w-[22vw] min-w-[150px] sm:min-w-[200px] pointer-events-auto">
            {colMedia.col1.map((src, index) => (
              <ImageCard key={`col1-${index}`} src={src} onLoad={handleItemLoad} />
            ))}
          </motion.div>

          {/* Column 2 (Visible everywhere) */}
          <motion.div style={{ y: yCol2 }} className="flex flex-col gap-2 sm:gap-4 md:gap-6 w-[45vw] sm:w-[22vw] min-w-[150px] sm:min-w-[200px] pointer-events-auto">
            {colMedia.col2.map((src, index) => (
              <ImageCard key={`col2-${index}`} src={src} onLoad={handleItemLoad} />
            ))}
          </motion.div>

          {/* Column 3 (Hidden on mobile) */}
          <motion.div style={{ y: yCol3 }} className="hidden sm:flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
            {colMedia.col3.map((src, index) => (
              <ImageCard key={`col3-${index}`} src={src} onLoad={handleItemLoad} />
            ))}
          </motion.div>

          {/* Column 4 (Hidden on mobile) */}
          <motion.div style={{ y: yCol4 }} className="hidden sm:flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
            {colMedia.col4.map((src, index) => (
              <ImageCard key={`col4-${index}`} src={src} onLoad={handleItemLoad} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
