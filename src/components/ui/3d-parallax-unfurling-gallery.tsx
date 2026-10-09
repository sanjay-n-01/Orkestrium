"use client";

import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";

const UNSPLASH_IMAGES = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1540039155732-68473668f43e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470229722913-7c092db62220?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1514533491410-d007c0303b70?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550614000-4b95d4ed798a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1493225457124-a1a2a5f560e9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1471614654469-512fb94711f5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520110120835-c96534a4c984?auto=format&fit=crop&w=800&q=80",
];

interface ImageCardProps {
  src: string;
  onLoad?: () => void;
}

const ImageCard = ({ src, onLoad }: ImageCardProps) => {
  return (
    <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] flex-shrink-0 bg-[#111] transition-transform duration-300 hover:scale-[1.02] cursor-pointer relative will-change-transform backface-hidden preserve-3d">
      <img
        src={src}
        alt="Gallery Asset"
        loading="lazy"
        onLoad={onLoad}
        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
};

export default function ParallaxUnfurlingGallery({ images = UNSPLASH_IMAGES, scrollProgress }: { images?: string[], scrollProgress?: MotionValue<number> }) {
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
    const sourceImages = images && images.length > 0 ? images : UNSPLASH_IMAGES;
    
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
