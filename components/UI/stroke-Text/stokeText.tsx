"use client";

import {
  CSSProperties,
  RefObject,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type StrokeTextFillMode = "wipe" | "fade" | "none";
export type StrokeTextDirection = "horizontal" | "vertical" | "diagonal";

export interface StrokeTextProps {
  text?: string;
  /* stroke */
  strokeColor?: string;
  strokeWidth?: number;
  /* animated gradient fill (same API as GradientText) */
  colors?: string[];
  animationSpeed?: number;
  direction?: StrokeTextDirection;
  yoyo?: boolean;
  /** how many "text widths" one gradient tile spans. Bigger = softer / slower colour change */
  gradientScale?: number;
  /* draw animation */
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  fillMode?: StrokeTextFillMode;
  reverse?: boolean;
  /* scroll control */
  pin?: boolean;
  /** Element to pin (e.g. your whole section). If omitted, the component pins its own full-screen wrapper. */
  pinRef?: RefObject<HTMLElement | null>;
  /** how long the section stays pinned: "150%" or a number of px */
  scrollLength?: string | number;
  /** scrub smoothing: true = locked to scrollbar, number = seconds of catch-up */
  scrub?: boolean | number;
  /** where the pin starts */
  start?: string;
  /**
   * Where the intro starts: the text is at the TOP of the section, draws itself and travels
   * down while you scroll, and lands in the centre exactly when the pin begins (`start`).
   */
  introStart?: string;
  /* typography */
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number;
  className?: string;
  style?: CSSProperties;
}

interface StrokeTextBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const DEFAULT_TEXT = "Draw Attention";

const StrokeText = ({
  text = DEFAULT_TEXT,
  strokeColor = "#ff5a00",
  strokeWidth = 1.4,
  colors = ["#ff5a00", "#cd9c01"],
  animationSpeed = 1.5,
  direction = "horizontal",
  yoyo = true,
  gradientScale = 2,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  ease = "power2.out",
  fillMode = "wipe",
  reverse = false,
  pin = true,
  pinRef,
  scrollLength = 10000,
  scrub = 1,
  start = "top top",
  introStart = "top 70%",
  fontSize = 128,
  fontWeight = 800,
  letterSpacing = -4,
  className = "",
  style = {},
}: StrokeTextProps) => {
  const sectionPinRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const strokeTextRef = useRef<SVGTextElement | null>(null);
  const wipeRectRef = useRef<SVGRectElement | null>(null);
  const gradientRef = useRef<SVGLinearGradientElement | null>(null);

  const [box, setBox] = useState<StrokeTextBox | null>(null);

  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const wipeId = `stroke-text-wipe-${rawId}`;
  const gradId = `stroke-text-grad-${rawId}`;

  const characters = useMemo(() => Array.from(String(text ?? "")), [text]);
  const dash = Math.max(fontSize * 7, 200);

  // stable key so a new array literal each render doesn't re-run the animation
  const colorsKey = colors.join("|");
  const gradientStops = useMemo(() => {
    const list = colorsKey.split("|");
    const looped = [...list, list[0]]; // duplicate first colour => seamless loop
    return looped.map((color, i) => ({
      color,
      offset: i / (looped.length - 1),
    }));
  }, [colorsKey]);

  const fontStyle = useMemo<CSSProperties>(
    () => ({
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
    }),
    [fontSize, fontWeight, letterSpacing],
  );

  /* ---------- measure the text (layout, not animation) ---------- */
  useLayoutEffect(() => {
    const node = strokeTextRef.current;
    if (!node) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled || !strokeTextRef.current) return;
      let bbox: DOMRect | undefined;
      try {
        bbox = strokeTextRef.current.getBBox();
      } catch {
        return;
      }
      if (!bbox || !bbox.width) return;

      const pad = Math.max(Number(strokeWidth) || 1, fontSize * 0.1);
      const next = {
        x: bbox.x - pad,
        y: bbox.y - pad,
        width: bbox.width + pad * 2,
        height: bbox.height + pad * 2,
      };

      setBox((prev) =>
        prev &&
        Math.abs(prev.x - next.x) < 0.5 &&
        Math.abs(prev.width - next.width) < 0.5 &&
        Math.abs(prev.y - next.y) < 0.5
          ? prev
          : next,
      );
    };

    measure();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [characters, fontSize, fontWeight, letterSpacing, strokeWidth]);

  /* ---------- gradient geometry ---------- */
  const gradientGeometry = useMemo(() => {
    if (!box) return null;
    const tileW = box.width * gradientScale;
    const tileH = box.height * gradientScale;

    if (direction === "vertical") {
      const cx = box.x + box.width / 2;
      return { x1: cx, y1: box.y, x2: cx, y2: box.y + tileH, dx: 0, dy: tileH };
    }
    if (direction === "diagonal") {
      return {
        x1: box.x,
        y1: box.y,
        x2: box.x + tileW,
        y2: box.y + tileH,
        dx: tileW,
        dy: tileH,
      };
    }
    const cy = box.y + box.height / 2;
    return { x1: box.x, y1: cy, x2: box.x + tileW, y2: cy, dx: tileW, dy: 0 };
  }, [box, direction, gradientScale]);

  /* ---------- all animation: useGSAP + ScrollTrigger ---------- */
  useGSAP(
    () => {
      const root = rootRef.current;
      // pin the parent's section if given, otherwise our own wrapper
      const section = pinRef?.current ?? sectionPinRef.current;
      const gradient = gradientRef.current;
      if (
        typeof window === "undefined" ||
        !root ||
        !section ||
        !box ||
        !gradientGeometry
      )
        return;

      const strokes = Array.from(root.querySelectorAll("[data-stroke-char]"));
      const fills = Array.from(root.querySelectorAll("[data-fill-char]"));
      const wipe = wipeRectRef.current;
      if (!strokes.length) return;

      const fillEnabled = fillMode !== "none";
      const useWipe = fillEnabled && fillMode === "wipe";
      const fillDuration = Math.max(0.4, drawDuration * 0.5);
      const staggerConfig: number | gsap.StaggerVars = reverse
        ? { each: stagger, from: "end" as const }
        : stagger;

      /* ----- animated gradient fill (loops forever, only while visible) ----- */
      const state = { p: 0 };
      const applyGradient = () => {
        gradient?.setAttribute(
          "gradientTransform",
          `translate(${gradientGeometry.dx * state.p} ${gradientGeometry.dy * state.p})`,
        );
      };
      applyGradient();

      const prefersReducedMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) {
        gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: 0 });
        gsap.set(fills, { opacity: fillEnabled ? 1 : 0 });
        if (wipe)
          gsap.set(wipe, { attr: { width: fillEnabled ? box.width : 0 } });
        // sit in the centre straight away
        gsap.set(root, {
          y: () => Math.max(0, (section.offsetHeight - root.offsetHeight) / 2),
        });
        return;
      }

      // yoyo: 0 -> 0.5 -> 0 of a tile. no yoyo: exactly one tile, which repeats seamlessly.
      const gradientTween = gsap.to(state, {
        p: yoyo ? 0.5 : 1,
        duration: yoyo ? animationSpeed : animationSpeed * 1.5,
        ease: "none",
        repeat: -1,
        yoyo,
        paused: true,
        onUpdate: applyGradient,
      });

      const observer = new IntersectionObserver(([entry]) => {
        gradientTween.paused(!entry.isIntersecting); // don't burn CPU when off-screen
      });
      observer.observe(root);

      /* ----- start state ----- */
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash });
      gsap.set(fills, { opacity: useWipe ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: 0 } });
      gsap.set(root, { y: 0 }); // text starts at the TOP of the section

      /* ----- phase 1 (intro): draw + fill while the text travels from top to centre ----- */
      const tlIntro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: introStart,
          end: start, // intro ends exactly where the pin begins
          scrub,
          invalidateOnRefresh: true, // recompute the centre distance on resize
          // markers: true,
        },
      });

      tlIntro.to(
        strokes,
        {
          strokeDashoffset: 0,
          duration: drawDuration,
          ease,
          stagger: staggerConfig,
        },
        0,
      );

      if (useWipe && wipe) {
        tlIntro.to(
          wipe,
          {
            attr: { width: box.width },
            duration: fillDuration,
            ease: "power2.inOut",
          },
          drawDuration + fillDelay,
        );
      } else if (fillEnabled) {
        tlIntro.to(
          fills,
          {
            opacity: 1,
            duration: fillDuration,
            ease: "power2.out",
            stagger: staggerConfig,
          },
          drawDuration + fillDelay,
        );
      }

      // travel: top of the section -> vertical centre, spread over the WHOLE intro,
      // so the text keeps moving (and animating) until the pin takes over
      tlIntro.to(
        root,
        {
          y: () => Math.max(0, (section.offsetHeight - root.offsetHeight) / 2),
          duration: tlIntro.duration(),
          ease: "none",
        },
        0,
      );

      /* ----- phase 2 (pinned): section is held, text rests in the centre ----- */
      const length =
        typeof scrollLength === "number" ? `${scrollLength}` : scrollLength;

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start,
          end: pin ? `+=${length}` : "top 35%",
          pin: pin ? section : false,
          pinSpacing: true,
          anticipatePin: 1,
          scrub,
          invalidateOnRefresh: true,
        },
      });

      // useGSAP reverts the timelines + their ScrollTriggers automatically
      return () => {
        observer.disconnect();
        gradientTween.kill();
      };
    },
    {
      scope: rootRef,
      dependencies: [
        box,
        gradientGeometry,
        dash,
        drawDuration,
        fillDelay,
        stagger,
        ease,
        fillMode,
        reverse,
        pin,
        scrollLength,
        scrub,
        start,
        introStart,
        yoyo,
        animationSpeed,
      ],
      revertOnUpdate: true,
    },
  );

  const viewBox = box
    ? `${box.x} ${box.y} ${box.width} ${box.height}`
    : `0 ${-fontSize} 600 ${fontSize * 1.3}`;

  return (
    // no flex-centering here: the text starts at the top and GSAP moves it to the centre
    <div ref={sectionPinRef} className="relative h-screen w-full">
      <span
        ref={rootRef}
        className={`block w-full leading-[0] will-change-transform ${className}`.trim()}
        style={style}
        role="img"
        aria-label={String(text ?? "")}
      >
        <svg
          className="block w-full"
          style={{ height: `${Math.round(fontSize * 1.3)}px` }}
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {box && gradientGeometry && (
            <defs>
              <linearGradient
                ref={gradientRef}
                id={gradId}
                gradientUnits="userSpaceOnUse"
                spreadMethod="repeat"
                x1={gradientGeometry.x1}
                y1={gradientGeometry.y1}
                x2={gradientGeometry.x2}
                y2={gradientGeometry.y2}
              >
                {gradientStops.map((stop, i) => (
                  <stop key={i} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>

              {fillMode === "wipe" && (
                <clipPath id={wipeId} clipPathUnits="userSpaceOnUse">
                  <rect
                    ref={wipeRectRef}
                    x={box.x}
                    y={box.y}
                    width="0"
                    height={box.height}
                  />
                </clipPath>
              )}
            </defs>
          )}

          {/* outline layer */}
          <text
            ref={strokeTextRef}
            className="select-none"
            x="0"
            y="0"
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            style={fontStyle}
          >
            {characters.map((char, index) => (
              <tspan data-stroke-char key={`s-${index}`}>
                {char}
              </tspan>
            ))}
          </text>

          {/* gradient fill layer */}
          <text
            className="select-none"
            x="0"
            y="0"
            fill={box ? `url(#${gradId})` : "none"}
            stroke="none"
            style={fontStyle}
            clipPath={
              fillMode === "wipe" && box ? `url(#${wipeId})` : undefined
            }
          >
            {characters.map((char, index) => (
              <tspan data-fill-char key={`f-${index}`}>
                {char}
              </tspan>
            ))}
          </text>
        </svg>
      </span>
    </div>
  );
};

export default StrokeText;