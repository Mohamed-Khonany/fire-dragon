import { Metadata } from "next";
import "./globals.css";
import { Inter, Montserrat, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/header/header";

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
    absolute: ""
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
      <body className="min-h-full flex flex-col">
        <Header isHome={true} />
        {children}
      </body>
    </html>
  );
}
