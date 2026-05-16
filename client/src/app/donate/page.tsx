"use client";

import Link from "next/link";
import { Heart, ArrowRight, Zap, BookOpen, Users } from "lucide-react";

export default function DonatePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 space-y-16">

      {/* Hero */}
      <div className="brutal-box bg-[#ff7d85] p-10 md:p-16 border-[6px] border-black shadow-[12px_12px_0_0_#000] relative rotate-1 hover:rotate-0 transition-transform overflow-hidden">
        <Heart size={200} className="absolute right-0 bottom-0 opacity-10" />
        <div className="relative z-10">
          <h1 className="text-[4rem] md:text-[8rem] font-[family-name:var(--font-heading)] uppercase leading-none tracking-tighter mb-6">
            FUND THE<br />
            <span className="bg-black text-white px-4">RESISTANCE.</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold border-l-8 border-black pl-6 max-w-2xl">
            Akshar runs on caffeine, conviction, and the generosity of people who believe human writing should survive the AI apocalypse.
          </p>
        </div>
      </div>

      {/* What your support does */}
      <div className="space-y-6">
        <div className="brutal-box bg-black text-white p-6 inline-block shadow-[8px_8px_0_0_#ff7d85] border-4 border-black -rotate-1">
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-heading)] uppercase m-0">WHERE YOUR MONEY GOES</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            { icon: Zap, title: "KEEP THE SERVERS ALIVE", desc: "Hosting, databases, and infrastructure. Without support, the mainframe goes dark.", color: "bg-[#ffeb3b]" },
            { icon: BookOpen, title: "FUND THE ANTHOLOGY", desc: "Every year, we publish the best Akshar submissions as a real book. That costs real money.", color: "bg-[#60a5fa]" },
            { icon: Users, title: "GROW THE COMMUNITY", desc: "Workshops, events, and physical meetups for NIT Durgapur's literary underground.", color: "bg-white" },
          ].map(({ icon: Icon, title, desc, color }, i) => (
            <div key={i} className={`brutal-box ${color} p-8 border-[6px] border-black shadow-[6px_6px_0_0_#000] hover:-translate-y-2 transition-all`}>
              <Icon size={48} className="mb-4" />
              <h3 className="text-2xl font-[family-name:var(--font-heading)] uppercase border-b-4 border-black pb-3 mb-4">{title}</h3>
              <p className="font-bold text-lg">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Donate Block */}
      <div className="brutal-box bg-[#ffeb3b] p-10 md:p-16 border-[6px] border-black shadow-[12px_12px_0_0_#000]">
        <h2 className="text-5xl font-[family-name:var(--font-heading)] uppercase mb-4">MAKE A CONTRIBUTION</h2>
        <p className="text-xl font-bold mb-8 border-l-8 border-black pl-6 max-w-xl">
          We currently accept contributions via UPI and direct bank transfer. Reach out to us directly — every amount counts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0_0_#000]">
            <p className="font-black text-sm uppercase tracking-widest text-gray-600 mb-2">UPI ID</p>
            <p className="text-2xl font-black">writer.raunak@gmail.com</p>
          </div>
          <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0_0_#000]">
            <p className="font-black text-sm uppercase tracking-widest text-gray-600 mb-2">CONTACT</p>
            <p className="text-2xl font-black">writer.raunak@gmail.com</p>
          </div>
        </div>
        <div className="mt-8">
          <Link href="/contact" className="brutal-btn bg-black text-white text-xl py-5 px-10 flex items-center gap-4 w-max">
            GET IN TOUCH <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      <p className="text-center font-bold text-gray-500 uppercase tracking-widest text-sm">Akshar is a non-profit student initiative. All contributions go directly to platform operations and community programs.</p>
    </div>
  );
}
