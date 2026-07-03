import Link from "next/link";
import { Download, Mail } from "lucide-react";

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
            READY TO <span className="fire-gradient-text">IGNITE</span>?
          </h2>
          <p
            className="font-body-lg text-on-surface-variant max-w-xl mx-auto mb-stack-md"
            id="closing-sub"
          >
            Whether you have a specific project in mind or just want to discuss
            technical architecture, my forge is always open.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-stack-md">
            <Link
              className="bg-primary-container text-on-primary-container flex flex-row gap-2 font-headline-md px-8 py-5 rounded-xl font-black glow-on-hover transition-all magnetic-hover"
              href="contact"
              id="btn-contact"
            >
              <Mail className="inline-block" />
              <span>GET IN TOUCH</span>
            </Link>
            <Link
              className="border-2 border-primary-container flex flex-row gap-2 text-primary-container font-headline-md px-8 py-5 rounded-xl font-black hover:bg-primary-container/10 transition-all magnetic-hover"
              href="#"
              id="btn-cv-bottom"
            >
              <Download className="inline-block" />
              <span>DOWNLOAD CV</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
