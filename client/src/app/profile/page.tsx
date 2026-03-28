"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("akshar_token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/users/me", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to load profile");
      
      setProfile(data);
      setBioText(data.bio || "");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updates: { bio?: string, avatar?: string }) => {
    try {
      const token = localStorage.getItem("akshar_token");
      const res = await fetch("http://localhost:5000/api/users/me", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");
      
      setProfile({ ...profile, ...data.user });
      
      // Update local storage user reference if components rely on it
      const currentLocalStorage = JSON.parse(localStorage.getItem("akshar_user") || "{}");
      localStorage.setItem("akshar_user", JSON.stringify({ ...currentLocalStorage, ...data.user }));
      
      setIsEditingBio(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image too large. Max 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdate({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <h1 className="text-7xl font-[family-name:var(--font-heading)] text-black animate-pulse">DECRYPTING IDENTITY...</h1>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="brutal-box bg-[#ff7d85] p-8 -rotate-2">
          <h1 className="text-5xl font-[family-name:var(--font-heading)] uppercase mb-4">ACCESS DENIED</h1>
          <p className="text-2xl font-bold bg-white inline-block px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_0_#000]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex flex-col md:flex-row gap-8 p-4 md:p-12 relative w-full max-w-7xl mx-auto">
      
      {/* Left Sidebar - Identify */}
      <div className="w-full md:w-1/3 xl:w-1/4 h-fit mb-8 md:mb-0 md:sticky md:top-28">
        <div className="brutal-box bg-[#60a5fa] p-4 md:p-6 shadow-[8px_8px_0_0_#000] md:shadow-[12px_12px_0_0_#000] rotate-0 md:rotate-1 hover:rotate-0 transition-transform z-10 flex flex-col items-center md:items-stretch">
           
           <div 
             className="relative group cursor-pointer w-40 h-40 md:w-48 md:h-48 mx-auto mb-6 md:mb-8 border-[4px] md:border-[6px] border-black bg-white shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000] overflow-hidden rounded-full md:rounded-none" 
             onClick={() => fileInputRef.current?.click()}
             title="Change Profile Picture"
           >
              {profile.avatar ? (
                <img src={profile.avatar} className="w-full h-full object-cover" alt="Profile avatar" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl font-black font-[family-name:var(--font-heading)]">
                  {profile.displayName.charAt(0)}
                </div>
              )}
              <div className="absolute inset-0 bg-black/80 text-[#ffeb3b] text-xl font-bold font-[family-name:var(--font-heading)] tracking-widest opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-center uppercase p-2">
                UPLOAD <br/> IMAGE SCAN
              </div>
           </div>
           <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleAvatarChange} />
           
           <div className="w-full bg-white p-4 border-4 border-black mb-6 shadow-[4px_4px_0_0_#000] rotate-0 md:-rotate-2 text-center">
             <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] uppercase">{profile.displayName}</h1>
             <p className="text-xs md:text-sm font-bold uppercase mt-2 text-gray-600 tracking-wider">
                MEMBER SINCE {new Date(profile.createdAt).toLocaleDateString()}
             </p>
             <div className="mt-4 flex flex-wrap justify-center gap-2 md:gap-4 text-[10px] md:text-xs font-black text-black">
                 <span>FOLLOWING: 136</span> | <span>FOLLOWERS: 137</span> | <span>LIKES: 65</span>
             </div>
           </div>
           
           <div className="w-full p-4 mb-6 border-y-[4px] border-l-0 md:border-y-0 md:border-l-[6px] border-black bg-[#f8fafc] text-center md:text-left">
             <p className="text-sm md:text-lg font-black uppercase mb-1">LEGAL NAME (REDACTED):</p>
             <p className="text-xl md:text-2xl font-bold blur-sm hover:blur-none transition-all select-none cursor-help bg-black text-white px-2 inline-block">
               {profile.realName}
             </p>
           </div>

           <div className="w-full bg-[#ffeb3b] p-4 border-4 border-black shadow-[4px_4px_0_0_#000] rotate-0 md:rotate-1">
              <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-2">
                 <h3 className="font-bold text-2xl font-[family-name:var(--font-heading)] uppercase">ABOUT DIRECTIVE</h3>
                 <button onClick={() => isEditingBio ? handleUpdate({ bio: bioText }) : setIsEditingBio(true)} className="font-bold uppercase text-xs hover:underline decoration-2 underline-offset-4 bg-white px-2 py-1 border-2 border-black">
                   {isEditingBio ? "SAVE" : "EDIT"}
                 </button>
              </div>
              
              {isEditingBio ? (
                 <div>
                    <textarea 
                      value={bioText} 
                      onChange={e => setBioText(e.target.value)} 
                      className="brutal-input w-full min-h-[120px] text-lg font-bold resize-none" 
                      placeholder="Enter your transmission..."
                    />
                 </div>
              ) : (
                 <p className="text-lg whitespace-pre-wrap font-bold leading-relaxed">
                   {profile.bio || "NO INTEL PROVIDED BY OPERATIVE."}
                 </p>
              )}
           </div>
        </div>
      </div>

      {/* Right Content - Feed */}
      <div className="w-full md:w-2/3 xl:w-3/4 mt-8 md:mt-0">
         <div className="flex gap-4 mb-8 overflow-x-auto pb-4 hide-scrollbar">
            <div className="brutal-btn bg-[#ff7d85] text-xl md:text-3xl py-3 px-6 shadow-[6px_6px_0_0_#000] -rotate-1 whitespace-nowrap">
              PUBLISHED PIECES ({profile.posts?.length || 0})
            </div>
            <div className="brutal-btn bg-white text-xl md:text-3xl py-3 px-6 opacity-60 cursor-not-allowed hidden md:block border-dashed border-4 whitespace-nowrap border-black hover:translate-y-0 hover:translate-x-0 group">
              <span className="group-hover:hidden">PEER REVIEW (0)</span>
              <span className="hidden group-hover:block text-black">CLASSIFIED</span>
            </div>
         </div>

         <div className="space-y-8">
            {profile.posts?.length > 0 ? (
               profile.posts.map((post: any) => (
                 <div key={post.id} className="bg-[#fffdf5] p-6 md:p-8 border-[6px] border-black shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:translate-x-2 hover:shadow-none transition-all group">
                    <div className="flex justify-between items-start flex-col sm:flex-row gap-4 mb-4">
                      <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] uppercase leading-none group-hover:text-[#60a5fa] transition-colors">{post.title}</h2>
                      <span className="font-bold border-[3px] border-black px-3 py-1 bg-[#ffeb3b] shadow-[2px_2px_0_0_#000] whitespace-nowrap text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-xl line-clamp-3 mb-6 font-medium leading-relaxed border-l-4 border-[#ff7d85] pl-4">{post.content}</p>
                    
                    <div className="flex gap-4">
                      <div className="font-bold uppercase text-sm border-2 border-black inline-block px-2 py-1 bg-white">
                        {post.type}
                      </div>
                    </div>
                 </div>
               ))
            ) : (
               <div className="brutal-box p-12 bg-white text-center border-dashed border-8 border-gray-300 shadow-none">
                  <h2 className="text-5xl font-[family-name:var(--font-heading)] text-gray-400">NO TRANSMISSIONS DETECTED.</h2>
                  <p className="text-xl font-bold mt-4 text-gray-500">INITIATE A NEW DIRECTIVE FROM YOUR DASHBOARD.</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
