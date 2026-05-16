"use client";

import Link from "next/link";
import { Users, ArrowUpRight, Mail } from "lucide-react";

const email = "writer.raunak@gmail.com";

export default function RequestGroupPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 space-y-12">

      {/* Header */}
      <div className="brutal-box bg-black text-white p-10 md:p-16 border-[6px] border-[#60a5fa] shadow-[12px_12px_0_0_#60a5fa] relative overflow-hidden">
        <Users size={200} className="absolute right-0 bottom-0 opacity-5" />
        <div className="relative z-10">
          <h1 className="text-[4rem] md:text-[7rem] font-[family-name:var(--font-heading)] uppercase leading-none tracking-tighter mb-6">
            REQUEST A<br /><span className="text-[#60a5fa]">GROUP.</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold border-l-8 border-[#60a5fa] pl-6 max-w-2xl text-gray-300">
            Want to form a Peer Review Circle or a writing cohort? Email us directly. The editorial cell will evaluate and activate the best concepts.
          </p>
        </div>
      </div>

      {/* What is a circle? */}
      <div className="brutal-box bg-[#ffeb3b] p-8 border-[6px] border-black shadow-[8px_8px_0_0_#000]">
        <h2 className="text-3xl font-[family-name:var(--font-heading)] uppercase mb-4 border-b-4 border-black pb-3">WHAT IS A PEER REVIEW CIRCLE?</h2>
        <p className="text-lg font-bold">A closed cohort of 5–8 writers who meet weekly to exchange structured peer reviews using the Akshar Annotation Protocol. Circles are curated by genre, style, or writing goal. Members are committed to the full Triangulation Method: Observe, Interrogate, Elevate.</p>
      </div>

      {/* Primary Email CTA */}
      <a
        href={`mailto:${email}?subject=Group Request — [Your Group Name]`}
        className="block brutal-box bg-[#60a5fa] border-[6px] border-black shadow-[12px_12px_0_0_#000] p-10 md:p-16 hover:-translate-y-2 hover:shadow-[16px_16px_0_0_#000] transition-all group"
      >
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <p className="font-black uppercase tracking-widest text-sm text-black/60 mb-3">EMAIL YOUR REQUEST TO</p>
            <p className="text-3xl md:text-5xl font-[family-name:var(--font-heading)] uppercase break-all">
              {email}
            </p>
          </div>
          <div className="bg-black text-[#60a5fa] p-5 border-4 border-black group-hover:bg-[#ffeb3b] group-hover:text-black transition-colors shrink-0">
            <ArrowUpRight size={48} />
          </div>
        </div>
        <p className="mt-6 font-bold text-lg text-black/70">
          Click to open your mail client →
        </p>
      </a>

      {/* What to include */}
      <div className="brutal-box bg-white p-8 md:p-12 border-[6px] border-black shadow-[8px_8px_0_0_#000]">
        <div className="flex items-center gap-4 mb-6 border-b-4 border-black pb-4">
          <Mail size={32} />
          <h2 className="text-3xl font-[family-name:var(--font-heading)] uppercase">INCLUDE IN YOUR EMAIL</h2>
        </div>
        <div className="space-y-4">
          {[
            { label: "GROUP NAME", hint: "What will the circle be called? Something evocative works best." },
            { label: "WRITING FOCUS", hint: "Poetry, Fiction, Non-Fiction, Journalism, or Mixed/Open." },
            { label: "PROPOSED SIZE", hint: "How many writers? We recommend 5–8 for tight collaboration." },
            { label: "YOUR DISPLAY NAME", hint: "Your Akshar username so we can link the request to your account." },
            { label: "MISSION STATEMENT", hint: "In 2–4 sentences: why does this group need to exist? What will it produce?" },
          ].map(({ label, hint }, i) => (
            <div key={i} className="flex items-start gap-4 p-4 border-2 border-black hover:bg-[#f8fafc] transition-colors">
              <span className="font-black text-xs uppercase tracking-widest bg-black text-white px-2 py-1 shrink-0 mt-0.5">{label}</span>
              <p className="font-bold text-gray-700">{hint}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learn more */}
      <div className="brutal-box bg-[#ff7d85] p-8 border-[6px] border-black shadow-[8px_8px_0_0_#000] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-3xl font-[family-name:var(--font-heading)] uppercase mb-2">WANT TO LEARN MORE FIRST?</h3>
          <p className="font-bold text-lg">Read about the Peer Evaluation Protocol and the Annotation System before submitting.</p>
        </div>
        <Link href="/peer-review" className="brutal-btn bg-black text-white text-lg py-4 px-8 shrink-0 flex items-center gap-3">
          READ THE PROTOCOL
        </Link>
      </div>

    </div>
  );
}
