"use client";

import { useCallback, useRef, useState } from "react";
import Banner from "@/components/Sections/hero/banner";
import Projects from "@/components/Sections/projects/projects";
import About from "@/components/Sections/about/about";
import SiteLoader from "@/components/UI/loader/site-loader";
import { createAboutPathsTimeline } from "@/components/UI/about-side-path/about-paths-timeline";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function Root() {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // ── Banner → About zoom-through transition ────────────────────────
  useGSAP(
    () => {
      smootherRef.current = ScrollSmoother.create({
        smooth: 4,
        effects: true,
        normalizeScroll: true,
        smoothTouch: 0,
      });
      smootherRef.current.paused(true);
      if (!contentVisible) return;

      const bannerSection = document.getElementById("banner-section");
      const fireWrapper =
        bannerSection?.querySelector<HTMLElement>(".fire-wrapper");
      const contentEl =
        bannerSection?.querySelector<HTMLElement>(".banner-content-el");
      const aboutWord =
        bannerSection?.querySelector<HTMLElement>(".about-word");
      const overlay = overlayRef.current;

      if (
        !bannerSection ||
        !fireWrapper ||
        !contentEl ||
        !aboutWord ||
        !overlay
      )
        return;

      gsap.set(fireWrapper, {
        transformOrigin: "50% 50%",
        willChange: "transform, filter",
      });
      gsap.set(overlay, { opacity: 0 });
      gsap.set(aboutWord, { transformOrigin: "50% 50%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerSection,
          pin: true,
          start: "top top",
          end: "+=150%", // a bit more scroll distance so the word has room to breathe
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1 (0 – 30%): hero content fades and lifts away
      tl.to(
        contentEl,
        { opacity: 0, y: -50, ease: "power2.in", duration: 0.3, scale: 1.9 },
        0,
      );

      // Phase 2 (10 – 80%): fire-wrapper zooms in (camera zoom)
      tl.fromTo(
        fireWrapper,
        { scale: 1, filter: "blur(0px)" },
        { scale: 9, filter: "blur(14px)", ease: "power3.in", duration: 0.7 },
        0.1,
      );

      // Phase 3 (35 – 65%): dark vignette expands from centre
      // tl.to(overlay, { opacity: 1, ease: "power2.inOut", duration: 0.3 }, 0.35);

      // Phase 4 (65 – 100%): vignette fades, about section revealed
      tl.to(overlay, { opacity: 0, ease: "power2.out", duration: 0.35 }, 0.65);

      // ── "About me" word ──────────────────────────────────────────
      // Emerges out of the dark vignette: fades in and de-blurs quickly...
      tl.fromTo(
        aboutWord,
        { opacity: 0, filter: "blur(12px)", y: 24 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          ease: "power2.out",
          duration: 0.25,
        },
        0.4,
      );

      // ...while one continuous scale runs from tiny to big until the timeline ends.
      // power2.out = fast, confident start that glides to a stop at the end of the scroll.
      tl.fromTo(
        aboutWord,
        { scale: 0.2 },
        { scale: 1.4, ease: "power2.out", duration: 0.6 },
        0.4,
      );

      // ── Side paths ───────────────────────────────────────────────
      // Drawn on the SAME scrubbed timeline, so they are tied to scroll position
      // (and reverse perfectly when scrolling back up).
      // Starts at 0.42 (just after the word begins to emerge) and is rescaled
      // to occupy 0.5 timeline units => finishes at 0.92, right before the pin releases.
      tl.add(createAboutPathsTimeline(bannerSection, 0.5), 0.42);

      return () => tl.kill();
    },
    { dependencies: [contentVisible] },
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