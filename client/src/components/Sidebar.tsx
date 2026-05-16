"use client";

import Link from 'next/link';
import { PencilLine, Radio, GlobeLock, CheckCircle, FileText, Lightbulb } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar({ 
  activeTab, 
  onTabChange 
}: { 
  activeTab: string; 
  onTabChange?: (tab: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleDashboardTabClick = (tab: string) => {
    if (pathname === '/dashboard' && onTabChange) {
      onTabChange(tab);
    } else {
      router.push(`/dashboard?action=${tab === 'WRITE' ? 'write' : 'feed'}`);
    }
  };

  return (
    <aside className="w-full lg:w-28 flex lg:flex-col justify-between lg:justify-start gap-4 lg:gap-8 border-[6px] border-black bg-[#ffeb3b] p-4 lg:py-8 lg:px-4 shadow-[8px_8px_0_0_#000] mb-8 lg:mb-0 lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto z-20 overflow-x-auto hide-scrollbar pb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <button 
        onClick={() => handleDashboardTabClick("FEED")} 
        className={`p-3 md:p-4 border-[4px] border-black flex justify-center items-center hover-target transition-all shrink-0 cursor-pointer ${activeTab === 'FEED' ? 'bg-black text-white shadow-none translate-x-1 translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#ff7d85] hover:bg-black hover:text-white'}`}
        title="Intercept Feed (Dashboard)"
      >
         <Radio size={38} />
      </button>
      <button 
        onClick={() => handleDashboardTabClick("WRITE")} 
        className={`p-3 md:p-4 border-[4px] border-black flex justify-center items-center hover-target transition-all shrink-0 cursor-pointer ${activeTab === 'WRITE' ? 'bg-[#ff7d85] text-black shadow-none translate-x-1 translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#60a5fa] hover:bg-[#ff7d85]'}`}
        title="Transmit Order (Write)"
      >
         <PencilLine size={38} />
      </button>
      <Link 
        href="/my-writings"
        className={`p-3 md:p-4 border-[4px] border-black flex justify-center items-center hover-target transition-all shrink-0 ${activeTab === 'MY_WRITINGS' ? 'bg-[#60a5fa] text-black shadow-none translate-x-1 translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#000] hover:bg-[#60a5fa]'}`}
        title="My Transmissions (Writings)"
      >
         <FileText size={38} />
      </Link>
      <Link 
        href="/prompts"
        className={`p-3 md:p-4 border-[4px] border-black flex justify-center items-center hover-target transition-all shrink-0 ${activeTab === 'PROMPTS' ? 'bg-[#ff7d85] text-black shadow-none translate-x-1 translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#000] hover:bg-[#ff7d85]'}`}
        title="Directive Prompts (Ideas)"
      >
         <Lightbulb size={38} />
      </Link>
      <Link 
        href="/guidelines"
        className={`p-3 md:p-4 border-[4px] border-black flex justify-center items-center hover-target transition-all shrink-0 ${activeTab === 'GUIDELINES' ? 'bg-[#ffeb3b] text-black shadow-none translate-x-1 translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white'}`}
        title="Mission Directives (Guidelines)"
      >
         <GlobeLock size={38} />
      </Link>
      <Link 
        href="/peer-review"
        className={`p-3 md:p-4 border-[4px] border-black flex justify-center items-center hover-target transition-all shrink-0 ${activeTab === 'PEER_REVIEW' ? 'bg-black text-white shadow-none translate-x-1 translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white'}`}
        title="Peer Evaluation (Review Protocol)"
      >
         <CheckCircle size={38} />
      </Link>
    </aside>
  );
}
