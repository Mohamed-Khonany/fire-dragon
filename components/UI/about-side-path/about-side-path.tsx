import { useId, type CSSProperties } from "react";

type Side = "top-left" | "bottom-right";

type TraceDef = {
  key: string;
  d: string;
  width: number;
  /** position inside the paths timeline (timeline units, see about-paths-timeline.ts) */
  start: number;
  dur: number;
};

/**
 * Geometry is authored ONCE, for the TOP-LEFT corner:
 * every trace starts at the left screen edge (x = 0) and steps down/right
 * toward the word, which sits just below the bottom edge of this box.
 * The BOTTOM-RIGHT corner is the very same SVG rotated 180°
 * (scale(-1, -1)), so the two corners are point-symmetric around the word.
 * Every path starts at the outer edge, so "draw 0% -> 100%" always travels toward the word.
 */
const VIEW_W = 600;
const VIEW_H = 240;

/**
 * How far the path reaches over the word, as a % of the word's width,
 * measured from the word's outer edge. Higher = longer/bigger paths that run
 * further over the top (or under the bottom) of the text.
 */
const OVERLAP = 30;

/**
 * Vertical gap between the path box and the word box, in em.
 * Lower it (or make it negative) to bring the paths closer to the text.
 */
const GAP_EM = 0.1;

const ACCENT = "var(--about-path-to, #ffc247)";
const ACCENT_FROM = "var(--about-path-from, #ff5a1f)";

const TRACES: TraceDef[] = [
  {
    key: "main",
    d: "M0 70H110L160 120H320L370 170H500L540 210H600",
    width: 3,
    start: 0,
    dur: 0.34,
  },
  {
    key: "lower",
    d: "M0 160H70L110 200H250L275 225H380",
    width: 2.4,
    start: 0.05,
    dur: 0.28,
  },
  {
    key: "upper",
    d: "M0 20H190L230 60H380L410 90H470",
    width: 2,
    start: 0.08,
    dur: 0.3,
  },
  {
    // branches off "main" at (240, 120)
    key: "branch",
    d: "M240 120L268 92H340",
    width: 2,
    start: 0.15,
    dur: 0.2,
  },
];

type AboutSidePathProps = {
  side: Side;
  /** % of the word's width the path reaches over the word (default: OVERLAP) */
  overlap?: number;
  /** any CSS length: gap between the path box and the word box (default: GAP_EM in em) */
  gap?: string;
};

export default function AboutSidePath({
  side,
  overlap = OVERLAP,
  gap = `${GAP_EM}em`,
}: AboutSidePathProps) {
  const gradientId = `about-grad-${useId().replace(/:/g, "")}`;
  const isTopLeft = side === "top-left";

  /**
   * This element lives INSIDE the word's box (position: relative), so the
   * percentages below are relative to the word's own width, and `em` is the
   * word's font-size. Its width is "distance from the screen edge to the word"
   * + OVERLAP, so the path always starts exactly at the screen edge.
   */
  const slotStyle: CSSProperties = {
    width: `calc(50vw - ${50 - overlap}%)`,
    ...(isTopLeft
      ? { right: `${100 - overlap}%`, bottom: `calc(100% + ${gap})` }
      : { left: `${100 - overlap}%`, top: `calc(100% + ${gap})` }),
  };

  return (
    <div
      className="about-side absolute"
      data-side={side}
      style={slotStyle}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        fill="none"
        className="block h-auto w-full overflow-visible"
        style={isTopLeft ? undefined : { transform: "scale(-1, -1)" }}
      >
        <defs>
          <linearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2={VIEW_W}
            y2="0"
          >
            {/* dim at the screen edge, bright where it meets the word */}
            <stop
              offset="0"
              style={{ stopColor: ACCENT_FROM, stopOpacity: 0.15 }}
            />
            <stop
              offset="0.55"
              style={{ stopColor: ACCENT_FROM, stopOpacity: 0.9 }}
            />
            <stop offset="1" style={{ stopColor: ACCENT }} />
          </linearGradient>
        </defs>

        {TRACES.map((t) => (
          <g key={t.key} data-trace data-start={t.start} data-dur={t.dur}>
            {/* cheap glow: wide + translucent copy (no SVG filters, scrub-friendly) */}
            <path
              className="about-line"
              d={t.d}
              stroke={`url(#${gradientId})`}
              strokeWidth={t.width * 4}
              strokeOpacity={0.16}
              strokeLinejoin="round"
            />
            {/* crisp core line - the head follows this one */}
            <path
              className="about-line about-core"
              d={t.d}
              stroke={`url(#${gradientId})`}
              strokeWidth={t.width}
              strokeLinejoin="round"
            />

            {/* glowing head that rides the tip of the line while it draws */}
            <g className="about-head" style={{ opacity: 0 }}>
              <circle r={t.width * 4} style={{ fill: ACCENT, opacity: 0.25 }} />
              <circle r={t.width * 1.6} style={{ fill: ACCENT }} />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}