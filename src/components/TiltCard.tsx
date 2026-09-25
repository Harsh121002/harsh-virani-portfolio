"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type MouseEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees (default 10). Disabled on touch / reduced motion. */
  maxTilt?: number;
  /** Perspective distance in px */
  perspective?: number;
  /** Scale on hover */
  hoverScale?: number;
  /** Extra class on the inner transform layer */
  innerClassName?: string;
};

function useCanTilt() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(fine.matches && motionOk.matches);
    update();
    fine.addEventListener("change", update);
    motionOk.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      motionOk.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  perspective = 900,
  hoverScale = 1.02,
  innerClassName = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const canTilt = useCanTilt();
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!canTilt || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      mx.set(px);
      my.set(py);
    },
    [canTilt, mx, my]
  );

  const onEnter = useCallback(() => setHovering(true), []);

  const onLeave = useCallback(() => {
    setHovering(false);
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <motion.div
        className={`relative h-full w-full will-change-transform ${innerClassName}`}
        style={
          canTilt
            ? {
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                scale: hovering ? hoverScale : 1,
              }
            : undefined
        }
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
