"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PencilLine, SendHorizontal, Users, Trophy, Search, Flame, Skull, Zap, Radio, GlobeLock } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import RichTextEditor from "../../components/RichTextEditor";
import ContentRenderer from "../../components/ContentRenderer";
import FilterModal, { FilterState, defaultFilters } from "../../components/FilterModal";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("FEED");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const POSTS_PER_PAGE = 5;

  // Filtering State
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Write Form State
  const [postId, setPostId] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("ARTICLE");
  const [prompt, setPrompt] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [authorNote, setAuthorNote] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("action") === "write") setActiveTab("WRITE");
      if (params.get("prompt")) setPrompt(params.get("prompt") as string);
      
      const draftIdParam = params.get("draftId");
      if (draftIdParam) {
          setActiveTab("WRITE");
          setPostId(draftIdParam);
          fetch(`http://localhost:5000/api/posts/${draftIdParam}`)
            .then(res => res.json())
            .then(data => {
                if(data && !data.error) {
                    setTitle(data.title || "");
                    setContent(data.content || "");
                    setType(data.type || "ARTICLE");
                    setPrompt(data.prompt || "");
                    setTagsInput(data.tags?.join(", ") || "");
                    setAuthorNote(data.authorNote || "");
                }
            }).catch(err => console.error(err));
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("akshar_token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Try starting from stored user for immediate paint
    const storedUser = localStorage.getItem("akshar_user");
    if (storedUser) setUser(JSON.parse(storedUser));
    
    // Fetch dynamic profile
    fetch("http://localhost:5000/api/users/me", {
      headers: { "Authorization": `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) throw new Error(data.error);
        setUser(data);
        localStorage.setItem("akshar_user", JSON.stringify(data));
    })
    .catch(() => {
        router.push("/login");
    });

    fetchPosts();
  }, [router]);

  const fetchPosts = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch(`http://localhost:5000/api/posts/feed?limit=1000`);
      if (res.ok) {
        const data = await res.json();
        // Support both paginated envelope { posts } and flat array
        setPosts(Array.isArray(data) ? data : (data.posts || []));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const goToFrequency = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    fetchPosts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic filter lists based on fetched posts
  const availableTags = Array.from(new Set(posts.flatMap(p => p.tags || []))).filter(Boolean) as string[];
  const availablePrompts = Array.from(new Set(posts.map(p => p.prompt))).filter(Boolean) as string[];
  const availableCountries = Array.from(new Set(posts.map(p => p.author?.country))).filter(Boolean) as string[];

  // Mega Filtering Pipeline
  const filteredPosts = posts.filter(p => {
    // 1. Search Query
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    
    // 2. Checkboxes
    if (filters.seekingReview && !p.tags?.includes('Seeking Review')) return false;
    if (filters.likedByMe && !p.likes?.some((l: any) => l.userId === user?.id)) return false;
    if (filters.likedByOthers && (!p.likes || p.likes.length === 0)) return false;
    if (filters.following && !user?.followingIds?.includes(p.author?.id)) return false;
    if (filters.followers && !user?.followerIds?.includes(p.author?.id)) return false;
    if (filters.peerReviewed && (!p.reviews || p.reviews.length === 0)) return false;

    // 3. Dropdowns
    if (filters.tags.length > 0 && !filters.tags.some(t => p.tags?.includes(t))) return false;
    if (filters.prompts.length > 0 && !filters.prompts.includes(p.prompt)) return false;
    if (filters.countries.length > 0 && !filters.countries.includes(p.author?.country)) return false;

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'Oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (filters.sortBy === 'Most Liked') return (b.likes?.length || 0) - (a.likes?.length || 0);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Most Recent
  });

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

  const saveDraft = async (manual = false) => {
    if (!title && !content) {
        if (manual) setStatus("DRAFT REQUIRES TEXT.");
        return;
    }

    if (manual) setStatus("SAVING MANUAL DRAFT...");
    else setIsSaving(true);
    
    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const token = localStorage.getItem("akshar_token");
    if (!token) return;

    try {
      let url = "http://localhost:5000/api/posts";
      let method = "POST";
      
      if (postId) {
         url = `http://localhost:5000/api/posts/${postId}`;
         method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title: title || "UNTITLED DRAFT", content, type, published: false, prompt, tags: tagsArray, authorNote })
      });

      if (res.ok) {
         const data = await res.json();
         if (!postId && data.post?.id) {
             setPostId(data.post.id);
         }
         const now = new Date().toLocaleTimeString();
         setLastSaved(now);
         if (manual) setStatus(`DRAFT SAVED AT ${now}`);
      } else {
         if (manual) setStatus("FAILED TO SAVE DRAFT.");
      }
    } catch (err) {
       console.error(err);
       if (manual) setStatus("NETWORK ERROR ON SAVE.");
    } finally {
       setIsSaving(false);
    }
  };

  useEffect(() => {
    if (activeTab !== "WRITE") return;
    if (!title && !content) return; // Skip empty

    const timeoutId = setTimeout(() => {
      saveDraft();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [title, content, type, prompt, tagsInput, authorNote, activeTab, postId]);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("TRANSMITTING...");
    
    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    
    try {
      const token = localStorage.getItem("akshar_token");
      let url = "http://localhost:5000/api/posts";
      let method = "POST";
      
      if (postId) {
         url = `http://localhost:5000/api/posts/${postId}`;
         method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, type, published: true, prompt, tags: tagsArray, authorNote })
      });

      if (!res.ok) throw new Error("TRANSMISSION FAILED.");
      
      setStatus("WORLD HAS RECEIVED YOUR MESSAGE.");
      setTimeout(() => {
        setTitle("");
        setContent("");
        setPrompt("");
        setTagsInput("");
        setAuthorNote("");
        setStatus("");
        setPostId(null);
        setLastSaved(null);
        window.history.replaceState(null, '', '/dashboard');
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
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

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
                LEVEL {user.stats?.level || 1} AGENT
              </p>
            </div>
            
            <div className="hidden lg:flex gap-6 items-center flex-wrap bg-white border-4 border-black p-4 shadow-[6px_6px_0_0_#000]">
              <div className="text-center px-4">
                 <span className="block text-4xl font-[family-name:var(--font-heading)] text-[#ff7d85]">{user.stats?.written || 0}</span>
                 <span className="text-xs font-black uppercase tracking-widest">WRITTEN</span>
              </div>
              <div className="text-center border-l-4 border-black px-4">
                 <span className="block text-4xl font-[family-name:var(--font-heading)] text-black">{user.stats?.reviewed || 0}</span>
                 <span className="text-xs font-black uppercase tracking-widest">REVIEWED</span>
              </div>
              <div className="text-center border-l-4 border-black px-4">
                 <span className="block text-4xl font-[family-name:var(--font-heading)] text-[#60a5fa]">{user.stats?.read || 0}</span>
                 <span className="text-xs font-black uppercase tracking-widest">READ</span>
              </div>
              <div className="text-center border-l-4 border-black px-4">
                 <span className="block text-4xl font-[family-name:var(--font-heading)] text-[#ffeb3b] -rotate-2">{user.stats?.countries || 0}</span>
                 <span className="text-xs font-black uppercase tracking-widest">COUNTRIES</span>
              </div>
            </div>
          </div>
        </div>

        {activeTab === 'FEED' ? (
          <div className="space-y-12">
            
            {/* Search Bar & Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 relative z-20">
              <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 text-black pointer-events-none" />
                <input 
                  type="text" 
                  placeholder="SEARCH REBEL TRANSMISSIONS..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full brutal-input font-[family-name:var(--font-heading)] text-xl md:text-3xl uppercase bg-[#f8fafc] border-[6px] border-black py-4 md:py-6 pl-20 md:pl-24 pr-6 hover-target shadow-[8px_8px_0_0_#000] focus:bg-white transition-colors placeholder-[#a1a1aa]"
                />
              </div>
              
              <div className="flex gap-4">
                 <button 
                   onClick={() => fetchPosts()} 
                   disabled={isRefreshing}
                   className={`brutal-btn bg-[#60a5fa] border-[6px] border-black text-black px-6 font-black uppercase shadow-[8px_8px_0_0_#000] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] transition-all flex items-center justify-center ${isRefreshing ? 'animate-pulse' : ''}`}
                 >
                    {isRefreshing ? 'FETCHING...' : 'REFRESH'}
                 </button>
                 <button 
                   onClick={() => setIsFilterModalOpen(!isFilterModalOpen)} 
                   className="brutal-btn bg-[#ffeb3b] border-[6px] border-black text-black px-6 font-black uppercase shadow-[8px_8px_0_0_#000] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] transition-all flex items-center justify-center gap-2"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                    FILTERS {(filters.seekingReview || filters.likedByMe || filters.likedByOthers || filters.following || filters.followers || filters.peerReviewed || filters.tags.length>0 || filters.prompts.length>0 || filters.countries.length>0) && <span className="bg-black text-white px-2 py-1 text-xs rounded-full">!</span>}
                 </button>
              </div>
            </div>

            <FilterModal 
               isOpen={isFilterModalOpen} 
               onClose={() => setIsFilterModalOpen(false)}
               availableTags={availableTags}
               availablePrompts={availablePrompts}
               availableCountries={availableCountries}
               currentFilters={filters}
               onApply={setFilters}
            />

            {/* Feed List */}
            <div className="space-y-8 md:space-y-16 mt-8 md:mt-16 px-0 md:px-2">
               {filteredPosts.length > 0 && filteredPosts.map((post: any, i: number) => (
                   <article key={post.id} className={`brutal-box bg-white p-4 md:p-12 border-[6px] border-black shadow-[8px_8px_0_0_#000] md:shadow-[12px_12px_0_0_#000] relative transition-all duration-200`}>
                     
                     {/* Title row */}
                     <div className="flex items-start justify-between flex-wrap gap-2 md:gap-4 mb-3 md:mb-8">
                        <h3 className="text-2xl md:text-6xl font-[family-name:var(--font-heading)] uppercase leading-tight max-w-[75vw] md:max-w-2xl line-clamp-2 md:line-clamp-none">{post.title}</h3>
                        <div className="flex items-center gap-1 font-black uppercase border-2 border-black p-1 md:p-2 bg-[#f8fafc] text-xs md:text-base shrink-0">
                           <Flame size={14} className={`md:hidden ${post.likes?.some((l: any) => l.userId === user?.id) ? 'fill-[#ff7d85] text-[#ff7d85]' : 'text-gray-400'}`} />
                           <Flame size={20} className={`hidden md:block ${post.likes?.some((l: any) => l.userId === user?.id) ? 'fill-[#ff7d85] text-[#ff7d85]' : 'text-gray-400'}`} />
                           {post.likes?.length || 0}<span className="hidden md:inline ml-1">LIKES</span>
                        </div>
                     </div>
                     
                     {/* Author row */}
                     <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-8">
                        <Link href={`/user/${post.author?.id}`} className="shrink-0">
                          {post.author?.avatar ? (
                            <img src={post.author.avatar} alt="PFP" className="w-8 h-8 md:w-16 md:h-16 object-cover border-2 border-black rounded-full hover:scale-110 transition-transform shadow-[2px_2px_0_0_#000]" />
                          ) : (
                            <div className="w-8 h-8 md:w-16 md:h-16 border-2 md:border-4 border-black bg-[#ffeb3b] text-sm md:text-xl font-black font-[family-name:var(--font-heading)] flex items-center justify-center rounded-full shadow-[2px_2px_0_0_#000] hover:scale-110 transition-transform">
                              {post.author?.displayName?.charAt(0) || "U"}
                            </div>
                          )}
                        </Link>
                        <div className="min-w-0">
                          <p className="text-black font-black text-sm md:text-2xl truncate">
                            <Link href={`/user/${post.author?.id}`} className="hover:underline hover:text-[#60a5fa] transition-colors">{post.author?.displayName || "CLASSIFIED"}</Link>
                            <span className="text-[#ff7d85] ml-1 font-bold tracking-widest text-xs align-middle hidden sm:inline"> ({post.author?.country || "Earth"})</span>
                          </p>
                          <p className="font-bold text-gray-400 uppercase tracking-widest text-[10px] md:text-xs border-l-2 md:border-l-4 border-black pl-1 md:pl-2">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                     </div>

                     {/* Content — 4-line clamp on mobile, full preview on desktop */}
                     <div className="mb-3 md:mb-8">
                       <ContentRenderer 
                         content={post.content} 
                         className="text-sm md:text-2xl font-medium leading-snug md:leading-relaxed bg-[#fffdf5] p-3 md:p-6 border-[4px] border-black line-clamp-4 md:line-clamp-none" 
                         truncate={true} 
                         maxLength={400} 
                       />
                     </div>
                     
                     {/* Prompt — 1-line clamp on mobile */}
                     {post.prompt && (
                        <p className="text-[10px] md:text-lg font-bold uppercase tracking-widest text-black bg-[#E2E8F0] px-2 py-1 md:p-3 border-l-4 md:border-l-[6px] border-black mb-3 md:mb-8 shadow-[2px_2px_0_0_#000] block truncate md:whitespace-normal md:overflow-visible">
                           <span className="text-[#60a5fa]">PROMPT:</span> {post.prompt}
                        </p>
                     )}

                     {/* Tags — max 3 on mobile */}
                     <div className="flex flex-wrap gap-1 md:gap-3 mb-3 md:mb-8">
                        {post.tags?.map((tag: string, idx: number) => (
                           <span key={idx} className="bg-white text-black px-2 md:px-4 py-0.5 md:py-1 font-black text-[10px] md:text-sm uppercase border-2 border-black rounded-full shadow-[2px_2px_0_0_#000] hover:bg-[#ff7d85] hover:text-white transition-colors cursor-crosshair">{tag}</span>
                        ))}
                     </div>

                     {/* Footer actions */}
                     <div className="flex flex-row justify-between items-center border-t-4 md:border-t-[6px] border-black pt-3 md:pt-8 gap-2">
                       <button 
                         onClick={() => handleLike(post.id)}
                         className={`flex items-center gap-1 md:gap-3 font-black uppercase text-xs md:text-lg border-2 md:border-4 border-black px-3 md:px-6 py-2 md:py-3 transition-colors ${post.likes?.some((l: any) => l.userId === user?.id) ? 'bg-[#ff7d85] text-black shadow-none' : 'bg-white hover:bg-[#ffeb3b] text-black shadow-[2px_2px_0_0_#000] md:shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover-target'}`}
                       >
                         <Flame size={14} className={`md:w-6 md:h-6 ${post.likes?.some((l: any) => l.userId === user?.id) ? 'fill-black' : ''}`} />
                         <span className="hidden sm:inline">ASSIGN MERIT</span>
                         <span className="sm:hidden">MERIT</span>
                       </button>
                       <Link href={`/post/${post.id}`} className="font-black text-xs md:text-2xl uppercase bg-[#ffeb3b] border-2 md:border-4 border-black px-3 md:px-8 py-2 md:py-3 hover:bg-black hover:text-[#ffeb3b] transition-colors rounded-full shadow-[2px_2px_0_0_#000] md:shadow-[4px_4px_0_0_#000] whitespace-nowrap">READ MORE →</Link>
                     </div>
                   </article>
               ))}
               
               {filteredPosts.length === 0 && (
                 <div className="brutal-box p-16 text-center border-[6px] border-black shadow-[12px_12px_0_0_#ff7d85] bg-white min-h-[40vh] flex flex-col justify-center items-center">
                    <Skull size={80} className="mb-8" />
                    <h2 className="text-5xl font-[family-name:var(--font-heading)] uppercase text-gray-400">NO TRANSMISSIONS MATCH CRITERIA.</h2>
                    <p className="text-xl font-bold uppercase mt-4 text-gray-500">Adjust your filter parameters or search query.</p>
                 </div>
               )}
            </div>

            {/* ─── RADIO FREQUENCY PAGINATION (commented out — re-enable when ready) ───
            {totalPages > 1 && (
              <div className="mt-16 border-t-8 border-black pt-10">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-black" />
                  <div className="bg-black text-[#ffeb3b] px-6 py-2 font-[family-name:var(--font-heading)] text-2xl uppercase tracking-widest flex items-center gap-3">
                    <Radio size={20} className="animate-pulse" />
                    FREQUENCY {String(currentPage).padStart(2,'0')} / {String(totalPages).padStart(2,'0')}
                  </div>
                  <div className="h-px flex-1 bg-black" />
                </div>
                <div className="brutal-box bg-black border-[6px] border-black shadow-[8px_8px_0_0_#ffeb3b] p-6 md:p-8 flex items-center gap-4 md:gap-6 overflow-x-auto hide-scrollbar">
                  <button onClick={() => goToFrequency(currentPage - 1)} disabled={currentPage === 1 || isRefreshing} className="flex-shrink-0 font-[family-name:var(--font-heading)] text-2xl bg-white border-4 border-black px-5 py-3 disabled:opacity-30 hover:bg-[#ffeb3b] hover:-translate-y-1 transition-all shadow-[4px_4px_0_0_#ffeb3b] disabled:shadow-none disabled:hover:translate-y-0 disabled:cursor-not-allowed">◄ PREV</button>
                  <div className="flex gap-3 flex-1 justify-center flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((band) => {
                      const isActive = band === currentPage;
                      const isAdjacent = Math.abs(band - currentPage) <= 2;
                      if (!isAdjacent && band !== 1 && band !== totalPages) {
                        if (band === currentPage - 3 || band === currentPage + 3) return <span key={band} className="text-gray-600 font-black text-xl self-center px-1">···</span>;
                        return null;
                      }
                      return (
                        <button key={band} onClick={() => goToFrequency(band)} disabled={isRefreshing} className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 border-4 font-[family-name:var(--font-heading)] transition-all ${isActive ? 'bg-[#ffeb3b] border-[#ffeb3b] text-black shadow-[0_0_20px_4px_rgba(255,235,59,0.6)] scale-110 -translate-y-1' : 'bg-transparent border-white/20 text-white hover:border-[#ffeb3b] hover:text-[#ffeb3b] hover:-translate-y-1'}`}>
                          <span className="text-xs tracking-widest uppercase opacity-60">FM</span>
                          <span className="text-2xl leading-none">{String(band).padStart(2, '0')}</span>
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={() => goToFrequency(currentPage + 1)} disabled={currentPage === totalPages || isRefreshing} className="flex-shrink-0 font-[family-name:var(--font-heading)] text-2xl bg-white border-4 border-black px-5 py-3 disabled:opacity-30 hover:bg-[#ffeb3b] hover:-translate-y-1 transition-all shadow-[4px_4px_0_0_#ffeb3b] disabled:shadow-none disabled:hover:translate-y-0 disabled:cursor-not-allowed">NEXT ►</button>
                </div>
                <div className="mt-4 h-3 bg-black border-2 border-black overflow-hidden">
                  <div className="h-full bg-[#ffeb3b] transition-all duration-500" style={{ width: `${(currentPage / totalPages) * 100}%` }} />
                </div>
                <p className="text-center font-black text-xs uppercase tracking-widest text-gray-500 mt-2">
                  SIGNAL STRENGTH — {Math.round((currentPage / totalPages) * 100)}% BAND COVERAGE
                </p>
              </div>
            )}
            ─── END PAGINATION ─── */}

          </div>
        ) : activeTab === 'WRITE' ? (
          
          /* WRITE TAB */
          <div className="bg-[#f8fafc] p-8 md:p-12 border-[6px] border-black shadow-[16px_16px_0_0_#000] rotate-0 origin-top z-10 relative">
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
                <RichTextEditor 
                  value={content}
                  onChange={setContent}
                  placeholder="Transcribe data payload... All comms are encrypted until broadcast."
                />
              </div>

              <div className="flex flex-col gap-6">
                <textarea 
                  value={authorNote}
                  onChange={(e) => setAuthorNote(e.target.value)}
                  className="w-full font-bold text-xl uppercase border-[6px] border-black p-4 placeholder-gray-400 shadow-[4px_4px_0_0_#ffeb3b] min-h-[120px] resize-y"
                  placeholder="OPTIONAL: AUTHOR'S NOTE / MESSAGE TO THE RESISTANCE..."
                />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6 border-t-8 border-black">
                <div className="flex flex-col">
                  <span className={`text-2xl md:text-3xl font-black uppercase ${status.includes('ERROR') || status.includes('FAILED') ? 'text-red-600 bg-red-100 p-4 border-4 border-red-600' : 'text-[#60a5fa] px-4'}`}>{status}</span>
                  {lastSaved && <span className="text-sm font-bold uppercase tracking-widest text-gray-400 mt-2 px-4 inline-block">LAST SAVED: {lastSaved}</span>}
                </div>
                <div className="flex flex-wrap gap-4 w-full md:w-auto">
                    <button type="button" onClick={() => saveDraft(true)} disabled={isSaving} className="brutal-btn w-full md:w-auto bg-white border-[6px] border-black text-black text-2xl py-4 px-8 hover-target shadow-[4px_4px_0_0_#000]">
                      {isSaving ? "SAVING..." : "SAVE DRAFT"}
                    </button>
                    <button type="submit" className="brutal-btn w-full md:w-auto bg-[#ffeb3b] text-3xl md:text-5xl py-6 md:py-8 px-12 hover-target flex items-center justify-center gap-6 shadow-[8px_8px_0_0_#000] !border-[6px]">
                      BROADCAST <SendHorizontal size={40} />
                    </button>
                </div>
              </div>
            </form>
          </div>
        ) : null}

      </main>

      {/* RIGHT SIDEBAR (STATS & BADGES) */}
      <aside className="w-full lg:w-96 flex flex-col gap-16 mt-16 lg:mt-0 relative z-20 lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto hide-scrollbar pb-8">
         
         {/* Badges */}
         <div className="brutal-box bg-white p-6 md:p-8 border-[6px] border-black shadow-[12px_12px_0_0_#000]">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-3xl font-[family-name:var(--font-heading)] uppercase text-[#60a5fa]">MY BADGES</h3>
             <span className="font-bold text-3xl">^</span>
           </div>
           
           <div className="flex justify-between items-start mb-8 gap-2 border-y-4 py-6 border-black min-h-[160px]">
              {(() => {
                 const allBadgesDef = [
                    { key: 'signalCaster', name: 'SIGNAL CASTER', icon: <Radio size={32} />, color: '#ff7d85', rot: 'rotate-3' },
                    { key: 'dataSiphon', name: 'DATA SIPHON', icon: <Search size={32} />, color: '#ffeb3b', rot: '-rotate-6' },
                    { key: 'networkInfiltrator', name: 'NETWORK INFILTRATOR', icon: <GlobeLock size={32} />, color: '#60a5fa', rot: 'rotate-12' },
                    { key: 'chiefInterrogator', name: 'CHIEF INTERROGATOR', icon: <Flame size={32} />, color: '#ff7d85', rot: '-rotate-3' },
                    { key: 'multiThreat', name: 'MULTI-THREAT AGENT', icon: <Zap size={32} />, color: '#ffeb3b', rot: 'rotate-6' }
                 ];
                 
                 const userBadges = user.stats?.badges || {};
                 const topBadges = allBadgesDef
                    .map(b => ({ ...b, level: userBadges[b.key] || 0 }))
                    .filter(b => b.level > 0)
                    .sort((a, b) => b.level - a.level)
                    .slice(0, 3);
                    
                 if (topBadges.length === 0) {
                     return <p className="font-bold text-gray-500 text-center w-full mt-4">NO BADGES DETECTED.<br/>BEGIN OPERATIONS.</p>;
                 }
                 
                 return topBadges.map(badge => (
                    <div key={badge.key} className="flex flex-col items-center flex-1">
                       <div className={`w-16 h-16 bg-[${badge.color}] ${badge.rot} border-4 border-black flex justify-center items-center shadow-[2px_2px_0_0_#000] mb-3`}>
                          {badge.icon}
                       </div>
                       <span className="font-black text-xs text-center leading-tight">{badge.name}<br/>(LEVEL {badge.level})</span>
                    </div>
                 ));
              })()}
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
