"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lightbulb, SendHorizontal } from "lucide-react";
import Sidebar from "../../components/Sidebar";

const PROMPTS = [
  {
    id: 1,
    title: "The Silence of the Code",
    concept: "A world where speaking and writing are strictly forbidden by an oppressive regime. The only way the rebellion communicates is by hiding messages within the comments of legacy computer code running the city's infrastructure.",
    approach: "Focus on the sensory details of a silent world and the tension of leaving traces in the system. What happens when an authority algorithm starts identifying anomalies in the comments?",
    image: "/assets/prompts/prompt_1_silence_1774816121318.png"
  },
  {
    id: 2,
    title: "Neon Nostalgia",
    concept: "In a hyper-advanced 2099 cyberpunk city, you discover an analog 1920s mechanical typewriter. When you type on it, the letters mysteriously print documents detailing events that occurred exactly one century ago in your exact location.",
    approach: "Explore the intersection of advanced neon-drenched reality and analog historical mystery. Use the typewriter as an anchor tying the character to a forgotten past.",
    image: "/assets/prompts/prompt_2_neon_1774816137245.png"
  },
  {
    id: 3,
    title: "The Mirror Network",
    concept: "You hack into a secure black-site server and realize it isn't holding data—it's rendering a simulation of your exact life, 10 seconds into the future. And you just watched your future self get compromised.",
    approach: "Write a fast-paced cyber thriller. Build urgency by describing the character trying to outpace or alter the 10-second gap before the simulated event catches up to reality.",
    image: "/assets/prompts/prompt_3_mirror_1774816152398.png"
  },
  {
    id: 4,
    title: "Bureau of Unseen Archives",
    concept: "You work at a secret agency tasked with cataloging and securing memories of events that never actually happened—but were surgically implanted into civilians by the state.",
    approach: "Experiment with surrealism and questionable sanity. How does the archivist verify truth when their own memories might be falsified?",
    image: "/assets/prompts/prompt_4_archives_1774816167897.png"
  },
  {
    id: 5,
    title: "The Last Radio Tower",
    concept: "Isolated at the edge of a desolate wasteland, a massive radio tower suddenly activates, transmitting a desperate SOS loop. The voice is unmistakably yours, but you aren't the one speaking.",
    approach: "Lean into psychological horror and eerie atmospheric tension. Play with the fear of isolation and the uncanny valley of hearing oneself.",
    image: "/assets/prompts/prompt_5_tower_1774816187066.png"
  },
  {
    id: 6,
    title: "Clockwork Rebellion",
    concept: "The steam engine was never invented. Instead, an authoritarian empire relies entirely on intricate clockwork automata. The rebellion has discovered a way to wind the machines backward.",
    approach: "Use visceral steampunk and clockwork imagery. Describe the gears, the brass, and the physical exhaustion of fighting a mechanical empire.",
    image: "/assets/prompts/prompt_6_clockwork_1774816209346.png"
  },
  {
    id: 7,
    title: "Whispers in the Static",
    concept: "Every time you tune an old CRT television to a dead channel, the white noise begins to filter into distinct voices. They are whispering the darkest secrets of the people in your apartment building.",
    approach: "Write a suspenseful, paranoid slow-burn. Focus on the psychological weight of knowing things you were never meant to know about your neighbors.",
    image: "/assets/prompts/prompt_7_static_1774816224811.png"
  },
  {
    id: 8,
    title: "The Architect's Dream",
    concept: "You are employed in a massive, brutalist ministry. One day, you notice that every time you blink or turn a corner, the concrete corridors and stairs rearrange themselves to keep you trapped deeper inside.",
    approach: "Use architectural jargon and oppressive, heavy descriptions of concrete and geometry. Build claustrophobia and the disorientation of a labyrinth.",
    image: "/assets/prompts/prompt_8_architect_1774816238186.png"
  },
  {
    id: 9,
    title: "Echoes of Earth",
    concept: "After 400 years in cryosleep, a generation spaceship finally arrives at its pristine exoplanet destination. However, they find the planet covered in dark, ancient ruins—built by humanity thousands of years ago.",
    approach: "Write a grand sci-fi epic focusing on the sheer awe and dread of a paradox. Contrast the sterile environment of the ship with the ancient, overgrown human ruins.",
    image: "/assets/prompts/prompt_9_space_1774816254201.png"
  },
  {
    id: 10,
    title: "The Memory Broker",
    concept: "In a heavily surveilled underground market, the most valuable currency is a perfectly preserved, unaltered childhood memory. You've just acquired a memory that belongs to the Supreme Chancellor.",
    approach: "Dive into a gritty cyberpunk underworld. How are memories stored, traded, and injected? What is the sensory experience of reliving someone else's golden moment?",
    image: "/assets/prompts/prompt_10_memory_1774816273422.png"
  }
];

export default function PromptsHub() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("akshar_token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleRespond = (promptConcept: string) => {
    // Navigate to dashboard and append the prompt text so we can default to it
    const params = new URLSearchParams({ action: 'write', prompt: promptConcept });
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-[1700px] mx-auto px-4 md:px-8 mt-12 mb-24 lg:flex gap-10 sm:overflow-visible overflow-hidden">
      
      {/* LEFT SIDEBAR (NAV) */}
      <Sidebar activeTab="PROMPTS" onTabChange={(tab) => router.push(`/dashboard?action=${tab === 'WRITE' ? 'write' : 'feed'}`)} />

      {/* CENTER CONTENT */}
      <main className="flex-1 min-w-0">
        
        {/* Top Banner */}
        <div className="brutal-box bg-[#f8fafc] p-8 md:p-12 border-[6px] border-black mb-12 relative z-10 shadow-[12px_12px_0_0_#000] overflow-hidden rotate-1 hover:rotate-0 transition-transform">
          <div className="absolute -right-6 -top-12 opacity-5 text-black hidden sm:block">
             <Lightbulb size={250} fill="currentColor" />
          </div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-[6rem] font-[family-name:var(--font-heading)] uppercase tracking-tight leading-none bg-black text-[#ffeb3b] inline-block px-4 py-2 border-4 border-black">
              DIRECTIVE PROMPTS
            </h1>
            <p className="text-xl md:text-3xl mt-6 font-bold uppercase tracking-widest leading-snug bg-white p-4 border-l-[8px] border-black shadow-[4px_4px_0_0_#ff7d85] inline-block">
              Intercepted blueprints for your next transmission.<br/>
              Select a concept and deploy your counter-narrative.
            </p>
          </div>
        </div>

        {/* Prompt List */}
        <div className="space-y-16">
           {PROMPTS.map((prompt, idx) => (
             <article key={prompt.id} className="brutal-box bg-white flex flex-col xl:flex-row border-[6px] border-black shadow-[12px_12px_0_0_#000] overflow-hidden group hover:-translate-y-2 transition-transform">
                
                <div className="xl:w-2/5 border-b-[6px] xl:border-b-0 xl:border-r-[6px] border-black relative overflow-hidden bg-black min-h-[300px]">
                   <img 
                     src={prompt.image} 
                     alt={prompt.title} 
                     className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                   />
                </div>
                
                <div className="xl:w-3/5 p-8 md:p-12 flex flex-col justify-between bg-[#f8fafc]">
                   <div>
                      <div className="flex items-center gap-4 mb-6">
                         <span className="bg-black text-white px-4 py-1 text-2xl font-[family-name:var(--font-heading)] border-4 border-[#ffeb3b] rotate-[-5deg]">
                            #{idx + 1}
                         </span>
                         <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] uppercase text-black leading-none max-w-xl">
                            {prompt.title}
                         </h2>
                      </div>
                      
                      <div className="mb-6 bg-white p-6 border-4 border-black shadow-[6px_6px_0_0_#ff7d85]">
                         <h3 className="font-black uppercase text-[#ff7d85] tracking-widest text-sm mb-2">ARCHIVED CONCEPT:</h3>
                         <p className="text-xl font-medium leading-relaxed font-serif">
                            {prompt.concept}
                         </p>
                      </div>

                      <div className="mb-10 p-6 border-l-[6px] border-[#60a5fa] bg-[#E2E8F0]">
                         <h3 className="font-black uppercase text-[#60a5fa] tracking-widest text-sm mb-2">DIRECTIVE APPROACH:</h3>
                         <p className="font-bold text-gray-800 text-lg">
                            {prompt.approach}
                         </p>
                      </div>
                   </div>

                   <button 
                     onClick={() => handleRespond(prompt.concept)}
                     className="w-full bg-[#ffeb3b] hover:bg-black hover:text-[#ffeb3b] text-black text-3xl font-[family-name:var(--font-heading)] uppercase py-6 border-[6px] border-black flex justify-center items-center gap-4 transition-colors shadow-[6px_6px_0_0_#000] group-hover:shadow-[0_0_0_0_#000] hover:translate-y-1 hover:translate-x-1 hover-target"
                   >
                     RESPOND TO PROMPT <SendHorizontal size={32} />
                   </button>
                </div>

             </article>
           ))}
        </div>

      </main>
    </div>
  );
}
