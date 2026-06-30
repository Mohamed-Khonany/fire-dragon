import "./about.css";


import AboutSection from "./aboutsection";
import TechnicalForge from "./technicalForge";

export default function AboutPage() {
  return (
    <main className="py-stack-lg relative bg-black">
      {/* <!-- Background Shader/Atmosphere --> */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40"></div>
      {/* <!-- Hero Block --> */}
      <AboutSection />

      {/* <!-- Skills & Tools Grid --> */}
      <TechnicalForge />

      {/* <!-- "How I Work" Block --> */}
      <section className="py-stack-xl px-margin-desktop bg-surface-container-lowest/50">
        <div className="max-w-container-max mx-auto">
          <div className="mb-stack-lg">
            <h2
              className="font-headline-lg text-headline-lg"
              id="how-work-title"
            >
              PHILOSOPHY OF THE{" "}
              <span className="text-primary-container">FORGE</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
            <div className="flex items-start gap-stack-sm p-6 glass-panel rounded-xl border-l-4 border-l-primary-container">
              <span className="material-symbols-outlined text-4xl text-primary-container">
                auto_fix_high
              </span>
              <div>
                <p className="font-body-lg text-on-surface" id="work-stmt-1">
                  "I push every project until it feels fully polished."
                </p>
              </div>
            </div>
            <div className="flex items-start gap-stack-sm p-6 glass-panel rounded-xl border-l-4 border-l-primary-container">
              <span className="material-symbols-outlined text-4xl text-primary-container">
                token
              </span>
              <div>
                <p className="font-body-lg text-on-surface" id="work-stmt-2">
                  "I take ownership from UI design through backend integration."
                </p>
              </div>
            </div>
            <div className="flex items-start gap-stack-sm p-6 glass-panel rounded-xl border-l-4 border-l-primary-container">
              <span className="material-symbols-outlined text-4xl text-primary-container">
                bolt
              </span>
              <div>
                <p className="font-body-lg text-on-surface" id="work-stmt-3">
                  "I translate complex technical needs into smooth user
                  experiences."
                </p>
              </div>
            </div>
            <div className="flex items-start gap-stack-sm p-6 glass-panel rounded-xl border-l-4 border-l-primary-container">
              <span className="material-symbols-outlined text-4xl text-primary-container">
                groups
              </span>
              <div>
                <p className="font-body-lg text-on-surface" id="work-stmt-4">
                  "I collaborate closely with stakeholders to ensure every pixel
                  serves a purpose."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Closing CTA */}
      <section
        className="py-stack-xl px-margin-desktop text-center max-w-container-max mx-auto"
        id="contact"
      >
        <div className="glass-panel p-stack-xl rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container/10 blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>
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
          <div className="flex flex-col sm:flex-row justify-center gap-stack-sm">
            <a
              className="bg-primary-container text-on-primary-container font-headline-md px-10 py-5 rounded-xl font-black glow-on-hover transition-all magnetic-hover"
              href="mailto:hello@khonany.dev"
              id="btn-contact"
            >
              GET IN TOUCH
            </a>
            <a
              className="border-2 border-primary-container text-primary-container font-headline-md px-10 py-5 rounded-xl font-black hover:bg-primary-container/10 transition-all magnetic-hover"
              href="#"
              id="btn-cv-bottom"
            >
              DOWNLOAD CV
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
