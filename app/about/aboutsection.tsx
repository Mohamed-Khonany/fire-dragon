import Image from "next/image";
import "../../styles/typography.css";
import Logo from "../../assets/images/logo/logo-banner.png";
import Link from "next/link";
import { Code, User } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface-container-lowest/50 backdrop-blur-sm">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-lg items-center">
          {/*  Left: Profile Frame  */}
          <div className="md:col-span-5 relative reveal transition-all duration-700 delay-100">
            <div className="aspect-square glass-card rounded-2xl flex items-center justify-center p-4 border-primary/20 overflow-hidden relative group">
              <div className="absolute inset-0 bg-linear-to-tr from-primary-container/20 to-transparent"></div>
              <Image
                src={Logo}
                alt="Mohamed Samir Khonany"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4  rounded-xl bg-background/90 border border-white/10 p-5 transition-all glow-effect duration-400 ease-out hover:-translate-y-0.75 hover:shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_0_1px_rgba(249,115,22,0.25)]">
              <p className="text-2xl font-bold leading-none tracking-tight transition-colors duration-300 hover:text-[#fb923c] text-[#f97316]">
                02+
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Years of Experience
              </p>
            </div>
          </div>
          {/*  Right: Content  */}
          <div className="md:col-span-7 space-y-6 reveal transition-all duration-700 delay-300">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1
                  className="font-display-xl text-2xl md:text-7xl leading-none font-white tracking-tight text-on-surface font-extrabold"
                  id="my-name"
                >
                  MOHAMED KHONANY
                </h1>
                <p
                  className="font-headline-sm text-headline-sm text-primary tracking-widest uppercase font-bold"
                  id="hero-title"
                >
                  Frontend Developer | Mobile Developer
                </p>
              </div>
              <div className="font-body-lg text-body-lg max-w-2xl text-on-surface/80 leading-relaxed">
                <p>
                  Passionate Frontend &amp; Mobile Developer specializing in
                  building high-performance web and mobile applications with
                  React, Next.js, and React Native. I graduated in Computer
                  Science from Cairo University in 2024, and since then I've
                  worked as a React Native Developer building production apps
                  with complex UI, smooth animations, and responsive design.
                </p>
                <p className="mt-4">
                  What drives me is solving real problems through code — I pay
                  close attention to every detail, pushing each project until it
                  feels fully polished. I enjoy building business systems and
                  mobile apps that have a genuine impact on the people who use
                  them.
                </p>
              </div>
            </div>
            <div className="pt-8 flex flex-wrap gap-4">
              <button className="font-label-mono text-label-mono uppercase hover:text-primary border tracking-widest hover:border-on-surface px-6 py-2 rounded border-primary-container text-primary-container duration-300 transition-all">
                Download CV
              </button>
              <div className="flex items-center gap-4 px-4  transition-all ">
                <Link
                  className="flex items-center gap-2 px-5 py-3 glass-panel rounded-lg text-on-surface hover:text-primary-container border border-on-surface/30 hover:border-primary-container transition-all group"
                  href="https://github.com"
                >
                  <Code className="" />
                  <span className="font-label-mono">GITHUB</span>
                </Link>
                <Link
                  className="flex items-center gap-2 px-5 py-3 glass-panel rounded-lg text-on-surface hover:text-primary-container border border-on-surface/30 hover:border-primary-container transition-all group"
                  href="https://linkedin.com"
                >
                  <User className="" />
                  <span className="font-label-mono">LINKEDIN</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
