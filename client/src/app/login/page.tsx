"use client";

import { useState } from "react";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Login fell through");

      localStorage.setItem("akshar_token", data.token);
      localStorage.setItem("akshar_user", JSON.stringify(data.user));
      
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const cred = credentialResponse.credential;
    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: cred })
      });
      const data = await res.json();
      
      if (res.status === 206) {
         setError("Account not fully registered. Redirecting to ENLIST...");
         setTimeout(() => {
            window.location.href = "/register";
         }, 2000);
      } else if (res.ok) {
        localStorage.setItem("akshar_token", data.token);
        localStorage.setItem("akshar_user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      } else {
        throw new Error(data.error || "Google Login failed");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-20 left-10 brutal-box bg-[#ff7d85] p-4 rotate-12 hidden lg:block z-0">
        <h2 className="font-[family-name:var(--font-heading)] text-5xl">RESTRICTED</h2>
      </div>
      
      <div className="brutal-box w-full max-w-lg p-8 md:p-12 bg-[#fffdf5] -rotate-1 hover:rotate-0 transition-transform z-10">
        <div className="mb-10 border-b-[6px] border-black pb-6">
          <h1 className="text-7xl font-[family-name:var(--font-heading)] uppercase mb-2">IDENTIFY.</h1>
          <p className="text-xl font-bold uppercase text-gray-700 bg-[#ffeb3b] inline-block px-3 py-1 border-2 border-black transform -rotate-1 shadow-[2px_2px_0_0_#000]">Access your dashboard.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-[#ff7d85] border-4 border-black font-bold uppercase text-xl rotate-1 flex items-center justify-center shadow-[4px_4px_0_0_#000]">
            {error}
          </div>
        )}

        <div className="mb-8 flex justify-center bg-white p-4 border-4 border-black shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:translate-x-1 transition-transform">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Google Login Failed")}
          />
        </div>

        <div className="text-center font-[family-name:var(--font-heading)] text-2xl mb-6">OR</div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label className="block text-3xl font-[family-name:var(--font-heading)] uppercase mb-3">EMAIL</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="brutal-input text-2xl hover-target"
              placeholder="YOU@REBEL.COM"
              required
            />
          </div>
          
          <div>
            <label className="block text-3xl font-[family-name:var(--font-heading)] uppercase mb-3">PASSWORD</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="brutal-input text-2xl hover-target"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="brutal-btn w-full text-3xl py-5 mt-6 hover-target">
            ENTER SYSTEM
          </button>
        </form>

        <div className="mt-12 pt-8 border-t-[6px] border-black text-center">
          <p className="font-bold text-xl uppercase bg-black text-white p-4">
            NO ACCOUNT? <br/><br/><Link href="/register" className="text-[#ffeb3b] hover:bg-[#ffeb3b] hover:text-black px-4 py-2 border-4 border-transparent hover:border-black transition-all hover-target block mt-2 shadow-[4px_4px_0_0_#ff7d85]">ENLIST HERE &rarr;</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
