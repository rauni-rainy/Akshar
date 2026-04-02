"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Quote, Skull, Star, PenTool, Sparkles, Twitter, Instagram, Facebook, Linkedin, Github, Activity, ChevronRight } from "lucide-react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("akshar_token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const testimonials = [
    { name: "AANYA SHARMA", role: "POET", text: "Finally, a platform that doesn't bury my words under algorithmic garbage. It's pure, unadulterated expression.", color: "bg-[#ffeb3b]", rotation: "-rotate-2" },
    { name: "KIRAN MEHTA", role: "JOURNALIST", text: "The brutalist aesthetic matches the raw truth of the stories published here. I've found my digital agency.", color: "bg-[#ff7d85]", rotation: "rotate-2" },
    { name: "PRIYA NAIR", role: "AUTHOR", text: "Akshar stripped away the metrics and brought back the art of writing. No likes, no follows, just words.", color: "bg-[#60a5fa]", rotation: "-rotate-1" },
    { name: "ARJUN BOSE", role: "ESSAYIST", text: "I've seen things you people wouldn't believe. Now I can finally write about them without censorship.", color: "bg-white", rotation: "rotate-3" },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("SYSTEM ALERT: YOU HAVE JOINED THE RESISTANCE.");
  };

  return (
    <div className="space-y-24 md:space-y-32 mt-8 md:mt-12 pb-0">

      {/* 1. Hero Section (Manifesto Intro) */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center items-center px-4 md:px-8 overflow-hidden md:overflow-visible py-12 md:py-0">
        <div className="absolute top-10 left-4 md:top-0 md:left-10 md:-rotate-[15deg] brutal-box bg-[#ffeb3b] p-3 md:p-6 shadow-[4px_4px_0_0_#000] md:shadow-[8px_8px_0_0_#000] z-20 hover:scale-105 transition-transform">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl">NO ALGORITHMS.</h2>
        </div>
        <div className="absolute bottom-0 right-4 md:bottom-10 md:right-10 rotate-[5deg] md:rotate-[10deg] brutal-box bg-[#60a5fa] p-3 md:p-6 shadow-[4px_4px_0_0_#000] md:shadow-[8px_8px_0_0_#000] z-20 hover:scale-105 transition-transform">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl">PURE SIGNAL.</h2>
        </div>

        <div className="brutal-box bg-white p-6 md:p-16 w-full max-w-5xl mx-auto shadow-[8px_8px_0_0_#000] md:shadow-[16px_16px_0_0_#000] rotate-0 md:rotate-1 hover:rotate-0 transition-transform relative z-10 mt-16 md:mt-0">
          <div className="absolute -top-4 right-2 md:-top-6 md:-right-6 bg-black text-white px-4 py-2 md:px-6 md:py-2 border-4 border-dashed border-white shadow-[4px_4px_0_0_#ff7d85] md:shadow-[6px_6px_0_0_#ff7d85] rotate-6 md:rotate-12 z-30">
            <span className="font-bold text-sm md:text-2xl uppercase tracking-widest">VERSION 1.0</span>
          </div>

          <h1 className="text-[4.5rem] leading-[0.85] md:text-[8rem] font-[family-name:var(--font-heading)] uppercase md:leading-[0.9] tracking-tighter mb-8 decoration-[#ff7d85] break-words">
            THE INTERNET <br /> <span className="bg-black text-white px-2 md:px-4">IS BROKEN.</span>
          </h1>

          <p className="text-xl md:text-3xl font-bold leading-relaxed mb-8 md:mb-12 border-l-[6px] md:border-l-8 border-[#3b82f6] pl-4 md:pl-6 py-2">
            We are drowning in noise. AI generated slop. Clickbait. Echo chambers.
            <br /><br />
            <span className="bg-[#ffeb3b] px-2 border-2 border-black inline-block mt-2">Akshar is the rebellion.</span>
            <br />A sanctuary for human thought.
          </p>

          <div className="flex flex-wrap gap-4 border-t-[6px] md:border-t-8 border-black pt-6 md:pt-8 w-full">
            <Link href="/register" className="brutal-btn bg-[#ff7d85] w-full md:w-auto text-xl md:text-3xl py-4 px-6 md:py-6 md:px-10 hover-target flex items-center justify-center gap-4 border-[3px] md:border-4">
              JOIN THE INITIATIVE <ArrowRight size={28} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Initiative Details (The Rules) */}
      <section className="w-full max-w-6xl mx-auto px-4 md:px-8 relative z-20">
        <div className="brutal-box bg-black text-white p-4 md:px-8 md:py-4 mb-12 md:mb-20 inline-block rotate-[1deg] md:rotate-[2deg] shadow-[6px_6px_0_0_#ff7d85] md:shadow-[12px_12px_0_0_#ff7d85]">
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-heading)] m-0">THE MANIFESTO</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="brutal-box bg-white p-6 md:p-8 shadow-[6px_6px_0_0_#000] md:shadow-[8px_8px_0_0_#000] hover:-translate-y-2 md:hover:-translate-y-4 hover:shadow-[10px_10px_0_0_#60a5fa] transition-all">
            <PenTool size={48} className="mb-4 md:mb-6 text-[#60a5fa]" />
            <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] mb-4">OWN YOUR WORDS</h3>
            <p className="text-lg md:text-xl font-medium border-t-[3px] md:border-t-4 border-black pt-4">Your content belongs to you. No hidden licensing agreements. No data scraping for LLMs. Just a blank canvas and your intellect.</p>
          </div>

          <div className="brutal-box bg-[#ffeb3b] p-6 md:p-8 shadow-[6px_6px_0_0_#000] md:shadow-[8px_8px_0_0_#000] hover:-translate-y-2 md:hover:-translate-y-4 hover:shadow-[10px_10px_0_0_#ff7d85] transition-all md:translate-y-12">
            <Skull size={48} className="mb-4 md:mb-6 text-black" />
            <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] mb-4 uppercase">Death to Metrics</h3>
            <p className="text-lg md:text-xl font-medium border-t-[3px] md:border-t-4 border-black pt-4 mb-4">
              We killed vanity. No likes. No follower counts. Instead — <span className="bg-black text-[#ffeb3b] px-1 font-black">peer review with inline annotation</span>. Real humans leaving real margin notes inside your actual words.
            </p>
            <Link href="/peer-review" className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-widest border-b-4 border-black hover:border-[#ff7d85] transition-colors">
              SEE THE PROTOCOL <ArrowRight size={16} />
            </Link>
          </div>

          <div className="brutal-box bg-[#ff7d85] p-6 md:p-8 shadow-[6px_6px_0_0_#000] md:shadow-[8px_8px_0_0_#000] hover:-translate-y-2 md:hover:-translate-y-4 hover:shadow-[10px_10px_0_0_#ffeb3b] transition-all md:translate-y-24">
            <Sparkles size={48} className="mb-4 md:mb-6 text-white" />
            <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] mb-4">RAW AESTHETICS</h3>
            <p className="text-lg md:text-xl font-medium border-t-[3px] md:border-t-4 border-black pt-4">Built on the principles of Neo-Brutalism. Form follows function. High contrast. Loud typography. Unapologetically bold.</p>
          </div>
        </div>
      </section>

      {/* 3. Carousel (Testimonials) */}
      <section className="py-16 md:py-24 bg-black border-y-4 md:border-y-8 border-black w-full px-4 relative mt-16">
        <div className="max-w-7xl mx-auto relative">
          <div className="absolute -top-24 md:-top-32 left-0 md:left-8 bg-[#ffeb3b] p-3 md:p-4 rotate-0 md:rotate-[-5deg] border-4 border-black z-10 shadow-[4px_4px_0_0_#ff7d85] md:shadow-[8px_8px_0_0_#ff7d85] inline-block">
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-heading)] uppercase">VOICES OF THE FRONTLINE</h2>
          </div>

          {/* Swipe indicator for mobile */}
          <div className="md:hidden flex items-center justify-end gap-2 text-[#ffeb3b] font-bold uppercase tracking-widest mt-8 mb-4">
            <span className="text-sm border-b-2 border-[#ffeb3b]">SWIPE VISIONS</span> <ChevronRight size={20} />
          </div>

          <div className="flex overflow-x-auto gap-6 md:gap-8 pb-8 pt-4 md:pt-16 snap-x snap-mandatory hide-scrollbar">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`brutal-box w-[85vw] md:w-auto md:min-w-[450px] p-6 md:p-8 ${t.color} rotate-0 md:${t.rotation} snap-center shrink-0 hover:rotate-0 hover:z-30 hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#fff] transition-all duration-300`}
              >
                <Quote size={40} className="mb-4 md:mb-6 opacity-30 w-8 h-8 md:w-12 md:h-12" />
                <p className="text-xl md:text-2xl font-bold mb-6 md:mb-8 leading-snug">"{t.text}"</p>
                <div className="flex items-center gap-4 border-t-[3px] md:border-t-4 border-black pt-4 md:pt-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-black border-[3px] md:border-4 border-white shadow-[4px_4px_0_0_#000]"></div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-[family-name:var(--font-heading)] uppercase m-0 leading-none">{t.name}</h4>
                    <span className="font-black tracking-widest text-xs md:text-sm uppercase bg-white px-2 py-1 border-2 border-black inline-block mt-2">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Newsletter Sign Up */}
      <section className="bg-[#ffeb3b] border-y-4 md:border-b-8 border-black w-full px-4 md:px-12 py-16 md:py-24 mb-0 isolate relative">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Newsletter Form */}
          <div className="brutal-box bg-white p-6 md:p-12 shadow-[8px_8px_0_0_#ff7d85] md:shadow-[16px_16px_0_0_#ff7d85] rotate-0 md:-rotate-1 hover:rotate-0 transition-transform relative z-10 order-2 lg:order-1">
            <div className="absolute -top-4 -right-2 md:-top-6 md:-right-6 bg-black text-[#ffeb3b] px-3 py-1 md:px-4 md:py-2 border-4 border-black font-bold uppercase tracking-widest rotate-2 md:rotate-6 shadow-[4px_4px_0_0_#fff] z-30">
              <span className="text-sm md:text-base">CRITICAL UPDATES</span>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-6 mt-4">
              <div>
                <label className="block text-xl md:text-2xl font-[family-name:var(--font-heading)] uppercase mb-2">EMAIL *</label>
                <input type="email" required className="brutal-input hover-target font-sans text-lg md:text-xl border-b-[6px] md:border-b-8 border-x-4 border-t-4" placeholder="ENTER YOUR EMAIL" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xl md:text-2xl font-[family-name:var(--font-heading)] uppercase mb-2">FIRST NAME</label>
                  <input type="text" className="brutal-input hover-target font-sans text-lg md:text-xl border-b-[6px] md:border-b-8 border-x-4 border-t-4" placeholder="JOHN" />
                </div>
                <div>
                  <label className="block text-xl md:text-2xl font-[family-name:var(--font-heading)] uppercase mb-2">LAST NAME</label>
                  <input type="text" className="brutal-input hover-target font-sans text-lg md:text-xl border-b-[6px] md:border-b-8 border-x-4 border-t-4" placeholder="DOE" />
                </div>
              </div>

              <div className="pt-6 border-t-[4px] md:border-t-[6px] border-black">
                <label className="block text-xl md:text-2xl font-[family-name:var(--font-heading)] uppercase mb-4 md:mb-6">SELECT FREQUENCY:</label>
                <div className="space-y-3 md:space-y-4 font-bold text-sm md:text-lg">
                  <label className="flex items-center gap-3 md:gap-4 cursor-pointer hover-target p-2 hover:bg-black/5 transition-colors">
                    <input type="checkbox" defaultChecked className="min-w-6 w-6 h-6 md:min-w-8 md:w-8 md:h-8 border-[3px] md:border-4 border-black appearance-none checked:bg-[#60a5fa] checked:before:content-['✓'] checked:before:text-black checked:before:flex checked:before:justify-center checked:before:items-center cursor-pointer transition-all" />
                    <span className="uppercase">THE MANIFESTO (WEEKLY DISPATCH)</span>
                  </label>
                  <label className="flex items-center gap-3 md:gap-4 cursor-pointer hover-target p-2 hover:bg-black/5 transition-colors">
                    <input type="checkbox" className="min-w-6 w-6 h-6 md:min-w-8 md:w-8 md:h-8 border-[3px] md:border-4 border-black appearance-none checked:bg-[#60a5fa] checked:before:content-['✓'] checked:before:text-black checked:before:flex checked:before:justify-center checked:before:items-center cursor-pointer transition-all" />
                    <span className="uppercase">OPPORTUNITIES & CONTESTS</span>
                  </label>
                  <label className="flex items-center gap-3 md:gap-4 cursor-pointer hover-target p-2 hover:bg-black/5 transition-colors">
                    <input type="checkbox" className="min-w-6 w-6 h-6 md:min-w-8 md:w-8 md:h-8 border-[3px] md:border-4 border-black appearance-none checked:bg-[#60a5fa] checked:before:content-['✓'] checked:before:text-black checked:before:flex checked:before:justify-center checked:before:items-center cursor-pointer transition-all" />
                    <span className="uppercase">SYSTEM UPDATES (MONTHLY)</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="brutal-btn bg-[#ff7d85] w-full text-2xl md:text-4xl py-4 md:py-6 mt-4 md:mt-6 hover-target text-white shadow-[6px_6px_0_0_#000] !border-b-[6px] md:!border-b-8">
                SUBSCRIBE NOW
              </button>
            </form>
          </div>

          {/* Newsletter Branding */}
          <div className="relative flex flex-col justify-center order-1 lg:order-2 px-2">
            <div className="absolute -left-10 top-20 text-[#000] opacity-10 pointer-events-none hidden lg:block animate-spin" style={{ animationDuration: '20s' }}>
              <Activity size={500} />
            </div>
            <h2 className="text-6xl md:text-[8rem] font-[family-name:var(--font-heading)] uppercase leading-[0.85] tracking-tighter mb-8 md:mb-12 relative z-10 text-black">
              SUBSCRIBE <br />TO THE <br />
              <span className="bg-black text-[#ffeb3b] px-3 md:px-4 block w-max mt-2 md:mt-4 rotate-1 md:rotate-2 border-[3px] md:border-4 border-black">
                RESISTANCE.
              </span>
            </h2>
            <p className="text-xl md:text-3xl font-bold bg-white p-4 md:p-6 border-[3px] md:border-[6px] border-black shadow-[8px_8px_0_0_#60a5fa] md:shadow-[12px_12px_0_0_#60a5fa] rotate-0 md:-rotate-2 relative z-10 w-max max-w-[85vw] md:max-w-lg">
              NO SPAM. <br />NO METRICS. <br />
              <span className="text-[#ff7d85] mt-2 block">JUST RAW LITERARY FIREPOWER DELIVERED TO YOUR INBOX.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Global CSS for hiding scrollbar in carousel while keeping functionality */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
