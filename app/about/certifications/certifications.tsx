"use client";

import { FireSpan } from "@/components/UI/fireSpan/fire";
import { CertCard, CERTIFICATES } from "./certCard";




export default function Certifications() {
  return (
    <section className="relative w-full px-6 py-20 md:px-14">
      {/* Certifications 2-col grid */}
      <div className="mb-10 flex flex-col items-center gap-2">
        <h1 className="text-center text-lg font-semibold uppercase tracking-[0.35em] text-zinc-300">
          <FireSpan>Certifications</FireSpan>
        </h1>
        <span className="h-0.5 w-24 rounded-full bg-linear-to-r from-primary-container to-secondary" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {CERTIFICATES.map((cert, i) => (
          <CertCard key={cert.title} index={i} {...cert} />
        ))}
      </div>

      <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          .cert-card {
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
