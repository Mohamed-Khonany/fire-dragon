import { Metadata } from "next";
import "./globals.css";
import { Inter, Montserrat, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/UI/layout/header/header";
import GlowCursor from "@/components/UI/glowCursor/glowCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Fire Dragon",
    template: "%s | Fire Dragon",
  },
  description: "Mohamed Khonany brand Portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${mono.variable} `}
    >
      <body className="flex flex-col justify-center items-center">
        <div className="pointer-events-none fixed inset-0 z-9999 pointer-coarse:hidden">
          <GlowCursor
            color="#ff5a00"
            secondaryColor="#cd9c01"
            trailLength={40}
            trailWidth={8}
            trailTaper={0.8}
            followSpeed={0.16}
            glowIntensity={1.9}
            glowSpread={1.2}
            hotspot={0.65}
            brightness={1.25}
            opacity={1}
            pulseSpeed={1.1}
            idleTimeout={700}
            fadeDuration={900}
            blendMode="screen"
          />
        </div>

        <Header />
        {children}
      </body>
    </html>
  );
}
