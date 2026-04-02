"use client";

import Link from "next/link";
import { BookOpen, FileText, Link as LinkIcon, Wrench } from "lucide-react";

const resources = [
  {
    category: "WRITING CRAFT",
    color: "bg-[#ffeb3b]",
    icon: BookOpen,
    items: [
      { title: "On Writing by Stephen King — Summary & Key Takeaways", link: "https://www.goodreads.com/book/show/10569.On_Writing" },
      { title: "The Elements of Style (Strunk & White) — Online PDF", link: "https://www.gutenberg.org/ebooks/37134" },
      { title: "Hemingway's Iceberg Theory Explained", link: "#" },
      { title: "How to Write Like Cormac McCarthy", link: "#" },
    ],
  },
  {
    category: "AKSHAR STYLE GUIDE",
    color: "bg-[#ff7d85]",
    icon: FileText,
    items: [
      { title: "Formatting your post on Akshar — Markdown & Rich Text Guide", link: "#" },
      { title: "What types of content can you publish? (Article, Story, Poem, Essay)", link: "#" },
      { title: "Using the Prompt Directives Hub to break writer's block", link: "/prompts" },
      { title: "How Peer Review & Annotation works", link: "/peer-review" },
    ],
  },
  {
    category: "EXTERNAL TOOLS",
    color: "bg-[#60a5fa]",
    icon: Wrench,
    items: [
      { title: "Hemingway App — Readability Checker", link: "https://hemingwayapp.com" },
      { title: "Thesaurus.com — Word Expansion", link: "https://www.thesaurus.com" },
      { title: "ProWritingAid — Grammar & Style", link: "https://prowritingaid.com" },
      { title: "750words.com — Daily Writing Practice", link: "https://750words.com" },
    ],
  },
  {
    category: "COMMUNITY LINKS",
    color: "bg-white",
    icon: LinkIcon,
    items: [
      { title: "Join the Akshar Discord Server (Coming Soon)", link: "#" },
      { title: "Akshar at NIT Durgapur — Physical Society Page", link: "#" },
      { title: "Submit a Resource to this Library", link: "/contact" },
      { title: "View All Active Writing Programs", link: "/programs" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 space-y-16">

      {/* Header */}
      <div className="brutal-box bg-white p-10 md:p-16 border-[6px] border-black shadow-[12px_12px_0_0_#60a5fa] relative overflow-hidden">
        <div className="absolute -top-4 -right-4 bg-black text-[#ffeb3b] px-6 py-3 border-4 border-black font-black text-xl uppercase rotate-3">
          KNOWLEDGE BASE
        </div>
        <h1 className="text-[4rem] md:text-[8rem] font-[family-name:var(--font-heading)] uppercase leading-none tracking-tighter mb-6">
          RESOURCES
        </h1>
        <p className="text-xl md:text-2xl font-bold border-l-8 border-[#60a5fa] pl-6 max-w-2xl">
          A curated library of writing tools, style guides, and platform documentation. Everything you need to transmit better signals.
        </p>
      </div>

      {/* Sections */}
      {resources.map(({ category, color, icon: Icon, items }, i) => (
        <div key={i} className={`brutal-box ${color} p-8 md:p-12 border-[6px] border-black shadow-[8px_8px_0_0_#000]`}>
          <div className="flex items-center gap-4 mb-8 border-b-4 border-black pb-4">
            <Icon size={40} />
            <h2 className="text-4xl font-[family-name:var(--font-heading)] uppercase">{category}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, j) => (
              <a
                key={j}
                href={item.link}
                target={item.link.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white border-4 border-black p-4 font-bold text-base hover:bg-[#ffeb3b] hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all shadow-[2px_2px_0_0_#000]"
              >
                <span className="w-3 h-3 bg-black flex-shrink-0" />
                {item.title}
              </a>
            ))}
          </div>
        </div>
      ))}

      {/* Contribute */}
      <div className="brutal-box bg-black text-white p-10 border-[6px] border-white shadow-[12px_12px_0_0_#ff7d85] text-center">
        <h2 className="text-5xl font-[family-name:var(--font-heading)] uppercase mb-4">MISSING A RESOURCE?</h2>
        <p className="text-xl font-bold text-gray-300 mb-8 max-w-xl mx-auto">
          If you know something worth sharing with the Akshar community, submit it for review.
        </p>
        <Link href="/contact" className="brutal-btn bg-[#ff7d85] text-white text-xl py-4 px-10 inline-flex items-center gap-4">
          CONTACT THE TEAM
        </Link>
      </div>
    </div>
  );
}
