"use client";

import { createContext, useContext, useSyncExternalStore } from "react";


/** Single source of truth for the desktop breakpoint (must match Tailwind's `lg`). */
export const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * Shares the horizontal-scroll tween from <About /> with its children, so a child can
 * pass it as `containerAnimation`. It is `null` on mobile/tablet (normal vertical scroll).
 */
export const AboutScrollContext = createContext<gsap.core.Tween | null>(null);
export const useAboutScroll = () => useContext(AboutScrollContext);

/** SSR-safe media query hook (false on the server and during hydration). */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}