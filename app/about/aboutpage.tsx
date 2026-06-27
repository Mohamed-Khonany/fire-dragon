import "./about.css";


import AboutSection from "./aboutsection";

export default function AboutPage() {
  return (
    <main className="py-stack-lg relative bg-black">
      {/* <!-- Background Shader/Atmosphere --> */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40"></div>
      {/* <!-- Hero Block --> */}
      <AboutSection />

      {/* <!-- Skills & Tools Grid --> */}
      <section
        className="py-stack-lg px-margin-desktop max-w-container-max mx-auto"
        id="skills"
      >
        <div className="mb-stack-md text-center">
          <h2 className="font-headline-lg text-headline-lg mb-2">
            TECHNICAL <span className="fire-gradient-text">FORGE</span>
          </h2>
          <div className="h-1 w-24 bg-primary-container mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {/* <!-- Group: Languages --> */}
          <div className="glass-panel p-stack-md rounded-xl hover:-translate-y-1 transition-transform">
            <h3 className="font-headline-md text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">terminal</span>{" "}
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                JavaScript (ES6+)
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                TypeScript
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                Python
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                Go
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                SQL
              </span>
            </div>
          </div>
          {/* <!-- Group: Frontend --> */}
          <div className="glass-panel p-stack-md rounded-xl hover:-translate-y-1 transition-transform">
            <h3 className="font-headline-md text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">data_object</span>{" "}
              Frontend
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                React / Next.js
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                Tailwind CSS
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                Framer Motion
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                Redux Toolkit
              </span>
            </div>
          </div>
          {/* <!-- Group: Mobile --> */}
          <div className="glass-panel p-stack-md rounded-xl hover:-translate-y-1 transition-transform">
            <h3 className="font-headline-md text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">smartphone</span>{" "}
              Mobile
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                React Native
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                Flutter
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                Expo
              </span>
            </div>
          </div>
          {/* <!-- Group: Backend --> */}
          <div className="glass-panel p-stack-md rounded-xl hover:-translate-y-1 transition-transform">
            <h3 className="font-headline-md text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">storage</span> Backend
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                Node.js / Express
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                PostgreSQL
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                MongoDB
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                Redis
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                GraphQL
              </span>
            </div>
          </div>
          {/* <!-- Group: Tools --> */}
          <div className="glass-panel p-stack-md rounded-xl hover:-translate-y-1 transition-transform">
            <h3 className="font-headline-md text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">build</span> Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                Docker
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                AWS / GCP
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                GitHub Actions
              </span>
              <span className="px-3 py-1 border border-primary-container/40 text-primary font-label-mono text-sm rounded-full">
                Figma
              </span>
            </div>
          </div>
          {/* <!-- CTA Cell --> */}
          <div className="bg-primary-container p-stack-md rounded-xl flex flex-col justify-center items-center text-on-primary-container text-center gap-4 glow-on-hover">
            <p className="font-headline-md font-bold">Need a Custom Build?</p>
            <a
              className="bg-on-primary-container text-primary-container px-6 py-2 rounded-full font-bold font-label-mono hover:bg-on-primary-container/90 transition-all"
              href="#contact"
            >
              LET'S TALK
            </a>
          </div>
        </div>
      </section>
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
