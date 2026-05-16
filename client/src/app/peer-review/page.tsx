"use client";

import Sidebar from "../../components/Sidebar";
import { CheckCircle, AlertTriangle, Eye, Crosshair, Highlighter, MessageSquareQuote, Pencil, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PeerReview() {
  return (
    <div className="w-full max-w-[1700px] mx-auto px-4 md:px-8 mt-12 mb-24 lg:flex gap-10 sm:overflow-visible overflow-hidden">
      
      {/* LEFT SIDEBAR (NAV) */}
      <Sidebar activeTab="PEER_REVIEW" />

      {/* CENTER CONTENT */}
      <main className="flex-1 min-w-0">
        
        {/* Top Banner */}
        <div className="brutal-box bg-black text-white p-8 md:p-12 border-[6px] border-[#ff7d85] flex items-center justify-between mb-12 relative z-10 shadow-[12px_12px_0_0_#ff7d85] hover:-translate-y-2 transition-transform">
          <div className="relative z-10 w-full flex flex-col justify-start">
            <h1 className="text-5xl md:text-[6rem] font-[family-name:var(--font-heading)] uppercase tracking-tight leading-none break-words mb-4 text-[#ff7d85]">
              PEER EVALUATION
            </h1>
            <p className="text-xl md:text-3xl font-bold uppercase text-black bg-[#ffeb3b] px-6 py-3 border-4 border-black inline-block shadow-[4px_4px_0_0_#fff] max-w-max">
              PROTOCOL FOR INTERROGATING ART
            </p>
          </div>
          <Crosshair size={120} className="text-[#ff7d85] hidden md:block opacity-40 absolute right-10 top-1/2 -translate-y-1/2 animate-pulse" />
        </div>

        {/* Content Section */}
        <article className="space-y-12">
            
            <div className="brutal-box bg-white p-8 md:p-12 border-[6px] border-black shadow-[12px_12px_0_0_#000] rotate-1">
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] uppercase mb-6 flex items-center gap-4 text-black border-b-[6px] border-black pb-4">
                <CheckCircle size={48} className="text-[#60a5fa]" /> ENGAGEMENT &gt; METRICS
              </h2>
              <p className="text-2xl font-bold leading-relaxed mb-6">
                A &quot;Like&quot; asks nothing of the observer. Our peer review system demands intellectual effort. 
                When a fellow author broadcasts their signal, you must decode it deliberately.
              </p>
              <div className="bg-[#f8fafc] border-[4px] border-dashed border-gray-400 p-6">
                 <p className="text-xl uppercase font-black tracking-widest text-[#ff7d85] mb-2">WARNING:</p>
                 <p className="text-xl font-medium">Comments consisting purely of &quot;Great post&quot; or generic emojis will be treated as hostile spam and terminated.</p>
              </div>
            </div>

            {/* ANNOTATION PROTOCOL — NEW SECTION */}
            <div className="brutal-box bg-[#ffeb3b] p-8 md:p-12 border-[6px] border-black shadow-[12px_12px_0_0_#000] -rotate-1">
              <div className="absolute -top-6 -left-6 bg-black text-[#ffeb3b] px-6 py-2 border-4 border-black font-black text-2xl uppercase shadow-[4px_4px_0_0_#fff]">
                NEW
              </div>
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] uppercase mb-8 flex items-center gap-4 mt-4">
                <Highlighter size={48} className="text-black" /> INLINE ANNOTATION
              </h2>
              <p className="text-2xl font-bold mb-8 border-l-8 border-black pl-6">
                Peer review now goes inside the text itself. Highlight any passage in a post and drop a margin note directly on the words that matter.
              </p>

              {/* Visual Mock of Annotation UI */}
              <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0_0_#000] mb-8">
                <p className="text-sm font-black uppercase tracking-widest text-gray-500 mb-4 border-b-2 border-black pb-2">— ANNOTATION PREVIEW —</p>
                <div className="space-y-4">
                  <p className="text-xl font-bold leading-relaxed">
                    The fog rolled in off the harbour, thick and grey as <span className="bg-[#60a5fa]/40 border-b-4 border-[#60a5fa] px-1 relative group cursor-pointer">
                      consequence
                      <span className="hidden group-hover:flex absolute -top-16 left-0 bg-black text-white text-sm p-3 border-2 border-[#60a5fa] w-64 font-bold z-50 shadow-[4px_4px_0_0_#60a5fa]">
                        <MessageSquareQuote size={14} className="mr-2 flex-shrink-0 mt-0.5 text-[#60a5fa]" />
                        Powerful word choice — "consequence" does more than "smoke" here.
                      </span>
                    </span>.
                    He had not slept since the arrest.
                  </p>
                  <p className="text-xl font-bold leading-relaxed">
                    <span className="bg-[#ff7d85]/30 border-b-4 border-[#ff7d85] px-1 relative group cursor-pointer">
                      She was standing at the window when he arrived, already knowing.
                      <span className="hidden group-hover:flex absolute -top-20 left-0 bg-black text-white text-sm p-3 border-2 border-[#ff7d85] w-72 font-bold z-50 shadow-[4px_4px_0_0_#ff7d85]">
                        <MessageSquareQuote size={14} className="mr-2 flex-shrink-0 mt-0.5 text-[#ff7d85]" />
                        This line shows don't-tell mastery. The &quot;already knowing&quot; is devastating — keep it.
                      </span>
                    </span>
                  </p>
                </div>
                <p className="text-xs font-black text-gray-400 uppercase mt-6 tracking-widest">↑ Hover the highlighted passages to see annotation notes</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Highlighter, title: "1. HIGHLIGHT", desc: "Select any passage of text in a post to activate the annotation toolbar." },
                  { icon: Pencil, title: "2. ANNOTATE", desc: "Write your margin note — what you observed, what worked, what didn't." },
                  { icon: MessageSquareQuote, title: "3. SUBMIT", desc: "The author receives your annotations as a structured review they can read and respond to." },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <div key={i} className="bg-white border-4 border-black p-6 shadow-[4px_4px_0_0_#000]">
                    <Icon size={36} className="mb-4" />
                    <h3 className="text-2xl font-[family-name:var(--font-heading)] uppercase border-b-4 border-black pb-2 mb-3">{title}</h3>
                    <p className="text-lg font-bold">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="brutal-box bg-[#60a5fa] text-black p-8 md:p-12 border-[6px] border-black shadow-[12px_12px_0_0_#ffeb3b] relative">
              <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-heading)] uppercase mb-8 mt-4 flex items-center gap-4">
                <Eye size={40} className="text-black" /> THE TRIANGULATION METHOD
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 border-4 border-black shadow-[4px_4px_0_0_#000]">
                   <h3 className="text-3xl font-[family-name:var(--font-heading)] uppercase border-b-4 border-black pb-2 mb-4">1. OBSERVE</h3>
                   <p className="text-lg font-bold">What was the agent&apos;s core thesis or emotional hook? State exactly what you extracted from the transmission.</p>
                </div>
                <div className="bg-white p-6 border-4 border-black shadow-[4px_4px_0_0_#000]">
                   <h3 className="text-3xl font-[family-name:var(--font-heading)] uppercase border-b-4 border-black pb-2 mb-4">2. INTERROGATE</h3>
                   <p className="text-lg font-bold">Where did structure fail? Where did words bleed beautifully? Point out the technical architecture of the work.</p>
                </div>
                <div className="bg-white p-6 border-4 border-black shadow-[4px_4px_0_0_#000]">
                   <h3 className="text-3xl font-[family-name:var(--font-heading)] uppercase border-b-4 border-black pb-2 mb-4">3. ELEVATE</h3>
                   <p className="text-lg font-bold">What direction can the author take next? Provide constructive vectors, not just destruction.</p>
                </div>
              </div>
            </div>

            <div className="brutal-box bg-white p-8 md:p-12 border-[6px] border-black shadow-[12px_12px_0_0_#000] flex items-start gap-8 -rotate-1">
              <AlertTriangle size={80} className="text-[#ffeb3b] shrink-0 fill-black drop-shadow-[4px_4px_0_#000]" />
              <div>
                 <h3 className="text-4xl font-[family-name:var(--font-heading)] uppercase mb-4 text-[#ff7d85]">CONSTRUCTIVE BLUNTNESS</h3>
                 <p className="text-2xl font-bold mb-6">
                    You are not here to flatter. You are here to sharpen words like a brutal hone stone. 
                    Be unyielding with your critique, but completely respectful of the author&apos;s attempt. Protect the resistance.
                 </p>
                 <Link href="/dashboard" className="brutal-btn bg-[#ff7d85] text-white text-xl py-4 px-8 inline-flex items-center gap-3">
                   START REVIEWING <ArrowRight size={20} />
                 </Link>
              </div>
            </div>

        </article>

      </main>

    </div>
  );
}
