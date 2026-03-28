"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PencilLine, SendHorizontal, Users, Trophy, Search, Flame, Skull, Zap, Radio, GlobeLock } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("FEED");

  // Write Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("ARTICLE");
  const [prompt, setPrompt] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("akshar_token");
    const storedUser = localStorage.getItem("akshar_user");
    if (!token || !storedUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
    fetchPosts();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts/feed");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const token = localStorage.getItem("akshar_token");
      const res = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const { liked } = await res.json();
        setPosts(posts.map(p => {
          if (p.id === postId) {
            const hasLiked = p.likes?.some((l: any) => l.userId === user?.id);
            let newLikes = p.likes || [];
            if (liked && !hasLiked) newLikes.push({ userId: user?.id });
            if (!liked && hasLiked) newLikes = newLikes.filter((l: any) => l.userId !== user?.id);
            return { ...p, likes: newLikes };
          }
          return p;
        }));
      }
    } catch (e) { 
      console.error(e); 
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("TRANSMITTING...");
    
    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    
    try {
      const token = localStorage.getItem("akshar_token");
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, type, published: true, prompt, tags: tagsArray })
      });

      if (!res.ok) throw new Error("TRANSMISSION FAILED.");
      
      setStatus("WORLD HAS RECEIVED YOUR MESSAGE.");
      setTimeout(() => {
        setTitle("");
        setContent("");
        setPrompt("");
        setTagsInput("");
        setStatus("");
        setActiveTab("FEED");
        fetchPosts();
      }, 2000);
    } catch (error: any) {
      setStatus(error.message);
    }
  };

  if (!user) return <div className="min-h-screen pt-32 text-center text-5xl font-[family-name:var(--font-heading)] uppercase animate-pulse">BOOTING SYSTEM...</div>;

  return (
    <div className="w-full max-w-[1700px] mx-auto px-4 md:px-8 mt-12 mb-24 lg:flex gap-10 sm:overflow-visible overflow-hidden">
      
      {/* LEFT SIDEBAR (NAV) */}
      <aside className="w-full lg:w-28 flex lg:flex-col justify-between lg:justify-start gap-4 lg:gap-8 border-[6px] border-black bg-[#ffeb3b] p-4 lg:py-8 lg:px-4 shadow-[8px_8px_0_0_#000] mb-8 lg:mb-0 lg:sticky top-28 h-max z-20">
        <button 
          onClick={() => setActiveTab("FEED")} 
          className={`p-3 md:p-4 border-[4px] border-black flex justify-center items-center hover-target transition-all cursor-pointer ${activeTab === 'FEED' ? 'bg-black text-white shadow-none translate-x-1 translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#ff7d85] hover:bg-black hover:text-white'}`}
          title="Intercept Feed"
        >
           <Radio size={32} />
        </button>
        <button 
          onClick={() => setActiveTab("WRITE")} 
          className={`p-3 md:p-4 border-[4px] border-black flex justify-center items-center hover-target transition-all cursor-pointer ${activeTab === 'WRITE' ? 'bg-[#ff7d85] text-black shadow-none translate-x-1 translate-y-1' : 'bg-white shadow-[4px_4px_0_0_#60a5fa] hover:bg-[#ff7d85]'}`}
          title="Transmit Order"
        >
           <PencilLine size={32} />
        </button>
        <button className="p-3 md:p-4 border-[4px] border-black bg-white shadow-[4px_4px_0_0_#ffeb3b] flex justify-center items-center hover:bg-[#60a5fa] hover-target transition-all hidden sm:flex cursor-not-allowed">
           <GlobeLock size={32} />
        </button>
        <button className="p-3 md:p-4 border-[4px] border-black bg-white shadow-[4px_4px_0_0_#ffeb3b] flex justify-center items-center hover:bg-black hover:text-white hover-target transition-all hidden sm:flex cursor-not-allowed">
           <Users size={32} />
        </button>
      </aside>

      {/* CENTER CONTENT */}
      <main className="flex-1 min-w-0">
        
        {/* Top Banner */}
        <div className="brutal-box bg-[#f8fafc] p-8 md:p-12 border-[6px] border-black flex items-center justify-between mb-12 relative z-10 shadow-[12px_12px_0_0_#000] overflow-hidden -rotate-1 hover:rotate-0 transition-transform">
          <div className="absolute -right-6 -top-12 opacity-5 text-black hidden sm:block">
             <Zap size={250} fill="currentColor" />
          </div>
          <div className="relative z-10 w-full flex justify-between items-center flex-wrap gap-8">
            <div>
              <h1 className="text-5xl md:text-[5rem] font-[family-name:var(--font-heading)] uppercase tracking-tight leading-none bg-black text-white inline-block px-4 py-2">
                WELCOME, {user.displayName}!
              </h1>
              <p className="text-lg md:text-2xl font-bold uppercase text-black bg-[#ffeb3b] px-4 py-2 border-4 border-black inline-block mt-4 shadow-[4px_4px_0_0_#000]">
                LEVEL 3 AGENT
              </p>
            </div>
            
            <div className="hidden lg:flex gap-6 items-center flex-wrap bg-white border-4 border-black p-4 shadow-[6px_6px_0_0_#000]">
              <div className="text-center px-4">
                 <span className="block text-4xl font-[family-name:var(--font-heading)] text-[#ff7d85]">{posts.filter(p => p.author?.id === user?.id).length || 0}</span>
                 <span className="text-xs font-black uppercase tracking-widest">WRITTEN</span>
              </div>
              <div className="text-center border-l-4 border-black px-4">
                 <span className="block text-4xl font-[family-name:var(--font-heading)] text-black">1</span>
                 <span className="text-xs font-black uppercase tracking-widest">REVIEWED</span>
              </div>
              <div className="text-center border-l-4 border-black px-4">
                 <span className="block text-4xl font-[family-name:var(--font-heading)] text-[#60a5fa]">1102</span>
                 <span className="text-xs font-black uppercase tracking-widest">READ</span>
              </div>
              <div className="text-center border-l-4 border-black px-4">
                 <span className="block text-4xl font-[family-name:var(--font-heading)] text-[#ffeb3b] -rotate-2">10</span>
                 <span className="text-xs font-black uppercase tracking-widest">COUNTRIES</span>
              </div>
            </div>
          </div>
        </div>

        {activeTab === 'FEED' ? (
          <div className="space-y-12">
            
            {/* Search Bar */}
            <div className="flex gap-4 relative z-20">
              <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 text-black pointer-events-none" />
                <input 
                  type="text" 
                  placeholder="SEARCH REBEL TRANSMISSIONS..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full brutal-input font-[family-name:var(--font-heading)] text-2xl md:text-4xl uppercase bg-[#f8fafc] border-[6px] border-black py-6 md:py-8 pl-20 md:pl-28 pr-6 hover-target shadow-[8px_8px_0_0_#000] focus:bg-white transition-colors placeholder-[#a1a1aa]"
                />
              </div>
            </div>

            {/* Feed List */}
            <div className="space-y-16 mt-16 px-2">
               {posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).map((post: any, i: number) => (
                  <article key={post.id} className={`brutal-box bg-white p-6 md:p-12 border-[6px] border-black shadow-[12px_12px_0_0_#000] relative transition-all duration-200`}>
                    
                    <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
                       <h3 className="text-4xl md:text-6xl font-[family-name:var(--font-heading)] uppercase leading-none max-w-2xl">{post.title}</h3>
                       <div className="flex items-center gap-2 font-black uppercase border-2 border-black p-2 bg-[#f8fafc]">
                          <Flame size={20} className={post.likes?.some((l: any) => l.userId === user?.id) ? 'fill-[#ff7d85] text-[#ff7d85]' : 'text-gray-400'} /> 
                          {post.likes?.length || 0} LIKES
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-8">
                       <Link href={`/user/${post.author?.id}`}>
                         {post.author?.avatar ? (
                           <img src={post.author.avatar} alt="PFP" className="w-16 h-16 object-cover border-2 border-black rounded-full hover:scale-110 transition-transform shadow-[2px_2px_0_0_#000]" />
                         ) : (
                           <div className="w-16 h-16 border-4 border-black bg-[#ffeb3b] text-xl font-black font-[family-name:var(--font-heading)] flex items-center justify-center rounded-full shadow-[2px_2px_0_0_#000] hover:scale-110 transition-transform">
                             {post.author?.displayName?.charAt(0) || "U"}
                           </div>
                         )}
                       </Link>
                       <div>
                         <p className="text-black font-black text-xl md:text-2xl">
                           <Link href={`/user/${post.author?.id}`} className="hover:underline hover:text-[#60a5fa] transition-colors">{post.author?.displayName || "CLASSIFIED"}</Link> 
                           <span className="text-[#ff7d85] ml-2 font-bold tracking-widest text-sm align-middle">({post.author?.country || "Earth"})</span>
                         </p>
                         <p className="font-bold text-gray-500 uppercase mt-1 tracking-widest text-xs border-l-4 border-black pl-2">
                           LOGGED: {new Date(post.createdAt).toLocaleDateString()}
                         </p>
                       </div>
                    </div>

                    <p className="text-xl md:text-2xl font-medium leading-relaxed bg-[#fffdf5] p-6 border-[4px] border-black mb-8 whitespace-pre-wrap">
                      {post.content.length > 400 ? post.content.substring(0, 400) + '...' : post.content}
                    </p>
                    
                    {post.prompt && (
                       <p className="text-md md:text-lg font-bold uppercase tracking-widest text-black bg-[#E2E8F0] p-3 border-l-[6px] border-black mb-8 inline-block shadow-[2px_2px_0_0_#000]">
                          <span className="text-[#60a5fa]">PROMPT:</span> {post.prompt}
                       </p>
                    )}

                    <div className="flex flex-wrap gap-3 mb-8">
                       {post.tags?.map((tag: string, idx: number) => (
                          <span key={idx} className="bg-white text-black px-4 py-1 font-black text-sm uppercase border-2 border-black rounded-full shadow-[2px_2px_0_0_#000] hover:bg-[#ff7d85] hover:text-white transition-colors cursor-crosshair">{tag}</span>
                       ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between md:items-center border-t-[6px] border-black pt-8 gap-6">
                      <div className="flex flex-wrap gap-4">
                        <button 
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-3 font-black uppercase text-lg border-4 border-black px-6 py-3 transition-colors ${post.likes?.some((l: any) => l.userId === user?.id) ? 'bg-[#ff7d85] text-black shadow-none translate-y-1 translate-x-1' : 'bg-white hover:bg-[#ffeb3b] text-black shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover-target'}`}
                        >
                          <Flame size={24} className={post.likes?.some((l: any) => l.userId === user?.id) ? 'fill-black' : ''} /> ASSIGN MERIT
                        </button>
                      </div>
                      <button className="font-black text-xl md:text-2xl uppercase bg-[#ffeb3b] border-4 border-black px-8 py-3 hover:bg-black hover:text-[#ffeb3b] transition-colors rounded-full shadow-[4px_4px_0_0_#000]">READ MORE & REVIEW &rarr;</button>
                    </div>
                    
                    <div className="mt-8 bg-[#f8fafc] w-full text-center py-4 border-2 border-dashed border-gray-400 font-bold uppercase tracking-widest text-[#ff7d85]">
                        NO REVIEWS YET. BE THE FIRST PEER REVIEWER. &uarr;
                    </div>
                  </article>
               ))}
               
               {posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).length === 0 && (
                 <div className="brutal-box p-16 text-center border-[6px] border-black shadow-[12px_12px_0_0_#ff7d85] bg-white min-h-[40vh] flex flex-col justify-center items-center">
                    <Skull size={80} className="mb-8" />
                    <h2 className="text-5xl font-[family-name:var(--font-heading)]">NO TRANSMISSIONS DETECTED.</h2>
                    <p className="text-xl font-bold uppercase mt-4">Expand your intercept parameters.</p>
                 </div>
               )}
            </div>

          </div>
        ) : (
          
          /* WRITE TAB */
          <div className="brutal-box bg-[#f8fafc] p-8 md:p-12 border-[6px] border-black shadow-[16px_16px_0_0_#000] rotate-0 transition-transform origin-top z-10 relative">
            <div className="flex items-center gap-4 mb-10 border-b-8 border-black pb-6">
              <PencilLine size={56} className="text-[#3b82f6]" />
              <h2 className="text-5xl md:text-6xl font-[family-name:var(--font-heading)] uppercase m-0 leading-none">DRAFT DIRECTIVE</h2>
            </div>

            <form onSubmit={handlePublish} className="space-y-10">
              <div className="bg-white p-6 border-[6px] border-black shadow-[6px_6px_0_0_#ffeb3b]">
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full font-[family-name:var(--font-heading)] text-5xl md:text-6xl uppercase bg-transparent placeholder-[#a1a1aa] focus:outline-none hover-target"
                  placeholder="SUBJECT DESIGNATION..."
                  required
                />
              </div>
              
              <div className="flex flex-col gap-6">
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full font-bold text-xl uppercase border-[6px] border-black p-4 placeholder-gray-400 shadow-[4px_4px_0_0_#60a5fa]"
                  placeholder="OPTIONAL: INSPIRATION PROMPT..."
                />
                <input 
                  type="text" 
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full font-bold text-xl uppercase border-[6px] border-black p-4 placeholder-gray-400 shadow-[4px_4px_0_0_#ff7d85]"
                  placeholder="OPTIONAL: COMMA SEPARATED TAGS (e.g. Seeking Review, Playwriting)..."
                />
              </div>
              
              <div className="flex flex-wrap gap-6">
                <div className="bg-white border-[6px] border-black p-4 flex-grow flex items-center shadow-[6px_6px_0_0_#000]">
                  <label className="font-black uppercase text-xl md:text-2xl mr-6 whitespace-nowrap ml-2">FORMAT:</label>
                  <select 
                    value={type} 
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-transparent font-black uppercase text-xl md:text-2xl focus:outline-none hover-target cursor-pointer"
                  >
                    <option value="ARTICLE">INTEL BRIEF (ARTICLE)</option>
                    <option value="POEM">CIPHER CODE (POEM)</option>
                    <option value="STORY">MISSION LOG (STORY)</option>
                  </select>
                </div>
              </div>

              <div className="border-[6px] border-black bg-white shadow-[12px_12px_0_0_#000]">
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent font-medium text-xl md:text-2xl p-8 placeholder-[#a1a1aa] focus:outline-none min-h-[500px] resize-y hover-target leading-relaxed"
                  placeholder="Transcribe data payload... All comms are encrypted until broadcast."
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6 border-t-8 border-black">
                <span className={`text-2xl md:text-3xl font-black uppercase ${status.includes('ERROR') || status.includes('FAILED') ? 'text-red-600 bg-red-100 p-4 border-4 border-red-600' : 'text-[#60a5fa] px-4'}`}>{status}</span>
                <button type="submit" className="brutal-btn w-full md:w-auto bg-[#ffeb3b] text-3xl md:text-5xl py-6 md:py-8 px-12 hover-target flex items-center justify-center gap-6 shadow-[8px_8px_0_0_#000] !border-[6px]">
                  BROADCAST <SendHorizontal size={40} />
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* RIGHT SIDEBAR (STATS & BADGES) */}
      <aside className="w-full lg:w-96 flex flex-col gap-16 mt-16 lg:mt-0 relative z-20">
         
         {/* Badges */}
         <div className="brutal-box bg-white p-6 md:p-8 border-[6px] border-black shadow-[12px_12px_0_0_#000]">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-3xl font-[family-name:var(--font-heading)] uppercase text-[#60a5fa]">MY BADGES</h3>
             <span className="font-bold text-3xl">^</span>
           </div>
           
           <div className="flex justify-between items-center mb-8 gap-2 border-y-4 py-6 border-black">
              <div className="flex flex-col items-center">
                 <div className="w-16 h-16 bg-[#ffeb3b] rotate-3 border-4 border-black flex justify-center items-center shadow-[2px_2px_0_0_#000] mb-3">
                    <Search size={32} />
                 </div>
                 <span className="font-black text-xs text-center leading-tight">GENRE EXPLORER<br/>(LEVEL 3)</span>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-16 h-16 bg-[#60a5fa] -rotate-6 border-4 border-black flex justify-center items-center shadow-[2px_2px_0_0_#000] mb-3">
                    <GlobeLock size={32} />
                 </div>
                 <span className="font-black text-xs text-center leading-tight">READER<br/>EXTRAORDINAIRE<br/>(LEVEL 3)</span>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-16 h-16 bg-[#ff7d85] rotate-12 border-4 border-black flex justify-center items-center shadow-[2px_2px_0_0_#000] mb-3">
                    <PencilLine size={32} />
                 </div>
                 <span className="font-black text-xs text-center leading-tight">WORDSMITH<br/>(LEVEL 3)</span>
              </div>
           </div>
           <button className="w-full hover:underline font-black text-[#60a5fa] text-center tracking-widest text-sm transition-colors uppercase">VIEW ALL BADGES</button>
         </div>

         {/* What's New */}
         <div className="brutal-box bg-white p-6 md:p-8 border-[6px] border-black shadow-[12px_12px_0_0_#ff7d85] -rotate-1">
           <h3 className="text-2xl font-black uppercase mb-6 flex justify-between items-center text-black">CHECK OUT WHAT'S NEW BELOW! <span>^</span></h3>
           <div className="w-full h-48 bg-black border-4 border-black overflow-hidden relative group">
              <div className="absolute inset-0 bg-blue-500 opacity-50 blur-xl group-hover:blur-sm transition-all"></div>
              <img src="https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" alt="Ocean wave" />
           </div>
         </div>
         
      </aside>

    </div>
  );
}
