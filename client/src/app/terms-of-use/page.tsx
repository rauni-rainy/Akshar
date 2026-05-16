"use client";

import Link from "next/link";
import { ScrollText } from "lucide-react";

export default function TermsOfUsePage() {
  const sections = [
    {
      title: "1. ACCEPTANCE OF TERMS",
      content: `By creating an account on Akshar, you agree to these Terms of Use. If you disagree with any part of these terms, you may not use the platform. These terms apply to all users, contributors, and visitors of the Akshar platform.`,
    },
    {
      title: "2. ACCOUNT RESPONSIBILITIES",
      content: `You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately at writer.raunak@gmail.com of any unauthorized access. Akshar will not be liable for losses resulting from unauthorized use of your account due to your failure to secure your credentials.`,
    },
    {
      title: "3. PERMITTED CONTENT",
      content: `Akshar is a platform for original literary expression — articles, stories, essays, and poetry. You may publish works that are entirely your own original creation. You may include external references and quotations if properly attributed. Fan fiction and derivative works may be published if clearly labeled.`,
    },
    {
      title: "4. PROHIBITED CONTENT & CONDUCT",
      content: `The following are capital offenses on Akshar and will result in permanent deactivation: Publishing AI-generated content as your own work. Plagiarizing any other author's work. Publishing hate speech, harassment, threats, or illegal content. Creating fake accounts or impersonating others. Attempting to scrape or systematically access platform data.`,
    },
    {
      title: "5. CONTENT LICENSE",
      content: `By publishing on Akshar, you grant us a non-exclusive, royalty-free license to display, archive, and feature your work on the platform and in our Annual Anthology (with your consent). You retain full copyright and intellectual ownership of all content you publish.`,
    },
    {
      title: "6. PEER REVIEW STANDARDS",
      content: `Participation in the peer review system requires good-faith intellectual engagement. Reviews must be substantive and constructive. Deliberately malicious, bad-faith, or discriminatory reviews will result in account suspension.`,
    },
    {
      title: "7. PLATFORM AVAILABILITY",
      content: `Akshar is provided as-is, without warranty of continuous availability. This is a beta platform run by a student initiative. Downtime, bugs, and data loss, while regrettable, are possible. We are not liable for losses resulting from platform unavailability.`,
    },
    {
      title: "8. TERMINATION",
      content: `You may delete your account at any time. Akshar reserves the right to suspend or terminate accounts that violate these terms without prior notice. Upon termination, your published content may be archived for compliance purposes but will not be publicly visible.`,
    },
    {
      title: "9. GOVERNING LAW",
      content: `These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in West Bengal.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="brutal-box bg-[#ff7d85] p-10 md:p-14 border-[6px] border-black shadow-[12px_12px_0_0_#000] flex items-center gap-8 relative rotate-1 hover:rotate-0 transition-transform overflow-hidden">
        <ScrollText size={200} className="absolute right-0 bottom-0 opacity-10" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-heading)] uppercase leading-none mb-4">TERMS OF USE</h1>
          <p className="text-gray-900 font-bold text-lg">Last updated: April 2026</p>
          <p className="text-lg font-bold mt-4 border-l-4 border-black pl-4 max-w-xl">
            Read this before you write. By using Akshar, you agree to these rules. They protect you, the platform, and the writers who trust it.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((s, i) => (
          <div key={i} className={`brutal-box p-8 border-[6px] border-black shadow-[6px_6px_0_0_#000] ${i % 2 === 0 ? "bg-white" : "bg-[#fffdf5]"}`}>
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-heading)] uppercase mb-4 border-b-4 border-black pb-3 text-[#ff7d85]">{s.title}</h2>
            <p className="text-lg font-bold leading-relaxed text-gray-800">{s.content}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        <Link href="/privacy-policy" className="brutal-btn bg-[#60a5fa] text-xl py-4 px-10">
          PRIVACY POLICY
        </Link>
        <Link href="/contact" className="brutal-btn bg-black text-white text-xl py-4 px-10">
          CONTACT US
        </Link>
      </div>
    </div>
  );
}
