"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  Mesh,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  Vector2,
  Vector3,
  Vector4,
} from "three";

gsap.registerPlugin(useGSAP);

const MAX_POINTS = 64;

type BlendMode = "normal" | "screen" | "plus-lighter";

export interface GlowCursorProps {
  color?: string;
  secondaryColor?: string;
  trailLength?: number;
  trailWidth?: number;
  trailTaper?: number;
  followSpeed?: number;
  glowIntensity?: number;
  glowSpread?: number;
  hotspot?: number;
  brightness?: number;
  opacity?: number;
  pulseSpeed?: number;
  noiseStrength?: number;
  idleTimeout?: number;
  fadeDuration?: number;
  blendMode?: BlendMode;
  maxDevicePixelRatio?: number;
  enabled?: boolean;
  zIndex?: number;
  dotSize?: number;
  ringSize?: number;
  ringBorderWidth?: number;
  interactiveSelector?: string;
}

const DEFAULT_INTERACTIVE =
  'a[href], button:not(:disabled), [role="button"], input[type="button"], input[type="submit"], summary, label[for], select, [data-cursor="hover"]';

// ShaderMaterial injects `attribute position/uv` and precision itself.
const VERTEX_SHADER = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// Same shader as the original, with two changes:
//  1. `active` renamed to `isActive` (reserved word in GLSL ES 3.00)
//  2. uBounds: pixels outside the trail's bounding box exit immediately,
//     so the 63-step loop only runs near the tail (big speed-up on a full-screen canvas)
const FRAGMENT_SHADER = `
#define MAX_POINTS 64

uniform vec2 uResolution;
uniform vec2 uPoints[MAX_POINTS];
uniform float uPointCount;
uniform vec4 uBounds;
uniform vec3 uColor;
uniform vec3 uSecondaryColor;
uniform float uTrailWidth;
uniform float uTaper;
uniform float uGlowIntensity;
uniform float uGlowSpread;
uniform float uHotspot;
uniform float uBrightness;
uniform float uOpacity;
uniform float uPulseSpeed;
uniform float uNoiseStrength;
uniform float uNormalBlend;
uniform float uTime;
uniform float uFade;

varying vec2 vUv;

float sRGB(float x) {
  if (x <= 0.00031308) return 12.92 * x;
  return 1.055 * pow(x, 1.0 / 2.4) - 0.055;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float filmGrain(vec2 p, float time) {
  float frame = time * 18.0;
  float frameIndex = mod(floor(frame), 256.0);
  float nextFrameIndex = mod(frameIndex + 1.0, 256.0);
  float blend = fract(frame);
  blend = blend * blend * (3.0 - 2.0 * blend);
  vec2 pixel = floor(p);
  float current = hash(pixel + vec2(frameIndex * 17.0, frameIndex * 31.0));
  float next = hash(pixel + vec2(nextFrameIndex * 17.0, nextFrameIndex * 31.0));
  return mix(current, next, blend) * 2.0 - 1.0;
}

void main() {
  vec2 pixel = vUv * uResolution;

  // Early exit: far from the whole trail -> nothing to draw here
  if (pixel.x < uBounds.x || pixel.y < uBounds.y || pixel.x > uBounds.z || pixel.y > uBounds.w) discard;

  float denominator = max(uPointCount - 1.0, 1.0);
  float strongest = 0.0;
  float strongestCore = 0.0;
  float colorWeight = 0.0;
  vec3 colorSum = vec3(0.0);

  for (int i = 0; i < MAX_POINTS - 1; i++) {
    float index = float(i);
    float isActive = 1.0 - step(uPointCount - 1.0, index);
    vec2 start = uPoints[i];
    vec2 end = uPoints[i + 1];
    vec2 toPixel = pixel - start;
    vec2 segment = end - start;
    float along = clamp(dot(toPixel, segment) / max(dot(segment, segment), 0.0001), 0.0, 1.0);
    float progress = clamp((index + along) / denominator, 0.0, 1.0);
    float life = pow(max(1.0 - progress, 0.0), mix(0.55, 1.25, uTaper));
    float width = uTrailWidth * mix(1.0, 0.25, pow(progress, mix(0.55, 1.6, uTaper)));
    float distanceToTrail = length(toPixel - segment * along);
    float falloff = max(width * (0.8 + uGlowSpread * 1.4), 0.5);
    float beam = min(1.0, (falloff * falloff) / (distanceToTrail * distanceToTrail + falloff * falloff));
    float core = exp(-pow(distanceToTrail / max(width, 0.5), 2.0) * 2.5);
    float pulseAmount = min(abs(uPulseSpeed), 1.0);
    float pulse = 1.0 + sin(uTime * uPulseSpeed * 3.0 - progress * 11.0) * 0.16 * pulseAmount;
    float intensity = (core + beam * uGlowIntensity * 0.55) * life * pulse * isActive;
    vec3 segmentColor = mix(uColor, uSecondaryColor, progress);

    strongest = max(strongest, intensity);
    strongestCore = max(strongestCore, core * life * isActive);
    colorSum += segmentColor * intensity;
    colorWeight += intensity;
  }

  float grain = filmGrain(pixel, uTime);
  float noiseAmount = (1.0 - exp(-uNoiseStrength * 2.2)) * 0.4;
  float alpha = clamp(strongest * uOpacity * uFade, 0.0, 1.0);
  if (alpha < 0.0005) discard;

  vec3 color = colorSum / max(colorWeight, 0.0001);
  color = mix(color, vec3(1.0), smoothstep(0.25, 0.95, strongestCore) * uHotspot);
  float luminance = sRGB(clamp(strongest * uBrightness, 0.0, 1.0));
  luminance *= 1.0 + grain * noiseAmount;
  vec3 additiveColor = color * luminance;
  float normalAlpha = clamp(strongest * uBrightness * uOpacity * uFade, 0.0, 1.0);
  vec3 normalColor = mix(color, vec3(1.0), smoothstep(0.45, 1.0, strongestCore) * uHotspot * 0.35);
  gl_FragColor = vec4(mix(additiveColor, normalColor, uNormalBlend), mix(alpha, normalAlpha, uNormalBlend));
}
`;

const hexToRgb = (hex: string): [number, number, number] => {
  let value = (hex || "").replace("#", "").trim();
  if (value.length === 3)
    value = value
      .split("")
      .map((char: string) => char + char)
      .join("");
  const parsed = Number.parseInt(value || "000000", 16);
  return [
    ((parsed >> 16) & 255) / 255,
    ((parsed >> 8) & 255) / 255,
    (parsed & 255) / 255,
  ];
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

/** "rgb(1, 2, 3)" / "rgba(1, 2, 3, .5)" -> same color with a different alpha. */
const withAlpha = (css: string, alpha: number) => {
  if (css.trim().startsWith("#")) {
    const [r, g, b] = hexToRgb(css);
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`;
  }
  const m = css.match(/[\d.]+/g);
  if (!m || m.length < 3) return `rgba(255,255,255,${alpha})`;
  return `rgba(${m[0]}, ${m[1]}, ${m[2]}, ${alpha})`;
};

/** Alpha of a computed css color string (1 when it has no alpha channel). */
const alphaOf = (css: string) => {
  const m = css.match(/[\d.]+/g);
  return m && m.length >= 4 ? parseFloat(m[3]) : 1;
};

/**
 * Site-wide glow trail + dot cursor. Render it ONCE (in app/layout.js).
 * Fixed, full-screen, click-through canvas that listens on `window`.
 * Rendering: Three.js + the original shader. Animation: GSAP.
 *
 * Dot:  replaces the native cursor, filled with the trail's gradient.
 * Ring: over links / buttons the dot morphs into an unfilled circle whose
 *       border takes the hovered element's text color
 *       (override per element with data-cursor-color="#hex").
 */
export default function GlowCursor({
  color = "#67E8F9",
  secondaryColor = "#A78BFA",
  trailLength = 40,
  trailWidth = 8,
  trailTaper = 0.8,
  followSpeed = 0.16,
  glowIntensity = 1.9,
  glowSpread = 1.2,
  hotspot = 0.65,
  brightness = 1.25,
  opacity = 1,
  pulseSpeed = 1.1,
  noiseStrength = 0.035,
  idleTimeout = 700,
  fadeDuration = 900,
  blendMode = "screen",
  maxDevicePixelRatio = 1,
  enabled = true,
  zIndex = 9999,
  dotSize = 12,
  ringSize = 70,
  ringBorderWidth = 3,
  interactiveSelector = DEFAULT_INTERACTIVE,
}: GlowCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  // `dot` = 0..1 visibility of the dot (hidden until first move / when leaving the window)
  const stateRef = useRef({ fade: 0, enabled: enabled ? 1 : 0, dot: 0 });
  const activeRef = useRef(false); // true once the cursor is actually running (fine pointer, motion ok)

  const cfgRef = useRef(
    {} as Required<
      Omit<GlowCursorProps, "zIndex" | "maxDevicePixelRatio" | "enabled">
    >,
  );
  cfgRef.current = {
    color,
    secondaryColor,
    trailLength,
    trailWidth,
    trailTaper,
    followSpeed,
    glowIntensity,
    glowSpread,
    hotspot,
    brightness,
    opacity,
    pulseSpeed,
    noiseStrength,
    idleTimeout,
    fadeDuration,
    blendMode,
    dotSize,
    ringSize,
    ringBorderWidth,
    interactiveSelector,
  };

  // Smoothly turn the whole effect on/off (and give the native cursor back when off)
  useEffect(() => {
    const tween = gsap.to(stateRef.current, {
      enabled: enabled ? 1 : 0,
      duration: 0.35,
      ease: "power2.out",
    });
    if (activeRef.current)
      document.documentElement.classList.toggle("glow-cursor-on", enabled);
    return () => {
      tween.kill();
    };
  }, [enabled]);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const dotEl = dotRef.current;
      const fillEl = fillRef.current;
      const haloEl = haloRef.current;
      if (!canvas || !dotEl || !fillEl || !haloEl) return;

      // Touch device or reduced motion -> do nothing (no WebGL context, no loop, native cursor stays)
      if (window.matchMedia("(pointer: coarse)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const state = stateRef.current;

      // ---------- Hide the native cursor (only now that the custom one is live) ----------
      const styleEl = document.createElement("style");
      styleEl.textContent =
        "html.glow-cursor-on, html.glow-cursor-on * { cursor: none !important; }";
      document.head.appendChild(styleEl);
      activeRef.current = true;
      document.documentElement.classList.toggle("glow-cursor-on", enabled);

      // ---------- Three.js setup ----------
      const renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        premultipliedAlpha: false,
      });
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, maxDevicePixelRatio),
      );
      renderer.setClearColor(0x000000, 0);

      const scene = new Scene();
      const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const geometry = new BufferGeometry();
      geometry.setAttribute(
        "position",
        new BufferAttribute(
          new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
          3,
        ),
      );
      geometry.setAttribute(
        "uv",
        new BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2),
      );

      const pointVectors = Array.from(
        { length: MAX_POINTS },
        () => new Vector2(),
      );
      const init = cfgRef.current;

      const material = new ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms: {
          uResolution: { value: new Vector2(1, 1) },
          uPoints: { value: pointVectors },
          uPointCount: { value: init.trailLength },
          uBounds: { value: new Vector4(0, 0, 0, 0) },
          uColor: { value: new Vector3(...hexToRgb(init.color)) },
          uSecondaryColor: {
            value: new Vector3(...hexToRgb(init.secondaryColor)),
          },
          uTrailWidth: { value: init.trailWidth },
          uTaper: { value: init.trailTaper },
          uGlowIntensity: { value: init.glowIntensity },
          uGlowSpread: { value: init.glowSpread },
          uHotspot: { value: init.hotspot },
          uBrightness: { value: init.brightness },
          uOpacity: { value: init.opacity },
          uPulseSpeed: { value: init.pulseSpeed },
          uNoiseStrength: { value: init.noiseStrength },
          uNormalBlend: { value: init.blendMode === "normal" ? 1 : 0 },
          uTime: { value: 0 },
          uFade: { value: 0 },
        },
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });

      const mesh = new Mesh(geometry, material);
      mesh.frustumCulled = false;
      scene.add(mesh);

      const u = material.uniforms;

      // ---------- Trail state ----------
      const points = Array.from({ length: MAX_POINTS }, () => ({ x: 0, y: 0 }));
      const head = { x: 0, y: 0 };
      let width = window.innerWidth;
      let height = window.innerHeight;
      let initialized = false;
      let needsClear = false;

      // ---------- Dot / ring state ----------
      gsap.set(dotEl, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
      // Tight follow so the dot feels like the real pointer (the trail provides the lag)
      const dotX = gsap.quickTo(dotEl, "x", {
        duration: 0.08,
        ease: "power3.out",
      });
      const dotY = gsap.quickTo(dotEl, "y", {
        duration: 0.08,
        ease: "power3.out",
      });
      let dotPlaced = false;
      let hovered: Element | null = null;
      let lastDotOpacity = -1;

      // Glow strings are written in the order browsers report box-shadow
      // ("color x y blur spread [inset]") so GSAP can interpolate them cleanly.
      const glow = (c: string, outer: number, inner: number, blur: number) =>
        `${withAlpha(c, outer)} 0px 0px ${blur}px 1px, ${withAlpha(c, inner)} 0px 0px ${blur}px 1px inset`;

      const toRing = (target: Element) => {
        const cfg = cfgRef.current;
        const ringColor =
          (target as HTMLElement).dataset?.cursorColor || cfg.color;

        // Start the border invisible in the right color so it fades in instead of flashing
        if (
          parseFloat(gsap.getProperty(dotEl, "borderWidth") as string) < 0.5
        ) {
          gsap.set(dotEl, { borderColor: withAlpha(ringColor, 0) });
        }
        gsap.to(dotEl, {
          width: cfg.ringSize,
          height: cfg.ringSize,
          borderWidth: cfg.ringBorderWidth,
          borderColor: ringColor,
          borderRadius: "100%",
          boxShadow: glow(ringColor, 0.75, 0.45, 14),
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(fillEl, {
          opacity: 0,
          scale: 0.3,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(haloEl, { opacity: 0, duration: 0.3, ease: "power2.out" });
      };

      const toDot = () => {
        const cfg = cfgRef.current;
        const current = gsap.getProperty(dotEl, "borderColor") as string;
        gsap.to(dotEl, {
          width: cfg.dotSize,
          height: cfg.dotSize,
          borderWidth: 0,
          borderColor: withAlpha(current, 0),
          boxShadow: glow(current, 0, 0, 0),
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(fillEl, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(haloEl, { opacity: 1, duration: 0.4, ease: "power2.out" });
      };

      const onPointerOver = (e: PointerEvent) => {
        const target =
          (e.target as Element | null)?.closest?.(
            cfgRef.current.interactiveSelector,
          ) ?? null;
        if (target === hovered) return;
        const wasHovering = hovered !== null;
        hovered = target;
        if (target) toRing(target);
        else if (wasHovering) toDot();
      };

      const onPointerDown = () => {
        gsap.to(dotEl, { scale: 0.82, duration: 0.15, ease: "power2.out" });
      };
      const onPointerUp = () => {
        gsap.to(dotEl, {
          scale: 1,
          duration: 0.45,
          ease: "elastic.out(1, 0.5)",
        });
      };

      // Halo breathes like the trail's pulse
      const pulseSpeed = Math.abs(cfgRef.current.pulseSpeed);
      const haloPulse =
        pulseSpeed > 0.01
          ? gsap.fromTo(
              haloEl,
              { scale: 0.85 },
              {
                scale: 1.2,
                duration: 0.9 / clamp(pulseSpeed, 0.3, 2),
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
              },
            )
          : null;

      // ---------- GSAP: head follows pointer ----------
      const headDuration = clamp(
        0.04 / clamp(init.followSpeed, 0.01, 0.99),
        0.04,
        2,
      );
      const headX = gsap.quickTo(head, "x", {
        duration: headDuration,
        ease: "power3.out",
      });
      const headY = gsap.quickTo(head, "y", {
        duration: headDuration,
        ease: "power3.out",
      });

      // ---------- GSAP: idle fade ----------
      const fadeOut = () => {
        gsap.to(state, {
          fade: 0,
          duration: cfgRef.current.fadeDuration / 1000,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      const idleCall = gsap.delayedCall(init.idleTimeout / 1000, fadeOut);
      idleCall.pause();

      const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height, false);
        u.uResolution.value.set(width, height);
      };

      const snapTrailTo = (x: number, y: number) => {
        head.x = x;
        head.y = y;
        for (const p of points) {
          p.x = x;
          p.y = y;
        }
        initialized = true;
      };

      const onPointerMove = (e: PointerEvent) => {
        const x = e.clientX;
        const y = height - e.clientY; // the shader's y axis points up

        // First move, or the trail had fully faded: start fresh at the pointer
        if (!initialized || state.fade < 0.02) snapTrailTo(x, y);

        headX(x);
        headY(y);

        // Dot uses plain client coords. First move: jump there, don't fly in from the corner.
        if (!dotPlaced) {
          gsap.set(dotEl, { x: e.clientX, y: e.clientY });
          dotPlaced = true;
        }
        dotX(e.clientX);
        dotY(e.clientY);
        if (state.dot < 1)
          gsap.to(state, {
            dot: 1,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });

        gsap.to(state, {
          fade: 1,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
        idleCall.duration(cfgRef.current.idleTimeout / 1000);
        idleCall.restart(true);
      };

      const onLeaveWindow = () => {
        idleCall.pause();
        fadeOut();
        gsap.to(state, {
          dot: 0,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
        if (hovered) {
          hovered = null;
          toDot();
        }
      };

      // ---------- GSAP ticker: move the chain + render ----------
      const render = (time: number) => {
        // Dot visibility (cheap: only touches the DOM when the value changes)
        const dotOpacity = state.dot * state.enabled;
        if (Math.abs(dotOpacity - lastDotOpacity) > 0.001) {
          dotEl.style.opacity = String(dotOpacity);
          lastDotOpacity = dotOpacity;
        }

        const visible = initialized && state.fade * state.enabled > 0.003;

        // SLEEP: nothing visible -> clear once, then do no work
        if (!visible) {
          if (needsClear) {
            renderer.clear();
            needsClear = false;
          }
          return;
        }
        needsClear = true;

        const cfg = cfgRef.current;
        const count = clamp(Math.round(cfg.trailLength), 2, MAX_POINTS);

        // chain follows the head (frame-rate independent)
        const delta = gsap.ticker.deltaRatio(60);
        const chainBase = clamp(0.28 + cfg.followSpeed * 0.35, 0.08, 0.92);
        const chainEase = 1 - Math.pow(1 - chainBase, delta);

        points[0].x = head.x;
        points[0].y = head.y;
        for (let i = 1; i < MAX_POINTS; i++) {
          points[i].x += (points[i - 1].x - points[i].x) * chainEase;
          points[i].y += (points[i - 1].y - points[i].y) * chainEase;
        }

        // points -> uniforms + bounding box of the visible part of the trail
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (let i = 0; i < MAX_POINTS; i++) {
          pointVectors[i].set(points[i].x, points[i].y);
          if (i < count) {
            if (points[i].x < minX) minX = points[i].x;
            if (points[i].x > maxX) maxX = points[i].x;
            if (points[i].y < minY) minY = points[i].y;
            if (points[i].y > maxY) maxY = points[i].y;
          }
        }
        // Glow falls off like 1/(1+(d/falloff)^2); 12x falloff is below visibility
        const margin =
          Math.max(cfg.trailWidth, 0.1) *
          (0.8 + Math.max(cfg.glowSpread, 0) * 1.4) *
          12;
        u.uBounds.value.set(
          minX - margin,
          minY - margin,
          maxX + margin,
          maxY + margin,
        );

        u.uPointCount.value = count;
        u.uColor.value.set(...hexToRgb(cfg.color));
        u.uSecondaryColor.value.set(...hexToRgb(cfg.secondaryColor));
        u.uTrailWidth.value = Math.max(cfg.trailWidth, 0.1);
        u.uTaper.value = clamp(cfg.trailTaper, 0, 1);
        u.uGlowIntensity.value = Math.max(cfg.glowIntensity, 0);
        u.uGlowSpread.value = Math.max(cfg.glowSpread, 0);
        u.uHotspot.value = clamp(cfg.hotspot, 0, 1);
        u.uBrightness.value = Math.max(cfg.brightness, 0);
        u.uOpacity.value = clamp(cfg.opacity, 0, 1);
        u.uPulseSpeed.value = cfg.pulseSpeed;
        u.uNoiseStrength.value = clamp(cfg.noiseStrength, 0, 1);
        u.uNormalBlend.value = cfg.blendMode === "normal" ? 1 : 0;
        u.uTime.value = time; // GSAP ticker time is already in seconds
        u.uFade.value = state.fade * state.enabled;

        renderer.render(scene, camera);
      };

      resize();
      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      window.addEventListener("pointerup", onPointerUp, { passive: true });
      document.addEventListener("pointerover", onPointerOver, {
        passive: true,
      });
      document.documentElement.addEventListener("pointerleave", onLeaveWindow);
      gsap.ticker.add(render);

      return () => {
        gsap.ticker.remove(render);
        idleCall.kill();
        haloPulse?.kill();
        gsap.killTweensOf([dotEl, fillEl, haloEl]);
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointerover", onPointerOver);
        document.documentElement.removeEventListener(
          "pointerleave",
          onLeaveWindow,
        );
        document.documentElement.classList.remove("glow-cursor-on");
        styleEl.remove();
        activeRef.current = false;
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
      };
    },
    { dependencies: [maxDevicePixelRatio, followSpeed], revertOnUpdate: true },
  );

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 h-screen w-screen select-none"
        style={{ zIndex, mixBlendMode: blendMode }}
      />
      {/* Dot -> ring. The outer element is the ring (border + size); the fill is the gradient dot. */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 select-none rounded-full"
        style={{
          zIndex: zIndex + 1,
          width: dotSize,
          height: dotSize,
          boxSizing: "border-box",
          borderStyle: "solid",
          borderWidth: 0,
          borderColor: withAlpha(color, 0),
          boxShadow: `${withAlpha(color, 0)} 0px 0px 0px 1px, ${withAlpha(color, 0)} 0px 0px 0px 1px inset`,
          opacity: 0,
          willChange: "transform, width, height",
        }}
      >
        {/* soft halo, same hues as the trail glow */}
        <div
          ref={haloRef}
          className="pointer-events-none absolute rounded-full"
          style={{
            inset: "-100%",
            background: `radial-gradient(circle, ${withAlpha(color, 0.55)} 0%, ${withAlpha(secondaryColor, 0.28)} 40%, transparent 70%)`,
          }}
        />
        {/* hot white core fading into the trail gradient */}
        <div
          ref={fillRef}
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,${Math.min(1, hotspot + 0.25)}) 0%, ${color} 45%, ${secondaryColor} 100%)`,
          }}
        />
      </div>
    </>
  );
}
