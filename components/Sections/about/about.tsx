"use client";

import { useRef, useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AboutSection from "./aboutHero/aboutsection";
import TechnicalForge from "./technicalForege/technicalForge";
import SoftSkills from "./softSkills/softSkills";

import { aboutData } from "@/data/about";
import AnimatedAbout from "@/components/UI/animated-path/animated-about";
import {
  AboutScrollContext,
  DESKTOP_QUERY,
  useMediaQuery,
} from "./aboutScroll";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/*
 * Layout is plain CSS (Tailwind `lg:` = 1024px, same as DESKTOP_QUERY):
 *  - < lg  : slides stack vertically, normal page scroll, no pin, no GSAP.
 *  - >= lg : slides sit in a row inside a pinned track that GSAP moves horizontally.
 */
const SLIDE = "slide relative flex w-full shrink-0 flex-col justify-center lg:h-screen lg:w-screen";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  // Shared with children (TechnicalForge) so they can sync to the horizontal scroll.
  const [horizontalTween, setHorizontalTween] = useState<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: DESKTOP_QUERY,
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as Record<string, boolean>;

          // Mobile / tablet: nothing to do, the browser scrolls vertically.
          if (!isDesktop) return;

          const slides = gsap.utils.toArray<HTMLElement>(".slide", track);
          if (!slides.length) return;

          const getScrollDistance = () =>
            Math.max(0, track.scrollWidth - section.clientWidth);

          const tween = gsap.to(track, {
            x: () => -getScrollDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              start: "top top",
              end: () => `+=${getScrollDistance()}`,
              scrub: reduceMotion ? true : 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          setHorizontalTween(tween);

          // Generic reveal for slides that don't run their own animation.
          if (!reduceMotion) {
            slides.forEach((slide, index) => {
              if (index === 0 || slide.hasAttribute("data-self-animated")) return;

              const elements = slide.querySelectorAll<HTMLElement>("h2, h3, p, img");
              if (!elements.length) return;

              gsap.fromTo(
                elements,
                { y: 60, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  stagger: 0.08,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: slide,
                    containerAnimation: tween,
                    start: "left 75%",
                    toggleActions: "play reverse play reverse",
                  },
                }
              );
            });
          }

          // Images / fonts change widths -> recalc the scroll distance.
          const refresh = () => ScrollTrigger.refresh();
          window.addEventListener("load", refresh);
          document.fonts?.ready.then(refresh);

          return () => {
            window.removeEventListener("load", refresh);
            setHorizontalTween(null);
          };
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <AboutScrollContext.Provider value={horizontalTween}>
      <section
        ref={sectionRef}
        className="relative w-full bg-background lg:h-screen lg:overflow-hidden"
      >
        {/* Decorative path: desktop only (it is sized for the pinned viewport) */}
        {isDesktop && (
          <div className="pointer-events-none absolute inset-0 z-0">
            <AnimatedAbout />
          </div>
        )}

        <div
          ref={trackRef}
          className="relative z-10 flex flex-col lg:h-screen lg:w-max lg:flex-row lg:will-change-transform"
        >
          {/* Slide 1 */}
          <div className={`${SLIDE} min-h-svh`}>
            <AboutSection data={aboutData} />
          </div>

          {/* Slide 2 – TechnicalForge animates itself */}
          <div data-self-animated className={`${SLIDE} py-16 lg:py-0`}>
            <TechnicalForge />
          </div>

          {/* Slide 3 */}
          <div className={`${SLIDE} py-16 lg:py-0`}>
            <SoftSkills />
          </div>
        </div>
      </section>
    </AboutScrollContext.Provider>
  );
}