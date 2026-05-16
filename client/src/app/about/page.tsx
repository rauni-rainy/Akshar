"use client";

import Link from "next/link";
import { ArrowRight, Pen, Globe, Users, Flame } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-0 pb-0">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center px-4 md:px-16 py-20 overflow-hidden">
        <div className="absolute top-10 left-6 rotate-[-8deg] brutal-box bg-[#ff7d85] p-4 shadow-[8px_8px_0_0_#000] z-10">
          <span className="font-[family-name:var(--font-heading)] text-4xl">NIT DURGAPUR.</span>
        </div>
        <div className="absolute bottom-10 right-6 rotate-[5deg] brutal-box bg-[#60a5fa] p-4 shadow-[8px_8px_0_0_#000] z-10">
          <span className="font-[family-name:var(--font-heading)] text-4xl">SINCE 2026.</span>
        </div>

        <div className="brutal-box bg-white p-10 md:p-20 w-full max-w-5xl mx-auto shadow-[16px_16px_0_0_#000] relative z-20">
          <div className="absolute -top-6 -right-6 bg-[#ffeb3b] text-black px-6 py-2 border-4 border-black font-black text-2xl uppercase shadow-[4px_4px_0_0_#ff7d85] rotate-3">
            THE INITIATIVE
          </div>
          <h1 className="text-[4rem] md:text-[7rem] font-[family-name:var(--font-heading)] uppercase leading-[0.9] tracking-tighter mb-8">
            WHO WE <br />
            <span className="bg-black text-white px-4">ARE.</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold leading-relaxed border-l-8 border-[#ff7d85] pl-6 py-2">
            Akshar is a literary platform built inside the walls of NIT Durgapur — a rebellion against algorithmic content, hollow metrics, and the death of genuine expression. We are not a social network. We are a sanctuary.
          </p>
          <div className="mt-10 border-t-8 border-black pt-8">
            <Link href="/register" className="brutal-btn bg-[#ff7d85] text-2xl py-5 px-10 flex items-center gap-4 w-max">
              JOIN THE INITIATIVE <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* How it started */}
      <section className="bg-black text-white py-20 px-4 md:px-16 border-y-8 border-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="bg-[#ffeb3b] text-black px-6 py-2 border-4 border-black font-black text-xl uppercase inline-block mb-8 shadow-[4px_4px_0_0_#ff7d85] -rotate-1">
              THE ORIGIN STORY
            </div>
            <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-heading)] uppercase mb-8 leading-none">
              BORN FROM <br /><span className="text-[#ff7d85]">FRUSTRATION.</span>
            </h2>
            <p className="text-xl font-bold leading-relaxed text-gray-300 border-l-4 border-[#60a5fa] pl-6">
              We watched great writers disappear into algorithmic invisibility. We saw genuine literary work buried under viral nonsense. Akshar was built to fix that. One signal at a time.
            </p>
          </div>
          <div className="space-y-6">
            {[
              { icon: Pen, title: "WRITE FREELY", desc: "Your words, your rules. No editorial censorship. No viral optimization.", color: "bg-[#ffeb3b]" },
              { icon: Globe, title: "SIGNAL NOT NOISE", desc: "Every post is a deliberate act of transmission — not a dopamine bait.", color: "bg-[#ff7d85]" },
              { icon: Users, title: "COMMUNITY FIRST", desc: "Peer reviews over likes. Thoughtful engagement over quick reactions.", color: "bg-[#60a5fa]" },
            ].map(({ icon: Icon, title, desc, color }, i) => (
              <div key={i} className={`brutal-box ${color} p-6 border-4 border-black shadow-[6px_6px_0_0_#fff] hover:-translate-y-1 transition-transform`}>
                <div className="flex items-center gap-4 mb-2">
                  <Icon size={28} />
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl uppercase">{title}</h3>
                </div>
                <p className="font-bold text-lg">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Values */}
      <section className="py-20 px-4 md:px-16 bg-[#fffdf5]">
        <div className="max-w-6xl mx-auto">
          <div className="brutal-box bg-[#ffeb3b] p-6 md:p-10 border-[6px] border-black shadow-[12px_12px_0_0_#ff7d85] mb-16 inline-block rotate-1">
            <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-heading)] uppercase tracking-tighter m-0">OUR VALUES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
            {[
              { title: "RADICAL HONESTY", text: "We reject polished, sanitized voices. The messy, the raw, the profound — this is our native tongue." },
              { title: "INTELLECTUAL RIGOUR", text: "Every comment must contain a thought. Every review must interrogate the work. No empty validation." },
              { title: "OWNERSHIP", text: "Your content belongs to you. Always. No hidden licensing. No data scraping. A blank canvas and your intellect." },
            ].map((v, i) => (
              <div key={i} className="brutal-box bg-white p-8 border-4 border-black shadow-[8px_8px_0_0_#000] hover:-translate-y-2 transition-all">
                <Flame size={40} className="mb-4 text-[#ff7d85]" />
                <h3 className="text-3xl font-[family-name:var(--font-heading)] uppercase mb-4 border-b-4 border-black pb-3">{v.title}</h3>
                <p className="text-lg font-bold leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 px-4 md:px-16 border-t-8 border-black">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-6xl md:text-9xl font-[family-name:var(--font-heading)] uppercase mb-8 leading-none">
            READY TO <span className="text-[#ffeb3b]">TRANSMIT?</span>
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/register" className="brutal-btn bg-[#ff7d85] text-2xl py-5 px-10 flex items-center gap-4">
              GET STARTED <ArrowRight size={24} />
            </Link>
            <Link href="/guidelines" className="brutal-btn bg-white text-black text-2xl py-5 px-10">
              READ THE DIRECTIVES
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
