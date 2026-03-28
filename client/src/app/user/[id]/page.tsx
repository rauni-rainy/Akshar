"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function PublicProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPublicProfile();
  }, [id]);

  const fetchPublicProfile = async () => {
    try {
      // In a real app we'd have a specific public fetch endpoint,
      // here we simulate it by finding the user's posts or having a GET /api/users/:id
      // Wait, we don't have a GET /api/users/:id endpoint!
      // But we can check if we want to implement it, for now, we'll gracefully mock it from posts data
      // or we can just fetch posts and extract the author data if possible.
      // Wait, all published posts contain the author details. This works!
      
      const res = await fetch("http://localhost:5000/api/posts/feed");
      const posts: any[] = await res.json();
      
      const userPosts = posts.filter(p => p.authorId === id);
      
      if (userPosts.length > 0) {
          const authorInfo = userPosts[0].author;
          setProfile({
              ...authorInfo,
              posts: userPosts,
              createdAt: userPosts[0].createdAt // mock member since
          });
      } else {
          setError("OPERATIVE CLASSIFIED OR NO INTEL FOUND.");
      }
    } catch (err: any) {
      setError("FAILED TO SECURE PROXY CONNECTION.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
     return <div className="min-h-screen pt-32 text-center text-5xl font-['Bebas_Neue'] uppercase animate-pulse">DECRYPTING IDENTITY...</div>;
  }

  if (error || !profile) {
     return (
        <div className="min-h-[85vh] flex items-center justify-center flex-col">
            <h1 className="text-6xl font-black mb-4 uppercase">404 NOT FOUND</h1>
            <p className="border-[6px] border-black p-4 text-2xl font-bold bg-[#ff7d85] shadow-[8px_8px_0_0_#000] -rotate-2">{error}</p>
            <Link href="/dashboard" className="text-xl font-bold underline mt-8 uppercase hover:text-[#60a5fa]">&larr; ABORT MISSION</Link>
        </div>
     );
  }

  return (
    <>
      <div className="min-h-[85vh] p-4 md:p-12 relative w-full max-w-4xl mx-auto flex flex-col items-center">
         
         <div className="w-full brutal-box bg-white p-8 md:p-16 border-[6px] border-black shadow-[16px_16px_0_0_#000] rotate-1">
            <div className="flex flex-col items-center mb-12">
               {profile.avatar ? (
                  <img src={profile.avatar} className="w-48 h-48 rounded-full object-cover border-[6px] border-black shadow-[4px_4px_0_0_#000] mb-6" alt="Avatar"/>
               ) : (
                  <div className="w-48 h-48 rounded-full border-[6px] border-black bg-[#ffeb3b] text-8xl font-black font-[family-name:var(--font-heading)] flex items-center justify-center shadow-[4px_4px_0_0_#000] mb-6">
                    {profile.displayName.charAt(0)}
                  </div>
               )}
               <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-heading)] uppercase">{profile.displayName}</h1>
               <p className="text-xl font-bold text-gray-500 uppercase tracking-widest mt-2">({profile.country || "Earth"})</p>
               
               <div className="flex gap-4 font-black mt-8 text-sm md:text-lg border-y-4 border-black py-4 w-full justify-center">
                   <span>FOLLOWING: ???</span> | <span>FOLLOWERS: ???</span> | <span className="text-[#ff7d85]">{profile.posts.length * 12} REP</span>
               </div>
            </div>

            <h3 className="text-4xl font-[family-name:var(--font-heading)] border-b-8 border-black pb-2 mb-8 uppercase text-[#60a5fa]">PUBLIC DIRECTIVES</h3>
            <div className="space-y-8">
               {profile.posts.map((post: any) => (
                  <div key={post.id} className="bg-[#f8fafc] p-6 border-4 border-black shadow-[6px_6px_0_0_#000]">
                      <div className="flex justify-between border-b-2 border-dashed border-gray-400 pb-4 mb-4">
                        <h4 className="text-3xl font-[family-name:var(--font-heading)] uppercase leading-none">{post.title}</h4>
                        <span className="font-bold">{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-lg font-medium whitespace-pre-wrap">{post.content}</p>
                      
                      {post.tags?.length > 0 && (
                         <div className="flex flex-wrap gap-2 mt-6">
                           {post.tags.map((tag: string, i: number) => (
                              <span key={i} className="px-3 py-1 font-black text-xs uppercase bg-[#ffeb3b] border-2 border-black">{tag}</span>
                           ))}
                         </div>
                      )}
                  </div>
               ))}
            </div>
         </div>
      </div>
    </>
  );
}
