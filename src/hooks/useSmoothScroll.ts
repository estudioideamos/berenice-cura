import { useEffect } from "react";
import Lenis from "lenis";

// Eased, inertial wheel scroll (à la Framer sites): the wheel nudges a target
// position and the page glides to it instead of jumping tick by tick.
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // Continuous wheel/touch scroll is driven by `lerp`, not `duration`
      // (`duration`/`easing` only apply to one-off `scrollTo` calls).
      // Lower lerp = the page takes longer to catch up to the target,
      // which reads as slower and silkier with no per-notch jump.
      lerp: 0.08,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
    });

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}
