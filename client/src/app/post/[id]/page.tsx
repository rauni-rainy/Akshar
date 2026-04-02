"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Flame, MessageSquare, Eye, CheckCircle, ArrowLeft, SendHorizontal, CornerDownRight } from "lucide-react";
import ContentRenderer from "../../../components/ContentRenderer";

// Recursive Comment Thread Component
const CommentNode = ({ comment, depth, user, postAuthorId, threadOwnerId, onReply }: any) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    onReply(comment.id, replyText);
    setReplyText("");
    setShowReplyForm(false);
  };

  const isMaxDepth = depth >= 3;
  const isAuthorTurn = depth % 2 === 0;
  const canReply = user && !isMaxDepth && (isAuthorTurn ? user.id === postAuthorId : user.id === threadOwnerId);

  return (
    <div className={`mt-4 ${depth > 0 ? 'ml-6 md:ml-12 border-l-4 border-black pl-4 md:pl-6' : ''}`}>
      <div className="bg-[#f8fafc] border-[4px] border-black p-4 flex flex-col md:flex-row gap-4 mb-2 hover:bg-white transition-colors rotate-0">
         <div className="flex gap-4 items-start w-full">
            <Link href={`/user/${comment.author?.id}`}>
               <div className="w-12 h-12 bg-black text-[#ffeb3b] shrink-0 border-2 border-black font-[family-name:var(--font-heading)] text-2xl flex items-center justify-center uppercase hover:scale-110 hover:rotate-6 transition-transform cursor-crosshair">
                  {comment.author?.displayName?.charAt(0) || "U"}
               </div>
            </Link>
            <div className="flex-1">
               <div className="flex items-center gap-2 mb-1">
                  <Link href={`/user/${comment.author?.id}`}>
                     <p className="font-black text-lg uppercase hover:text-[#60a5fa] hover:underline cursor-crosshair">{comment.author?.displayName}</p>
                  </Link>
                  {comment.author?.id === postAuthorId && (
                     <span className="bg-[#ffeb3b] text-black px-2 py-0.5 text-xs font-black uppercase tracking-widest border border-black shadow-[2px_2px_0_0_#000]">AUTHOR</span>
                  )}
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest hidden md:inline-block">• {new Date(comment.createdAt).toLocaleDateString()}</span>
               </div>
               <p className="font-bold text-gray-800 text-lg md:text-xl whitespace-pre-wrap">{comment.content}</p>
               
               {canReply && (
                  <button onClick={() => setShowReplyForm(!showReplyForm)} className="mt-3 text-sm font-black uppercase tracking-widest hover:text-[#ff7d85] flex items-center gap-1">
                     <CornerDownRight size={16} /> {showReplyForm ? "CANCEL" : (isAuthorTurn ? "RESPOND AS AUTHOR" : "DEPLOY COUNTER-OBSERVATION")}
                  </button>
               )}

               {showReplyForm && (
                  <form onSubmit={handleReply} className="mt-4 flex flex-col gap-2">
                     <textarea 
                        value={replyText} onChange={(e) => setReplyText(e.target.value)} required
                        className="w-full font-bold text-base border-4 border-black p-3 placeholder-gray-400 min-h-[80px]"
                        placeholder={isAuthorTurn ? "RESPOND TO THIS OBSERVATION..." : "CONTINUE THE THREAD..."}
                     />
                     <button type="submit" className="self-end bg-black text-white px-6 py-2 border-2 border-black font-black uppercase hover:bg-[#60a5fa] hover:text-black shadow-[4px_4px_0_0_#000]">
                        DEPLOY
                     </button>
                  </form>
               )}
            </div>
         </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="flex flex-col gap-2">
          {comment.replies.map((reply: any) => (
            <CommentNode 
              key={reply.id} 
              comment={reply} 
              depth={depth + 1} 
              user={user} 
              postAuthorId={postAuthorId} 
              threadOwnerId={threadOwnerId}
              onReply={onReply} 
            />
          ))}
        </div>
      )}
    </div>
  );
};


export default function PostViewer() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [post, setPost] = useState<any>(null);
  const [otherPosts, setOtherPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [commentContent, setCommentContent] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("akshar_user");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (id) fetchPostData();
  }, [id]);

  // Record view logic
  useEffect(() => {
    if (id && user) {
        const token = localStorage.getItem("akshar_token");
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/posts/${id}/view`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }
        }).catch(err => console.error(err));
    }
  }, [id, user?.id]);

  const fetchPostData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);

        const feedRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/posts/feed`);
        if (feedRes.ok) {
           const feedData = await feedRes.json();
           const authorOthers = feedData.filter((p: any) => p.author?.id === data.author?.id && p.id !== data.id);
           setOtherPosts(authorOthers);
        }
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleLike = async () => {
    if (!user) return router.push("/login");
    try {
      const token = localStorage.getItem("akshar_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/posts/${id}/like`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const { liked } = await res.json();
        const hasLiked = post.likes?.some((l: any) => l.userId === user?.id);
        let newLikes = [...(post.likes || [])];
        if (liked && !hasLiked) newLikes.push({ userId: user?.id });
        if (!liked && hasLiked) newLikes = newLikes.filter((l: any) => l.userId !== user?.id);
        setPost({ ...post, likes: newLikes });
      }
    } catch (e) { console.error(e); }
  };

  const handleCommentSubmit = async (e: React.FormEvent, parentId: string | null = null, replyContent: string = "") => {
    e?.preventDefault();
    if (!user) return router.push("/login");

    const payloadContent = parentId ? replyContent : commentContent;
    if (!payloadContent.trim()) return;

    setStatus("TRANSMITTING...");
    try {
      const token = localStorage.getItem("akshar_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/comments/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ content: payloadContent, parentId })
      });

      if (!res.ok) throw new Error("COMMUNICATION BLOCKED.");
      setStatus("COMMUNICATION LOGGED.");
      if (!parentId) setCommentContent("");
      await fetchPostData();
      setTimeout(() => setStatus(""), 3000);
    } catch (err: any) {
      setStatus(err.message);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  if (loading) return <div className="min-h-screen pt-32 text-center text-5xl font-[family-name:var(--font-heading)] uppercase animate-pulse">DECRYPTING TRANSMISSION...</div>;
  if (!post) return <div className="min-h-screen pt-32 text-center text-5xl font-[family-name:var(--font-heading)] uppercase bg-red-500 text-white">404: TRANSMISSION LOST</div>;

  const isAuthor = user?.id === post.author?.id;
  const hasReviewed = post.reviews?.some((r: any) => r.author.id === user?.id);

  return (
    <div className="w-full relative bg-[#f8fafc]">
      
      {/* Dynamic Top Bar Controls */}
      <div className="sticky top-0 z-50 bg-white border-b-[6px] border-black p-4 flex justify-between items-center shadow-[0_8px_0_0_#000]">
         <button onClick={() => router.back()} className="flex items-center gap-2 font-black uppercase text-xl md:text-2xl hover:text-[#60a5fa] transition-colors bg-[#ffeb3b] px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
           <ArrowLeft size={24} /> BACK TO GRID
         </button>
         <div className="flex gap-4 md:gap-8 items-center font-black text-lg md:text-2xl">
            <div className="flex items-center gap-2 border-2 border-black px-3 py-1 bg-white">
               <Flame size={24} className={post.likes?.some((l: any) => l.userId === user?.id) ? "fill-[#ff7d85] text-[#ff7d85]" : "text-black"} /> {post.likes?.length || 0}
            </div>
            <div className="flex items-center gap-2 border-2 border-black px-3 py-1 bg-white">
               <Eye size={24} className="text-[#60a5fa]" /> {post.reviews?.length || 0}
            </div>
            <div className="flex items-center gap-2 border-2 border-black px-3 py-1 bg-white">
               <MessageSquare size={24} className="text-[#ffeb3b]" /> {post.comments?.length || 0}
            </div>
         </div>
      </div>

      <div className="w-full lg:px-12 2xl:px-24 mx-auto px-4 py-16 md:py-24 max-w-[1600px]">
         
         <header className="text-center mb-16 relative">
            <h1 className="text-[4rem] md:text-[8rem] leading-[0.85] font-[family-name:var(--font-heading)] uppercase break-words mb-8 text-black drop-shadow-[4px_4px_0_#60a5fa]">
               {post.title}
            </h1>
            
            <Link href={`/user/${post.author?.id}`}>
               <div className="brutal-box inline-block bg-black text-white px-8 py-4 border-4 border-[#ff7d85] rotate-1 shadow-[8px_8px_0_0_#ffeb3b] cursor-crosshair hover:-rotate-1 hover:scale-105 transition-transform">
                  <p className="text-2xl md:text-4xl font-[family-name:var(--font-heading)] uppercase text-[#ffeb3b] mb-1 hover:text-[#ff7d85]">
                     BY {post.author?.displayName || "CLASSIFIED"}
                  </p>
                  <p className="text-sm md:text-lg font-bold tracking-widest uppercase text-[#e2e8f0]">
                     {(post.author?.country || "Earth").toUpperCase()} • LOGGED: {new Date(post.createdAt).toLocaleDateString()}
                  </p>
               </div>
            </Link>
         </header>

         {/* Tags and Prompts */}
         <div className="flex flex-col items-center gap-6 mb-16">
            {post.prompt && (
               <div className="bg-[#ffeb3b] border-4 border-black p-4 text-center max-w-2xl shadow-[6px_6px_0_0_#000] -rotate-1">
                  <span className="block font-black uppercase tracking-widest text-[#ff7d85] mb-2 text-sm">INSPIRATION PROMPT:</span>
                  <span className="text-xl md:text-2xl font-bold uppercase">{post.prompt}</span>
               </div>
            )}
            
            <div className="flex flex-wrap justify-center gap-3">
               {post.tags?.map((tag: string, idx: number) => (
                  <span key={idx} className="bg-white text-black px-4 py-1 font-black text-sm uppercase border-2 border-black shadow-[2px_2px_0_0_#000] cursor-crosshair hover:bg-black hover:text-white transition-colors">{tag}</span>
               ))}
               <span className="bg-[#60a5fa] text-black px-4 py-1 font-black text-sm uppercase border-2 border-black shadow-[2px_2px_0_0_#000]">{post.type} FORMAT</span>
            </div>
         </div>

         {/* The Core Content */}
         <section className="brutal-box bg-white border-[6px] border-black p-6 md:p-16 mb-24 shadow-[16px_16px_0_0_#000] relative">
            <div className="absolute -top-6 -left-6 bg-black text-white px-6 py-2 border-4 border-black font-black text-2xl uppercase tracking-widest shadow-[4px_4px_0_0_#60a5fa]">
               RAW DATA
            </div>
            
            <ContentRenderer 
               content={post.content} 
               className="font-medium text-lg md:text-xl leading-relaxed text-black mt-4 font-serif" 
            />
         </section>

         {/* Author Note Footnote */}
         {post.authorNote && (
            <div className="bg-[#fffdf5] border-[6px] border-black p-8 md:p-12 mb-24 shadow-[12px_12px_0_0_#ff7d85] rotate-1 mx-4 md:mx-0">
               <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] uppercase text-[#ff7d85] mb-4 border-b-4 border-black pb-2 inline-block">
                  AUTHOR'S FOOTNOTE
               </h3>
               <p className="text-xl md:text-2xl font-bold italic leading-relaxed text-gray-800">
                 "{post.authorNote}"
               </p>
            </div>
         )}
         
         <div className="flex justify-center mb-16">
            <button 
               onClick={handleLike}
               className={`flex items-center gap-4 text-3xl md:text-5xl font-[family-name:var(--font-heading)] uppercase border-[6px] border-black px-12 py-6 transition-transform ${post.likes?.some((l: any) => l.userId === user?.id) ? 'bg-[#ff7d85] text-black shadow-none translate-y-2 translate-x-2' : 'bg-white hover:bg-[#ffeb3b] text-black shadow-[12px_12px_0_0_#000] hover:-translate-y-1 hover-target'}`}
             >
               <Flame size={48} className={post.likes?.some((l: any) => l.userId === user?.id) ? 'fill-black text-black' : ''} /> 
               {post.likes?.some((l: any) => l.userId === user?.id) ? 'MERIT ASSIGNED' : 'ASSIGN MERIT'}
            </button>
         </div>

         {/* Peer Review Matrix */}
         <section className="mb-24">
            <div className="bg-black text-white p-6 border-4 border-[#60a5fa] inline-block mb-8 shadow-[8px_8px_0_0_#60a5fa] -rotate-1">
               <h2 className="text-5xl font-[family-name:var(--font-heading)] uppercase">PEER REVIEWS ({post.reviews?.length || 0})</h2>
            </div>
            
            {user && !isAuthor && (
               <div className="mb-12">
                  <Link href={`/post/${id}/review`} className={`brutal-btn w-full text-2xl md:text-4xl py-6 md:py-8 shadow-[12px_12px_0_0_#000] border-[6px] border-black flex items-center justify-center gap-4 hover-target uppercase font-black tracking-widest text-black block text-center transition-transform hover:-translate-y-2 ${hasReviewed ? 'bg-[#ffeb3b]' : 'bg-[#60a5fa]'}`}>
                     {hasReviewed ? '> UPDATE TRIANGULATION PROTOCOL <' : '> INITIATE TRIANGULATION PROTOCOL <'}
                  </Link>
               </div>
            )}

            <div className="space-y-12">
               {post.reviews?.map((review: any) => (
                  <div key={review.id} className="bg-white border-[6px] border-black p-6 shadow-[8px_8px_0_0_#000]">
                     <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-6">
                        <div className="flex items-center gap-4 mb-2">
                           <div className="w-16 h-16 bg-[#ffeb3b] border-4 border-black font-[family-name:var(--font-heading)] text-3xl flex items-center justify-center shadow-[4px_4px_0_0_#000]">
                              {review.rating}
                           </div>
                           <div>
                              <Link href={`/user/${review.author?.id}`}>
                                 <p className="font-black text-2xl uppercase hover:text-[#60a5fa] hover:underline cursor-crosshair">INSPECTOR: {review.author?.displayName}</p>
                              </Link>
                              <p className="text-gray-500 font-bold uppercase text-sm tracking-widest">LOGGED: {new Date(review.createdAt).toLocaleDateString()}</p>
                           </div>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {review.observe && (
                           <div className="bg-[#f8fafc] border-4 border-black p-4">
                              <h4 className="font-black uppercase text-sm tracking-widest text-[#60a5fa] mb-2 border-b-2 border-black pb-1 inline-block">1. OBSERVED</h4>
                              <p className="font-bold text-lg">{review.observe}</p>
                           </div>
                        )}
                        {review.interrogate && (
                           <div className="bg-[#f8fafc] border-4 border-black p-4">
                              <h4 className="font-black uppercase text-sm tracking-widest text-[#ff7d85] mb-2 border-b-2 border-black pb-1 inline-block">2. INTERROGATED</h4>
                              <p className="font-bold text-lg">{review.interrogate}</p>
                           </div>
                        )}
                        {review.elevate && (
                           <div className="bg-[#f8fafc] border-4 border-black p-4 md:col-span-2">
                              <h4 className="font-black uppercase text-sm tracking-widest text-[#ffeb3b] mb-2 border-b-2 border-black pb-1 inline-block">3. ELEVATED</h4>
                              <p className="font-bold text-lg">{review.elevate}</p>
                           </div>
                        )}
                        {review.creative && (
                           <div className="bg-black text-white border-4 border-black p-4 md:col-span-2">
                              <h4 className="font-black uppercase text-sm tracking-widest text-white mb-2 border-b-2 border-white pb-1 inline-block">THE LOUD QUESTION</h4>
                              <p className="font-bold text-lg">{review.creative}</p>
                           </div>
                        )}
                     </div>

                     {review.annotations && review.annotations.length > 0 && (
                        <div className="border-t-4 border-black pt-6">
                           <h4 className="font-[family-name:var(--font-heading)] text-2xl uppercase mb-4 text-[#ff7d85]">ANNOTATIONS ({review.annotations.length})</h4>
                           <div className="space-y-4">
                              {review.annotations.map((ann: any, idx: number) => (
                                 <div key={idx} className="bg-[#e2e8f0] border-l-[6px] border-black p-4 flex flex-col gap-2">
                                    <p className="italic font-serif text-lg bg-white p-2 border-2 border-gray-400 border-dashed">"{ann.quote}"</p>
                                    <p className="font-black text-lg text-black mt-2">&rarr; {ann.comment}</p>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </section>

         {/* General Comments Logic */}
         <section className="mb-24">
            <div className="bg-[#ffeb3b] text-black p-4 inline-block border-4 border-black shadow-[6px_6px_0_0_#000] mb-8 rotate-1">
               <h2 className="text-4xl font-[family-name:var(--font-heading)] uppercase">COMMUNICATION MATRIX ({post.comments?.length || 0})</h2>
            </div>
            
            {user && !isAuthor && (
               <form onSubmit={(e) => handleCommentSubmit(e, null)} className="flex flex-col gap-4 mb-12">
                  <textarea 
                     value={commentContent} onChange={(e) => setCommentContent(e.target.value)} required
                     className="w-full font-bold text-xl border-[6px] border-black p-6 placeholder-gray-400 shadow-[8px_8px_0_0_#000] min-h-[120px] resize-y italic"
                     placeholder="ADD A ROOT OBSERVATION..."
                  />
                  <p className={`font-black uppercase ${status.includes('FAIL') || status.includes('BLOCK') ? 'text-red-500' : 'text-[#60a5fa]'}`}>{status}</p>
                  <button type="submit" className="w-full bg-black text-white px-8 py-5 border-4 border-black font-[family-name:var(--font-heading)] uppercase text-3xl hover:bg-[#ff7d85] hover:text-black hover:-translate-y-1 transition-all shadow-[6px_6px_0_0_#ff7d85] flex justify-center items-center gap-4">
                     SEND TRANSMISSION <SendHorizontal size={32} />
                  </button>
               </form>
            )}

            <div className="flex flex-col gap-6">
               {post.comments?.map((comment: any) => (
                  <CommentNode 
                    key={comment.id} 
                    comment={comment} 
                    depth={0} 
                    user={user} 
                    postAuthorId={post.author?.id}
                    threadOwnerId={comment.author?.id}
                    onReply={(parentId: string, replyText: string) => handleCommentSubmit(null as any, parentId, replyText)}
                  />
               ))}
               {!post.comments?.length && <p className="text-2xl font-black uppercase text-gray-400 border-4 border-gray-200 p-8 text-center border-dashed">NO OBSERVATIONS RECORDED YET.</p>}
            </div>
         </section>
      </div>

      {otherPosts.length > 0 && (
         <div className="w-full bg-black text-white border-t-[8px] border-[#ff7d85] py-24 px-4 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff7d85] blur-[100px] opacity-20 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto z-10 relative">
               <h2 className="text-5xl md:text-[6rem] font-[family-name:var(--font-heading)] uppercase mb-12 text-[#ffeb3b]">
                  MORE BY THIS AGENT
               </h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((op: any) => (
                     <Link key={op.id} href={`/post/${op.id}`} className="brutal-box block bg-white border-[6px] border-white text-black p-6 md:p-8 hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#ff7d85] transition-all">
                        <div className="flex justify-between items-start mb-4">
                           <span className="bg-black text-white px-3 py-1 font-black text-xs uppercase tracking-widest">{op.type}</span>
                           <span className="flex items-center gap-1 font-black"><Flame size={16} /> {op.likes?.length || 0}</span>
                        </div>
                        <h3 className="text-3xl font-[family-name:var(--font-heading)] uppercase leading-none mb-4">{op.title}</h3>
                        <ContentRenderer 
                           content={op.content} 
                           className="font-medium text-lg text-gray-700 line-clamp-3"
                           truncate={true}
                           maxLength={150}
                        />
                     </Link>
                  ))}
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
