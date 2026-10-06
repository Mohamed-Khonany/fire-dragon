"use client";

import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AboutSection from "./aboutHero/aboutsection";
import TechnicalForge from "./technicalForege/technicalForge";
import SoftSkills from "./softSkills/softSkills";

import { aboutData } from "@/data/about";
import AnimatedAbout from "@/components/UI/animated-path/animated-about";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const slides = gsap.utils.toArray<HTMLElement>(".slide");
      if (!slides.length) return;

      const getScrollDistance = () => {
        return track.scrollWidth - window.innerWidth;
      };

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // snap: {
          //   snapTo: 1 / (slides.length - 1),
          //   duration: { min: 0.2, max: 0.5 },
          //   delay: 0.05,
          //   ease: "power2.inOut",
          // },
        },
      });

      slides.forEach((slide, index) => {
        if (index === 0) return;

        const elements = slide.querySelectorAll<HTMLElement>(
          "h2, h3, p, img"
        );

        if (!elements.length) return;

        gsap.fromTo(
          elements,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",

            scrollTrigger: {
              trigger: slide,

              /*
               * This allows ScrollTrigger to understand
               * that the slide is moving horizontally.
               */
              containerAnimation: horizontalTween,

              start: "left 75%",

              toggleActions: "play reverse play reverse",

              invalidateOnRefresh: true,
            },
          }
        );
      });

      const handleLoad = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("load", handleLoad);

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background"
    >

      <div className="pointer-events-none absolute inset-0 z-0">
        <AnimatedAbout />
      </div>

      <div
        ref={trackRef}
        className="flex h-screen w-max will-change-transform"
      >
        {/* Slide 1 */}
        <div className="slide relative flex h-screen w-screen shrink-0 flex-col justify-center">
          <AboutSection data={aboutData} />
        </div>

        {/* Slide 2 */}
        <div className="slide relative flex h-screen w-screen shrink-0 flex-col justify-center">
          <TechnicalForge />
        </div>

        {/* Slide 3 */}
        <div className="slide relative flex h-screen w-screen shrink-0 flex-col justify-center">
          <SoftSkills />
        </div>
      </div>
    </section>
  );
}