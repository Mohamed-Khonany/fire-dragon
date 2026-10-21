"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Line, Path } from "@/components/UI/animated-path/animated-path";
import "@/components/UI/animated-path/animated-path.css";
import "./site-loader.css";
import Logo from "@/public/assets/images/logo/logo-banner.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface SiteLoaderProps {
  onStartReveal?: () => void;
  onComplete?: () => void;
  minDuration?: number;
}

export default function SiteLoader({
  onStartReveal,
  onComplete,
  minDuration = 10,
}: SiteLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topShutterRef = useRef<HTMLDivElement>(null);
  const bottomShutterRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);
  const mainStageRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const logoCoreRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);

  const [percent, setPercent] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>(
    "// 01: INITIALIZING SYSTEM CORE",
  );

  const progressObj = useRef({ value: 0 });
  const hasTransformed = useRef(false);

  // Asset preloading & scroll management
  useEffect(() => {
    let isMounted = true;

    // Lock page scroll while loader is visible
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Ensure initial header state is completely hidden
    const header = document.getElementById("site-header");
    if (header) {
      header.style.visibility = "hidden";
      header.style.pointerEvents = "none";
      gsap.set(header, { y: -80, opacity: 0 });
    }

    const preloadAssets = async () => {
      const tasks: Promise<any>[] = [];

      // Preload critical images asynchronously
      const imagesToLoad = [
        "/assets/images/logo/logo-banner.png",
        "/assets/images/logo/logo.png",
        "/assets/images/profilePhoto.png",
      ];

      imagesToLoad.forEach((src) => {
        tasks.push(
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }),
        );
      });

      // Wait for document fonts if supported
      if (typeof document !== "undefined" && document.fonts) {
        tasks.push(document.fonts.ready.catch(() => {}));
      }

      await Promise.all(tasks);
    };

    preloadAssets();

    return () => {
      isMounted = false;
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Coordinated GSAP transform from loader to banner page
  const executeTransform = useCallback(() => {
    if (hasTransformed.current) return;
    hasTransformed.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        // Unlock body scrolling
        document.body.style.overflow = "";

        // Completely hide loader container so it doesn't intercept clicks or consume GPU
        if (containerRef.current) {
          containerRef.current.style.display = "none";
          containerRef.current.style.pointerEvents = "none";
        }

        // Notify parent that loader transform is done
        if (onComplete) {
          onComplete();
        }

        // Recalculate ScrollTrigger positions
        ScrollTrigger.refresh();
      },
    });

    // 1. Supercharge ignition flash at 100%
    if (percentTextRef.current) {
      tl.to(percentTextRef.current, {
        scale: 1.15,
        color: "#ffffff",
        filter: "drop-shadow(0 0 35px #ffcc00) drop-shadow(0 0 60px #ff6600)",
        duration: 0.25,
        ease: "power2.out",
      });
    }

    // Shockwave burst
    if (shockwaveRef.current) {
      tl.fromTo(
        shockwaveRef.current,
        { scale: 0.4, opacity: 1 },
        {
          scale: 3.5,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
        },
        "<",
      );
    }

    // 2. HUD & telemetry fade out
    if (hudRef.current) {
      tl.to(
        hudRef.current,
        {
          opacity: 0,
          y: 35,
          scale: 0.88,
          duration: 0.35,
          ease: "power3.in",
        },
        "-=0.15",
      );
    }

    // 3. Fade out the loader's central stage and circuit
    if (mainStageRef.current) {
      tl.to(
        mainStageRef.current,
        {
          opacity: 0,
          scale: 0.96,
          duration: 0.45,
          ease: "power2.inOut",
        },
        "-=0.2",
      );
    }

    // 4. Molten seam line dissipates
    if (seamRef.current) {
      tl.to(
        seamRef.current,
        {
          scaleY: 6,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }

    // 5. Part the shutters (top goes up, bottom goes down)
    if (topShutterRef.current && bottomShutterRef.current) {
      tl.call(() => {
        if (onStartReveal) {
          onStartReveal();
        }
      }, undefined, "-=0.35");

      tl.to(
        topShutterRef.current,
        {
          yPercent: -100,
          duration: 0.95,
          ease: "power4.inOut",
        },
        "-=0.35",
      );

      tl.to(
        bottomShutterRef.current,
        {
          yPercent: 100,
          duration: 0.95,
          ease: "power4.inOut",
        },
        "<",
      );
    }

    // 6. Synchronized entrance for the banner and header
    const bannerLogo = document.querySelector(".banner-logo");
    const header = document.getElementById("site-header");

    // Mark site as loaded to enable header interactions and unlock global styles
    document.documentElement.classList.add("site-loaded");

    if (bannerLogo) {
      tl.from(
        bannerLogo,
        {
          scale: 1.15,
          duration: 0.65,
          ease: "power2.out",
          clearProps: "all",
        },
        "-=0.6",
      );
    }

    if (header) {
      header.style.visibility = "visible";
      header.style.pointerEvents = "auto";
      tl.to(
        header,
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
          clearProps: "all",
        },
        "-=0.5",
      );
    }
  }, [onComplete]);

  // Main progress counter animation loop
  useGSAP(
    () => {
      const tl = gsap.timeline({
        onUpdate: () => {
          const current = Math.round(progressObj.current.value);
          setPercent(current);

          // Update status telemetry text by stage
          if (current < 25) {
            setStatusText("// 01: INITIALIZING SYSTEM CORE");
          } else if (current < 55) {
            setStatusText("// 02: COMPILING THREE.JS WEBGL SHADERS");
          } else if (current < 85) {
            setStatusText("// 03: SYNCHRONIZING GSAP KINETICS");
          } else if (current < 100) {
            setStatusText("// 04: CALIBRATING ASSETS & DOM MATRIX");
          } else {
            setStatusText("// 05: CORE FORGED & SYNCHRONIZED // READY");
          }
        },
      });

      // Smooth multi-stage easing curve
      tl.to(progressObj.current, {
        value: 45,
        duration: minDuration * 0.35,
        ease: "power1.inOut",
      })
        .to(progressObj.current, {
          value: 88,
          duration: minDuration * 0.45,
          ease: "power2.out",
        })
        .to(progressObj.current, {
          value: 100,
          duration: minDuration * 0.2,
          ease: "power2.inOut",
          onComplete: () => {
            executeTransform();
          },
        });
    },
    { scope: containerRef, dependencies: [minDuration, executeTransform] },
  );

  // Manual skip function for accessibility & testing
  const handleSkip = () => {
    gsap.killTweensOf(progressObj.current);
    progressObj.current.value = 100;
    setPercent(100);
    setStatusText("// BYPASS: CORE FORGED // READY");
    executeTransform();
  };


  // Circular gauge calculations
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div
      ref={containerRef}
      id="site-loader"
      className="site-loader-root flex items-center justify-center overflow-hidden select-none"
      aria-label="Site Loading"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* ================= TOP SHUTTER PANEL ================= */}
      <div
        ref={topShutterRef}
        className="loader-shutter-top loader-grid-bg loader-radial-glow border-b border-white/5"
      >
        <div
          className="fire-light-1 pointer-events-none absolute rounded-full"
          style={{
            top: "-40px",
            left: "20%",
            width: "160px",
            height: "100px",
            backgroundColor: "rgba(255, 68, 0, 0.2)",
            filter: "blur(36px)",
          }}
        />
      </div>

      {/* ================= BOTTOM SHUTTER PANEL ================= */}
      <div
        ref={bottomShutterRef}
        className="loader-shutter-bottom loader-grid-bg loader-radial-glow border-t border-white/5"
      >
        <div
          className="fire-light-2 pointer-events-none absolute rounded-full"
          style={{
            bottom: "-40px",
            right: "20%",
            width: "160px",
            height: "100px",
            backgroundColor: "rgba(255, 153, 0, 0.18)",
            filter: "blur(36px)",
          }}
        />
      </div>

      {/* ================= MOLTEN SEAM LINE ================= */}
      <div
        ref={seamRef}
        className="molten-seam top-1/2 -translate-y-1/2 pointer-events-none"
      />

      {/* ================= CORNER HUD TARGETS ================= */}
      <div className="hud-corner hud-tl z-30" />
      <div className="hud-corner hud-tr z-30" />
      <div className="hud-corner hud-bl z-30" />
      <div className="hud-corner hud-br z-30" />


      {/* ================= MAIN LOADER STAGE ================= */}
      <div
        ref={mainStageRef}
        className="fire-wrapper relative flex flex-col items-center justify-center w-full h-full z-20 pointer-events-none"
      >
        {/* Glow light top-left */}
        <div
          className="fire-light-1 pointer-events-none absolute rounded-full z-10"
          style={{
            top: "20%",
            left: "25%",
            width: "140px",
            height: "90px",
            backgroundColor: "var(--light-1)",
            filter: "blur(32px)",
          }}
        />

        {/* Glow light bottom-right */}
        <div
          className="fire-light-2 pointer-events-none absolute rounded-full z-10"
          style={{
            bottom: "20%",
            right: "25%",
            width: "140px",
            height: "90px",
            backgroundColor: "var(--light-2)",
            filter: "blur(32px)",
          }}
        />

        {/* Shockwave circle (bursts at 100%) */}
        <div
          ref={shockwaveRef}
          className="loader-shockwave w-56 h-56 z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        {/* Central Logo & Reactor Ring */}
        <div
          ref={logoCoreRef}
          className="relative flex flex-col items-center mb-10 justify-center z-20 core-pulse"
        >
          {/* Circular SVG Gauge & Reactor Rings */}
          <svg
            className="absolute -inset-10 m-auto pointer-events-none"
            width="180"
            height="180"
            viewBox="0 0 140 140"
          >
            <defs>
              <linearGradient
                id="fireProgressGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ff2200" />
                <stop offset="50%" stopColor="#ff6600" />
                <stop offset="100%" stopColor="#ffcc00" />
              </linearGradient>
            </defs>

            {/* Background static circular track */}
            <circle
              cx="70"
              cy="70"
              r="54"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="2.5"
            />

            {/* Rotating outer segmented ring */}
            <circle
              className="reactor-ring-outer"
              cx="70"
              cy="70"
              r="62"
              fill="none"
              stroke="rgba(255, 102, 0, 0.3)"
              strokeWidth="1.2"
              strokeDasharray="8 12"
            />

            {/* Rotating inner tech ring */}
            <circle
              className="reactor-ring-inner"
              cx="70"
              cy="70"
              r="47"
              fill="none"
              stroke="rgba(255, 204, 0, 0.25)"
              strokeWidth="1"
              strokeDasharray="5 7"
            />

            {/* Animated Progress Gauge Circle */}
            <circle
              cx="70"
              cy="70"
              r="54"
              fill="none"
              stroke="url(#fireProgressGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 70 70)"
              style={{
                transition: "stroke-dashoffset 0.1s ease-out",
                filter: "drop-shadow(0 0 8px rgba(255, 102, 0, 0.9))",
              }}
            />
          </svg>

          {/* Center Logo */}
          <div className="relative z-10 w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
            <Image
              src={Logo}
              alt="Fire Dragon Logo"
              width={100}
              height={100}
              className="object-contain drop-shadow-[0_0_20px_rgba(255,90,0,0.6)]"
              priority
            />
          </div>
        </div>

        {/* ================= PERCENTAGE NUMBER & TELEMETRY HUD ================= */}
        <div
          ref={hudRef}
          className="flex flex-col items-center justify-center mt-3 z-20 pointer-events-none"
        >
          {/* Main Percentage Display */}
          <div className="flex items-baseline gap-1">
            <span
              ref={percentTextRef}
              className="font-mono font-black text-6xl md:text-7xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ff3300] via-[#ff9900] to-[#ffcc00] percent-glow"
            >
              {percent}
            </span>
            <span className="font-mono font-bold text-2xl md:text-3xl text-[#ffb59a]/90">
              %
            </span>
          </div>

          {/* Linear Progress Bar with Molten Flame */}
          <div className="relative w-64 md:w-80 h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#ff2200] via-[#ff6600] to-[#ffcc00] rounded-full transition-all duration-100 ease-out relative"
              style={{ width: `${percent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white progress-beacon" />
            </div>
          </div>

          {/* Dynamic Technical Status Text */}
          <p className="telemetry-code text-xs md:text-sm text-[#ffb59a]/80 mt-3 h-5 font-mono tracking-widest text-center">
            {statusText}
          </p>
        </div>

        {/* ================= ANIMATED SVG CIRCUIT MATRIX ================= */}
        {/* Utilizing Path and Line from animated-path.tsx with same coordinates as animated-banner.tsx */}
        <svg
          className="fire-ai-bg absolute pointer-events-none"
          style={{ fill: "none" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="70 70 160 160"
          width="100%"
          height="760"
        >
          {/* Background & animated lines near the logo */}
          <Line x1="138.03" y1="113.58" x2="138.03" y2="101.83" />
          <Line x1="146.01" y1="113.58" x2="146.01" y2="99.15" />
          <Line x1="153.99" y1="113.58" x2="153.99" y2="99.15" />
          <Line x1="161.97" y1="113.58" x2="161.97" y2="101.83" />
          <Line x1="169.95" y1="113.58" x2="169.95" y2="103.79" />
          <Line x1="130.05" y1="113.58" x2="130.05" y2="103.79" />
          <Line x1="169.95" y1="186.42" x2="169.95" y2="196.21" />
          <Line x1="161.97" y1="186.42" x2="161.97" y2="198.17" />
          <Line x1="153.99" y1="186.42" x2="153.99" y2="200.85" />
          <Line x1="146.01" y1="186.42" x2="146.01" y2="200.85" />
          <Line x1="138.03" y1="186.42" x2="138.03" y2="198.17" />
          <Line x1="130.05" y1="186.42" x2="130.05" y2="196.21" />

          {/* Left pins near logo */}
          <Line x1="113.58" y1="138.03" x2="101.83" y2="138.03" />
          <Line x1="113.58" y1="146.01" x2="99.15" y2="146.01" />
          <Line x1="113.58" y1="153.99" x2="99.15" y2="153.99" />
          <Line x1="113.58" y1="161.97" x2="101.83" y2="161.97" />
          <Line x1="113.58" y1="169.95" x2="103.79" y2="169.95" />
          <Line x1="113.58" y1="130.05" x2="103.79" y2="130.05" />

          {/* Right pins near logo */}
          <Line x1="186.42" y1="138.03" x2="198.17" y2="138.03" />
          <Line x1="186.42" y1="146.01" x2="200.85" y2="146.01" />
          <Line x1="186.42" y1="153.99" x2="200.85" y2="153.99" />
          <Line x1="186.42" y1="161.97" x2="198.17" y2="161.97" />
          <Line x1="186.42" y1="169.95" x2="196.21" y2="169.95" />
          <Line x1="186.42" y1="130.05" x2="196.21" y2="130.05" />

          {/* Up lines */}
          <Line x1="150" y1="113.58" x2="150" y2="67.31" />
          <circle className="fire-dot" cx="150" cy="66.13" r="1.17" />
          <Line x1="157.98" y1="113.58" x2="157.98" y2="82.08" />
          <circle className="fire-dot" cx="157.98" cy="80.91" r="1.17" />
          <Line x1="142.02" y1="113.58" x2="142.02" y2="88.08" />
          <circle className="fire-dot" cx="142.02" cy="86.91" r="1.17" />

          <Path d="M126.06,113.58v-10.37c0-.72-.29-1.41-.8-1.92l-4.28-4.28c-.51-.51-.8-1.2-.8-1.92v-12.37" />
          <circle className="fire-dot" cx="120.19" cy="81.54" r="1.17" />

          <Path d="M165.96,113.58v-18.37c0-.72.29-1.41.8-1.92l4.28-4.28c.51-.51.8-1.2.8-1.92v-14.37" />
          <circle className="fire-dot" cx="171.83" cy="71.54" r="1.17" />

          <Path d="M173.94,113.58v-10.37c0-.72.29-1.41.8-1.92l4.28-4.28c.51-.51.8-1.2.8-1.92v-10.69" />
          <circle className="fire-dot" cx="179.81" cy="83.23" r="1.17" />

          <Path d="M134.04,113.58v-20.37c0-.72-.29-1.41-.8-1.92l-4.28-4.28c-.51-.51-.8-1.2-.8-1.92v-9.37" />
          <circle className="fire-dot" cx="128.17" cy="74.54" r="1.17" />

          {/* Right lines */}
          <Line x1="186.42" y1="150" x2="232.69" y2="150" />
          <circle className="fire-dot" cx="233.87" cy="150" r="1.17" />
          <Line x1="186.42" y1="157.98" x2="217.92" y2="157.98" />
          <circle className="fire-dot" cx="219.09" cy="157.98" r="1.17" />
          <Line x1="186.42" y1="142.02" x2="211.92" y2="142.02" />
          <circle className="fire-dot" cx="213.09" cy="142.02" r="1.17" />

          <Path d="M186.42,126.06h10.37c.72,0,1.41-.29,1.92-.8l4.28-4.28c.51,-.51,1.2,-.8,1.92,-.8h12.37" />
          <circle className="fire-dot" cx="218.46" cy="120.19" r="1.17" />
          <Path d="M186.42,165.96h18.37c.72,0,1.41.29,1.92.8l4.28,4.28c.51,.51,1.2,.8,1.92,.8h14.37" />
          <circle className="fire-dot" cx="228.46" cy="171.83" r="1.17" />
          <Path d="M186.42,173.94h10.37c.72,0,1.41.29,1.92.8l4.28,4.28c.51,.51,1.2,.8,1.92,.8h10.69" />
          <circle className="fire-dot" cx="216.77" cy="179.81" r="1.17" />
          <Path d="M186.42,134.04h20.37c.72,0,1.41-.29,1.92-.8l4.28-4.28c.51,-.51,1.2,-.8,1.92,-.8h9.37" />
          <circle className="fire-dot" cx="225.46" cy="128.17" r="1.17" />

          {/* Left lines */}
          <Line x1="113.58" y1="150" x2="67.31" y2="150" />
          <circle className="fire-dot" cx="66.13" cy="150" r="1.17" />
          <Line x1="113.58" y1="142.02" x2="82.08" y2="142.02" />
          <circle className="fire-dot" cx="80.91" cy="142.02" r="1.17" />
          <Line x1="113.58" y1="157.98" x2="88.08" y2="157.98" />
          <circle className="fire-dot" cx="86.91" cy="157.98" r="1.17" />

          <Path d="M113.58,173.94h-10.37c-.72,0-1.41.29-1.92.8l-4.28,4.28c-.51,.51,-1.2,.8,-1.92,.8h-12.37" />
          <circle className="fire-dot" cx="81.54" cy="179.81" r="1.17" />
          <Path d="M113.58,134.04h-18.37c-.72,0-1.41-.29-1.92-.8l-4.28-4.28c-.51,-.51,-1.2,-.8,-1.92,-.8h-14.37" />
          <circle className="fire-dot" cx="71.54" cy="128.17" r="1.17" />
          <Path d="M113.58,126.06h-10.37c-.72,0-1.41-.29-1.92-.8l-4.28-4.28c-.51,-.51,-1.2,-.8,-1.92,-.8h-10.69" />
          <circle className="fire-dot" cx="83.23" cy="120.19" r="1.17" />
          <Path d="M113.58,165.96h-20.37c-.72,0-1.41.29-1.92.8l-4.28,4.28c-.51,.51,-1.2,.8,-1.92,.8h-9.37" />
          <circle className="fire-dot" cx="74.54" cy="171.83" r="1.17" />

          {/* Down lines */}
          <Line x1="150" y1="186.42" x2="150" y2="232.69" />
          <circle className="fire-dot" cx="150" cy="233.87" r="1.17" />
          <Line x1="142.02" y1="186.42" x2="142.02" y2="217.92" />
          <circle className="fire-dot" cx="142.02" cy="219.09" r="1.17" />
          <Line x1="157.98" y1="186.42" x2="157.98" y2="211.92" />
          <circle className="fire-dot" cx="157.98" cy="213.09" r="1.17" />

          <Path d="M173.94,186.42v10.37c0,.72.29,1.41.8,1.92l4.28,4.28c.51.51.8,1.2.8,1.92v12.37" />
          <circle className="fire-dot" cx="179.81" cy="218.46" r="1.17" />
          <Path d="M134.04,186.42v18.37c0,.72-.29,1.41-.8,1.92l-4.28,4.28c-.51.51-.8,1.2-.8,1.92v14.37" />
          <circle className="fire-dot" cx="128.17" cy="228.46" r="1.17" />
          <Path d="M126.06,186.42v10.37c0,.72-.29,1.41-.8,1.92l-4.28,4.28c-.51.51-.8,1.2-.8,1.92v10.69" />
          <circle className="fire-dot" cx="120.19" cy="216.77" r="1.17" />
          <Path d="M165.96,186.42v20.37c0,.72.29,1.41.8,1.92l4.28,4.28c.51.51.8,1.2.8,1.92v9.37" />
          <circle className="fire-dot" cx="171.83" cy="225.46" r="1.17" />

          {/* Diagonal lines */}
          <Path d="M186.42 113.58 L195 105 H215 L225 95 H245" />
          <circle className="fire-dot" cx="246" cy="95" r="1.17" />
          <Path d="M186.42 186.42 L198 198 H220 L235 212 H255" />
          <circle className="fire-dot" cx="256" cy="212" r="1.17" />
          <Path d="M113.58 113.58 L105 105 H85 L75 95 H55" />
          <circle className="fire-dot" cx="54" cy="95" r="1.17" />
          <Path d="M113.58 186.42 L102 198 H80 L65 212 H45" />
          <circle className="fire-dot" cx="44" cy="212" r="1.17" />
        </svg>
      </div>
    </div>
  );
}
