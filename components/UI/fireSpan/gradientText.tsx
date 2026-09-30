"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: "horizontal" | "vertical" | "diagonal";
  pauseOnHover?: boolean;
  yoyo?: boolean;
  inline?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#ff5a00", "#cd9c01"],
  animationSpeed = 1.5,
  showBorder = false,
  direction = "horizontal",
  pauseOnHover = false,
  yoyo = true,
  inline = false,
}: GradientTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const targets = [textRef.current, borderRef.current].filter(
        Boolean,
      ) as HTMLElement[];

      const applyPosition = (p: number) => {
        const pos = direction === "vertical" ? `50% ${p}%` : `${p}% 50%`;
        targets.forEach((el) => {
          el.style.backgroundPosition = pos;
        });
      };

      const state = { p: 0 };
      applyPosition(0);

      // yoyo: 0 -> 100 -> 0 (back and forth)
      // no yoyo: 0 -> 150 then repeat. With a 300% background size,
      // 150% equals exactly one full gradient tile, so the loop is seamless.
      tweenRef.current = gsap.to(state, {
        p: yoyo ? 100 : 150,
        duration: yoyo ? animationSpeed : animationSpeed * 1.5,
        ease: "none",
        repeat: -1,
        yoyo,
        onUpdate: () => applyPosition(state.p),
      });

      return () => {
        tweenRef.current?.kill();
        tweenRef.current = null;
      };
    },
    {
      scope: containerRef,
      dependencies: [animationSpeed, yoyo, direction, showBorder],
    },
  );

  const handleMouseEnter = () => {
    if (pauseOnHover) tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) tweenRef.current?.resume();
  };

  const gradientAngle =
    direction === "horizontal"
      ? "to right"
      : direction === "vertical"
        ? "to bottom"
        : "to bottom right";

  // Duplicate first color at the end for seamless looping
  const gradientColors = [...colors, colors[0]].join(", ");

  const gradientStyle = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize:
      direction === "horizontal"
        ? "300% 100%"
        : direction === "vertical"
          ? "100% 300%"
          : "300% 300%",
    backgroundRepeat: "repeat",
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex-row transition-shadow duration-500 overflow-hidden cursor-default
    ${inline ? "inline-flex align-baseline" : "flex mx-auto"}
    ${showBorder ? "py-1 px-2" : ""} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBorder && (
        <div
          ref={borderRef}
          className="absolute inset-0 z-0 pointer-events-none"
          style={gradientStyle}
        >
          <div
            className="absolute z-[-1]"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
      <div
        ref={textRef}
        className="flex flex-row gap-1 relative z-2 text-transparent bg-clip-text"
        style={{ ...gradientStyle, WebkitBackgroundClip: "text" }}
      >
        {children}
      </div>
    </div>
  );
}
