"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../../../../styles/typography.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaLinkedinIn, FaGithub, FaWhatsapp } from "react-icons/fa";
import { MdMailOutline, MdOutlineFileDownload, MdCheck } from "react-icons/md";
import GradientText from "@/components/UI/fireSpan/gradientText";

gsap.registerPlugin(ScrollTrigger, useGSAP);


/* ---------- helpers ---------- */
const toMail = (v?: string) =>
  !v ? "" : v.startsWith("mailto:") ? v : v.includes("@") ? `mailto:${v}` : v;

const toWhatsapp = (v?: string) => {
  if (!v) return "";
  if (v.startsWith("http")) return v;
  return `https://wa.me/${v.replace(/[^\d]/g, "")}`;
};

export default function AboutSection({ data }: { data: any }) {
  const root = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [downloaded, setDownloaded] = useState(false);

  const s = data.socials ?? data;
  const socials = [
    { key: "linkedin", label: "LinkedIn", href: s.linkedIn ?? s.linkedin, Icon: FaLinkedinIn },
    { key: "github", label: "GitHub", href: s.github ?? s.gitHub, Icon: FaGithub },
    { key: "gmail", label: "Gmail", href: toMail(s.gmail ?? s.email), Icon: MdMailOutline },
    { key: "whatsapp", label: "WhatsApp", href: toWhatsapp(s.whatsapp ?? s.whatsApp), Icon: FaWhatsapp },
  ].filter((i) => i.href);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);

        /* ======== initial hidden states ======== */
        gsap.set(
          q(".a-card, .a-badge, .a-name-char, .a-title, .a-desc, .a-cv, .a-social"),
          { autoAlpha: 0 }
        );

        /* ======== Entrance timeline (transform + opacity only) ======== */
        const tl = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
        });

        tl.fromTo(q(".a-glow"), { scale: 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.6 }, 0)
          .fromTo(
            q(".a-card"),
            { autoAlpha: 0, rotationY: -75, x: -80, scale: 0.8, transformPerspective: 1000 },
            { autoAlpha: 1, rotationY: 0, x: 0, scale: 1, duration: 1.3 },
            0.1
          )
          .fromTo(
            q(".a-ring"),
            { scale: 0.4, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 1.2, stagger: 0.15 },
            0.3
          )
          .fromTo(
            q(".a-badge"),
            { autoAlpha: 0, y: 40, scale: 0.4, rotation: -12 },
            { autoAlpha: 1, y: 0, scale: 1, rotation: 0, duration: 1, ease: "back.out(2)" },
            0.9
          )
          .fromTo(
            q(".a-name-char"),
            { autoAlpha: 0, yPercent: 110 },
            { autoAlpha: 1, yPercent: 0, duration: 0.9, stagger: 0.035 },
            0.35
          )
          .fromTo(q(".a-title"), { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 1.1 }, 0.7)
          .fromTo(q(".a-desc"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.9)
          .fromTo(
            q(".a-cv"),
            { autoAlpha: 0, y: 30, scale: 0.8 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.8)" },
            1.1
          )
          .fromTo(
            q(".a-social"),
            { autoAlpha: 0, y: 40, scale: 0, rotation: -90 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(2.2)",
            },
            1.2
          );

        /* years-of-experience counter */
        const raw = String(data.yearsOfExperience ?? "");
        const num = parseFloat(raw.replace(/[^\d.]/g, ""));
        const suffix = raw.replace(/[\d.]/g, "");
        if (!Number.isNaN(num)) {
          const counter = { v: 0 };
          const el = q(".a-count")[0] as HTMLElement | undefined;
          tl.to(
            counter,
            {
              v: num,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                if (el) el.textContent = `${Math.round(counter.v)}${suffix}`;
              },
            },
            1
          );
        }

        /* ======== Ambient loops: only run while the section is on screen ======== */
        const ambient = [
          gsap.to(q(".a-spin"), { rotation: 360, duration: 8, repeat: -1, ease: "none", paused: true }),
          gsap.to(q(".a-ring-1"), { rotation: 360, duration: 22, repeat: -1, ease: "none", paused: true }),
          gsap.to(q(".a-ring-2"), { rotation: -360, duration: 34, repeat: -1, ease: "none", paused: true }),
          gsap.to(q(".a-float"), { y: -12, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true }),
          gsap.to(q(".a-badge-float"), { y: 8, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true }),
        ];
        const visibility = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => ambient.forEach((t) => t.paused(!self.isActive)),
        });
        ambient.forEach((t) => t.paused(!visibility.isActive));

        /* ======== 3D tilt + glare + depth parallax ======== */
        const tilt = tiltRef.current!;
        const glare = glareRef.current!;
        const photo = q(".a-photo")[0] as HTMLElement;
        const badge = q(".a-badge-depth")[0] as HTMLElement;

        gsap.set(tilt, { transformPerspective: 900, transformStyle: "preserve-3d" });
        const rotX = gsap.quickTo(tilt, "rotationX", { duration: 0.6, ease: "power3.out" });
        const rotY = gsap.quickTo(tilt, "rotationY", { duration: 0.6, ease: "power3.out" });
        const photoX = gsap.quickTo(photo, "x", { duration: 0.8, ease: "power3.out" });
        const photoY = gsap.quickTo(photo, "y", { duration: 0.8, ease: "power3.out" });
        const badgeX = gsap.quickTo(badge, "x", { duration: 0.9, ease: "power3.out" });
        const badgeY = gsap.quickTo(badge, "y", { duration: 0.9, ease: "power3.out" });

        let raf = 0;
        let gx = 50;
        let gy = 50;
        const paintGlare = () => {
          raf = 0;
          glare.style.setProperty("--mx", `${gx}%`);
          glare.style.setProperty("--my", `${gy}%`);
        };

        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          const r = tilt.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          rotY((px - 0.5) * 24);
          rotX(-(py - 0.5) * 24);
          photoX(-(px - 0.5) * 22);
          photoY(-(py - 0.5) * 22);
          badgeX((px - 0.5) * 30);
          badgeY((py - 0.5) * 30);
          gx = px * 100;
          gy = py * 100;
          if (!raf) raf = requestAnimationFrame(paintGlare); // max one paint per frame
          gsap.to(glare, { opacity: 1, duration: 0.3, overwrite: "auto" });
        };
        const onLeave = () => {
          rotX(0);
          rotY(0);
          photoX(0);
          photoY(0);
          badgeX(0);
          badgeY(0);
          gsap.to(glare, { opacity: 0, duration: 0.5, overwrite: "auto" });
        };
        tilt.addEventListener("pointermove", onMove);
        tilt.addEventListener("pointerleave", onLeave);

        /* ======== Social buttons: one timeline per button (play / reverse) ======== */
        const cleanups: Array<() => void> = [];
        const hoverTls: gsap.core.Timeline[] = [];

        q(".a-social, .a-cvbtn").forEach((btn) => {
          const el = btn as HTMLElement;
          const fill = el.querySelector(".a-social-fill");
          const icon = el.querySelectorAll(".a-social-icon"); // icon + label (CV button has both)
          const tip = el.querySelector(".a-social-tip"); // only socials have a tooltip

          // GSAP owns the fill's transform (no Tailwind scale class), fully hidden at rest
          gsap.set(fill, { scaleY: 0, transformOrigin: "50% 100%", autoAlpha: 0 });

          const hover = gsap
            .timeline({ paused: true, defaults: { duration: 0.3, ease: "power2.out" } })
            .to(fill, { scaleY: 1, autoAlpha: 1 }, 0)
            .to(icon, { color: "#0b0b0b" }, 0);
          if (tip) hover.fromTo(tip, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0 }, 0);
          hoverTls.push(hover);

          const enter = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            hover.play();
          };
          const move = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            gsap.to(el, { x: dx * 0.3, y: dy * 0.3, duration: 0.4, ease: "power3.out", overwrite: "auto" });
          };
          const leave = () => {
            hover.reverse();
            gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
          };
          const press = () =>
            gsap.fromTo(icon, { scale: 0.8 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });

          el.addEventListener("pointerenter", enter);
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          el.addEventListener("pointercancel", leave);
          el.addEventListener("pointerdown", press);
          cleanups.push(() => {
            el.removeEventListener("pointerenter", enter);
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
            el.removeEventListener("pointercancel", leave);
            el.removeEventListener("pointerdown", press);
          });
        });

        // safety net: leaving the whole row (or losing focus) resets every button
        const row = q(".a-actions")[0] as HTMLElement | undefined;
        const resetAll = () => {
          hoverTls.forEach((t) => t.reverse());
          gsap.to(q(".a-social, .a-cvbtn"), { x: 0, y: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        };
        row?.addEventListener("pointerleave", resetAll);
        window.addEventListener("blur", resetAll);

        /* ======== Name: letter wave on hover ======== */
        const chars = q(".a-name-char");
        const nameEl = q("#my-name")[0];
        const nameEnter = () =>
          gsap.to(chars, {
            y: -8,
            duration: 0.25,
            stagger: { each: 0.025, yoyo: true, repeat: 1 },
            ease: "power2.out",
            overwrite: "auto",
          });
        nameEl?.addEventListener("mouseenter", nameEnter);

        return () => {
          if (raf) cancelAnimationFrame(raf);
          visibility.kill();
          ambient.forEach((t) => t.kill());
          tilt.removeEventListener("pointermove", onMove);
          tilt.removeEventListener("pointerleave", onLeave);
          row?.removeEventListener("pointerleave", resetAll);
          window.removeEventListener("blur", resetAll);
          nameEl?.removeEventListener("mouseenter", nameEnter);
          cleanups.forEach((fn) => fn());
        };
      });

      // reduced motion: just show everything
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          root.current!.querySelectorAll(
            ".a-card,.a-badge,.a-name-char,.a-title,.a-desc,.a-cv,.a-social"
          ),
          { autoAlpha: 1 }
        );
      });
    },
    { scope: root, dependencies: [data] }
  );

  const nameWords: string[] = String(data.name ?? "").split(" ");

  return (
    <div
      ref={root}
      className="py-stack-lg px-margin-mobile md:px-margin-desktop"
    >
      {/* ambient glow: plain gradient (no blur filter = cheap to paint) */}
      <div
        className="a-glow pointer-events-none absolute left-[-15%] top-[5%] h-[44rem] w-[44rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.16) 0%, rgba(249,115,22,0.06) 40%, transparent 68%)",
        }}
      />

      <div className="relative mx-auto max-w-container-max pt-12">
        <div className="grid grid-cols-1 items-center gap-stack-lg md:grid-cols-12">
          {/* ============ LEFT: interactive profile ============ */}
          <div className="relative md:col-span-5">
            {/* orbiting rings */}
            <div className="pointer-events-none absolute inset-[-12%] flex items-center justify-center">
              <div className="a-ring a-ring-1 absolute h-full w-full rounded-full border border-dashed border-[#f97316]/30 will-change-transform">
                <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f97316] shadow-[0_0_16px_#f97316]" />
              </div>
              <div className="a-ring a-ring-2 absolute h-[88%] w-[88%] rounded-full border border-white/10 will-change-transform">
                <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#fb923c] shadow-[0_0_12px_#fb923c]" />
              </div>
            </div>

            <div className="a-card a-float relative">
              <div ref={tiltRef} className="relative will-change-transform">
                {/* spinning conic border */}
                <div className="relative overflow-hidden rounded-2xl p-[2px]">
                  <div
                    className="a-spin absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 will-change-transform"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0 60%, #f97316 80%, #fde68a 90%, transparent 100%)",
                    }}
                  />
                  <div className="relative aspect-square overflow-hidden rounded-[14px] ">
                    <Image
                      src={data.profilePhoto}
                      alt={data.name ?? "Profile photo"}
                      width={500}
                      height={500}
                      priority
                      className="a-photo h-full w-full scale-[1.12] object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-tr from-[#f97316]/20 via-transparent to-transparent" />
                    <div
                      ref={glareRef}
                      className="pointer-events-none absolute inset-0 opacity-0"
                      style={
                        {
                          "--mx": "50%",
                          "--my": "50%",
                          background:
                            "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.26), transparent 45%)",
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </div>

                {/* floating experience badge */}
                <div
                  className="a-badge-depth absolute -bottom-5 -right-5"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <div className="a-badge a-badge-float cursor-default rounded-xl border border-white/10 bg-[#0b0b0d]/95 p-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_0_1px_rgba(249,115,22,0.35)]">
                    <GradientText className="a-count text-3xl font-bold leading-none tracking-tight text-[#f97316]">
                      {data.yearsOfExperience}
                    </GradientText>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                      Years of Experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============ RIGHT: content ============ */}
          <div className="space-y-6 md:col-span-7">
            <div className="cursor-default space-y-4">
              <div className="space-y-2">
                <h1
                  id="my-name"
                  className="text-3xl font-extrabold leading-none tracking-tight text-on-surface md:text-7xl"
                  aria-label={data.name}
                >
                  {nameWords.map((word, wi) => (
                    <span key={wi} className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom">
                      {word.split("").map((ch, ci) => (
                        <span key={ci} aria-hidden="true" className="a-name-char inline-block">
                          {ch}
                        </span>
                      ))}
                    </span>
                  ))}
                </h1>

                <div className="a-title">
                  <GradientText className="text-sm font-bold uppercase tracking-widest md:text-xl">
                    {data.title}
                  </GradientText>
                </div>
              </div>

              <div className="a-desc max-w-2xl text-body-lg font-body-lg leading-relaxed text-on-surface/80">
                <p>{data.description}</p>
              </div>
            </div>

            <div className="a-actions flex flex-wrap items-center justify-between gap-6 pt-2 pr-8">
              <div className="a-cv">
                <Link
                  href={data.cv}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  type="button"
                  onClick={()=> setDownloaded(true)}
                  aria-label="Download CV"
                  className="a-cvbtn group relative flex h-14 cursor-pointer items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"
                >
                  {/* clipping wrapper for the rising gradient */}
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="a-social-fill absolute inset-0 opacity-0 bg-linear-to-t from-[#f97316] to-[#fbbf24]" />
                  </span>
                  <span className="a-cv-arrow a-social-icon relative z-10 text-2xl text-zinc-200">
                    {downloaded ? <MdCheck /> : <MdOutlineFileDownload />}
                  </span>
                  <span className="a-social-icon relative z-10 text-sm font-semibold tracking-wide text-zinc-200">
                    {downloaded ? "Downloaded" : "Download CV"}
                  </span>
                </Link>
              </div>

              {/* Social links */}
              <div className="a-socials flex items-center gap-4 lg:px-8">
                {socials.map(({ key, label, href, Icon }) => (
                  <Link
                    key={key}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="a-social group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"
                  >
                    {/* clipping wrapper so the tooltip is NOT clipped */}
                    <span className="absolute inset-0 overflow-hidden rounded-full">
                      <span className="a-social-fill absolute inset-0 opacity-0 bg-linear-to-t from-[#f97316] to-[#fbbf24]" />
                    </span>
                    <Icon className="a-social-icon relative z-10 text-xl text-zinc-200" />
                    <span className="a-social-tip pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0b0b0d] px-2 py-1 text-[11px] font-medium text-zinc-200 opacity-0 ring-1 ring-white/10">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}