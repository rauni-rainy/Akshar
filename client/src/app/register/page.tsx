"use client";

import { useState } from "react";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
  const [realName, setRealName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [googleCredential, setGoogleCredential] = useState("");
  const [isGoogleFlow, setIsGoogleFlow] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isGoogleFlow) {
        const res = await fetch("http://localhost:5000/api/auth/google/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: googleCredential, realName, displayName, dob })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Google Registration failed");
        
        localStorage.setItem("akshar_token", data.token);
        localStorage.setItem("akshar_user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      } else {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ realName, displayName, dob, email, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Registration failed");
        window.location.href = "/login";
      }
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
        setIsGoogleFlow(true);
        setGoogleCredential(cred);
        if (data.defaultName) {
           setRealName(data.defaultName);
           setDisplayName(data.defaultName);
        }
      } else if (res.ok) {
        localStorage.setItem("akshar_token", data.token);
        localStorage.setItem("akshar_user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      } else {
        throw new Error(data.error || "Google Auth failed");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative flex-col">
      <div className="brutal-box w-full max-w-xl p-8 md:p-12 bg-[#60a5fa] rotate-1 hover:-rotate-1 transition-transform shadow-[16px_16px_0_0_#000]">
        <div className="mb-10 pb-6 bg-white px-6 pt-6 transform -rotate-2 border-4 border-black shadow-[6px_6px_0_0_#ffeb3b]">
          <h1 className="text-6xl md:text-7xl font-[family-name:var(--font-heading)] uppercase mb-2 leading-none">
            {isGoogleFlow ? "COMPLETE PROFILE." : "JOIN THE HORIZON."}
          </h1>
          <p className="text-2xl font-bold uppercase text-gray-800 tracking-widest">
            {isGoogleFlow ? "Almost there." : "Write without limits."}
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-[#ff7d85] border-4 border-black font-bold uppercase text-2xl shadow-[6px_6px_0_0_#000] rotate-1">
            {error}
          </div>
        )}

        {!isGoogleFlow && (
          <div className="mb-8 flex justify-center bg-white p-4 border-4 border-black shadow-[6px_6px_0_0_#000]">
            <GoogleLogin
               onSuccess={handleGoogleSuccess}
               onError={() => setError("Google Login Failed")}
               useOneTap
            />
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="bg-white p-6 border-4 border-black shadow-[6px_6px_0_0_#000]">
            <label className="block text-3xl font-[family-name:var(--font-heading)] uppercase mb-3">REAL NAME</label>
            <input 
              type="text" 
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
              className="brutal-input hover-target text-xl"
              placeholder="JANE DOE"
              required
            />
          </div>

          <div className="bg-white p-6 border-4 border-black shadow-[6px_6px_0_0_#000]">
            <label className="block text-3xl font-[family-name:var(--font-heading)] uppercase mb-3">DISPLAY NAME</label>
            <input 
              type="text" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="brutal-input hover-target text-xl"
              placeholder="JANE_WRITES"
              required
            />
          </div>

          <div className="bg-white p-6 border-4 border-black shadow-[6px_6px_0_0_#000]">
            <label className="block text-3xl font-[family-name:var(--font-heading)] uppercase mb-3">DATE OF BIRTH</label>
            <input 
              type="date" 
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="brutal-input hover-target text-xl"
              required
            />
          </div>

          {!isGoogleFlow && (
            <>
              <div className="bg-white p-6 border-4 border-black shadow-[6px_6px_0_0_#000]">
                <label className="block text-3xl font-[family-name:var(--font-heading)] uppercase mb-3">EMAIL</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="brutal-input hover-target text-xl"
                  placeholder="YOU@EXAMPLE.COM"
                  required
                />
              </div>
              
              <div className="bg-white p-6 border-4 border-black shadow-[6px_6px_0_0_#000]">
                <label className="block text-3xl font-[family-name:var(--font-heading)] uppercase mb-3">PASSWORD</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="brutal-input hover-target text-xl"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </>
          )}

          <button type="submit" className="brutal-btn w-full text-4xl py-6 mt-8 bg-[#ffeb3b] hover-target shadow-[8px_8px_0_0_#000]">
            {isGoogleFlow ? "FINALIZE IDENTIFICATION" : "INITIALIZE NEW ACCOUNT"}
          </button>
        </form>

        {!isGoogleFlow && (
          <div className="mt-12 pt-8 text-center">
            <p className="font-bold text-2xl uppercase bg-black text-white p-6 border-4 border-white shadow-[8px_8px_0_0_#ff7d85] transform rotate-1">
              ALREADY IN THE SYSTEM? <br/><br/>
              <Link href="/login" className="bg-[#ff7d85] text-black px-6 py-3 border-[5px] border-black transition-all hover-target block mx-auto w-max hover:bg-white">
                LOG IN &rarr;
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
