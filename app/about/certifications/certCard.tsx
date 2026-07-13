"use client";

import { FireSpan } from "@/components/fire/fire";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

import SahlLogo from "@/assets/images/certificate/SAHL.png";
import ICPCLogo from "@/assets/images/certificate/ICPC.png";
import ICDLLogo from "@/assets/images/certificate/udemy-ICDL.png";
import Image from "next/image";
import LightboxModal from "@/components/LightboxModal/LightboxModal";
import { useState } from "react";

interface Certificate {
  title: string;
  /** orange sub-line beneath the title */
  issuer: string;
  date: string;
  /** label on the view-link, e.g. "VIEW CERTIFICATE" or "VIEW RECOGNITION" */
  ImageURL: any;
  linkLabel: string;
  url: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    title: "Best Computer Science Graduation Project Award",
    issuer: "Faculty of Science, Cairo University",
    date: "2024",
    linkLabel: "VIEW CERTIFICATE",
    url: "https://drive.google.com/file/d/1XCY4981j3mpahgt23uvPyxgIanDIvK00/view?usp=sharing",
    ImageURL: SahlLogo,
  },
  {
    title: "Certificate of Achievement — ICPC",
    issuer: "ICPC",
    date: "2023",
    linkLabel: "VIEW CERTIFICATE",
    url: "https://drive.google.com/file/d/1zCRQ9fq_8ZVDKkUXs3lJ8kaugZtCl9SC/view?usp=sharing",
    ImageURL: ICPCLogo,
  },
  {
    title: "ICDL Course Completion Certificate",
    issuer: "Udemy — Mostafa Kamel",
    date: "2022",
    linkLabel: "VIEW CERTIFICATE",
    url: "https://drive.google.com/file/d/1i18gFcXKxJ0V_EUQ3UXU3-eDXmKj-FFk/view?usp=sharing",
    ImageURL: ICDLLogo,
  },
];

export function CertCard({
  title,
  issuer,
  date,
  linkLabel,
  url,
  ImageURL,
  index,
}: Certificate & { index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="cert-card group relative overflow-hidden rounded-xl border border-white/[0.07] bg-[#111114] p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Left orange accent bar */}
      <span className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-linear-to-bl from-primary-container to-secondary transition-shadow duration-300 group-hover:shadow-[0_0_10px_3px_rgba(249,115,22,0.65)]" />

      {/* Title row — title left, date right */}
      <div className="flex items-start justify-between gap-4">
        <h4 className="text-sm font-bold leading-snug text-zinc-100 transition-colors duration-300 group-hover:text-white">
          {title}
        </h4>
        <FireSpan className="shrink-0 text-sm">{date}</FireSpan>
      </div>

      {/* Issuer — orange, beneath title */}
      <FireSpan className="mt-1 text-sm ">{issuer}</FireSpan>

      <Image
        src={ImageURL}
        alt="Certifications-img"
        className="mt-5 rounded-full h-72"
        // onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <LightboxModal src={ImageURL} onClose={() => setIsOpen(false)} />
      )}

      {/* View link */}
      {/* <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-500 transition-all duration-300 hover:text-orange-300 hover:gap-2.5"
      >
        {linkLabel}
        <ExternalLink className="h-3 w-3" strokeWidth={2.5} />
      </Link> */}
    </div>
  );
}
