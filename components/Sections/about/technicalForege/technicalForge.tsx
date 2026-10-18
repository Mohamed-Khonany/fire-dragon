"use client";

import { useRef } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CATEGORIES } from "./categories";
import { SkillCard } from "./skillCard";
import { useAboutScroll } from "../aboutScroll";
import GradientText from "@/components/UI/fireSpan/gradientText";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TechnicalForge() {
  const [row1, row2] = [CATEGORIES.slice(0, 3), CATEGORIES.slice(3)];

  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Horizontal-scroll tween (desktop) or null (normal vertical scroll on mobile/tablet).
  const horizontalTween = useAboutScroll();

  useGSAP(
    () => {
      const root = rootRef.current;
      const title = titleRef.current;
      if (!root || !title) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          hover: "(hover: hover) and (pointer: fine)",
        },
        (context) => {
          const { motion, hover } = context.conditions as Record<
            string,
            boolean
          >;

          const horizontal = !!horizontalTween;
          const link = horizontalTween
            ? { containerAnimation: horizontalTween }
            : {};
          const at = (h: string, v: string) => (horizontal ? h : v);
          const cleanups: Array<() => void> = [];

          if (motion) {
            /* ============================================================ */
            /* 1) TITLE: always visible. A "snake" travels through the      */
            /*    letters (first -> last on scroll down, last -> first on   */
            /*    scroll up). Each letter scrambles when the head hits it.  */
            /* ============================================================ */

            /* ============================================================ */
            /* 2) CONTENT comes second: desktop cards enter only once the   */
            /*    title is almost done; mobile cards enter as they scroll   */
            /*    into view (they are already below the title).             */
            /* ============================================================ */
            const wraps = gsap.utils.toArray<HTMLElement>(
              ".forge-card-wrap",
              root,
            );
            const enter = (
              tl: gsap.core.Timeline,
              wrap: HTMLElement,
              at0: number | string,
            ) => {
              const badges = wrap.querySelectorAll<HTMLElement>(".skill-badge");
              tl.from(
                wrap,
                {
                  y: 60,
                  opacity: 0,
                  scale: 0.94,
                  duration: 0.8,
                  ease: "power3.out",
                },
                at0,
              ).from(
                badges,
                {
                  scale: 0.4,
                  opacity: 0,
                  y: 12,
                  duration: 0.5,
                  ease: "back.out(1.8)",
                  stagger: 0.05,
                },
                typeof at0 === "number" ? at0 + 0.35 : "<0.35",
              );
            };

            if (horizontal) {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: title,
                  start: "center 55%",
                  toggleActions: "play none none reverse",
                  ...link,
                },
              });
              wraps.forEach((wrap, i) => enter(tl, wrap, 0.15 + i * 0.14));
            } else {
              wraps.forEach((wrap) => {
                const tl = gsap.timeline({
                  scrollTrigger: {
                    trigger: wrap,
                    start: "top 88%",
                    toggleActions: "play none none reverse",
                  },
                });
                enter(tl, wrap, 0);
              });
            }
          }

          /* ================================================================ */
          /* 3) CARD HOVER: scale + free 3D tilt + parallax + glare           */
          /* ================================================================ */
          if (hover) {
            const cards = gsap.utils.toArray<HTMLElement>(".skill-card", root);
            const IDLE_SHADOW = "0 0 0 0 rgba(249,115,22,0)";
            const IDLE_BORDER = "rgba(255,255,255,0.1)";

            gsap.set(cards, {
              borderColor: IDLE_BORDER,
              boxShadow: IDLE_SHADOW,
              transformPerspective: 900,
              transformStyle: "preserve-3d",
            });

            let resetCall: gsap.core.Tween | undefined;

            // hovered card grows, the others step back
            const apply = (active: HTMLElement | null) => {
              resetCall?.kill();
              cards.forEach((card) => {
                const isActive = card === active;
                const isDim = !!active && !isActive;
                gsap.to(card, {
                  scale: isActive ? 1.08 : isDim ? 0.94 : 1,
                  opacity: isDim ? 0.4 : 1,
                  borderColor: isActive ? "rgba(251,146,60,0.5)" : IDLE_BORDER,
                  boxShadow: isActive
                    ? "0 30px 70px -20px rgba(249,115,22,0.4)"
                    : IDLE_SHADOW,
                  duration: 0.5,
                  ease: "power3.out",
                  overwrite: "auto",
                });
                gsap.set(card, { zIndex: isActive ? 20 : 1 });
              });
            };

            const release = () => {
              resetCall = gsap.delayedCall(0.08, () => apply(null));
            };

            cards.forEach((card) => {
              const wrap = card.parentElement as HTMLElement;
              const glare = card.querySelector<HTMLElement>(".skill-glare");
              const depth = card.querySelector<HTMLElement>(".skill-depth");
              if (!glare || !depth) return;

              gsap.set(depth, { z: 28 });

              const o = (duration: number) => ({
                duration,
                ease: "power3.out",
              });
              const rotX = gsap.quickTo(card, "rotationX", o(0.6));
              const rotY = gsap.quickTo(card, "rotationY", o(0.6));
              const moveX = gsap.quickTo(card, "x", o(0.8));
              const moveY = gsap.quickTo(card, "y", o(0.8));
              const depthX = gsap.quickTo(depth, "x", o(0.9));
              const depthY = gsap.quickTo(depth, "y", o(0.9));

              const unit = gsap.utils.clamp(0, 1);

              const onEnter = () => {
                apply(card);
                moveY(-8);
              };

              const onMove = (e: PointerEvent) => {
                if (e.pointerType !== "mouse") return;
                // measure the (un-tilted) wrapper so the maths stays stable while the card rotates
                const r = wrap.getBoundingClientRect();
                const x = unit((e.clientX - r.left) / r.width);
                const y = unit((e.clientY - r.top) / r.height);

                rotY((x - 0.5) * 22);
                rotX(-(y - 0.5) * 22);
                moveX((x - 0.5) * 18);
                moveY(-8 + (y - 0.5) * 18);
                depthX(-(x - 0.5) * 16);
                depthY(-(y - 0.5) * 16);

                glare.style.setProperty("--mx", `${x * 100}%`);
                glare.style.setProperty("--my", `${y * 100}%`);
                gsap.to(glare, {
                  opacity: 1,
                  duration: 0.3,
                  overwrite: "auto",
                });
              };

              const onLeave = () => {
                rotX(0);
                rotY(0);
                moveX(0);
                moveY(0);
                depthX(0);
                depthY(0);
                gsap.to(glare, {
                  opacity: 0,
                  duration: 0.5,
                  overwrite: "auto",
                });
                release();
              };

              card.addEventListener("pointerenter", onEnter);
              card.addEventListener("pointermove", onMove);
              card.addEventListener("pointerleave", onLeave);
              card.addEventListener("focusin", onEnter);
              card.addEventListener("focusout", onLeave);
              cleanups.push(() => {
                card.removeEventListener("pointerenter", onEnter);
                card.removeEventListener("pointermove", onMove);
                card.removeEventListener("pointerleave", onLeave);
                card.removeEventListener("focusin", onEnter);
                card.removeEventListener("focusout", onLeave);
              });
            });
          }

          return () => cleanups.forEach((fn) => fn());
        },
      );

      return () => mm.revert();
    },
    {
      scope: rootRef,
      dependencies: [horizontalTween],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={rootRef}
      className="flex flex-col items-center justify-center px-4 lg:px-8 lg:pt-16"
    >
      {/* soft vignette so the cards sit in a pool of light rather than flat black */}

      {/* big gap on desktop: the title is read first, the content second */}
      <div className="relative flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-60">
        <div
          className="flex flex-col items-center gap-4 lg:[writing-mode:vertical-rl] lg:rotate-180"
        >
          <h1 className="text-center lg:text-3xl text-2xl font-semibold uppercase tracking-[0.35em] text-zinc-300">
            Technical <GradientText inline={true}>Skills</GradientText>
          </h1>
          <span className="h-0.5 w-28 rounded-full bg-linear-to-r from-primary-container to-secondary lg:h-28 lg:w-0.5 lg:bg-linear-to-b" />
        </div>

        <div className="flex w-full flex-col items-center gap-6 xl:gap-8">
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:items-stretch gap-10">
            {row1.map((category) => (
              <SkillCard key={category.title} {...category} />
            ))}
          </div>

          <div className="grid w-full mx-auto grid-cols-1 gap-8 sm:grid-cols-2 lg:w-2/3">
            {row2.map((category) => (
              <SkillCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
