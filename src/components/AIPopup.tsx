"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export function AIPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if they have already seen it in this session to prevent annoyance
    const hasSeen = sessionStorage.getItem("seenAIPopup");
    if (hasSeen) return;

    // Show after 12 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("seenAIPopup", "true");
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-[360px] overflow-hidden rounded-[20px] bg-white shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand to-brand-dark p-5 text-white">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 rounded-full p-1.5 transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="flex items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-wider text-white/90">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5z" clipRule="evenodd" />
            </svg>
            Wait! Try for free
          </div>
          <h2 className="mt-1.5 text-[1.4rem] font-bold leading-tight">Consult Dr. Priyanka AI</h2>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-[0.95rem] leading-relaxed text-[#4a5568]">
            Get instant answers to your health questions from <span className="font-bold text-brand">Dr. Priyanka AI</span> — our AI-powered doctor available 24x7. Free, private & no waiting.
          </p>
          
          <div className="mt-6 flex flex-col gap-3">
            <a 
              href={`${siteConfig.phone.whatsapp}?text=Hi%20Dr.%20Priyanka%20AI`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-dark px-4 text-[0.95rem] font-bold text-white shadow-md transition-transform active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v4" />
                <line x1="8" y1="16" x2="8" y2="16" />
                <line x1="16" y1="16" x2="16" y2="16" />
              </svg>
              Talk to Dr. Priyanka AI Now
            </a>
            
            <a 
              href={siteConfig.phone.href}
              className="flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-[0.95rem] font-bold text-gray-700 transition-colors hover:bg-gray-50 active:scale-[0.98]"
            >
              <Icon name="phone" size={18} className="text-brand" />
              Call Us: {siteConfig.phone.display}
            </a>
          </div>

          {/* Footer badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[0.72rem] font-semibold text-gray-500">
            <span className="flex items-center gap-1">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-brand text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              Instant AI Responses
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">⭐</span> 4.9 Rating
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span>🔒</span> 100% Private
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
