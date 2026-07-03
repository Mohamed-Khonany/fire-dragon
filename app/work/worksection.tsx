"use client";

/**
 * WorkExperienceSection.tsx
 * ─────────────────────────────────────────────────────────────
 * "Fire Dragon" portfolio — Work Experience section
 * Brand: molten circuit board (dark, premium, technical)
 *
 * Requires: tailwindcss, framer-motion, next/image, lucide-react
 *   npm install framer-motion lucide-react
 *
 * ASSETS TO ADD (see TODOs below):
 *   /public/logos/codid.png                        – Codid company logo
 *   /public/logos/studbook.png                      – Studbook app icon
 *   /public/logos/buildup.png                        – Buildup app icon
 *   /public/screenshots/studbook-1.png .. -3.png     – Studbook screenshots (carousel)
 *   /public/screenshots/buildup-1.png .. -3.png      – Buildup screenshots (carousel)
 *
 * NOTE: this assumes your Tailwind theme defines the `surface-container-lowest`
 * design token (Material-3-style token) used for the section background, e.g.
 *   colors: { 'surface-container-lowest': 'var(--md-sys-color-surface-container-lowest)' }
 * Swap the class below for a plain hex if you don't have that token set up.
 * ─────────────────────────────────────────────────────────────
 */

import {
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FaGooglePlay, FaAppStoreIos } from "react-icons/fa";

import CodidLogo from "../../assets/images/logo/codid.jpg";
import StudbookLogo from "../../assets/images/logo/studbook.png";
import BuildupLogo from "../../assets/images/logo/buildup..png";

import StudbookScreenshot1 from "../../assets/images/studbook/1.webp";
import StudbookScreenshot2 from "../../assets/images/studbook/2.webp";
import StudbookScreenshot3 from "../../assets/images/studbook/3.webp";
import StudbookScreenshot4 from "../../assets/images/studbook/4.webp";
import StudbookScreenshot5 from "../../assets/images/studbook/5.webp";

import BuildupScreenshot1 from "../../assets/images/buildup/1.webp";
import BuildupScreenshot2 from "../../assets/images/buildup/2.webp";
import BuildupScreenshot3 from "../../assets/images/buildup/3.webp";
import BuildupScreenshot4 from "../../assets/images/buildup/4.webp";
import BuildupScreenshot5 from "../../assets/images/buildup/5.webp";
import BuildupScreenshot6 from "../../assets/images/buildup/6.webp";

import Link from "next/link";

// ─────────────────────────────────────────────────────────────
// Types & data
// ─────────────────────────────────────────────────────────────

type StoreLink = { label: "Google Play" | "App Store"; href: string };

type SubProject = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logoSrc: string;
  screenshots: string[];
  storeLinks: StoreLink[];
  achievements: string[];
};

type Experience = {
  id: string;
  company: string;
  companyUrl: string;
  companyLogoSrc: string;
  role: string;
  dateRange: string;
  durationLabel: string;
  subProjects: SubProject[];
};

const EXPERIENCE: Experience = {
  id: "codid",
  company: "Codid",
  companyUrl: "https://codid.net/",
  companyLogoSrc: CodidLogo.src,
  role: "React Native Developer",
  dateRange: "2024 – 2026",
  durationLabel: "~2 years",
  subProjects: [
    {
      id: "studbook",
      name: "Studbook",
      tagline: "Pedigree & events platform for Arabian horse breeders",
      description:
        "Pedigree and events platform for Arabian horse breeders and enthusiasts, providing access to horse pedigrees, stud profiles, and an events library.",
      logoSrc: StudbookLogo.src,
      screenshots: [
        StudbookScreenshot1.src,
        StudbookScreenshot2.src,
        StudbookScreenshot3.src,
        StudbookScreenshot4.src,
        StudbookScreenshot5.src,
      ],
      storeLinks: [
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.codid.studbook",
        },
        {
          label: "App Store",
          href: "https://apps.apple.com/eg/app/studbook/id6670400746",
        },
      ],
      achievements: [
        "Built the Store and Services features from scratch — from UI design through backend data integration",
        "Resolved numerous bugs, including incorrect data-binding issues causing misleading data display",
        "Optimized UI components across several screens to improve app performance",
      ],
    },
    {
      id: "buildup",
      name: "Buildup",
      tagline: "Build-Up Egypt — digital services for athletes",
      description:
        "A comprehensive sports platform providing digital services for individual and team athletes across the sports ecosystem.",
      logoSrc: BuildupLogo.src,
      screenshots: [
        BuildupScreenshot1.src,
        BuildupScreenshot2.src,
        BuildupScreenshot3.src,
        BuildupScreenshot4.src,
        BuildupScreenshot5.src,
        BuildupScreenshot6.src,
      ],
      storeLinks: [
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.xinity.circle",
        },
        {
          label: "App Store",
          href: "https://apps.apple.com/eg/app/build-up-egypt/id6741387343",
        },
      ],
      achievements: [
        "Built and enhanced the Profile and Achievements features — from UI design through backend integration",
        "Resolved bugs and corrected backend integration issues causing incorrect data rendering",
        "Optimized UI elements to improve app performance",
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// Small building blocks
// ─────────────────────────────────────────────────────────────

/** Logo image with a graceful "unlit circuit node" fallback if the file is missing. */
function LogoBadge({
  src,
  alt,
  fallbackLetter,
  size = 56,
}: {
  src: string;
  alt: string;
  fallbackLetter: string;
  size?: number;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-xl border"
      style={{
        width: size,
        height: size,
        borderColor: "rgba(255,107,0,0.4)",
        background: "#0a0a0a",
      }}
    >
      {!errored ? (
        // TODO: place the real logo file at the given `src` path in /public
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="object-contain transition-opacity duration-300"
          onError={() => setErrored(true)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center font-semibold"
          style={{ color: "#FFB800", fontFamily: "Inter, Outfit, sans-serif" }}
          aria-hidden="true"
        >
          {fallbackLetter}
        </div>
      )}
    </div>
  );
}

function StoreLinkButton({ link }: { link: StoreLink }) {
  const isGoogle = link.label === "Google Play";

  return (
    <Link
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/60 hover:bg-white/10"
    >
      <div className="absolute inset-0 bg-linear-to-r from-orange-500/10 via-transparent to-yellow-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center gap-3 md:px-4 px-2 py-3">
        <div className="flex h-9 md:w-9 w-7 items-center justify-center rounded-lg bg-black/20">
          {isGoogle ? (
            <FaGooglePlay size={20} className="text-[#34A853]" />
          ) : (
            <FaAppStoreIos size={22} className="text-[#0A84FF]" />
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-gray-400">
            Download on
          </span>

          <span className="font-semibold text-sm text-white">{link.label}</span>
        </div>

        <ExternalLink className="ml-auto h-4 w-4 text-orange-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
      </div>
    </Link>
  );
}

/** Big auto-rotating banner carousel with manual prev/next + dot controls. */
function ImageCarousel({
  images,
  alt,
  fallbackLetter,
}: {
  images: string[];
  alt: string;
  fallbackLetter: string;
}) {
  const [index, setIndex] = useState(0);
  const [errored, setErrored] = useState<Record<number, boolean>>({});
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const validImages = images.filter((_, i) => !errored[i]);
  const count = images.length;

  useEffect(() => {
    if (prefersReducedMotion || isHovering || count <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 4000);
    return () => clearInterval(t);
  }, [prefersReducedMotion, isHovering, count]);

  if (count === 0 || validImages.length === 0) {
    return (
      <div
        className="flex aspect-[3/4] w-full items-center justify-center rounded-xl border sm:aspect-[4/5] sm:max-h-[560px]"
        style={{ borderColor: "rgba(255,107,0,0.3)", background: "#0a0a0a" }}
      >
        <span
          className="text-3xl font-bold"
          style={{ color: "rgba(255,184,0,0.5)" }}
          aria-hidden="true"
        >
          {fallbackLetter}
        </span>
      </div>
    );
  }

  return (
    <div
      className="group relative w-full overflow-hidden rounded-xl border"
      style={{ borderColor: "rgba(255,107,0,0.35)", background: "#0a0a0a" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Big image stage — portrait ratio + object-contain so phone-mockup
          screenshots (tall images) show in full instead of being cropped. */}
      <div className="relative aspect-[3/4] w-full sm:aspect-[4/5] sm:max-h-[560px]">
        {images.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            {!errored[i] ? (
              // TODO: place real screenshots at these paths in /public/screenshots
              <Image
                src={src}
                alt={`${alt} screenshot ${i + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 480px"
                className="object-contain"
                onError={() => setErrored((e) => ({ ...e, [i]: true }))}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span
                  className="text-3xl font-bold"
                  style={{ color: "rgba(255,184,0,0.4)" }}
                >
                  {fallbackLetter}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Manual controls */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + count) % count)}
            aria-label={`Previous ${alt} screenshot`}
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 focus-visible:outline focus-visible:outline-2"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: "#FFB800",
              outlineColor: "#FF6B00",
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % count)}
            aria-label={`Next ${alt} screenshot`}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 focus-visible:outline focus-visible:outline-2"
            style={{
              background: "rgba(0,0,0,0.55)",
              color: "#FFB800",
              outlineColor: "#FF6B00",
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to ${alt} screenshot ${i + 1}`}
                aria-current={i === index}
                className="h-1.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2"
                style={{
                  width: i === index ? 20 : 6,
                  background: i === index ? "#FF6B00" : "rgba(255,184,0,0.4)",
                  outlineColor: "#FF6B00",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SubProjectBlock({ project }: { project: SubProject }) {
  return (
    <div className="py-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <LogoBadge
          src={project.logoSrc}
          alt={`${project.name} app icon`}
          fallbackLetter={project.name[0]}
        />
        <div className="min-w-0">
          <h4
            className="font-semibold text-white text-xl"
            style={{ fontFamily: "Inter, Outfit, sans-serif" }}
          >
            {project.name}
          </h4>
          <span className="text-sm" style={{ color: "rgba(255,140,0,0.7)" }}>
            {project.tagline}
          </span>
        </div>
      </div>

      {/* Left: all text info · Right: image carousel — stacks on mobile,
          sits side by side from lg up so the row uses the full section width. */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-10">
        <div className="min-w-0">
          <p className="pb-4 leading-relaxed" style={{ color: "#F5F0E8" }}>
            {project.description}
          </p>

          <ul className="space-y-1.5">
            {project.achievements.map((point, i) => (
              <li key={i} className="flex gap-2" style={{ color: "#F5F0E8" }}>
                <span style={{ color: "#FFCC00" }} aria-hidden="true">
                  ▸
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.storeLinks.map((link) => (
              <StoreLinkButton key={link.label} link={link} />
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <ImageCarousel
            images={project.screenshots}
            alt={project.name}
            fallbackLetter={project.name[0]}
          />
        </div>
      </div>
    </div>
  );
}

/** A divider between sub-projects that ignites left → right as the
 * timeline's traveling point reaches its height on scroll. */
function LightingDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Fires as this specific divider crosses the same viewport band the
  // main timeline point travels through, so it "catches" right when the
  // point reaches it.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.45"],
  });
  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glow = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]);

  return (
    <div
      ref={ref}
      className="relative h-px w-full overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(255,107,0,0.15)" }}
      />
      <motion.div
        className="absolute inset-y-0 left-0"
        style={{
          width: prefersReducedMotion ? "100%" : fillWidth,
          background: "linear-gradient(90deg, #FFCC00, #FF6B00)",
          opacity: prefersReducedMotion ? 1 : glow,
          boxShadow: "0 0 8px 1px rgba(255,184,0,0.65)",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────────────────────

export default function WorkExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll-linked "lighting" — the line lights up and the point travels
  // down as the entry scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.35"],
  });
  const litHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const fadeUp = {
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  return (
    <section
      id="work-experience"
      className="w-full bg-background px-4 py-20 sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-4xl ">
        <motion.div
          {...fadeUp}
          className="mb-12 justify-center text-center items-center flex flex-col gap-2"
        >
          <h2
            className="inline-block text-2xl font-semibold text-white sm:text-3xl"
            style={{ fontFamily: "Inter, Outfit, sans-serif" }}
          >
            Work Experience
          </h2>
          <div
            className="h-0.75 w-20 rounded-full"
            style={{ background: "#FF6B00" }}
          />
        </motion.div>

        <motion.article {...fadeUp} className="relative pb-6">
          <div className="flex items-start gap-4">
            <LogoBadge
              src={EXPERIENCE.companyLogoSrc}
              alt={`${EXPERIENCE.company} logo`}
              fallbackLetter={EXPERIENCE.company[0]}
              size={96}
            />
            <div className="min-w-0 flex-1 justify-center mt-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <div className="flex flex-col gap-0.5 text-center justify-center">
                  <Link
                    href={EXPERIENCE.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-bold text-3xl text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                      fontFamily: "Inter, Outfit, sans-serif",
                      outlineColor: "#FF6B00",
                    }}
                  >
                    {EXPERIENCE.company}
                    <ExternalLink
                      className="h-3.5 w-3.5"
                      style={{ color: "#FF8C00" }}
                    />
                  </Link>
                  <p
                    className="mt-0.5 text-lg font-semibold"
                    style={{ color: "#FFB800", fontFamily: "monospace" }}
                  >
                    {EXPERIENCE.role}
                  </p>
                </div>
                <div className="flex md:flex-col md:gap-0.5 gap-3 text-center justify-center md:text-lg md:font-medium text-sm">
                  <span
                    style={{ color: "rgba(255,140,0,0.7)" }}
                  >
                    {EXPERIENCE.dateRange}
                  </span>
                  <span
                    style={{ color: "rgba(255,140,0,0.7)" }}
                  >
                    {EXPERIENCE.durationLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.article>

        <div ref={timelineRef} className="relative pl-6 sm:pl-10">
          {/* Base rail — unlit / dim by default */}
          <div
            className="absolute left-0 top-1 hidden h-[calc(100%-8px)] w-px sm:block"
            style={{ background: "rgba(255,107,0,0.15)" }}
            aria-hidden="true"
          />

          {/* Lit portion — grows as you scroll, tracks the traveling point */}
          <motion.div
            className="absolute left-0 top-1 hidden w-px sm:block"
            style={{
              height: litHeight,
              background: "linear-gradient(180deg, #FFCC00, #FF6B00)",
              boxShadow: "0 0 8px 1px rgba(255,184,0,0.65)",
            }}
            aria-hidden="true"
          />

          {/* Traveling glowing point */}
          <motion.span
            className="absolute -left-[5px] hidden h-3 w-3 rounded-full sm:block"
            style={{
              top: dotTop,
              translateY: "-50%",
              background: "#FFCC00",
              boxShadow: "0 0 14px 4px rgba(255,204,0,0.75)",
            }}
            aria-hidden="true"
          />

          {/* Mobile: simple lit left border, always on */}
          <div
            className="absolute left-0 top-0 h-full w-[3px] rounded-full sm:hidden"
            style={{ background: "#FF6B00" }}
            aria-hidden="true"
          />

          {/* ── Codid entry — full-width, no card border, just the surface bg ── */}
          <motion.article {...fadeUp} className="relative">
            <div className="mt-2">
              {EXPERIENCE.subProjects.map((project, i) => (
                <Fragment key={project.id}>
                  {i > 0 && <LightingDivider />}
                  <SubProjectBlock project={project} />
                </Fragment>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
