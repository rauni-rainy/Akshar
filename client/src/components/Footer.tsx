import Link from "next/link";
import { Twitter, Instagram, Facebook, Linkedin, Github, Award, FlaskConical } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full pt-16 md:pt-24 pb-8 md:pb-12 px-4 md:px-12 shadow-[inset_0_10px_0_0_#ff7d85] md:shadow-[inset_0_20px_0_0_#ff7d85] overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 border-b-[6px] md:border-b-8 border-white pb-12 md:pb-16">
          {/* Left Col: Brand & Copyright */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col justify-between">
            <div>
              <h1 className="text-[5rem] md:text-[9rem] font-[family-name:var(--font-heading)] text-white uppercase leading-none mb-4 md:mb-6 tracking-tighter mix-blend-exclusion hover:text-[#ffeb3b] transition-colors cursor-crosshair">
                AKSHAR.
              </h1>
              <p className="text-lg md:text-2xl font-bold max-w-sm border-l-4 md:border-l-8 border-[#60a5fa] pl-4 md:pl-6 py-2 mb-6 md:mb-8 bg-white/10">
                Copyright © 2026. The Akshar Initiative. All rights reserved.
              </p>
              {/* View All Badges shortcut */}
              <Link
                href="/profile"
                className="flex items-center gap-3 bg-white/10 hover:bg-[#ffeb3b] hover:text-black border-2 border-white/30 hover:border-black px-4 py-3 transition-all w-max mb-8 md:mb-10 group"
              >
                <Award size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-black text-sm uppercase tracking-widest">VIEW ALL BADGES</span>
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {[Twitter, Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="brutal-box bg-white text-black p-3 md:p-4 hover:bg-[#ffeb3b] hover:-translate-y-1 md:hover:-translate-y-2 hover-target transition-all border-[4px] md:border-[6px] border-transparent hover:border-black rounded-none shadow-[4px_4px_0_0_#ff7d85]">
                  <Icon size={24} className="md:w-9 md:h-9" strokeWidth={2.5} />
                </a>
              ))}
              <a href="https://github.com/rauni-rainy" target="_blank" rel="noopener noreferrer" className="brutal-box bg-white text-black p-3 md:p-4 hover:bg-[#ffeb3b] hover:-translate-y-1 md:hover:-translate-y-2 hover-target transition-all border-[4px] md:border-[6px] border-transparent hover:border-black rounded-none shadow-[4px_4px_0_0_#ff7d85]">
                <Github size={24} className="md:w-9 md:h-9" strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Right Col: Navigation Grid */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 text-lg md:text-xl font-bold uppercase tracking-widest">
            <div className="flex flex-col gap-4 md:gap-6">
              <h4 className="text-[#ff7d85] font-[family-name:var(--font-heading)] text-3xl md:text-4xl border-b-[4px] md:border-b-[6px] border-[#ff7d85] pb-2 inline-block w-max mb-1 md:mb-2">PLATFORM</h4>
              <Link href="/about" className="hover:text-[#ffeb3b] hover:translate-x-2 transition-transform hover-target w-max">ABOUT US</Link>
              <Link href="/newsroom" className="hover:text-[#ffeb3b] hover:translate-x-2 transition-transform hover-target w-max">NEWSROOM</Link>
              <Link href="/programs" className="hover:text-[#ffeb3b] hover:translate-x-2 transition-transform hover-target w-max">PROGRAMS</Link>
              <Link href="/resources" className="hover:text-[#ffeb3b] hover:translate-x-2 transition-transform hover-target w-max">RESOURCES</Link>
            </div>

            <div className="flex flex-col gap-4 md:gap-6">
              <h4 className="text-[#60a5fa] font-[family-name:var(--font-heading)] text-3xl md:text-4xl border-b-[4px] md:border-b-[6px] border-[#60a5fa] pb-2 inline-block w-max mb-1 md:mb-2">ENGAGE</h4>
              <Link href="/donate" className="hover:text-[#ffeb3b] hover:translate-x-2 transition-transform hover-target w-max">DONATE</Link>
              <Link href="/get-involved" className="hover:text-[#ffeb3b] hover:translate-x-2 transition-transform hover-target w-max">GET INVOLVED</Link>
              <Link href="/request-group" className="hover:text-[#ffeb3b] hover:translate-x-2 transition-transform hover-target w-max">REQUEST GROUP</Link>
              <Link href="/register" className="text-black bg-[#ffeb3b] hover:bg-white mt-4 md:mt-6 p-3 md:p-4 hover-target text-center border-4 border-black font-black shadow-[4px_4px_0_0_#fff]">SIGN UP NOW</Link>
            </div>

            <div className="flex flex-col gap-4 md:gap-6 sm:col-span-2 lg:col-span-1">
              <h4 className="text-[#ffeb3b] font-[family-name:var(--font-heading)] text-3xl md:text-4xl border-b-[4px] md:border-b-[6px] border-[#ffeb3b] pb-2 inline-block w-max mb-1 md:mb-2">LEGAL</h4>
              <Link href="/privacy-policy" className="hover:text-[#ffeb3b] hover:translate-x-2 transition-transform hover-target w-max">PRIVACY POLICY</Link>
              <Link href="/terms-of-use" className="hover:text-[#ffeb3b] hover:translate-x-2 transition-transform hover-target w-max">TERMS OF USE</Link>
              <Link href="/contact" className="hover:text-[#ffeb3b] hover:translate-x-2 transition-transform hover-target w-max">CONTACT US</Link>
              <Link href="/faq" className="hover:text-[#ffeb3b] hover:translate-x-2 transition-transform hover-target w-max">FAQ</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 font-bold uppercase tracking-widest text-[#a1a1aa]">
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            <p className="text-lg md:text-2xl text-white">DESIGNED OFF-GRID. CODED IN THE SHADOWS.</p>
            <p className="border-[3px] md:border-4 border-white/20 p-3 md:p-4 hover:border-white transition-colors cursor-crosshair text-sm md:text-base">
              NIT DURGAPUR - M.G. Avenue
            </p>
          </div>
          {/* Beta Badge — full width on mobile, centered */}
          <div className="flex items-center justify-center gap-3 bg-[#ff7d85]/20 border-2 border-[#ff7d85] px-5 py-3 w-full md:w-max">
            <FlaskConical size={20} className="text-[#ff7d85] shrink-0" />
            <div className="text-center md:text-left">
              <span className="text-[#ff7d85] font-black text-sm uppercase tracking-widest">BETA VERSION</span>
              <p className="text-xs text-gray-500 font-bold mt-0.5">Platform is actively in development</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
