import AnimatedBanner from "@/components/UI/animated-path/animated-banner";
import GradientText from "@/components/UI/fireSpan/gradientText";
import AboutSidePath from "@/components/UI/about-side-path/about-side-path";
import { heroData } from "@/data/hero-data";

export default function Banner() {
  return (
    <section
      id="banner-section"
      className="banner-section relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background"
    >
      <AnimatedBanner isHome={true} heroData={heroData} />

      {/* Centered wrapper: only layout, never animated */}
      <div id="home" className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <div className="relative shrink-0 text-[clamp(2.5rem,9vw,8rem)]">
          <AboutSidePath side="top-left" />

          <span
            className="about-word block select-none whitespace-nowrap font-extrabold tracking-widest"
            style={{ opacity: 0, willChange: "transform, opacity, filter" }}
            aria-hidden="true"
          >
            <GradientText>About me</GradientText>
          </span>

          <AboutSidePath side="bottom-right" />
        </div>
      </div>
    </section>
  );
}