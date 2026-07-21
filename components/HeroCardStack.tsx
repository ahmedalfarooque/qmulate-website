"use client";
/**
 * HeroCardStack — premium rotating luxury card-deck animation.
 *
 * Three photographs continuously cycle through three fixed "slots"
 * (front / middle / back). Every cycle the front card travels down,
 * curves underneath the stack, shrinks, rotates slightly and settles
 * into the back slot — while the middle card advances to front and
 * the back card advances to middle. Loops forever.
 *
 * Built with Framer Motion keyframe arrays (using `null` as a keyframe
 * placeholder so each card always animates smoothly from wherever it
 * currently is, regardless of which transition played before it).
 */
import { useEffect, useRef, useState } from "react";
import { motion, type TargetAndTransition, type Transition } from "framer-motion";

export interface StackImage {
  src: string;
  position?: string;
  alt?: string;
}

type Role = "front" | "middle" | "back";
const ROLE_BY_INDEX: Role[] = ["front", "middle", "back"];

const EASE = [0.16, 1, 0.3, 1] as const;

const SHADOW = {
  front:  "0 32px 64px -16px rgba(20,23,31,.38), 0 1px 0 rgba(255,255,255,.6) inset",
  middle: "0 22px 46px -16px rgba(20,23,31,.30)",
  back:   "0 14px 32px -14px rgba(20,23,31,.22)",
};
const BLUR = { front: 0, middle: 0.4, back: 1.1 };

interface SlotTarget {
  x: string;
  y: string;
  scale: number;
  rotate: number;
  zIndex: number;
}

function slotFor(scaleK: number, xyK: number, rotK: number): Record<Role, SlotTarget> {
  return {
    front:  { x: "0%",   y: "6%",   scale: 1.00,            rotate: 0,          zIndex: 30 },
    middle: { x: `${-14*xyK}%`, y: `${-10*xyK}%`, scale: 1 - (1-0.95)*scaleK, rotate: -2*rotK, zIndex: 20 },
    back:   { x: `${14*xyK}%`,  y: `${-18*xyK}%`, scale: 1 - (1-0.90)*scaleK, rotate: 2*rotK,  zIndex: 10 },
  };
}

export function HeroCardStack({
  images,
  pauseMs = 2800,
  durationS = 2.0,
  className = "",
}: {
  images: StackImage[];
  pauseMs?: number;
  durationS?: number;
  className?: string;
}) {
  const [phase, setPhase] = useState(0);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const period = pauseMs + durationS * 1000;
    timer.current = setInterval(() => setPhase(p => p + 1), period);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [pauseMs, durationS]);

  // Reduce travel distance / rotation / scale delta on small screens,
  // keep the same animation, just gentler.
  const SLOT = slotFor(reduced ? 0.55 : 1, reduced ? 0.5 : 1, reduced ? 0.5 : 1);

  return (
    <div className={`hero-stack ${className}`}>
      {images.map((img, i) => {
        const currentIdx = (((i - phase) % 3) + 3) % 3;
        const previousIdx = (currentIdx + 1) % 3;
        const currentRole = ROLE_BY_INDEX[currentIdx];
        const previousRole = ROLE_BY_INDEX[previousIdx];
        const target = SLOT[currentRole];

        // Build the animate target. On first paint (phase 0) every card
        // just settles into its resting slot with a soft fade-in — no
        // keyframe path needed yet.
        let animate: TargetAndTransition;
        let transition: Transition;

        if (phase === 0) {
          animate = { ...target, opacity: 1, filter: `blur(${BLUR[currentRole]}px)`, boxShadow: SHADOW[currentRole] };
          transition = { duration: 1.1, ease: EASE, delay: 0.15 + i * 0.08 };
        } else if (previousRole === "front") {
          // The special curved "front → down → underneath → back" path.
          animate = {
            x: [null, "-8%", target.x],
            y: [null, "36%", target.y],
            scale: [null, 0.96, target.scale],
            rotate: [null, -4, target.rotate],
            opacity: [null, 0.92, 1],
            zIndex: target.zIndex,
            filter: `blur(${BLUR[currentRole]}px)`,
            boxShadow: SHADOW[currentRole],
          };
          transition = {
            default: { duration: durationS, ease: EASE, times: [0, 0.45, 1] },
            zIndex: { duration: 0 },
          };
        } else {
          // middle → front, or back → middle: a simple, smooth two-point tween.
          animate = {
            x: [null, target.x],
            y: [null, target.y],
            scale: [null, target.scale],
            rotate: [null, target.rotate],
            opacity: 1,
            zIndex: target.zIndex,
            filter: `blur(${BLUR[currentRole]}px)`,
            boxShadow: SHADOW[currentRole],
          };
          transition = {
            default: { duration: durationS, ease: EASE },
            zIndex: { duration: 0 },
          };
        }

        return (
          <motion.div
            key={img.src}
            className="hero-stack-card"
            initial={phase === 0 ? { ...target, opacity: 0, scale: target.scale * 0.97 } : false}
            animate={animate}
            transition={transition}
            style={{ willChange: "transform, filter, opacity" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt ?? ""} loading="eager" style={{ objectPosition: img.position }} />
          </motion.div>
        );
      })}
    </div>
  );
}
