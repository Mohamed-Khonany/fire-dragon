"use client";

import { FireSpan } from "@/components/UI/fireSpan/fire";
import { CourseTag, EDUCATION } from "./CourseTag";
import SCILogo from "@/public/assets/images/logo/SCI.png";
import Image from "next/image";

/**
 * ---------------------------------------------------------------------------
 * Education — full section with heading + card
 * ---------------------------------------------------------------------------
 */
export default function Education() {
  const { degree, institution, graduatedYear, coursework } = EDUCATION;

  return (
    <section className="relative w-full px-6 py-20 md:px-14">
      {/* ── Section heading ──────────────────────────────────────────────── */}
      <div className="mb-10 flex flex-col items-center gap-2">
        <h1 className="text-center text-lg font-semibold uppercase tracking-[0.35em] text-zinc-300">
          <FireSpan>Education</FireSpan>
        </h1>
        <span className="h-0.5 w-24 rounded-full bg-linear-to-r from-primary-container to-secondary" />
      </div>

      {/* ── Card ─────────────────────────────────────────────────────────── */}
      <div className="edu-card mx-auto max-w-6xl rounded-2xl border border-white/[0.08] bg-[#0f0e0d] md:p-10 p-5 transition-all duration-500 hover:border-orange-500/20 hover:shadow-[0_0_40px_rgba(249,115,22,0.07)]">
        {/* Degree row */}
        <div className="flex flex-row gap-1 md:flex-row md:items-start md:justify-between md:text-3xl text-xl font-semibold text-zinc-100">
          <div className="flex flex-row gap-3 items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full">
              <Image
                src={SCILogo}
                className="flex h-20 w-20 rounded-full"
                alt="SCI-Logo"
              />
            </div>
            <div>
              <h3 className="font-bold md:text-3xl text-sm  text-zinc-100">{degree}</h3>
              <FireSpan className="mt-0.5 md:text-xl text-xs">
                {institution}
              </FireSpan>
            </div>
          </div>
          <span className="mt-2 flex md:flex-row flex-col gap-1 shrink-0 md:text-lg text-xs text-zinc-400">
            Graduated&nbsp;
            <FireSpan className="font-semibold">{graduatedYear}</FireSpan>
          </span>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-white/[0.06]" />

        {/* Coursework */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400">
            Relevant Coursework
          </p>
          <div className="flex flex-wrap gap-2">
            {coursework.map((course, i) => (
              <CourseTag key={course.label} index={i} {...course} />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          .edu-card {
            animation: forgeFadeUp 0.5s ease-out both;
          }
          .course-tag {
            animation: forgeFadeUp 0.45s ease-out both;
          }
        }
        @keyframes forgeFadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
