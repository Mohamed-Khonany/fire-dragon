import { FireSpan } from "@/components/UI/fireSpan/fire";
import Image from "next/image";

import Pe2piaLogo from "@/public/assets/images/projects/Pe2pia.png";
import FlashStoreLogo from "@/public/assets/images/projects/FlashStore.png";

export default function ProjectsSection() {
  return (
    <section className="relative w-full overflow-hidden px-6 py-5 items-center justify-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 35%, rgba(120,60,20,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        <div className="mb-5 flex flex-col items-center gap-2">
          <h2
            className="inline-block text-2xl font-bold text-white sm:text-3xl tracking-[0.3em]"
            style={{ fontFamily: "Inter, Outfit, sans-serif" }}
          >
            <FireSpan>Projects</FireSpan>
          </h2>
          <span className="h-0.5 w-24 rounded-full bg-linear-to-r from-primary-container to-secondary" />
        </div>

        <div className="flex flex-row justify-center items-center h-[75vh]">
          <div className="bg-linear-to-t from-flesh-store-primary to-flesh-store-secondary hover:scale-105 w-xl h-full items-center justify-center flex flex-col gap-5 rounded-bl-2xl rounded-tl-2xl">
            <Image
              src={FlashStoreLogo}
              alt="Flesh Store Logo"
              className="rounded-full object-contain"
            />
            <div className="flex flex-col gap-2 items-center text-center justify-center text-5xl text-[#F4BD46]">
              <span className="font-bold ">FLASH</span>
              <span className="font-semibold">Store</span>
            </div>
          </div>
          <div className="bg-pe2pia-secondary w-xl hover:scale-105 h-full items-center justify-center flex flex-col gap-5 rounded-br-2xl rounded-tr-2xl">
            <Image
              src={Pe2piaLogo}
              alt="Pe2pia Logo"
              className="rounded-full w-1/2 object-contain"
            />
            <div className="mb-5 flex flex-col gap-2 items-center text-center justify-center text-6xl text-pe2pia-third">
              <span className="font-bold ">Pe2pia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
