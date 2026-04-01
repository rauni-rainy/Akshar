"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ContentRenderer from "../../components/ContentRenderer";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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

  // Helper macro to render badges logically
  const renderBadge = (name: string, level: number, colorClass: string) => {
      const active = level > 0;
      return (
         <div className={`p-2 border-2 border-black flex flex-col items-center justify-center text-center ${active ? colorClass : 'bg-gray-200 opacity-50'}`}>
            <span className="text-[10px] md:text-xs leading-none">{name}</span>
            {active && <span className="text-black bg-white border-2 border-black px-1 mt-1 rounded-full text-[10px]">L{level}</span>}
         </div>
      );
  };

  return (
    <div className="min-h-[85vh] p-4 md:p-8 relative w-full max-w-7xl mx-auto flex flex-col gap-6">

      {/* TOP HEADER BANNER */}
      <div className="w-full bg-[#f8fafc] border-[6px] border-black shadow-[8px_8px_0_0_#000] p-6 flex flex-col md:flex-row items-center md:items-start gap-8 z-10 transition-transform hover:-translate-y-1">
         
         {/* Avatar Configurator */}
         <div 
           className="relative group cursor-pointer flex-shrink-0 w-32 h-32 md:w-40 md:h-40 border-[4px] border-black bg-white shadow-[4px_4px_0_0_#ffeb3b] rounded-full overflow-hidden flex items-center justify-center transition-all hover:scale-105"
           onClick={() => fileInputRef.current?.click()}
           title="Change Profile Picture"
         >
            {profile.avatar ? (
              <img src={profile.avatar} className="w-full h-full object-cover" alt="Profile avatar" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-7xl font-black font-[family-name:var(--font-heading)] bg-[#60a5fa] text-white">
                {profile.displayName.charAt(0)}
              </div>
            )}
            <div className="absolute inset-0 bg-black/80 text-[#ffeb3b] text-xl font-bold font-[family-name:var(--font-heading)] tracking-widest opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-center uppercase p-2">
              UPLOAD <br/> IMAGE SCAN
            </div>
         </div>
         <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleAvatarChange} />

         {/* Info Block */}
         <div className="flex-1 w-full flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
            <div className="space-y-4">
               <div>
                 <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] uppercase inline-block">{profile.displayName}</h1>
               </div>
               
               <p className="font-bold text-gray-700 tracking-wider">
                  MEMBER SINCE {new Date(profile.createdAt).toLocaleDateString()}
               </p>

               <div className="flex flex-wrap justify-center md:justify-start gap-4 font-black text-sm md:text-base border-t-4 border-black pt-4 inline-flex">
                   <span className="text-gray-800">Following: <span className="text-black">{profile.stats?.following || 0}</span></span>
                   <span className="text-gray-400">|</span>
                   <span className="text-gray-800">Followers: <span className="text-black">{profile.stats?.followers || 0}</span></span>
                   <span className="text-gray-400">|</span>
                   <span className="text-gray-800">Likes: <span className="text-[#ff7d85]">{profile.stats?.totalLikesReceived || 0}</span></span>
               </div>
            </div>

            {/* Private Metrics */}
            <div className="mt-6 md:mt-0 flex flex-col items-center md:items-end flex-shrink-0">
               <p className="text-xs font-black uppercase mb-1 tracking-widest text-gray-500">Legal Name (Redacted)</p>
               <p className="text-xl md:text-2xl font-bold blur-md hover:blur-none transition-all select-none cursor-help bg-black text-white px-3 py-1 inline-block">
                 {profile.realName}
               </p>
            </div>
         </div>
      </div>

      {/* LOWER SPLIT VIEW */}
      <div className="flex flex-col md:flex-row gap-6">

        {/* LEFT SIDEBAR - About Me */}
        <div className="w-full md:w-1/4 flex-shrink-0">
           <div className="w-full bg-[#fffdf5] p-6 border-[6px] border-black shadow-[6px_6px_0_0_#000] h-full sticky top-28">
              <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-2">
                 <h3 className="font-bold text-2xl font-[family-name:var(--font-heading)] uppercase">About Me</h3>
                 <button onClick={() => isEditingBio ? handleUpdate({ bio: bioText }) : setIsEditingBio(true)} className="font-bold uppercase text-xs hover:underline decoration-2 underline-offset-4 bg-white px-2 py-1 border-2 border-black hover:bg-[#ffeb3b]">
                   {isEditingBio ? "SAVE" : "EDIT"}
                 </button>
              </div>
              
              {isEditingBio ? (
                 <div className="mt-4">
                    <textarea 
                      value={bioText} 
                      onChange={e => setBioText(e.target.value)} 
                      maxLength={800}
                      className="brutal-input w-full min-h-[160px] text-base font-bold resize-none" 
                      placeholder="Enter your transmission..."
                    />
                    <div className={`text-right text-xs font-black tracking-widest mt-1 uppercase ${bioText.length >= 800 ? 'text-red-500' : 'text-gray-600'}`}>
                       {bioText.length} / 800
                    </div>
                 </div>
              ) : (
                 <p className="text-base whitespace-pre-wrap font-bold leading-relaxed text-gray-800">
                   {profile.bio || "NO INTEL PROVIDED BY OPERATIVE."}
                 </p>
              )}
           </div>
        </div>

        {/* RIGHT MAIN BODY */}
        <div className="flex-1 w-full space-y-6">

           {/* Badges Panel */}
           <div className="w-full bg-white p-6 border-[6px] border-black shadow-[6px_6px_0_0_#ff7d85]">
               <h3 className="font-[family-name:var(--font-heading)] text-2xl uppercase mb-4 text-black">
                  Badges
               </h3>
               {/* Horizontal flex layout for badges */}
               <div className="flex flex-row flex-wrap gap-4 font-black tracking-widest uppercase items-center">
                  {renderBadge("SIGNAL CASTER", profile.stats?.badges?.signalCaster || 0, "bg-[#ffeb3b]")}
                  {renderBadge("DATA SIPHON", profile.stats?.badges?.dataSiphon || 0, "bg-[#ff7d85]")}
                  {renderBadge("INFILTRATOR", profile.stats?.badges?.networkInfiltrator || 0, "bg-[#60a5fa]")}
                  {renderBadge("INTERROGATOR", profile.stats?.badges?.chiefInterrogator || 0, "bg-green-400")}
               </div>
           </div>

           {/* Tabs and Search Bar Mock (Layout Inspiration) */}
           <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-2 border-[4px] border-black shadow-[4px_4px_0_0_#000]">
               <div className="flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar">
                  <div className="brutal-btn bg-[#a7f3d0] text-lg py-2 px-6 shadow-none border-[3px] rounded-full whitespace-nowrap">
                    Published Pieces ({profile.posts?.length || 0})
                  </div>
                  <div className="brutal-btn bg-white text-lg py-2 px-6 shadow-none border-[3px] rounded-full opacity-60 cursor-not-allowed whitespace-nowrap">
                    Peer Review (0)
                  </div>
                  <div className="brutal-btn bg-white text-lg py-2 px-6 shadow-none border-[3px] rounded-full opacity-60 cursor-not-allowed whitespace-nowrap">
                    Collections (0)
                  </div>
               </div>
               
               <div className="w-full md:w-auto flex-shrink-0 relative">
                  <input type="text" placeholder="Search by Title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-64 border-2 border-gray-300 rounded-full py-2 px-4 outline-none font-bold text-sm bg-gray-50 focus:border-black focus:ring-black text-black" />
               </div>
           </div>

           {/* Feed */}
           <div className="space-y-6">
              {profile.posts?.filter((p: any) => p.title.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 ? (
                 profile.posts.filter((p: any) => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map((post: any) => (
                   <div key={post.id} className="block bg-white p-6 md:p-8 border-[2px] border-gray-300 rounded-xl shadow-sm hover:border-black hover:shadow-[4px_4px_0_0_#000] transition-all group relative">
                      <div className="flex justify-between items-start flex-col md:flex-row gap-4 mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden border-2 border-black">
                              {profile.avatar ? <img src={profile.avatar} className="object-cover w-full h-full" alt="avatar"/> : null}
                           </div>
                           <div>
                              <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-heading)] text-emerald-900 group-hover:text-emerald-700 transition-colors drop-shadow-sm leading-tight">{post.title}</h2>
                              <span className="text-xs font-bold text-gray-500">{profile.displayName}</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1 border border-gray-300 rounded-full px-2 py-1 shadow-sm"><span className="text-yellow-500">★</span> 0</span>
                        </div>
                      </div>
                      
                      <ContentRenderer 
                        content={post.content} 
                        className="text-lg md:text-xl mb-6 font-serif italic text-gray-800 leading-relaxed max-w-4xl opacity-90" 
                        truncate={true}
                        maxLength={200}
                      />
                      
                      <div className="mt-8 pt-4 border-t-2 border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex flex-col gap-2">
                            <span className="font-bold text-xs text-gray-500 uppercase tracking-widest">Prompt: {post.prompt || "FREE WRITING"}</span>
                            <div className="flex flex-wrap gap-2 text-xs font-bold">
                               <span className="border border-green-700 text-green-800 px-3 py-1 bg-white rounded-sm">{post.type}</span>
                            </div>
                        </div>

                        <Link href={`/post/${post.id}`} className="self-end border-2 border-gray-600 text-gray-700 rounded-full px-6 py-2 uppercase font-bold text-xs hover:bg-emerald-50 hover:border-emerald-700 hover:text-emerald-800 transition-colors whitespace-nowrap">
                          Read More and Write a Review &rarr;
                        </Link>
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
    </div>
  );
}
