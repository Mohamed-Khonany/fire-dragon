import gsap from "gsap";
// Free since GSAP 3.13 (all plugins are included in the public `gsap` package).
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

const EASE = "power2.inOut";

/**
 * Builds ONE timeline for every `.about-side` inside `scope`.
 * It is NOT attached to ScrollTrigger itself: nest it inside your main scrubbed
 * timeline with `tl.add(createAboutPathsTimeline(section, 0.5), 0.42)`.
 *
 * @param totalDuration how many timeline units the whole sequence should occupy
 *                      in the parent timeline (the content is rescaled to fit).
 */
export function createAboutPathsTimeline(
  scope: HTMLElement,
  totalDuration = 0.5,
) {
  const tl = gsap.timeline();

  scope.querySelectorAll<HTMLElement>(".about-side").forEach((side) => {
    // top-left drifts in from the top-left, bottom-right from the bottom-right
    const dir = side.dataset.side === "top-left" ? -1 : 1;

    tl.fromTo(
      side,
      { xPercent: dir * 14, yPercent: dir * 18, opacity: 0 },
      {
        xPercent: 0,
        yPercent: 0,
        opacity: 1,
        ease: "power2.out",
        duration: 0.2,
      },
      0,
    );

    side.querySelectorAll<SVGGElement>("[data-trace]").forEach((trace) => {
      const start = Number(trace.dataset.start ?? 0);
      const dur = Number(trace.dataset.dur ?? 0.3);

      const lines = trace.querySelectorAll<SVGPathElement>(".about-line");
      const core = trace.querySelector<SVGPathElement>(".about-core");
      const head = trace.querySelector<SVGGElement>(".about-head");

      // 1) the line draws itself (glow + core share the exact same tween)
      tl.fromTo(
        lines,
        { drawSVG: "0%" },
        { drawSVG: "100%", ease: EASE, duration: dur },
        start,
      );

      // 2) a glowing head rides the tip. Same ease + duration => perfectly in sync.
      if (core && head) {
        tl.fromTo(head, { opacity: 0 }, { opacity: 1, duration: 0.03 }, start);
        tl.to(
          head,
          {
            motionPath: {
              path: core,
              align: core,
              alignOrigin: [0.5, 0.5],
            },
            ease: EASE,
            duration: dur,
          },
          start,
        );
      }
    });
  });

  // Rescale the sequence so it occupies `totalDuration` in the parent timeline.
  return tl.duration(totalDuration);
}