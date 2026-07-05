"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ProjectSection from "./projectSection";

export default function ProjectsPage() {
  return (
    <div className="font-body-md text-body-md bg-background text-on-background antialiased relative min-h-screen pt-24 md:pt-32">
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-lg flex justify-center gap-4 flex-wrap">
        <button className="px-6 py-2 rounded-full border border-primary text-primary bg-primary/10 font-label-mono text-label-mono fire-glow transition-all">
          All
        </button>
        <button className="px-6 py-2 rounded-full border border-white/10 text-on-surface-variant hover:border-primary/50 hover:text-primary bg-surface/50 font-label-mono text-label-mono transition-all">
          React / Web
        </button>
        <button className="px-6 py-2 rounded-full border border-white/10 text-on-surface-variant hover:border-primary/50 hover:text-primary bg-surface/50 font-label-mono text-label-mono transition-all">
          React Native / Mobile
        </button>
      </section>

      <ProjectSection />

      {/* <!-- Standard Grid (Placeholders) --> */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* <!-- Placeholder 1 --> */}
          <div
            aria-hidden="true"
            className="glass-panel rounded-xl p-12 border-dashed border-2 border-white/10 hover:border-primary/50 transition-colors flex flex-col items-center justify-center text-center h-[400px]"
          >
            <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4 opacity-50">
              architecture
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface-variant mb-2">
              Project Genesis
            </h3>
            <p className="font-label-mono text-label-mono text-primary uppercase tracking-widest">
              Coming Soon
            </p>
          </div>
          {/* <!-- Placeholder 2 --> */}
          <div
            aria-hidden="true"
            className="glass-panel rounded-xl p-12 border-dashed border-2 border-white/10 hover:border-primary/50 transition-colors flex flex-col items-center justify-center text-center h-[400px]"
          >
            <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4 opacity-50">
              data_object
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface-variant mb-2">
              System Core
            </h3>
            <p className="font-label-mono text-label-mono text-primary uppercase tracking-widest">
              In Development
            </p>
          </div>
        </div>
      </section>
      {/* <!-- Open to Work Banner --> */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-stack-xl">
        <div className="relative rounded-2xl overflow-hidden glass-panel border border-primary/20 p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-4 relative z-10">
            Have a project in mind?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-8 relative z-10">
            I'm currently open for new opportunities and freelance projects.
            Let's build something exceptional together.
          </p>
          <button className="bg-gradient-to-r from-primary-container to-inverse-primary text-on-primary-container px-8 py-4 rounded-full font-label-mono text-label-mono uppercase tracking-widest magnetic-btn fire-glow-strong inline-flex items-center gap-2 relative z-10 hover:scale-105 transition-transform duration-300">
            <span>Let's Talk</span>
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Simple (non-flip) card for the standard grid — the featured
// card already carries full detail, so grid cards stay lighter.
// ─────────────────────────────────────────────────────────────
function SimpleProjectCard({
  project,
  index,
  isRTL,
}: {
  project: RealProject;
  index: number;
  isRTL: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const hasDemo = Boolean(project.primaryLink);
  return (
    <motion.div
      layout
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.35,
        delay: prefersReducedMotion ? 0 : index * 0.08,
      }}
      className="flex flex-col justify-between rounded-xl border-t-[3px] border-[#FF6B00] bg-black p-5 shadow-[0_0_20px_rgba(255,107,0,0.25)] transition-shadow duration-200 hover:shadow-[0_0_28px_rgba(255,107,0,0.4)]"
    >
      <div>
        <span className="mb-3 inline-block rounded-full bg-[#FF6B00]/10 px-2.5 py-1 font-mono text-xs text-[#FF6B00]/70">
          {isRTL ? project.categoryBadgeAr : project.categoryBadge}
        </span>
        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
        <p className="mt-2 text-sm text-[#F5F0E8]">
          {isRTL ? project.oneLineSummaryAr : project.oneLineSummary}
        </p>
      </div>
      <div
        className={`mt-4 flex flex-wrap gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-[#FFB800]/10 px-2.5 py-1 font-mono text-xs text-[#FFB800]"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className={`mt-4 flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
        {hasDemo ? (
          <a
            href={project.primaryLink!.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              isRTL
                ? project.primaryLink!.ariaLabelAr
                : project.primaryLink!.ariaLabel
            }
            className="flex-1 rounded-md bg-[#FF6B00] px-3 py-1.5 text-center text-xs font-medium text-white transition hover:brightness-110"
          >
            {isRTL ? project.primaryLink!.labelAr : project.primaryLink!.label}
          </a>
        ) : (
          <span
            title="Coming Soon"
            className="flex-1 cursor-not-allowed rounded-md border border-[#FF8C00]/40 px-3 py-1.5 text-center text-xs text-[#FF8C00]/40"
          >
            {isRTL ? "[Arabic translation pending]" : "Coming Soon"}
          </span>
        )}
        {project.secondaryLink && (
          <a
            href={project.secondaryLink.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              isRTL
                ? project.secondaryLink.ariaLabelAr
                : project.secondaryLink.ariaLabel
            }
            className="flex-1 rounded-md border border-[#FF6B00] px-3 py-1.5 text-center text-xs font-medium text-[#FF6B00] transition hover:bg-[#FF6B00]/10"
          >
            {isRTL
              ? project.secondaryLink.labelAr
              : project.secondaryLink.label}
          </a>
        )}
      </div>
    </motion.div>
  );
}

function PlaceholderCard({ index, isRTL }: { index: number; isRTL: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      layout
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.35,
        delay: prefersReducedMotion ? 0 : index * 0.08,
      }}
      role="presentation"
      aria-hidden="true"
      className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-[#FF8C00]/50 bg-black p-5"
    >
      <span className="font-mono text-sm text-[#FF8C00]">
        {isRTL ? "[Arabic translation pending]" : "🔧 Coming Soon"}
      </span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Ambient background: faint drifting circuit nodes. Purely
// decorative — never intercepts pointer events.
// ─────────────────────────────────────────────────────────────
function AmbientCircuitBackground() {
  const nodes = [
    { x: "10%", y: "20%", d: 0 },
    { x: "80%", y: "15%", d: 1.2 },
    { x: "30%", y: "70%", d: 0.6 },
    { x: "65%", y: "60%", d: 1.8 },
    { x: "90%", y: "80%", d: 0.9 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#FFB800]"
          style={{ left: n.x, top: n.y }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4 + n.d, repeat: Infinity, delay: n.d }}
        />
      ))}
    </div>
  );
}

// Diagonal scan-line sweep for the screenshot placeholder.
function ScanLineSweep() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-[#FF6B00]/10 to-transparent"
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  );
}
