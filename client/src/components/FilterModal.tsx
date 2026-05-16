"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";

export interface FilterState {
  seekingReview: boolean;
  firstPiece: boolean;
  likedByMe: boolean;
  likedByOthers: boolean;
  following: boolean;
  followers: boolean;
  peerReviewed: boolean;
  sortBy: "Most Recent" | "Oldest" | "Most Liked";
  tags: string[];
  prompts: string[];
  countries: string[];
}

export const defaultFilters: FilterState = {
  seekingReview: false,
  firstPiece: false,
  likedByMe: false,
  likedByOthers: false,
  following: false,
  followers: false,
  peerReviewed: false,
  sortBy: "Most Recent",
  tags: [],
  prompts: [],
  countries: []
};

export default function FilterModal({ 
  isOpen, 
  onClose, 
  availableTags = [], 
  availablePrompts = [], 
  availableCountries = [],
  currentFilters,
  onApply
}: { 
  isOpen: boolean; 
  onClose: () => void;
  availableTags?: string[];
  availablePrompts?: string[];
  availableCountries?: string[];
  currentFilters: FilterState;
  onApply: (filters: FilterState) => void;
}) {
  const [filters, setFilters] = useState<FilterState>(currentFilters);

  // Sync internal state if external props change when opened
  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    setFilters(defaultFilters);
    onApply(defaultFilters);
    onClose();
  };

  const toggleCheckbox = (key: keyof FilterState) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-black">
      <div className="bg-white border-[6px] border-black shadow-[16px_16px_0_0_#000] w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col p-8 brutal-box relative rotate-1">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-black hover:text-[#ff7d85] transition-colors bg-white border-2 border-black p-1 hover:rotate-90">
           <X size={32} />
        </button>

        <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] uppercase border-b-8 border-black pb-4 mb-8 text-[#ffeb3b] drop-shadow-[2px_2px_0_#000]">FILTER MATRIX</h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 flex-1">
           {/* Left Column - Checkboxes */}
           <div className="flex-1 space-y-4 font-bold text-lg border-r-0 md:border-r-4 border-dashed border-gray-400 pr-0 md:pr-8">
              
              <label className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 border-2 border-transparent hover:border-black transition-all group">
                 <input type="checkbox" checked={filters.seekingReview} onChange={() => toggleCheckbox("seekingReview")} className="w-6 h-6 border-4 border-black accent-[#ff7d85] cursor-pointer" />
                 <span className="group-hover:translate-x-1 transition-transform uppercase">Seeking Review</span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 border-2 border-transparent hover:border-black transition-all group opacity-50">
                 <input type="checkbox" checked={filters.firstPiece} onChange={() => toggleCheckbox("firstPiece")} className="w-6 h-6 border-4 border-black accent-[#ff7d85] cursor-pointer" disabled />
                 <span className="line-through uppercase">First Piece (INDEV)</span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 border-2 border-transparent hover:border-black transition-all group">
                 <input type="checkbox" checked={filters.likedByMe} onChange={() => toggleCheckbox("likedByMe")} className="w-6 h-6 border-4 border-black accent-[#ff7d85] cursor-pointer" />
                 <span className="group-hover:translate-x-1 transition-transform uppercase">Pieces I Have Liked</span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 border-2 border-transparent hover:border-black transition-all group">
                 <input type="checkbox" checked={filters.likedByOthers} onChange={() => toggleCheckbox("likedByOthers")} className="w-6 h-6 border-4 border-black accent-[#ff7d85] cursor-pointer" />
                 <span className="group-hover:translate-x-1 transition-transform uppercase">Pieces Liked by Others</span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 border-2 border-transparent hover:border-black transition-all group">
                 <input type="checkbox" checked={filters.following} onChange={() => toggleCheckbox("following")} className="w-6 h-6 border-4 border-black accent-[#ff7d85] cursor-pointer" />
                 <span className="group-hover:translate-x-1 transition-transform uppercase">Writers I Am Following</span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 border-2 border-transparent hover:border-black transition-all group">
                 <input type="checkbox" checked={filters.followers} onChange={() => toggleCheckbox("followers")} className="w-6 h-6 border-4 border-black accent-[#ff7d85] cursor-pointer" />
                 <span className="group-hover:translate-x-1 transition-transform uppercase">Writers Who Follow Me</span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 border-2 border-transparent hover:border-black transition-all group">
                 <input type="checkbox" checked={filters.peerReviewed} onChange={() => toggleCheckbox("peerReviewed")} className="w-6 h-6 border-4 border-black accent-[#ff7d85] cursor-pointer" />
                 <span className="group-hover:translate-x-1 transition-transform uppercase">Pieces With Peer Reviews</span>
              </label>

              {/* Collections Mockups */}
              <label className="flex items-center gap-4 cursor-not-allowed hover:bg-gray-100 p-2 border-2 border-transparent transition-all group opacity-40">
                 <input type="checkbox" disabled className="w-6 h-6 border-4 border-black" />
                 <span className="line-through uppercase">Pieces in Collections</span>
              </label>
              <label className="flex items-center gap-4 cursor-not-allowed hover:bg-gray-100 p-2 border-2 border-transparent transition-all group opacity-40">
                 <input type="checkbox" disabled className="w-6 h-6 border-4 border-black" />
                 <span className="line-through uppercase">Collections I am Following</span>
              </label>

           </div>

           {/* Right Column - Selectors */}
           <div className="flex-1 space-y-6 flex flex-col justify-center font-black">
              
              <div className="flex flex-col gap-2">
                 <label className="uppercase text-sm tracking-widest text-gray-500">Sort By</label>
                 <select 
                   value={filters.sortBy} 
                   onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
                   className="w-full brutal-input font-bold text-lg md:text-xl uppercase border-4 border-black p-3 bg-white"
                 >
                    <option>Most Recent</option>
                    <option>Most Liked</option>
                    <option>Oldest</option>
                 </select>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="uppercase text-sm tracking-widest text-gray-500">Tags</label>
                 <select 
                   value={filters.tags[0] || ""} 
                   onChange={(e) => setFilters({...filters, tags: e.target.value ? [e.target.value] : []})}
                   className="w-full brutal-input font-bold text-lg md:text-xl uppercase border-4 border-black p-3 bg-white"
                 >
                    <option value="">ALL TAGS</option>
                    {availableTags.map(t => <option key={t} value={t}>{t}</option>)}
                 </select>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="uppercase text-sm tracking-widest text-gray-500">Prompts</label>
                 <select 
                   value={filters.prompts[0] || ""} 
                   onChange={(e) => setFilters({...filters, prompts: e.target.value ? [e.target.value] : []})}
                   className="w-full brutal-input font-bold text-lg md:text-xl uppercase border-4 border-black p-3 bg-white"
                 >
                    <option value="">ALL PROMPTS</option>
                    {availablePrompts.map(p => <option key={p} value={p}>{p}</option>)}
                 </select>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="uppercase text-sm tracking-widest text-gray-500">Countries</label>
                 <select 
                   value={filters.countries[0] || ""} 
                   onChange={(e) => setFilters({...filters, countries: e.target.value ? [e.target.value] : []})}
                   className="w-full brutal-input font-bold text-lg md:text-xl uppercase border-4 border-black p-3 bg-white"
                 >
                    <option value="">ALL REGIONS</option>
                    {availableCountries.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
              </div>
           </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row gap-6 border-t-8 border-black pt-8 justify-end">
           <button onClick={handleClear} className="w-full md:w-auto brutal-btn bg-white border-[4px] border-black text-black px-8 py-4 font-[family-name:var(--font-heading)] text-2xl uppercase hover:bg-gray-200">
             PURGE FILTERS
           </button>
           <button onClick={handleApply} className="w-full md:w-auto brutal-btn bg-[#10b981] border-[4px] border-black text-white shadow-[6px_6px_0_0_#000] px-12 py-4 font-[family-name:var(--font-heading)] text-2xl uppercase hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] transition-all">
             EXECUTE DIRECTIVE
           </button>
        </div>

      </div>
    </div>
  );
}
