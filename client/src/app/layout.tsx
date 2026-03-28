import type { Metadata } from "next";
import { Space_Grotesk, Bebas_Neue } from 'next/font/google';
import "./globals.css";
import Link from "next/link";
import CustomCursor from "../components/CustomCursor";
import GoogleAuthProviderWrapper from "../components/GoogleAuthProviderWrapper";
import Navbar from "../components/Navbar";

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' });
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: "AKSHAR | UNLEASH YOUR VOICE",
  description: "A brutalist platform for writers to publish stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${bebasNeue.variable} font-sans antialiased`}>
        <CustomCursor />
        
        <Navbar />
        
        <div className="marquee-container flex">
          <div className="marquee-content">
            <span className="mx-8">🔥 UNLEASH YOUR VOICE</span>
            <span className="mx-8">🔥 THE NEW EPOCH OF LITERATURE</span>
            <span className="mx-8">🔥 ZERO FILTERS</span>
            <span className="mx-8">🔥 PURE ART</span>
            <span className="mx-8">🔥 UNLEASH YOUR VOICE</span>
            <span className="mx-8">🔥 THE NEW EPOCH OF LITERATURE</span>
          </div>
        </div>

        <main className="w-full">
          <GoogleAuthProviderWrapper>
            {children}
          </GoogleAuthProviderWrapper>
        </main>
      </body>
    </html>
  );
}
