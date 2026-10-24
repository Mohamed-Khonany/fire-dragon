"use client";
import { Line, Path } from "@/components/UI/animated-path/animated-path";
import { usePathname } from "next/navigation";
import { useState, type MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "../../animated-path/animated-path.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

type NavLink = {
  /** id of the wrapper element in page.tsx (<div id="about">…</div>) */
  id: string;
  label: string;
  /**
   * When this link becomes active / inactive, as ScrollTrigger positions
   * "<element edge> <viewport edge>". Defaults: "top center" -> "bottom center",
   * i.e. active while the section covers the middle of the screen.
   */
  activeStart?: string;
  activeEnd?: string;
};

const navLinks: NavLink[] = [
  // The banner's last stretch is the "About me" word zooming in, so About becomes
  // active as soon as the banner pin ends ("top bottom") instead of half a screen later.
  // Home's end and About's start are the same scroll position, so they hand over cleanly.
  {
    id: "home",
    label: "Home",
    activeStart: "top top",
    activeEnd: "bottom top",
  },
  {
    id: "about",
    label: "About",
    activeStart: "top bottom",
    activeEnd: "+=6450",
  },
  { id: "projects", label: "Projects", activeStart: "top bottom" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export const NavLinks = () => {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("home");

  /* ---------- active link follows the section in view ---------- */
  useGSAP(
    () => {
      const triggers = navLinks.map((link) => {
        const el = document.getElementById(link.id);
        if (!el) return null; // section doesn't exist (yet) -> link just never activates

        return ScrollTrigger.create({
          trigger: el,
          start: link.activeStart ?? "top center",
          end: link.activeEnd ?? "bottom center",
          // refresh AFTER the pinned sections have added their spacing,
          // otherwise the start/end of everything below a pin would be off
          refreshPriority: -1,
          markers: true,
          // only the section that just became active writes the state; the one that
          // just became inactive does nothing, so there's never a "no active" flicker
          onToggle: (self) => {
            if (self.isActive) setActiveId(link.id);
          },
        });
      });

      return () => triggers.forEach((t) => t?.kill());
    },
    // re-run after client-side route changes, when the sections may have just mounted
    { dependencies: [pathname] },
  );

  /* ---------- click = smooth scroll, no routing ---------- */
  const handleClick = (e: MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    e.preventDefault();

    const smoother = ScrollSmoother.get();
    // smoother is paused while the loader is playing
    if (!smoother || smoother.paused()) return;

    if (link.id === "home") {
      smoother.scrollTo(0, true);
      return;
    }

    const el = document.getElementById(link.id);
    if (!el) return;
    smoother.scrollTo(el, true, link.id === "about" ? "-=780 top" : "top top");
  };

  return (
    <nav className="hidden xl:flex items-center justify-center gap-5 py-7">
      {navLinks.map((link) => {
        const isActive = activeId === link.id;
        return (
          <div
            className="fire-wrapper h-5 w-30 relative flex items-center justify-center"
            key={link.id}
          >
            {isActive ? (
              <svg
                className="fire-ai-bg absolute inset-0 m-auto pointer-events-none"
                style={{ fill: "none" }}
                viewBox="0 0 200 40"
                width="180"
                height="40"
              >
                <Path d="M15,30 H50 C70,30 70,5 100,5 H120" strokeWidth={3} />
                <circle className="fire-dot" cx="15" cy="30" r="2" />
                <circle className="fire-dot" cx="120" cy="5" r="2" />
              </svg>
            ) : (
              <svg
                className="fire-ai-bg absolute inset-0 m-auto pointer-events-none"
                style={{ fill: "none" }}
                viewBox="0 0 200 40"
                width="180"
                height="40"
              >
                <path
                  d="M15,30 H50 C70,30 70,5 100,5 H120"
                  strokeWidth={1}
                  className="stroke-white/10"
                />
                <circle className="stroke-white/10" cx="15" cy="30" r="2" />
                <circle className="stroke-white/10" cx="120" cy="5" r="2" />
              </svg>
            )}
            <a
              className={`${isActive ? "text-transparent bg-clip-text bg-linear-to-r from-primary-container to-secondary hover:drop-shadow-[0_0_12px_#ffb000]" : "text-on-surface hover:text-on-surface hover:drop-shadow-[0_0_12px_#ffb000]"} font-bold uppercase tracking-wider hover:scale-105 transition-all duration-300`}
              href={`#${link.id}`}
              aria-current={isActive ? "true" : undefined}
              onClick={(e) => handleClick(e, link)}
            >
              {link.label}
            </a>
          </div>
        );
      })}
    </nav>
  );
};
