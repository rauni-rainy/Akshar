"use client";

import Link from "next/link";
import { Trophy, Lightbulb, UserCheck, BookOpen, ArrowRight } from "lucide-react";

const programs = [
  {
    icon: Trophy,
    title: "THE SIGNAL CONTEST",
    badge: "BI-MONTHLY",
    badgeColor: "bg-[#ff7d85]",
    desc: "A themed writing competition open to all platform members. Best submission earns the SIGNAL CASTER badge and a featured slot on the homepage. Judged by peer review consensus, not an editorial board.",
    color: "bg-[#ffeb3b]",
    shadow: "shadow-[10px_10px_0_0_#ff7d85]",
  },
  {
    icon: Lightbulb,
    title: "PROMPT DIRECTIVES",
    badge: "ONGOING",
    badgeColor: "bg-[#60a5fa]",
    desc: "10 rotating directional prompts challenge your perspective every month. Click any prompt in the Prompts Hub and it pre-loads into your writing editor. No excuses for a blank page.",
    color: "bg-white",
    shadow: "shadow-[10px_10px_0_0_#60a5fa]",
  },
  {
    icon: UserCheck,
    title: "PEER REVIEW CIRCLES",
    badge: "INVITE-ONLY",
    badgeColor: "bg-[#ffeb3b] text-black",
    desc: "Small closed cohorts of 5–8 writers who exchange structured peer reviews weekly. Apply through the Request Group form. Circles are curated by the editorial cell for writing compatibility.",
    color: "bg-[#ff7d85]",
    shadow: "shadow-[10px_10px_0_0_#000]",
  },
  {
    icon: BookOpen,
    title: "THE ANNUAL ANTHOLOGY",
    badge: "YEARLY",
    badgeColor: "bg-black text-white",
    desc: "The best transmissions of the year compiled into a physical and digital anthology. Submissions curated by the Akshar editorial collective. An actual book. With actual paper.",
    color: "bg-[#60a5fa]",
    shadow: "shadow-[10px_10px_0_0_#ff7d85]",
  },
];

export default function ProgramsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 space-y-16">

      {/* Header */}
      <div className="brutal-box bg-[#ffeb3b] p-10 md:p-16 border-[6px] border-black shadow-[12px_12px_0_0_#000] relative overflow-hidden rotate-1 hover:rotate-0 transition-transform">
        <h1 className="text-[4rem] md:text-[8rem] font-[family-name:var(--font-heading)] uppercase leading-none tracking-tighter mb-4">
          PROGRAMS
        </h1>
        <p className="text-xl md:text-2xl font-bold border-l-8 border-black pl-6 max-w-xl">
          Initiatives, contests, and systems designed to push your craft past the comfort zone.
        </p>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {programs.map(({ icon: Icon, title, badge, badgeColor, desc, color, shadow }, i) => (
          <div key={i} className={`brutal-box ${color} p-8 md:p-10 border-[6px] border-black ${shadow} hover:-translate-y-2 transition-all`}>
            <div className="flex items-center justify-between mb-6">
              <Icon size={48} />
              <span className={`${badgeColor} px-4 py-1 font-black text-sm uppercase tracking-widest border-2 border-black`}>
                {badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] uppercase border-b-4 border-black pb-4 mb-6">
              {title}
            </h2>
            <p className="text-lg font-bold leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Request CTA */}
      <div className="brutal-box bg-black text-white p-10 md:p-16 border-[6px] border-white shadow-[12px_12px_0_0_#ff7d85] flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-5xl font-[family-name:var(--font-heading)] uppercase mb-4">WANT TO START YOUR OWN?</h2>
          <p className="text-xl font-bold text-gray-300 max-w-xl">
            If you have an idea for a writing program, circle, or contest — submit a request. The best concepts get activated.
          </p>
        </div>
        <Link href="/request-group" className="brutal-btn bg-[#ffeb3b] text-black text-xl py-5 px-10 flex items-center gap-4 shrink-0">
          REQUEST A GROUP <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
