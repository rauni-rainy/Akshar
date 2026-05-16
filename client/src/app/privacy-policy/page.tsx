"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. WHAT WE COLLECT",
      content: `When you register on Akshar, we collect your name (or chosen alias), email address, and any content you choose to publish. We also store your profile avatar if you upload one. We do not collect your device location, browsing history outside of Akshar, or any biometric data.`,
    },
    {
      title: "2. HOW WE USE YOUR DATA",
      content: `Your data is used exclusively to operate and improve the Akshar platform. This includes: displaying your profile and published works, sending you system updates if you have subscribed, and maintaining platform security. We do not sell, rent, or share your personal data with any third party for advertising or commercial purposes.`,
    },
    {
      title: "3. CONTENT OWNERSHIP",
      content: `All content you publish on Akshar remains your intellectual property. By publishing on the platform, you grant Akshar a non-exclusive, royalty-free license to display, archive, and promote your work within the platform ecosystem. You may request removal of your content at any time by contacting the editorial cell.`,
    },
    {
      title: "4. DATA STORAGE & SECURITY",
      content: `Your data is stored on secured cloud servers. Passwords are hashed using industry-standard cryptographic algorithms. We implement reasonable security measures including JWT-based authentication and encrypted transmission. No system is perfectly secure — if you discover a vulnerability, report it immediately to our engineering cell.`,
    },
    {
      title: "5. YOUR RIGHTS",
      content: `You have the right to access all data we hold about you. You may request correction or deletion of your personal data at any time. You may deactivate and permanently delete your account via the Contact Us page. Upon deletion, your personal data will be removed from active servers within 30 days.`,
    },
    {
      title: "6. COOKIES",
      content: `Akshar uses minimal session cookies to maintain your authentication state. We do not use advertising cookies or cross-site tracking. You may disable cookies in your browser, but this will prevent you from remaining logged in.`,
    },
    {
      title: "7. CHANGES TO THIS POLICY",
      content: `We may update this Privacy Policy. Changes will be announced via the Newsroom. Continued use of the platform after a policy update constitutes acceptance of the revised terms.`,
    },
    {
      title: "8. CONTACT",
      content: `For privacy-related inquiries, contact us at writer.raunak@gmail.com or use the Contact Us page.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="brutal-box bg-black text-white p-10 md:p-14 border-[6px] border-white shadow-[12px_12px_0_0_#60a5fa] flex items-center gap-8">
        <ShieldCheck size={80} className="text-[#60a5fa] flex-shrink-0 hidden md:block" />
        <div>
          <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-heading)] uppercase leading-none mb-4">PRIVACY POLICY</h1>
          <p className="text-gray-400 font-bold text-lg">Last updated: April 2026</p>
          <p className="text-lg font-bold text-gray-300 mt-4 border-l-4 border-[#60a5fa] pl-4">
            Akshar collects minimal data and will never sell it. Here is exactly what we do with what we know about you.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((s, i) => (
          <div key={i} className="brutal-box bg-white p-8 border-[6px] border-black shadow-[6px_6px_0_0_#000]">
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-heading)] uppercase mb-4 border-b-4 border-black pb-3 text-[#ff7d85]">{s.title}</h2>
            <p className="text-lg font-bold leading-relaxed text-gray-800">{s.content}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/contact" className="brutal-btn bg-[#60a5fa] text-xl py-4 px-10 inline-flex items-center gap-4">
          PRIVACY QUESTIONS? CONTACT US
        </Link>
      </div>
    </div>
  );
}
