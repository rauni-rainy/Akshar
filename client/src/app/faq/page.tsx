"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    q: "WHAT IS AKSHAR?",
    a: "Akshar is a literary platform built at NIT Durgapur for writers who want to publish without algorithmic interference, vanity metrics, or AI-generated noise. It's a space for genuine human expression.",
    color: "bg-[#ffeb3b]",
  },
  {
    q: "WHO CAN JOIN?",
    a: "Currently, Akshar is open primarily to the NIT Durgapur community. We plan to expand access to other institutions and independent writers in future phases. This is a beta — early adopters shape the platform.",
    color: "bg-white",
  },
  {
    q: "WHAT CAN I PUBLISH?",
    a: "Articles, short stories, essays, poetry, journalism, and creative non-fiction. Content must be entirely your own original work. No AI-generated content, plagiarism, or hate speech.",
    color: "bg-[#ff7d85]",
  },
  {
    q: "HOW DOES PEER REVIEW WORK?",
    a: "You can request a peer review on any of your published pieces. Reviewers use the Triangulation Method: Observe (extract the core thesis), Interrogate (examine structure and language), and Elevate (provide forward-looking suggestions). Reviewers can leave inline annotations on specific lines of text.",
    color: "bg-[#60a5fa]",
  },
  {
    q: "WHY ARE THERE NO LIKE BUTTONS?",
    a: "Because a 'like' demands nothing of the reader. Akshar's thesis is that meaningful engagement requires articulating a thought. If someone wants to respond to your work, they write something.",
    color: "bg-[#ffeb3b]",
  },
  {
    q: "HOW DOES AUTOSAVE WORK?",
    a: "Your drafts are automatically saved every 30 seconds while you write. You can find all your saved drafts in the My Writings section of your dashboard.",
    color: "bg-white",
  },
  {
    q: "HOW DO I EARN BADGES?",
    a: "Badges are earned by contributing to the platform: SIGNAL CASTER for publishing works, DATA SIPHON for engaging with content, INFILTRATOR for participating in the community, and INTERROGATOR for leaving substantive peer reviews. View your badges on your Profile page.",
    color: "bg-[#ff7d85]",
  },
  {
    q: "CAN I DELETE MY ACCOUNT?",
    a: "Yes. Contact us via the Contact page and request account deletion. Your data will be removed from active servers within 30 days. Published content may be retained in anonymized archival form.",
    color: "bg-white",
  },
  {
    q: "IS THIS PLATFORM FREE?",
    a: "Yes. Akshar is a free, non-profit student initiative. No subscription fees, no paywalls, no advertising. If you'd like to support the platform financially, visit the Donate page.",
    color: "bg-[#60a5fa]",
  },
  {
    q: "HOW DO I REPORT A BUG?",
    a: "Use the Contact page and select BUG REPORT / ANOMALY as the subject. Include as much detail as possible: what you were doing, what happened, and what you expected to happen. The engineering cell will respond within 6–12 hours.",
    color: "bg-[#ffeb3b]",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="brutal-box bg-black text-white p-10 md:p-14 border-[6px] border-white shadow-[12px_12px_0_0_#ffeb3b] relative overflow-hidden">
        <h1 className="text-[4rem] md:text-[8rem] font-[family-name:var(--font-heading)] uppercase leading-none tracking-tighter mb-4">
          F.A.Q.
        </h1>
        <p className="text-xl font-bold text-gray-300 border-l-8 border-[#ffeb3b] pl-6 max-w-xl">
          Frequently asked questions about the Akshar platform, peer review, content policy, and more.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`brutal-box border-[6px] border-black shadow-[6px_6px_0_0_#000] ${open === i ? faq.color : "bg-white"} transition-all`}
          >
            <button
              className="w-full flex items-center justify-between p-6 md:p-8 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <h2 className="text-xl md:text-2xl font-[family-name:var(--font-heading)] uppercase pr-4">{faq.q}</h2>
              {open === i ? <ChevronUp size={28} className="flex-shrink-0" /> : <ChevronDown size={28} className="flex-shrink-0" />}
            </button>
            {open === i && (
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <p className="text-lg font-bold leading-relaxed border-l-4 border-black pl-4">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Didn't find answer CTA */}
      <div className="brutal-box bg-[#ff7d85] p-10 border-[6px] border-black shadow-[12px_12px_0_0_#000] text-center">
        <h2 className="text-4xl font-[family-name:var(--font-heading)] uppercase mb-4">QUESTION NOT ANSWERED?</h2>
        <p className="text-lg font-bold mb-8 max-w-lg mx-auto">The editorial cell will respond to any inquiry within 24–48 hours.</p>
        <Link href="/contact" className="brutal-btn bg-black text-white text-xl py-4 px-10 inline-flex items-center gap-4">
          CONTACT US
        </Link>
      </div>
    </div>
  );
}
