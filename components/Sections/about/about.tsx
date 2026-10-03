"use client";
import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

import AboutSection from "./aboutHero/aboutsection";
import TechnicalForge from "./technicalForege/technicalForge";
import SoftSkills from "./softSkills/softSkills";

import { aboutData } from "@/data/about";

export default function About() {
  const pinRef = useRef<HTMLElement>(null); // full-screen viewport that gets pinned
  const trackRef = useRef<HTMLDivElement>(null); // wide strip that moves sideways

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const slides = gsap.utils.toArray<HTMLElement>(".slide", track);
      if (slides.length < 2) return;

      // Real horizontal distance, recalculated on every refresh/resize
      const getDistance = () => track.scrollWidth - window.innerWidth;

      const horizontal = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${getDistance()}`, // 1px scroll = 1px sideways movement
          scrub: 0.8,
          invalidateOnRefresh: true,
          // Soft magnet toward each slide so transitions feel intentional
          snap: {
            snapTo: 1 / (slides.length - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.05,
            ease: "power2.inOut",
          },
        },
      });

      // Per-slide content reveal, driven by the horizontal tween
      slides.forEach((slide, index) => {
        if (index === 0) return;
        const elements = slide.querySelectorAll("h2, h3, p, img");
        if (!elements.length) return;

        gsap.from(elements, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: slide,
            containerAnimation: horizontal,
            start: "left 70%", // horizontal axis: slide's left edge at 70% of viewport width
            toggleActions: "play none none reverse",
          },
        });
      });

      // Images/fonts change layout after mount; re-measure once everything is loaded
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    },
    { scope: pinRef },
  );

  return (
    <section
      ref={pinRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      <div ref={trackRef} className="flex h-full w-max will-change-transform">
        <div className="slide relative flex h-full w-screen shrink-0 flex-col justify-center">
          <AboutSection data={aboutData} />
        </div>

        <div className="slide relative flex h-full w-screen shrink-0 flex-col justify-center">
          <TechnicalForge />
        </div>

        <div className="slide relative flex h-full w-screen shrink-0 flex-col justify-center">
          <SoftSkills />
        </div>
      </div>
    </section>
  );
}
