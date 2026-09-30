"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Flame, Terminal } from "lucide-react";

import AnimatedBanner from "@/components/UI/animated-path/animated-banner";
import GlitchDigits from "../components/UI/not-found/glitchDigits";
import TerminalBlock from "../components/UI/not-found/terminalBlock";
import { FireSpan } from "@/components/UI/fireSpan/fire";
import GradientText from "@/components/UI/fireSpan/gradientText";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#070708] flex flex-col items-center justify-center px-4">
      {/* ── Background radial glow ──────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 48%, rgba(180,60,0,0.13) 0%, rgba(120,35,0,0.06) 50%, transparent 75%)",
        }}
      />

      {/* ── Grid texture overlay ────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute inset-0 z-0">
        <AnimatedBanner isHome={false} />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col items-center gap-4 text-center transition-all duration-700 md:pt-16"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
        }}
      >
        {/* Top badge */}
        {/* <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/6 px-3 py-1.5 text-sm font-semibold text-orange-400"> */}
          <GradientText className="text-[11px] font-semibold uppercase tracking-[0.2em] flex flex-row gap-1 items-center justify-center"   showBorder={true} colors={["#ff5a00", "#cd9c01"]} animationSpeed={8}>
            <Terminal className="h-3.5 w-3.5 text-orange-500" strokeWidth={2} />  Page not found
          </GradientText>
        {/* </div> */}

        {/* Divider */}
        <div className="flex items-center gap-4 w-full max-w-xs">
          <span className="h-px flex-1 bg-white/[0.06]" />
          <Flame className="h-4 w-4 text-orange-500/60" />
          <span className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* 404 glitch number */}
        <GlitchDigits />

        {/* Divider */}
        <div className="flex items-center gap-4 w-full max-w-xs">
          <span className="h-px flex-1 bg-white/[0.06]" />
          <Flame className="h-4 w-4 text-orange-500/60" />
          <span className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* Heading & sub-copy */}
        <h1 className="text-xl font-bold text-zinc-100 md:text-2xl">
          The Page you're looking for <GradientText inline={true}>doesn't exist</GradientText>
        </h1>

        {/* Terminal lines */}
        <TerminalBlock />

        {/* CTA buttons */}
        {/* <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-orange-500/40 bg-orange-500/[0.08] px-6 py-3 text-sm font-semibold text-orange-400 transition-all duration-300 hover:-translate-y-[2px] hover:border-orange-400/70 hover:bg-orange-500/[0.14] hover:text-orange-300 hover:shadow-[0_0_24px_rgba(249,115,22,0.25)]"
          >
            <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            Back to Home
          </Link>

          <button
            onClick={() => router.back()}
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-400 transition-all duration-300 hover:-translate-y-[2px] hover:border-white/20 hover:text-zinc-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Go Back
          </button>
        </div> */}
      </div>
    </main>
  );
}
