"use client";

import { Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const email = "writer.raunak@gmail.com";

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 space-y-12">

      {/* Header */}
      <div className="brutal-box bg-black text-white p-10 md:p-14 border-[6px] border-[#ffeb3b] shadow-[12px_12px_0_0_#ffeb3b]">
        <h1 className="text-[4rem] md:text-[8rem] font-[family-name:var(--font-heading)] uppercase leading-none tracking-tighter mb-6">
          CONTACT<br /><span className="text-[#ffeb3b]">THE CELL.</span>
        </h1>
        <p className="text-xl md:text-2xl font-bold text-gray-300 border-l-8 border-[#ffeb3b] pl-6 max-w-2xl">
          Bug reports, editorial questions, account issues, or just want to say something — reach us directly.
        </p>
      </div>

      {/* Primary CTA — big email button */}
      <a
        href={`mailto:${email}`}
        className="block brutal-box bg-[#ffeb3b] border-[6px] border-black shadow-[12px_12px_0_0_#000] p-10 md:p-16 hover:-translate-y-2 hover:shadow-[16px_16px_0_0_#000] transition-all group"
      >
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <p className="font-black uppercase tracking-widest text-sm text-black/60 mb-3">SEND A TRANSMISSION TO</p>
            <p className="text-3xl md:text-5xl font-[family-name:var(--font-heading)] uppercase break-all">
              {email}
            </p>
          </div>
          <div className="bg-black text-[#ffeb3b] p-5 border-4 border-black group-hover:bg-[#ff7d85] group-hover:text-black transition-colors shrink-0">
            <ArrowUpRight size={48} />
          </div>
        </div>
        <p className="mt-6 font-bold text-lg text-black/70">
          Click to open your mail client →
        </p>
      </a>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="brutal-box bg-[#60a5fa] p-6 border-[6px] border-black shadow-[6px_6px_0_0_#000]">
          <Mail size={32} className="mb-4" />
          <h3 className="font-[family-name:var(--font-heading)] text-xl uppercase mb-2">EMAIL</h3>
          <p className="font-bold break-all">{email}</p>
        </div>
        <div className="brutal-box bg-[#ffeb3b] p-6 border-[6px] border-black shadow-[6px_6px_0_0_#000]">
          <MapPin size={32} className="mb-4" />
          <h3 className="font-[family-name:var(--font-heading)] text-xl uppercase mb-2">LOCATION</h3>
          <p className="font-bold">NIT Durgapur<br />M.G. Avenue<br />West Bengal, India</p>
        </div>
        <div className="brutal-box bg-white p-6 border-[6px] border-black shadow-[6px_6px_0_0_#000]">
          <Clock size={32} className="mb-4" />
          <h3 className="font-[family-name:var(--font-heading)] text-xl uppercase mb-2">RESPONSE TIME</h3>
          <p className="font-bold text-gray-700">General queries: 24–48 hrs<br />Bug reports: 6–12 hrs<br />Account issues: 24 hrs</p>
        </div>
      </div>

      {/* What to include */}
      <div className="brutal-box bg-white p-8 md:p-12 border-[6px] border-black shadow-[8px_8px_0_0_#ff7d85]">
        <h2 className="text-3xl font-[family-name:var(--font-heading)] uppercase border-b-4 border-black pb-4 mb-6">
          WHAT TO INCLUDE IN YOUR EMAIL
        </h2>
        <div className="space-y-4">
          {[
            { label: "BUG REPORT", hint: "What you were doing, what broke, what you expected. Device + browser info helps." },
            { label: "FEATURE REQUEST", hint: "Describe the feature, why it matters, and how you'd use it." },
            { label: "ACCOUNT ISSUE", hint: "Your display name + the issue. Do NOT send your password." },
            { label: "EDITORIAL INQUIRY", hint: "What you're writing about, who you are, and what you're proposing." },
            { label: "PRIVACY REQUEST", hint: "Specify exactly what data action you want: access, correction, or deletion." },
          ].map(({ label, hint }, i) => (
            <div key={i} className="flex items-start gap-4 p-4 border-2 border-black hover:bg-[#f8fafc] transition-colors">
              <span className="font-black text-xs uppercase tracking-widest bg-black text-white px-2 py-1 shrink-0 mt-0.5">{label}</span>
              <p className="font-bold text-gray-700">{hint}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
