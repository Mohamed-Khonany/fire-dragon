'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
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
  Vector4
} from 'three';

gsap.registerPlugin(useGSAP);

const MAX_POINTS = 64;

type BlendMode = 'normal' | 'screen' | 'plus-lighter';

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
}

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
  let value = (hex || '').replace('#', '').trim();
  if (value.length === 3)
    value = value
      .split('')
      .map((char: string) => char + char)
      .join('');
  const parsed = Number.parseInt(value || '000000', 16);
  return [((parsed >> 16) & 255) / 255, ((parsed >> 8) & 255) / 255, (parsed & 255) / 255];
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/**
 * Site-wide glow trail. Render it ONCE (in app/layout.js).
 * Fixed, full-screen, click-through canvas that listens on `window`.
 * Rendering: Three.js + the original shader. Animation: GSAP.
 */
export default function GlowCursor({
  color = '#67E8F9',
  secondaryColor = '#A78BFA',
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
  blendMode = 'screen',
  maxDevicePixelRatio = 1,
  enabled = true,
  zIndex = 9999
}: GlowCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ fade: 0, enabled: enabled ? 1 : 0 });

  const cfgRef = useRef({} as Required<Omit<GlowCursorProps, 'zIndex' | 'maxDevicePixelRatio' | 'enabled'>>);
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
    blendMode
  };

  // Smoothly turn the whole effect on/off
  useEffect(() => {
    const tween = gsap.to(stateRef.current, {
      enabled: enabled ? 1 : 0,
      duration: 0.35,
      ease: 'power2.out'
    });
    return () => {
      tween.kill();
    };
  }, [enabled]);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Touch device or reduced motion -> do nothing (no WebGL context, no loop)
      if (window.matchMedia('(pointer: coarse)').matches) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const state = stateRef.current;

      // ---------- Three.js setup ----------
      const renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        premultipliedAlpha: false
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDevicePixelRatio));
      renderer.setClearColor(0x000000, 0);

      const scene = new Scene();
      const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const geometry = new BufferGeometry();
      geometry.setAttribute(
        'position',
        new BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3)
      );
      geometry.setAttribute('uv', new BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2));

      const pointVectors = Array.from({ length: MAX_POINTS }, () => new Vector2());
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
          uSecondaryColor: { value: new Vector3(...hexToRgb(init.secondaryColor)) },
          uTrailWidth: { value: init.trailWidth },
          uTaper: { value: init.trailTaper },
          uGlowIntensity: { value: init.glowIntensity },
          uGlowSpread: { value: init.glowSpread },
          uHotspot: { value: init.hotspot },
          uBrightness: { value: init.brightness },
          uOpacity: { value: init.opacity },
          uPulseSpeed: { value: init.pulseSpeed },
          uNoiseStrength: { value: init.noiseStrength },
          uNormalBlend: { value: init.blendMode === 'normal' ? 1 : 0 },
          uTime: { value: 0 },
          uFade: { value: 0 }
        },
        transparent: true,
        depthTest: false,
        depthWrite: false
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

      // ---------- GSAP: head follows pointer ----------
      const headDuration = clamp(0.04 / clamp(init.followSpeed, 0.01, 0.99), 0.04, 2);
      const headX = gsap.quickTo(head, 'x', { duration: headDuration, ease: 'power3.out' });
      const headY = gsap.quickTo(head, 'y', { duration: headDuration, ease: 'power3.out' });

      // ---------- GSAP: idle fade ----------
      const fadeOut = () => {
        gsap.to(state, {
          fade: 0,
          duration: cfgRef.current.fadeDuration / 1000,
          ease: 'power2.out',
          overwrite: 'auto'
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

        gsap.to(state, { fade: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' });
        idleCall.duration(cfgRef.current.idleTimeout / 1000);
        idleCall.restart(true);
      };

      const onLeaveWindow = () => {
        idleCall.pause();
        fadeOut();
      };

      // ---------- GSAP ticker: move the chain + render ----------
      const render = (time: number) => {
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
        const margin = Math.max(cfg.trailWidth, 0.1) * (0.8 + Math.max(cfg.glowSpread, 0) * 1.4) * 12;
        u.uBounds.value.set(minX - margin, minY - margin, maxX + margin, maxY + margin);

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
        u.uNormalBlend.value = cfg.blendMode === 'normal' ? 1 : 0;
        u.uTime.value = time; // GSAP ticker time is already in seconds
        u.uFade.value = state.fade * state.enabled;

        renderer.render(scene, camera);
      };

      resize();
      window.addEventListener('resize', resize);
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeaveWindow);
      gsap.ticker.add(render);

      return () => {
        gsap.ticker.remove(render);
        idleCall.kill();
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', onPointerMove);
        document.documentElement.removeEventListener('pointerleave', onLeaveWindow);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
      };
    },
    { dependencies: [maxDevicePixelRatio, followSpeed], revertOnUpdate: true }
  );

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-screen w-screen select-none"
      style={{ zIndex, mixBlendMode: blendMode }}
    />
  );
}