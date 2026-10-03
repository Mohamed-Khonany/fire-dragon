import Image from "next/image";
import "../../../../styles/typography.css";
import Logo from "../../../../public/assets/images/logo/logo-banner.png";
import Link from "next/link";
import { Code, User } from "lucide-react";
import { FireDev, FireSpan } from "@/components/UI/fireSpan/fire";
import GradientText from "@/components/UI/fireSpan/gradientText";

export default function AboutSection({data}: {data: any}) {
  return (
    <div className="h-screen relative py-stack-lg px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-lg items-center">
          {/*  Left: Profile Frame  */}
          <div className="md:col-span-5 relative reveal transition-all duration-700 delay-100">
            <div className="aspect-square glass-card rounded-2xl flex items-center justify-center p-4 border-primary/20 overflow-hidden relative group">
              <div className="absolute inset-0 bg-linear-to-tr from-primary-container/20 to-transparent"></div>
              <Image
                src={data.profilePhoto}
                alt="Mohamed Samir Khonany"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4  rounded-xl cursor-default bg-background/90 border border-white/10 p-5 transition-all glow-effect duration-400 ease-out hover:-translate-y-0.75 hover:shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_0_1px_rgba(249,115,22,0.25)]">
              <GradientText  className="text-2xl font-bold leading-none tracking-tight transition-colors duration-300 hover:text-[#fb923c] text-[#f97316]">
                {data.yearsOfExperience}
              </GradientText>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400 ">
                Years of Experience
              </p>
            </div>
          </div>
          {/*  Right: Content  */}
          <div className="md:col-span-7 space-y-6 reveal transition-all duration-700 delay-300">
            <div className="space-y-4 cursor-default">
              <div className="space-y-2">
                <h1
                  className="text-3xl md:text-7xl leading-none font-white tracking-tight text-on-surface font-extrabold"
                  id="my-name"
                >
                  {data.name}
                </h1>
                <GradientText className="md:text-xl text-sm tracking-widest uppercase font-bold">
                  {data.title}
                </GradientText>
              </div>
              <div className="font-body-lg text-body-lg max-w-2xl text-on-surface/80 leading-relaxed">
                <p>
                  {data.description}
                </p>
              </div>
            </div>
            <div className="pt-2 flex flex-wrap gap-4 cursor-default">
              <FireDev className="font-label-mono text-label-mono uppercase tracking-widest px-6 py-3 rounded duration-300 transition-all">
                Download CV
              </FireDev>
              {/* <div className="flex items-center gap-4 px-4  transition-all ">
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
