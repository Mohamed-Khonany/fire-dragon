
import AnimatedBanner from "@/components/UI/animated-path/animated-banner";
import { heroData } from "@/data/hero-data";

export default function Banner() {
  return (
    <section
      id="banner-section"
      className="banner-section relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background"
    >
      <AnimatedBanner isHome={true} heroData={heroData} />
    </section>
  );
}
