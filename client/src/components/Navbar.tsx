"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("akshar_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data from local storage");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("akshar_user");
    localStorage.removeItem("akshar_token");
    window.location.href = "/";
  };

  return (
    <nav className="border-b-[6px] border-[var(--border-color)] bg-[var(--bg-accent)] sticky top-0 z-50">
      <div className="w-full flex items-center justify-between py-3 px-4 md:py-4 md:px-12">
        <Link 
          href="/" 
          className="text-5xl md:text-6xl font-[family-name:var(--font-heading)] font-black tracking-wider hover:text-[var(--bg-pink)] transition-colors glitch-hover"
          data-text="AKSHAR"
        >
          AKSHAR.
        </Link>
        <div className="flex gap-2 md:gap-4 items-center min-h-[48px] md:min-h-[64px]">
          {mounted && (
            user ? (
              <div className="flex items-center gap-4">
                <NotificationBell />
                <Link 
                  href="/profile" 
                  className="flex items-center justify-center border-[4px] border-black bg-white w-12 h-12 md:w-16 md:h-16 shadow-[2px_2px_0_0_#000] md:shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all overflow-hidden relative group"
                  title="Profile"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt="PFP" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-2xl md:text-3xl font-[family-name:var(--font-heading)] group-hover:text-[#ff7d85] transition-colors">
                      {user.displayName?.charAt(0) || user.realName?.charAt(0) || "U"}
                    </span>
                  )}
                </Link>
                <button onClick={handleLogout} className="font-bold text-sm md:text-lg hover:underline underline-offset-4 decoration-2 bg-[#ff7d85] px-3 py-1 md:px-4 md:py-2 border-[4px] border-black shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all uppercase">
                  EXIT
                </button>
              </div>
            ) : (
              <div className="flex gap-2 md:gap-8 items-center">
                <Link href="/login" className="font-bold text-sm md:text-xl hover:underline underline-offset-8 decoration-4 bg-white px-3 py-2 md:px-6 md:py-2 border-[4px] border-black shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">LOG IN</Link>
                <Link href="/register" className="brutal-btn text-sm md:text-xl py-2 px-3 md:px-6">START</Link>
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
