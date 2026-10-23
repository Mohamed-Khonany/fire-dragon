
"use client";

import { usePathname } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollSmoother);

export default function ScrollToTop() {
  const pathname = usePathname();

  useGSAP(() => {
    const frame = requestAnimationFrame(() => {
      const smoother = ScrollSmoother.get();

      if (smoother) {
        smoother.scrollTo(0, false);
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
