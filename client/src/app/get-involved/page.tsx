"use client";

import Link from "next/link";
import { PenTool, Megaphone, Code, ArrowRight, CheckCircle } from "lucide-react";

const roles = [
  {
    icon: PenTool,
    title: "EDITORIAL OPERATIVE",
    desc: "Help curate the best submissions for feature spots, the anthology, and the weekly dispatch. Must be a committed reader and a brutally honest critic.",
    tag: "OPEN",
    tagColor: "bg-[#60a5fa]",
  },
  {
    icon: Megaphone,
    title: "OUTREACH AGENT",
    desc: "Spread the signal. Represent Akshar at campus events, workshops, and literary circles. Recruit the best writers you know.",
    tag: "OPEN",
    tagColor: "bg-[#ffeb3b] text-black",
  },
  {
    icon: Code,
    title: "ENGINEERING CELL",
    desc: "Help build the platform. Frontend, backend, or database — if you can write code and you believe in the mission, we want you.",
    tag: "OPEN",
    tagColor: "bg-[#ff7d85]",
  },
  {
    icon: CheckCircle,
    title: "PEER REVIEW COORDINATOR",
    desc: "Organize Review Circles, match writers to reviewers, and maintain the quality standards of the peer review protocol.",
    tag: "INVITE-ONLY",
    tagColor: "bg-black text-white",
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 space-y-16">

      {/* Hero */}
      <div className="brutal-box bg-[#60a5fa] p-10 md:p-16 border-[6px] border-black shadow-[12px_12px_0_0_#000] relative overflow-hidden">
        <h1 className="text-[4rem] md:text-[8rem] font-[family-name:var(--font-heading)] uppercase leading-none tracking-tighter mb-6 relative z-10">
          GET<br /><span className="bg-black text-white px-4">INVOLVED.</span>
        </h1>
        <p className="text-xl md:text-2xl font-bold border-l-8 border-black pl-6 max-w-2xl relative z-10">
          The Akshar Initiative is not run by a corporation. It's run by writers, readers, and builders who believe in the cause.
        </p>
      </div>

      {/* Why join */}
      <div className="brutal-box bg-black text-white p-8 md:p-12 border-[6px] border-white shadow-[12px_12px_0_0_#60a5fa]">
        <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-heading)] uppercase mb-6">WHY JOIN?</h2>
        <ul className="space-y-4">
          {[
            "Get credited in the Akshar Annual Anthology",
            "Early access to all new platform features before public release",
            "Invitations to exclusive writing workshops and events",
            "A letter of recommendation from the editorial board",
            "The knowledge that you helped keep human writing alive",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-4 text-xl font-bold">
              <span className="w-6 h-6 bg-[#ffeb3b] border-2 border-black flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Roles Grid */}
      <div>
        <div className="brutal-box bg-[#ffeb3b] p-6 inline-block shadow-[8px_8px_0_0_#000] border-4 border-black mb-10 -rotate-1">
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-heading)] uppercase m-0">OPEN ROLES</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map(({ icon: Icon, title, desc, tag, tagColor }, i) => (
            <div key={i} className="brutal-box bg-white p-8 border-[6px] border-black shadow-[8px_8px_0_0_#000] hover:-translate-y-2 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Icon size={40} />
                <span className={`${tagColor} px-4 py-1 font-black text-sm uppercase border-2 border-black`}>{tag}</span>
              </div>
              <h3 className="text-3xl font-[family-name:var(--font-heading)] uppercase border-b-4 border-black pb-3 mb-4">{title}</h3>
              <p className="text-lg font-bold">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Apply CTA */}
      <div className="brutal-box bg-[#ff7d85] p-10 border-[6px] border-black shadow-[12px_12px_0_0_#000] flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-[family-name:var(--font-heading)] uppercase mb-2">READY TO ENLIST?</h2>
          <p className="text-lg font-bold max-w-md">Send us a message via the contact form. Include the role you're interested in and a short statement of intent.</p>
        </div>
        <Link href="/contact" className="brutal-btn bg-black text-white text-xl py-5 px-10 flex items-center gap-4 shrink-0">
          APPLY NOW <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
