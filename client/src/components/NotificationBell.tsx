"use client";

import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotificationBell() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const fetchNotifications = async () => {
        const token = localStorage.getItem("akshar_token");
        if (!token) return;

        try {
            const res = await fetch("http://localhost:5000/api/notifications", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setNotifications(data);
            }
        } catch (err) {
            console.error("Failed to fetch notifications");
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 15000);
        return () => clearInterval(interval);
    }, []);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleRead = async (id: string, link: string) => {
        const token = localStorage.getItem("akshar_token");
        if (!token) return;

        await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
            method: 'PUT',
            headers: { "Authorization": `Bearer ${token}` }
        });

        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
        setIsOpen(false);
        if (link) {
            router.push(link);
        }
    };

    const handleReadAll = async () => {
        const token = localStorage.getItem("akshar_token");
        if (!token) return;

        await fetch(`http://localhost:5000/api/notifications/read-all`, {
            method: 'PUT',
            headers: { "Authorization": `Bearer ${token}` }
        });

        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    return (
        <div className="relative z-50">
            {/* Bell Toggle */}
            <button 
               onClick={() => setIsOpen(!isOpen)}
               className="relative border-[4px] border-black bg-white p-2 md:p-3 shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#ffeb3b] transition-all"
            >
                <Bell size={24} className={unreadCount > 0 ? "fill-[#ff7d85] text-black" : "text-black"} />
                {unreadCount > 0 && (
                    <span className="absolute -top-3 -right-3 bg-black text-white px-2 py-0.5 text-xs font-black border-2 border-[#ff7d85] rounded-full animate-bounce">
                        {unreadCount}
                    </span>
                )}
            </button>

            {/* Slide-over Panel */}
            {isOpen && (
                <>
                   <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsOpen(false)}/>
                   <div className="fixed top-0 right-0 w-full md:w-[400px] h-screen bg-[#f8fafc] border-l-[8px] border-black shadow-[-16px_0_0_0_#60a5fa] z-50 flex flex-col transform transition-transform duration-300">
                       <div className="flex justify-between items-center p-6 border-b-8 border-black bg-[#ffeb3b]">
                           <h2 className="text-4xl font-[family-name:var(--font-heading)] uppercase text-black italic">ALERTS</h2>
                           <button onClick={() => setIsOpen(false)} className="hover:text-[#ff7d85] transition-colors"><X size={32}/></button>
                       </div>

                       <div className="p-4 bg-white border-b-4 border-black flex justify-between items-center">
                           <span className="font-bold text-sm tracking-widest uppercase text-gray-600">UNREAD: {unreadCount}</span>
                           {unreadCount > 0 && (
                               <button onClick={handleReadAll} className="text-xs font-black uppercase underline decoration-2 hover:text-[#60a5fa]">MARK ALL READ</button>
                           )}
                       </div>

                       <div className="flex-1 overflow-y-auto p-4 space-y-4">
                           {notifications.length === 0 ? (
                               <div className="text-center p-8 text-gray-400 font-bold uppercase tracking-widest">NO NEW DIRECTIVES</div>
                           ) : (
                               notifications.map(n => (
                                   <div 
                                      key={n.id} 
                                      onClick={() => handleRead(n.id, n.link)}
                                      className={`p-4 border-4 border-black cursor-pointer transition-transform hover:-rotate-1 ${n.isRead ? 'bg-white opacity-60' : 'bg-[#fffdf5] shadow-[6px_6px_0_0_#000]'}`}
                                   >
                                       <div className="flex justify-between items-start mb-2">
                                          <span className="font-black String px-2 py-0.5 text-xs uppercase bg-black text-white">{n.type}</span>
                                          {!n.isRead && <span className="w-3 h-3 bg-[#ff7d85] border-2 border-black rounded-full" />}
                                       </div>
                                       <p className="font-bold text-sm leading-snug">{n.message}</p>
                                       <p className="text-xs text-gray-500 font-black tracking-widest mt-2">{new Date(n.createdAt).toLocaleDateString()}</p>
                                   </div>
                               ))
                           )}
                       </div>
                   </div>
                </>
            )}
        </div>
    );
}
