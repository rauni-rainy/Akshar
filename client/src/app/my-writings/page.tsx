"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Skull, Flame, FileEdit, CheckCircle, MessageSquare } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import ContentRenderer from "../../components/ContentRenderer";

export default function MyWritings() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  
  const [drafts, setDrafts] = useState<any[]>([]);
  const [published, setPublished] = useState<any[]>([]);
  const [reviewsWritten, setReviewsWritten] = useState<any[]>([]);
  const [reviewsReceived, setReviewsReceived] = useState<any[]>([]);
  
  const [activeTab, setActiveTab] = useState("PUBLISHED");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("akshar_token");
    const storedUser = localStorage.getItem("akshar_user");
    if (!token || !storedUser) {
      router.push("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchData(token);
  }, [router]);

  const fetchData = async (token: string) => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/posts/my-writings", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setDrafts(data.drafts || []);
        setPublished(data.published || []);
        setReviewsWritten(data.reviewsWritten || []);
        setReviewsReceived(data.reviewsReceived || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return <div className="min-h-screen pt-32 text-center text-5xl font-[family-name:var(--font-heading)] uppercase animate-pulse">BOOTING SYSTEM...</div>;

  return (
    <div className="w-full max-w-[1700px] mx-auto px-4 md:px-8 mt-12 mb-24 lg:flex gap-10 sm:overflow-visible overflow-hidden">
      
      {/* LEFT SIDEBAR (NAV) */}
      <Sidebar activeTab="MY_WRITINGS" />

      {/* CENTER CONTENT */}
      <main className="flex-1 min-w-0">
        
        {/* Top Banner */}
        <div className="brutal-box bg-[#60a5fa] p-8 md:p-12 border-[6px] border-black flex items-center justify-between mb-12 relative z-10 shadow-[12px_12px_0_0_#000] overflow-hidden -rotate-1 hover:rotate-0 transition-transform">
          <div className="relative z-10 w-full flex justify-between items-center flex-wrap gap-8">
            <div>
              <h1 className="text-5xl md:text-[5rem] font-[family-name:var(--font-heading)] uppercase tracking-tight leading-none bg-black text-white inline-block px-4 py-2">
                MY OPERATIONS
              </h1>
              <p className="text-lg md:text-2xl font-bold uppercase text-black bg-white px-4 py-2 border-4 border-black inline-block mt-4 shadow-[4px_4px_0_0_#000]">
                YOUR PERSONAL ARCHIVE
              </p>
            </div>
            
            <div className="hidden xl:flex gap-6 items-center flex-wrap bg-white border-4 border-black p-4 shadow-[6px_6px_0_0_#000]">
              <div className="text-center px-4 border-r-4 border-black pr-8">
                 <span className="block text-4xl font-[family-name:var(--font-heading)] text-black">{published.length}</span>
                 <span className="text-xs font-black uppercase tracking-widest">PUBLISHED</span>
              </div>
              <div className="text-center px-4 border-r-4 border-black pr-8">
                 <span className="block text-4xl font-[family-name:var(--font-heading)] text-gray-500">{drafts.length}</span>
                 <span className="text-xs font-black uppercase tracking-widest">DRAFTS</span>
              </div>
              <div className="text-center px-4">
                 <span className="block text-4xl font-[family-name:var(--font-heading)] text-[#ff7d85]">{published.reduce((acc, p) => acc + (p.likes?.length || 0), 0)}</span>
                 <span className="text-xs font-black uppercase tracking-widest">TOTAL MERIT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-12 relative z-20">
           {[
              { id: 'PUBLISHED', label: 'PUBLISHED', icon: <CheckCircle size={20} /> },
              { id: 'DRAFTS', label: 'MY DRAFTS', icon: <FileEdit size={20} /> },
              { id: 'REVIEWS_RECEIVED', label: 'REVIEWS RECEIVED', icon: <MessageSquare size={20} /> },
              { id: 'REVIEWS_WRITTEN', label: 'REVIEWS WRITTEN', icon: <MessageSquare size={20} /> }
           ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 brutal-btn font-black text-lg md:text-xl py-4 px-6 border-[6px] border-black transition-all ${activeTab === tab.id ? 'bg-black text-[#ffeb3b] shadow-[4px_4px_0_0_#ffeb3b] translate-y-1 translate-x-1' : 'bg-white text-black hover:bg-[#60a5fa] hover:text-black shadow-[6px_6px_0_0_#000] hover-target'}`}
              >
                 {tab.icon} {tab.label}
              </button>
           ))}
        </div>

        {isLoading ? (
          <div className="brutal-box p-16 text-center border-[6px] border-black shadow-[12px_12px_0_0_#000] bg-white min-h-[40vh] flex flex-col justify-center items-center">
              <h2 className="text-5xl font-[family-name:var(--font-heading)] uppercase text-gray-400 animate-pulse">DECRYPTING ARCHIVES...</h2>
          </div>
        ) : (
          <>
            {/* Posts / Drafts List */}
            {(activeTab === 'PUBLISHED' || activeTab === 'DRAFTS') && (
            <div className="space-y-16 px-2 relative z-10">
               {activeTab === 'PUBLISHED' && published.length === 0 && (
                 <div className="brutal-box p-16 text-center border-[6px] border-black shadow-[12px_12px_0_0_#ff7d85] bg-white flex flex-col justify-center items-center">
                    <Skull size={80} className="mb-8 text-gray-300" />
                    <h2 className="text-5xl font-[family-name:var(--font-heading)] uppercase text-gray-300">GHOST LOG.</h2>
                    <p className="text-xl font-bold uppercase mt-4 text-gray-400">You have no published transmissions.</p>
                 </div>
               )}
               {activeTab === 'DRAFTS' && drafts.length === 0 && (
                 <div className="brutal-box p-16 text-center border-[6px] border-black shadow-[12px_12px_0_0_#60a5fa] bg-white flex flex-col justify-center items-center">
                    <FileEdit size={80} className="mb-8 text-gray-300" />
                    <h2 className="text-5xl font-[family-name:var(--font-heading)] uppercase text-gray-300">NO PENDING LOGS.</h2>
                    <p className="text-xl font-bold uppercase mt-4 text-gray-400">No active drafts found in the cache.</p>
                 </div>
               )}
               
               {(activeTab === 'PUBLISHED' ? published : drafts).map((post: any) => (
                  <article key={post.id} className={`brutal-box bg-white p-6 md:p-12 border-[6px] border-black shadow-[12px_12px_0_0_#000] relative transition-all duration-200`}>
                    
                    {activeTab === 'DRAFTS' && (
                       <div className="absolute top-0 right-0 bg-[#ffeb3b] border-l-[6px] border-b-[6px] border-black px-6 py-2 font-black uppercase text-xl z-10 shadow-[-6px_6px_0_0_#000]">
                          DRAFT IN PROGRESS
                       </div>
                    )}

                    <div className="flex items-start justify-between flex-wrap gap-4 mb-8 mt-4 md:mt-0">
                       <h3 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] uppercase leading-none max-w-2xl">{post.title || "UNTITLED DRAFT"}</h3>
                       {activeTab === 'PUBLISHED' && (
                         <div className="flex items-center gap-2 font-black uppercase border-4 border-black p-2 bg-[#f8fafc] shadow-[4px_4px_0_0_#000]">
                            <Flame size={20} className={post.likes?.some((l: any) => l.userId === user?.id) ? 'fill-[#ff7d85] text-[#ff7d85]' : 'text-gray-400'} /> 
                            {post.likes?.length || 0} LIKES
                         </div>
                       )}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-8">
                       <div>
                         <p className="font-bold text-gray-600 uppercase tracking-widest text-sm border-l-4 border-black pl-3 bg-gray-100 p-2 inline-block">
                           {activeTab === 'PUBLISHED' ? 'PUBLISHED ON' : 'LAST SAVED'}: {new Date(post.updatedAt || post.createdAt).toLocaleString()}
                         </p>
                       </div>
                    </div>

                    {post.content && (
                      <ContentRenderer 
                        content={post.content} 
                        className="text-xl md:text-2xl font-medium leading-relaxed bg-[#fffdf5] p-6 border-[6px] border-black mb-8 shadow-[6px_6px_0_0_#000]" 
                        truncate={true}
                        maxLength={300}
                      />
                    )}
                    
                    {post.prompt && (
                       <p className="text-md md:text-lg font-bold uppercase tracking-widest text-black bg-[#E2E8F0] p-3 border-l-[6px] border-black mb-8 inline-block shadow-[2px_2px_0_0_#000]">
                          <span className="text-[#60a5fa]">PROMPT:</span> {post.prompt}
                       </p>
                    )}

                    <div className="flex flex-wrap gap-3 mb-8">
                       {post.tags?.map((tag: string, idx: number) => (
                          <span key={idx} className="bg-[#60a5fa] text-black px-4 py-2 font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0_0_#000] inline-block hover:-translate-y-1 transition-transform">{tag}</span>
                       ))}
                    </div>

                    <div className="flex justify-start border-t-[6px] border-black pt-8">
                      {activeTab === 'PUBLISHED' ? (
                        <Link href={`/post/${post.id}`} className="font-black text-xl md:text-2xl uppercase bg-black text-white border-4 border-black px-8 py-4 hover:bg-[#ffeb3b] hover:text-black transition-colors shadow-[6px_6px_0_0_#000] flex items-center gap-3"><CheckCircle size={24} /> INSPECT RECORD &rarr;</Link>
                      ) : (
                        <Link href={`/dashboard?action=write&draftId=${post.id}`} className="font-black text-xl md:text-2xl uppercase bg-[#ffeb3b] text-black border-4 border-black px-8 py-4 hover:bg-black hover:text-[#ffeb3b] transition-colors shadow-[6px_6px_0_0_#000] flex items-center gap-3"><FileEdit size={24} /> RESUME COMPILATION &rarr;</Link>
                      )}
                    </div>
                  </article>
               ))}
            </div>
            )}

            {/* Reviews List */}
            {(activeTab === 'REVIEWS_WRITTEN' || activeTab === 'REVIEWS_RECEIVED') && (
            <div className="space-y-16 px-2 relative z-10 w-full">
               {activeTab === 'REVIEWS_WRITTEN' && reviewsWritten.length === 0 && (
                 <div className="brutal-box p-16 text-center border-[6px] border-black shadow-[12px_12px_0_0_#ffeb3b] bg-white flex flex-col justify-center items-center">
                    <MessageSquare size={80} className="mb-8 text-gray-300" />
                    <h2 className="text-5xl font-[family-name:var(--font-heading)] uppercase text-gray-300">NO INTERROGATIONS.</h2>
                    <p className="text-xl font-bold uppercase mt-4 text-gray-400">You haven't submitted any peer reviews yet.</p>
                 </div>
               )}
               {activeTab === 'REVIEWS_RECEIVED' && reviewsReceived.length === 0 && (
                 <div className="brutal-box p-16 text-center border-[6px] border-black shadow-[12px_12px_0_0_#ff7d85] bg-white flex flex-col justify-center items-center">
                    <MessageSquare size={80} className="mb-8 text-gray-300" />
                    <h2 className="text-5xl font-[family-name:var(--font-heading)] uppercase text-gray-300">NO FEEDBACK.</h2>
                    <p className="text-xl font-bold uppercase mt-4 text-gray-400">No peers have reviewed your transmissions yet.</p>
                 </div>
               )}
               
               {(activeTab === 'REVIEWS_WRITTEN' ? reviewsWritten : reviewsReceived).map((review: any) => (
                  <article key={review.id} className={`brutal-box bg-white p-6 md:p-12 border-[6px] border-black relative transition-all duration-200 ${activeTab === 'REVIEWS_RECEIVED' ? 'shadow-[12px_12px_0_0_#ff7d85]' : 'shadow-[12px_12px_0_0_#ffeb3b]'}`}>
                     
                     <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8 border-b-[6px] border-black pb-8">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-heading)] uppercase bg-black text-white inline-block px-4 py-2 border-4 border-black mb-4 flex items-center gap-3">
                             <MessageSquare size={24} /> {activeTab === 'REVIEWS_RECEIVED' ? 'FEEDBACK ON:' : 'REVIEW OF:'}
                          </h3>
                          <Link href={`/post/${review.post?.id}`} className="block text-4xl md:text-5xl font-black uppercase hover:text-[#60a5fa] transition-colors">{review.post?.title || "CLASSIFIED FILE"}</Link>
                        </div>
                        <div className="text-right">
                          <p className="font-bold uppercase text-gray-500 tracking-widest text-sm bg-gray-100 p-2 border-[4px] border-black inline-block">
                            LOGGED: {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                     </div>

                     {activeTab === 'REVIEWS_RECEIVED' && (
                        <div className="mb-8 flex items-center gap-4">
                           <span className="font-black text-2xl uppercase border-b-4 border-black">FROM:</span>
                           {review.author?.avatar ? (
                             <img src={review.author.avatar} alt="PFP" className="w-12 h-12 object-cover border-[4px] border-black rounded-full" />
                           ) : (
                             <div className="w-12 h-12 border-[4px] border-black bg-[#ffeb3b] text-xl font-black font-[family-name:var(--font-heading)] flex items-center justify-center rounded-full">
                               {review.author?.displayName?.charAt(0) || "U"}
                             </div>
                           )}
                           <Link href={`/user/${review.author?.id}`} className="font-black text-2xl uppercase hover:underline hover:text-[#ff7d85]">{review.author?.displayName}</Link>
                        </div>
                     )}

                     {activeTab === 'REVIEWS_WRITTEN' && (
                         <div className="mb-8">
                             <span className="font-bold text-gray-500 uppercase tracking-widest text-sm border-l-4 border-black pl-3 bg-gray-50 p-2 block w-fit">YOUR REVIEW OF THEIR WORK</span>
                         </div>
                     )}

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {review.observe && (
                           <div className="border-[6px] border-black bg-[#f8fafc] shadow-[6px_6px_0_0_#000] relative pt-12 p-6">
                              <span className="absolute top-0 left-0 bg-black text-white font-[family-name:var(--font-heading)] uppercase px-4 py-2 text-xl">OBSERVE</span>
                              <p className="font-medium text-xl leading-relaxed">{review.observe}</p>
                           </div>
                        )}
                        {review.interrogate && (
                           <div className="border-[6px] border-black bg-[#f8fafc] shadow-[6px_6px_0_0_#000] relative pt-12 p-6">
                              <span className="absolute top-0 left-0 bg-[#ff7d85] text-black font-[family-name:var(--font-heading)] uppercase px-4 py-2 text-xl border-b-[6px] border-r-[6px] border-black">INTERROGATE</span>
                              <p className="font-medium text-xl leading-relaxed">{review.interrogate}</p>
                           </div>
                        )}
                        {review.elevate && (
                           <div className="border-[6px] border-black bg-[#f8fafc] shadow-[6px_6px_0_0_#000] relative pt-12 p-6">
                              <span className="absolute top-0 left-0 bg-[#60a5fa] text-black font-[family-name:var(--font-heading)] uppercase px-4 py-2 text-xl border-b-[6px] border-r-[6px] border-black">ELEVATE</span>
                              <p className="font-medium text-xl leading-relaxed">{review.elevate}</p>
                           </div>
                        )}
                        {review.creative && (
                           <div className="border-[6px] border-black bg-[#f8fafc] shadow-[6px_6px_0_0_#000] relative pt-12 p-6">
                              <span className="absolute top-0 left-0 bg-[#ffeb3b] text-black font-[family-name:var(--font-heading)] uppercase px-4 py-2 text-xl border-b-[6px] border-r-[6px] border-black">CREATIVE</span>
                              <p className="font-medium text-xl leading-relaxed">{review.creative}</p>
                           </div>
                        )}
                     </div>

                     <div className="flex justify-end">
                        <Link href={`/post/${review.post?.id}`} className="font-black text-xl uppercase px-6 py-3 border-[4px] border-black bg-white hover:bg-black hover:text-white transition-colors flex items-center gap-2 shadow-[4px_4px_0_0_#000]">GO TO FULL LOG &rarr;</Link>
                     </div>
                  </article>
               ))}
            </div>
            )}
          </>
        )}

      </main>

    </div>
  );
}
