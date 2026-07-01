"use client";

import { ExternalLink } from "lucide-react";

interface Certificate {
  title: string;
  /** orange sub-line beneath the title */
  issuer: string;
  date: string;
  description?: string;
  /** label on the view-link, e.g. "VIEW CERTIFICATE" or "VIEW RECOGNITION" */
  linkLabel: string;
  url: string;
}

const CERTIFICATES: Certificate[] = [
  {
    title: "Best Computer Science Graduation Project Award",
    issuer: "Faculty of Science, Cairo University",
    date: "2024",
    description:
      "Awarded for outstanding collaboration, innovation, and technical excellence demonstrated in the graduation project.",
    linkLabel: "VIEW RECOGNITION",
    url: "https://drive.google.com/file/d/1XCY4981j3mpahgt23uvPyxgIanDIvK00/view?usp=sharing",
  },
  {
    title: "ICDL Course Completion Certificate",
    issuer: "Udemy — Mostafa Kamel",
    date: "2022-08-06",
    linkLabel: "VIEW CERTIFICATE",
    url: "https://drive.google.com/file/d/1i18gFcXKxJ0V_EUQ3UXU3-eDXmKj-FFk/view?usp=sharing",
  },
  {
    title: "Certificate of Achievement — ICPC",
    issuer: "ICPC",
    date: "2023",
    linkLabel: "VIEW CERTIFICATE",
    url: "https://drive.google.com/file/d/1zCRQ9fq_8ZVDKkUXs3lJ8kaugZtCl9SC/view?usp=sharing",
  },
];

function CertCard({
  title,
  issuer,
  date,
  description,
  linkLabel,
  url,
  index,
}: Certificate & { index: number }) {
  return (
    <div
      className="cert-card group relative overflow-hidden rounded-xl border border-white/[0.07] bg-[#111114] p-6 transition-all duration-300 ease-out hover:-translate-y-[2px] hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Left orange accent bar */}
      <span className="absolute left-0 top-0 h-full w-[3px] rounded-r-full bg-orange-500 transition-shadow duration-300 group-hover:shadow-[0_0_10px_3px_rgba(249,115,22,0.65)]" />

      {/* Title row — title left, date right */}
      <div className="flex items-start justify-between gap-4">
        <h4 className="text-sm font-bold leading-snug text-zinc-100 transition-colors duration-300 group-hover:text-white">
          {title}
        </h4>
        <span className="flex-shrink-0 text-sm text-zinc-400">{date}</span>
      </div>

      {/* Issuer — orange, beneath title */}
      <p className="mt-1 text-sm text-orange-400">{issuer}</p>

      {/* Optional description */}
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
      )}

      {/* View link */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-500 transition-all duration-300 hover:text-orange-300 hover:gap-2.5"
      >
        {linkLabel}
        <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
      </a>
    </div>
  );
}

export default function Certifications() {
  return (
    <section className="relative w-full bg-[#070708] px-6 py-20 md:px-14">
      {/* Certifications 2-col grid */}
      <p className="mb-4 md:text-md text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
        Certifications &amp; Awards
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {CERTIFICATES.map((cert, i) => (
          <CertCard key={cert.title} index={i} {...cert} />
        ))}
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
