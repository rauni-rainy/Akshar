"use client";

import Sidebar from "../../components/Sidebar";
import { ShieldAlert, BookOpen, PenTool } from "lucide-react";

export default function Guidelines() {
  return (
    <div className="w-full max-w-[1700px] mx-auto px-4 md:px-8 mt-12 mb-24 lg:flex gap-10 sm:overflow-visible overflow-hidden">
      
      {/* LEFT SIDEBAR (NAV) */}
      <Sidebar activeTab="GUIDELINES" />

      {/* CENTER CONTENT */}
      <main className="flex-1 min-w-0">
        
        {/* Top Banner */}
        <div className="brutal-box bg-[#ffeb3b] p-8 md:p-12 border-[6px] border-black flex items-center justify-between mb-12 relative z-10 shadow-[12px_12px_0_0_#000] rotate-1 hover:rotate-0 transition-transform">
          <div className="relative z-10 w-full flex flex-col justify-start">
            <h1 className="text-5xl md:text-[6rem] font-[family-name:var(--font-heading)] uppercase tracking-tight leading-none text-black break-words mb-4">
              MISSION DIRECTIVES
            </h1>
            <p className="text-xl md:text-3xl font-bold uppercase text-white bg-black px-6 py-3 border-4 border-black inline-block shadow-[4px_4px_0_0_#000] max-w-max">
              THE DOCTRINE OF PURE SIGNAL
            </p>
          </div>
          <ShieldAlert size={120} className="text-black hidden md:block opacity-20 absolute right-10 top-1/2 -translate-y-1/2" />
        </div>

        {/* Content Section */}
        <article className="space-y-12">
            
            <div className="brutal-box bg-white p-8 md:p-12 border-[6px] border-black shadow-[12px_12px_0_0_#ff7d85] relative">
              <div className="absolute -top-6 -left-6 bg-black text-[#ffeb3b] px-6 py-2 border-4 border-black font-black text-2xl uppercase shadow-[4px_4px_0_0_#fff]">
                RULE 01
              </div>
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] uppercase mb-6 mt-4 flex items-center gap-4">
                <PenTool size={40} className="text-[#ff7d85]" /> THE ALGORITHM IS DEAD
              </h2>
              <p className="text-2xl font-bold leading-relaxed border-l-[6px] border-black pl-6 bg-[#f8fafc] py-4 pr-4">
                You are not writing for robots. Do not optimize for SEO. Do not write clickbait. Write raw, unfiltered humanity. If your transmission does not contain a sliver of your soul, abort the broadcast immediately.
              </p>
            </div>

            <div className="brutal-box bg-black text-white p-8 md:p-12 border-[6px] border-white shadow-[12px_12px_0_0_#60a5fa] relative -rotate-1">
              <div className="absolute -top-6 right-8 bg-[#60a5fa] text-black px-6 py-2 border-4 border-black font-black text-2xl uppercase shadow-[4px_4px_0_0_#fff]">
                RULE 02
              </div>
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] uppercase mb-6 mt-4 text-[#ffeb3b]">
                RADICAL HONESTY ONLY
              </h2>
              <p className="text-2xl font-bold leading-relaxed border-l-[6px] border-[#60a5fa] pl-6 py-4 pr-4">
                We reject polished, sanitized corporate speech. Embrace the messy, the brutal, the profound. Akshar is a haven for the genuine. 
                Vulnerability is your greatest weapon. Wield it without apology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="brutal-box bg-white p-6 md:p-10 border-[6px] border-black shadow-[8px_8px_0_0_#000] flex flex-col items-center text-center">
                 <BookOpen size={64} className="mb-6 text-[#60a5fa]" />
                 <h3 className="text-3xl font-[family-name:var(--font-heading)] uppercase mb-4">FORMAT EXPECTATIONS</h3>
                 <p className="text-xl font-bold text-gray-700">Whether it's an ARTICLE, POEM, or STORY, structure matters. Brutalism doesn't mean chaos. It means structural integrity without the ornamental garbage.</p>
              </div>

              <div className="brutal-box bg-[#ffeb3b] p-6 md:p-10 border-[6px] border-black shadow-[8px_8px_0_0_#ff7d85] flex flex-col items-center text-center">
                 <ShieldAlert size={64} className="mb-6 text-black" />
                 <h3 className="text-3xl font-[family-name:var(--font-heading)] uppercase mb-4">ZERO TOLERANCE</h3>
                 <p className="text-xl font-bold text-gray-900">Plagiarism, AI-generated slop, and hate speech are capital offenses. Violators will be permanently disconnected from the mainframe.</p>
              </div>
            </div>

        </article>

      </main>

    </div>
  );
}
