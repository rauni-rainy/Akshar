"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Quote, Plus } from "lucide-react";
import ContentRenderer from "../../../../components/ContentRenderer";

export default function PeerReviewWorkspace() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Review states
  const [rating, setRating] = useState(5);
  const [observe, setObserve] = useState("");
  const [interrogate, setInterrogate] = useState("");
  const [elevate, setElevate] = useState("");
  const [creative, setCreative] = useState("");
  
  // Annotations state
  const [annotations, setAnnotations] = useState<{ id: string; quote: string; comment: string }[]>([]);
  const [activeTab, setActiveTab] = useState<"QUESTIONS" | "ANNOTATIONS">("QUESTIONS");
  
  // Selection popup
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);
  const [currentSelection, setCurrentSelection] = useState("");
  
  const contentRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("");

  const [hasExisting, setHasExisting] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("akshar_user");
    if (!storedUser) return router.push("/login");
    setUser(JSON.parse(storedUser));
    fetchPostData(JSON.parse(storedUser));
  }, [id, router]);

  const fetchPostData = async (activeUser: any) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.author?.id === activeUser.id) {
           router.push(`/post/${id}`);
           return;
        }
        setPost(data);

        const existingReview = data.reviews?.find((r: any) => r.author.id === activeUser.id);
        if (existingReview) {
           setRating(existingReview.rating);
           if (existingReview.observe) setObserve(existingReview.observe);
           if (existingReview.interrogate) setInterrogate(existingReview.interrogate);
           if (existingReview.elevate) setElevate(existingReview.elevate);
           if (existingReview.creative) setCreative(existingReview.creative);
           if (existingReview.annotations && Array.isArray(existingReview.annotations)) setAnnotations(existingReview.annotations);
           setHasExisting(true);
        }
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!contentRef.current) return;
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    
    if (text && text.length > 0) {
      // Calculate standard popup pos near mouse
      setPopupPos({ x: e.pageX, y: e.pageY - 40 });
      setCurrentSelection(text);
    } else {
      setPopupPos(null);
      setCurrentSelection("");
    }
  };

  const createAnnotation = () => {
    if (!currentSelection) return;
    setAnnotations([...annotations, { id: crypto.randomUUID(), quote: currentSelection, comment: "" }]);
    setPopupPos(null);
    setCurrentSelection("");
    setActiveTab("ANNOTATIONS");
    window.getSelection()?.removeAllRanges();
  };

  const updateAnnotationComment = (id: string, text: string) => {
    setAnnotations(annotations.map(a => a.id === id ? { ...a, comment: text } : a));
  };
  
  const removeAnnotation = (id: string) => {
    setAnnotations(annotations.filter(a => a.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("TRANSMITTING...");
    try {
      const token = localStorage.getItem("akshar_token");
      const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ rating, observe, interrogate, elevate, creative, annotations })
      });

      if (!res.ok) throw new Error("TRANSMISSION FAILED");
      setStatus("REVIEW SECURED.");
      setTimeout(() => router.push(`/post/${id}`), 2000);
    } catch (err: any) {
      setStatus(err.message);
    }
  };

  if (loading || !post) return <div className="min-h-screen pt-32 text-center text-5xl font-[family-name:var(--font-heading)] uppercase animate-pulse w-full">ESTABLISHING CONNECTION...</div>;

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col lg:flex-row relative">
      
      {/* Floating Action Button for Selection */}
      {popupPos && (
         <button 
           onClick={createAnnotation}
           style={{ left: popupPos.x, top: popupPos.y }}
           className="fixed z-[100] transform -translate-x-1/2 bg-black text-white px-4 py-2 border-2 border-white font-black text-sm uppercase tracking-widest hover:bg-[#ffeb3b] hover:text-black hover:border-black shadow-[4px_4px_0_0_#ff7d85] flex items-center gap-2"
         >
           <Plus size={16} /> ADD ANNOTATION
         </button>
      )}

      {/* LEFT PANE: READING */}
      <div className="w-full lg:w-[65%] 2xl:w-[70%] bg-white p-6 md:p-12 overflow-y-auto min-h-screen border-r-[6px] border-black">
         <button onClick={() => router.back()} className="mb-12 flex items-center gap-2 font-black uppercase text-lg border-b-4 border-black pb-1 hover:text-[#ff7d85]">
            <ArrowLeft size={20} /> ABORT PROTOCOL
         </button>

         <header className="mb-16">
            <h1 className="text-4xl md:text-[5rem] font-[family-name:var(--font-heading)] uppercase leading-none mb-6">
              {post.title}
            </h1>
            <div className="bg-[#ffeb3b] border-4 border-black p-4 inline-block shadow-[6px_6px_0_0_#000]">
               <p className="text-xl font-bold uppercase tracking-widest">BY {post.author?.displayName}</p>
               <p className="text-sm font-bold mt-1 uppercase text-gray-700">LOGGED: {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
         </header>

         {/* Note: the onMouseUp listener triggers annotation popup */}
         <div 
           ref={contentRef}
           onMouseUp={handleMouseUp}
           className="whitespace-pre-wrap font-medium text-lg md:text-xl leading-[1.8] text-black font-serif cursor-text bg-[#f8fafc] p-8 lg:p-12 border-[6px] border-black shadow-[12px_12px_0_0_#60a5fa] relative"
         >
            <div className="absolute -top-4 -left-4 bg-black text-white px-4 py-1 text-xs font-black tracking-widest uppercase border-4 border-black">DRAG TO ANNOTATE</div>
            <ContentRenderer content={post.content} />
         </div>

         {post.authorNote && (
            <div className="mt-16 bg-[#fffdf5] border-[6px] border-black p-8 shadow-[8px_8px_0_0_#ff7d85]">
               <p className="font-black uppercase text-[#ff7d85] border-b-2 border-black pb-2 mb-4">AUTHOR'S FOOTNOTE:</p>
               <p className="text-lg md:text-xl font-bold italic">{post.authorNote}</p>
            </div>
         )}
      </div>

      {/* RIGHT PANE: CONSOLE */}
      <div className="w-full lg:w-[35%] 2xl:w-[30%] bg-[#e2e8f0] border-l-4 border-black min-h-screen relative flex flex-col">
         
         {/* Tab Headers */}
         <div className="flex bg-black text-white font-[family-name:var(--font-heading)] text-2xl uppercase border-b-[6px] border-black sticky top-0 z-10">
            <button 
               className={`flex-1 py-4 text-center border-r-4 border-black ${activeTab === "QUESTIONS" ? "bg-[#ffeb3b] text-black" : "hover:bg-gray-800"}`}
               onClick={() => setActiveTab("QUESTIONS")}
            >
               TRIANGULATION
            </button>
            <button 
               className={`flex-1 py-4 text-center ${activeTab === "ANNOTATIONS" ? "bg-[#60a5fa] text-black" : "hover:bg-gray-800"}`}
               onClick={() => setActiveTab("ANNOTATIONS")}
            >
               ANNOTATIONS ({annotations.length})
            </button>
         </div>

         <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            {activeTab === "QUESTIONS" ? (
               <>
                  <div className="space-y-6">
                     <p className="font-black text-gray-500 uppercase tracking-widest mb-4">MANDATORY ANALYSIS</p>
                     
                     {/* Observe */}
                     <div className="bg-white border-4 border-black shadow-[4px_4px_0_0_#000] p-4">
                        <label className="block text-xl font-bold uppercase mb-2 border-b-[3px] border-black pb-1">1. OBSERVE</label>
                        <p className="text-sm font-bold text-gray-600 mb-3 uppercase">What delighted, surprised, or moved you?</p>
                        <textarea value={observe} onChange={(e) => setObserve(e.target.value)} className="w-full brutal-input border-4 border-black font-bold p-3 text-lg h-32 resize-y" placeholder="Initiate observation..." />
                     </div>

                     {/* Interrogate */}
                     <div className="bg-white border-4 border-black shadow-[4px_4px_0_0_#000] p-4">
                        <label className="block text-xl font-bold uppercase mb-2 border-b-[3px] border-black pb-1">2. INTERROGATE</label>
                        <p className="text-sm font-bold text-gray-600 mb-3 uppercase">Where could the agent deepen their thesis or structure?</p>
                        <textarea value={interrogate} onChange={(e) => setInterrogate(e.target.value)} className="w-full brutal-input border-4 border-black font-bold p-3 text-lg h-32 resize-y" placeholder="Identify structural weaknesses..." />
                     </div>

                     {/* Elevate */}
                     <div className="bg-white border-4 border-black shadow-[4px_4px_0_0_#000] p-4">
                        <label className="block text-xl font-bold uppercase mb-2 border-b-[3px] border-black pb-1">3. ELEVATE</label>
                        <p className="text-sm font-bold text-gray-600 mb-3 uppercase">Provide active execution vectors for the author.</p>
                        <textarea value={elevate} onChange={(e) => setElevate(e.target.value)} className="w-full brutal-input border-4 border-black font-bold p-3 text-lg h-32 resize-y" placeholder="Constructive guidance..." />
                     </div>

                     {/* Creative */}
                     <div className="bg-[#ffeb3b] border-4 border-black shadow-[4px_4px_0_0_#ff7d85] p-4">
                        <label className="block text-xl font-bold uppercase mb-2 border-b-[3px] border-black pb-1">4. THE LOUD QUESTION</label>
                        <p className="text-sm font-bold text-gray-900 mb-3 uppercase">If this text had a soundtrack, what is playing? What is the loudest sentence?</p>
                        <textarea value={creative} onChange={(e) => setCreative(e.target.value)} className="w-full bg-white border-4 border-black font-bold p-3 text-lg h-32 resize-y" placeholder="Get creative..." />
                     </div>

                     {/* Rating Slider */}
                     <div className="bg-black text-white border-4 border-[#60a5fa] shadow-[6px_6px_0_0_#60a5fa] p-4 md:p-6 mt-8">
                        <label className="block text-2xl font-[family-name:var(--font-heading)] uppercase mb-4 text-[#ffeb3b]">RATING METRIC</label>
                        <input type="range" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full accent-[#ff7d85] h-4 bg-white border-2 border-white" />
                        <div className="flex justify-between font-black text-lg mt-3">
                           <span>1 (CRITICAL)</span>
                           <span className="text-3xl text-[#ff7d85] font-[family-name:var(--font-heading)]">{rating} / 5</span>
                           <span>5 (EXCEPT)</span>
                        </div>
                     </div>
                  </div>
               </>
            ) : (
               <div className="space-y-6">
                  {annotations.length === 0 ? (
                     <div className="h-64 flex flex-col items-center justify-center text-center opacity-50">
                        <Quote size={48} className="mb-4 text-black" />
                        <p className="text-2xl font-black uppercase max-w-[200px]">HIGHLIGHT TEXT TO ANNOTATE</p>
                     </div>
                  ) : (
                     <div className="space-y-6">
                        {annotations.map((ann) => (
                           <div key={ann.id} className="bg-white border-4 border-black shadow-[4px_4px_0_0_#000] p-4 relative group">
                              <button onClick={() => removeAnnotation(ann.id)} className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 flex items-center justify-center border-2 border-black font-black hover:bg-black hover:text-red-500 hover:scale-110 transition-transform z-10">X</button>
                              <div className="bg-gray-100 border-l-4 border-[#ffeb3b] p-3 mb-4 italic text-sm md:text-base font-medium line-clamp-3">
                                 "{ann.quote}"
                              </div>
                              <textarea 
                                 value={ann.comment} onChange={(e) => updateAnnotationComment(ann.id, e.target.value)} 
                                 className="w-full brutal-input bg-white font-bold p-3 text-base h-24 resize-y border-4 border-black" 
                                 placeholder="Critique this line..." 
                              />
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            )}
         </div>

         {/* Submit Footer */}
         <div className="sticky bottom-0 bg-white border-t-[6px] border-black p-6">
            <p className={`font-black uppercase mb-3 text-center ${status.includes('FAIL') ? 'text-red-500' : 'text-[#60a5fa]'}`}>{status}</p>
            <button 
               onClick={handleSubmit} 
               className={`brutal-btn w-full text-black text-3xl md:text-3xl py-4 hover-target uppercase font-[family-name:var(--font-heading)] border-[6px] border-black shadow-[8px_8px_0_0_#000] flex justify-center items-center gap-4 ${hasExisting ? 'bg-[#ffeb3b]' : 'bg-[#ff7d85]'}`}
            >
               {hasExisting ? 'UPDATE PROTOCOL' : 'LODGE REVIEW'} <CheckCircle size={32} />
            </button>
         </div>

      </div>
    </div>
  );
}
