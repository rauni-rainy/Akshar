"use client";

import Link from "next/link";
import { Radio, Zap, Star, ArrowRight } from "lucide-react";

const updates = [
  {
    tag: "SYSTEM UPDATE",
    tagColor: "bg-[#60a5fa]",
    date: "APR 2026",
    title: "PEER REVIEW WITH INLINE ANNOTATION IS NOW LIVE",
    text: "Writers can now request structured reviews from their peers. Reviewers can highlight and annotate specific lines of your work with precision margin notes.",
    highlight: true,
  },
  {
    tag: "FEATURE DROP",
    tagColor: "bg-[#ffeb3b]",
    date: "MAR 2026",
    title: "WRITING PROMPTS HUB LAUNCHED",
    text: "10 hand-curated, AI-inspired directional prompts now live. Click any prompt to instantly open the writing editor pre-loaded with your chosen directive.",
    highlight: false,
  },
  {
    tag: "INFRASTRUCTURE",
    tagColor: "bg-[#ff7d85]",
    date: "MAR 2026",
    title: "AUTOSAVE & MY WRITINGS DASHBOARD",
    text: "Your drafts are now persisted automatically every 30 seconds. The My Writings tab shows all your published pieces and saved drafts in one place.",
    highlight: false,
  },
  {
    tag: "PLATFORM",
    tagColor: "bg-black text-white",
    date: "MAR 2026",
    title: "AKSHAR GOES LIVE — BETA RELEASE",
    text: "The platform is now open to writers at NIT Durgapur. This is the beta. Things will break. That's the point. Report anomalies to the engineering cell.",
    highlight: false,
  },
];

export default function NewsroomPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 space-y-16">

      {/* Header */}
      <div className="brutal-box bg-black text-white p-10 md:p-16 border-[6px] border-black shadow-[12px_12px_0_0_#60a5fa] relative overflow-hidden">
        <Radio size={180} className="absolute right-0 bottom-0 opacity-5 text-white" />
        <div className="relative z-10">
          <div className="bg-[#60a5fa] text-black px-4 py-2 font-black uppercase text-sm tracking-widest inline-block mb-6 border-2 border-black">
            LIVE FEED
          </div>
          <h1 className="text-[5rem] md:text-[9rem] font-[family-name:var(--font-heading)] uppercase leading-none tracking-tighter mb-6">
            THE NEWSROOM
          </h1>
          <p className="text-xl md:text-2xl font-bold text-gray-300 border-l-8 border-[#60a5fa] pl-6 max-w-2xl">
            Platform dispatches, feature drops, and system intelligence. Stay locked in.
          </p>
        </div>
      </div>

      {/* Updates Feed */}
      <div className="space-y-8">
        {updates.map((u, i) => (
          <div
            key={i}
            className={`brutal-box p-8 md:p-12 border-[6px] border-black shadow-[8px_8px_0_0_#000] hover:-translate-y-1 transition-transform ${u.highlight ? "bg-[#ffeb3b]" : "bg-white"}`}
          >
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className={`${u.tagColor} px-4 py-1 font-black text-sm uppercase tracking-widest border-2 border-black`}>
                {u.tag}
              </span>
              <span className="font-bold text-gray-500 tracking-widest text-sm">{u.date}</span>
              {i === 0 && (
                <span className="bg-[#ff7d85] text-white px-3 py-1 font-black text-xs uppercase border-2 border-black flex items-center gap-1">
                  <Zap size={14} /> NEW
                </span>
              )}
            </div>
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-heading)] uppercase mb-4">{u.title}</h2>
            <p className="text-lg md:text-xl font-bold leading-relaxed border-l-4 border-black pl-4">{u.text}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="brutal-box bg-[#ff7d85] p-10 border-[6px] border-black shadow-[12px_12px_0_0_#000] flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <Star size={40} className="mb-4" />
          <h2 className="text-4xl font-[family-name:var(--font-heading)] uppercase mb-2">WANT EARLY ACCESS TO FEATURES?</h2>
          <p className="text-lg font-bold">Subscribe to the resistance and get system updates before anyone else.</p>
        </div>
        <Link href="/" className="brutal-btn bg-black text-white text-xl py-5 px-10 flex items-center gap-4 shrink-0">
          SUBSCRIBE <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
