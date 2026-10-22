"use client";

import { useCallback, useRef, useState } from "react";
import Banner from "@/components/Sections/hero/banner";
import Projects from "@/components/Sections/projects/projects";
import About from "@/components/Sections/about/about";
import SiteLoader from "@/components/UI/loader/site-loader";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function Root() {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // ── ScrollSmoother ──────────────────────────────────────────────
  useGSAP(() => {
    smootherRef.current = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      smoothTouch: 0,
    });
    smootherRef.current.paused(true);
  });

  // ── Banner → About zoom-through transition ────────────────────────
  useGSAP(
    () => {
      if (!contentVisible) return;

      const bannerSection = document.getElementById("banner-section");
      const fireWrapper = bannerSection?.querySelector<HTMLElement>(".fire-wrapper");
      const contentEl = bannerSection?.querySelector<HTMLElement>(".banner-content-el");
      const overlay = overlayRef.current;

      if (!bannerSection || !fireWrapper || !contentEl || !overlay) return;

      gsap.set(fireWrapper, {
        transformOrigin: "50% 50%",
        willChange: "transform, filter",
      });
      gsap.set(overlay, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerSection,
          pin: true,
          start: "top top",
          end: "+=120%",
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1 (0 – 30%): hero content fades and lifts away
      tl.to(contentEl, { opacity: 0, y: -50, ease: "power2.in", duration: 0.3 }, 0);

      // Phase 2 (20 – 90%): fire-wrapper zooms in (camera zoom)
      tl.fromTo(
        fireWrapper,
        { scale: 1, filter: "blur(0px)" },
        { scale: 9, filter: "blur(14px)", ease: "power3.in", duration: 0.7 },
        0.2
      );

      // Phase 3 (35 – 65%): dark vignette expands from centre
      tl.to(overlay, { opacity: 1, ease: "power2.inOut", duration: 0.3 }, 0.35);

      // Phase 4 (65 – 100%): vignette fades — about section revealed
      tl.to(overlay, { opacity: 0, ease: "power2.out", duration: 0.35 }, 0.65);

      return () => tl.kill();
    },
    { dependencies: [contentVisible] }
  );

  const handleStartReveal = useCallback(() => {
    setContentVisible(true);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    if (smootherRef.current) {
      smootherRef.current.paused(false);
    }
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <SiteLoader
        onStartReveal={handleStartReveal}
        onComplete={handleLoaderComplete}
      />

      <div
        id="smooth-wrapper"
        className={`w-full relative overflow-x-hidden font-body transition-opacity duration-300 ${
          contentVisible
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div id="smooth-content">
          <Banner />

          {/*
           * Full-screen radial vignette overlay.
           * Grows from the very centre of the viewport as the banner zooms in,
           * creating a cinematic "portal iris" before the about section is revealed.
           * fixed + z-50 so it sits above everything during the transition.
           */}
          <div
            ref={overlayRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-50"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.92) 60%, #000000 100%)",
              opacity: 0,
            }}
          />

          <About />
          <Projects />
        </div>
      </div>
    </>
  );
}
