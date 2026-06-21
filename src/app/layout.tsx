import type { Metadata } from "next";
import { Comic_Neue, Fredoka } from "next/font/google";
import { siteConfig } from "@/config/site";
import FloatingPaws from "@/components/FloatingPaws";
import { AudioProvider } from "@/context/AudioContext";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const comicNeue = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-comic",
});

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${comicNeue.variable} ${fredoka.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-paper-texture">
        <SmoothScrollProvider>
          <AudioProvider>
            {/* Floating animated click details and particles */}
            <FloatingPaws />
            
            {/* Content container */}
            <div className="relative z-10 flex-1 flex flex-col">
              {children}
            </div>
          </AudioProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
