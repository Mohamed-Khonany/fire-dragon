import Link from "next/link";
import { Download, Mail } from "lucide-react";
import { FireDev, FireSpan } from "@/components/UI/fireSpan/fire";

export default function Closing() {
  return (
    <section
      className="py-stack-md px-margin-desktop text-center max-w-container-max mx-auto"
      id="contact"
    >
      <div className="glass-panel p-stack-xl rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container/10 blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>
        <div className="relative z-10 flex flex-col items-center gap-stack-md">
          <h2
            className="font-display-xl text-headline-lg md:text-display-xl mb-stack-sm"
            id="closing-headline"
          >
            READY TO <FireSpan>IGNITE</FireSpan>?
          </h2>
          <p
            className="md:text-body-lg text-sm md:max-w-xl md:mx-auto text-on-surface-variant mb-stack-md"
            id="closing-sub"
          >
            Whether you have a specific project in mind or just want to discuss
            technical architecture, my forge is always open.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-stack-md">
            <Link href="/contact" id="btn-contact">
              <FireDev className="flex flex-row gap-2 px-8 py-5 rounded-xl font-semibold justify-center items-center text-center transition-all">
                <Mail className="font-light" />
                <span className="text-sm md:text-md">GET IN TOUCH</span>
              </FireDev>
            </Link>
            <Link
              className="border-2 border-linear-to-b from-primary-container to-secondary  flex flex-row gap-2 text-primary-container font-headline-md px-8 py-5 rounded-xl font-semibold hover:scale-105 transition-all magnetic-hover justify-center items-center text-center"
              href="#"
              id="btn-cv-bottom"
            >
              <Download className="font-light" />
              <FireSpan className="text-xs md:text-md">DOWNLOAD CV</FireSpan>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
