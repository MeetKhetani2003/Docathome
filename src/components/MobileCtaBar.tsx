"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

export function MobileCtaBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onNav = (e: Event) => setHidden((e as CustomEvent<boolean>).detail === true);
    window.addEventListener("docathome:nav", onNav);
    return () => window.removeEventListener("docathome:nav", onNav);
  }, []);

  return (
    <>
      {/* Mobile Sticky Bottom Bar */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-[60] flex items-center justify-between gap-3 bg-white/95 p-3 backdrop-blur-md border-t border-line/40 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 md:hidden",
          hidden ? "translate-y-full" : "translate-y-0",
        )}
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
        role="region"
        aria-label="Quick actions"
      >
        <a 
          href={siteConfig.phone.href}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ec4899] text-white shadow-md transition-transform active:scale-95"
          aria-label="Call us"
        >
          <Icon name="phone" size={22} />
        </a>

        <a 
          href={siteConfig.emergency.href}
          className="relative flex h-[3.2rem] flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-3 text-white shadow-lg transition-transform active:scale-95 border-2 border-red-400/20"
        >
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping-small opacity-30"></span>
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-white to-blue-50 text-red-600 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[1.1rem] h-[1.1rem]"><path d="M12 2v2"/><path d="M12 20v2"/><path d="M5 5l1.5 1.5"/><path d="M19 5l-1.5 1.5"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M5 19l1.5-1.5"/><path d="M19 19l-1.5-1.5"/><circle cx="12" cy="12" r="5"/></svg>
          </div>
          <div className="relative flex flex-col text-left">
            <span className="text-[0.6rem] font-bold uppercase tracking-widest opacity-90 leading-none">Tap to Call</span>
            <span className="text-[1rem] font-extrabold leading-[1.1] mt-[1px]">24/7 Emergency</span>
          </div>
        </a>

        <a 
          href={siteConfig.phone.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#22c55e] text-white shadow-md transition-transform active:scale-95"
          aria-label="WhatsApp us"
        >
          <Icon name="whatsapp" size={24} />
        </a>
      </div>

      {/* Desktop Floating Buttons (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-[60] hidden flex-col items-end gap-4 md:flex">
        <a 
          href={siteConfig.phone.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#22c55e] text-white shadow-lg transition-transform hover:scale-110"
          aria-label="WhatsApp us"
        >
          <Icon name="whatsapp" size={24} />
          <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-black/80 backdrop-blur-sm px-3 py-1.5 text-[0.85rem] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
            WhatsApp Us
          </span>
        </a>

        <a 
          href={siteConfig.phone.href}
          className="group relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#ec4899] text-white shadow-lg transition-transform hover:scale-110"
          aria-label="Call us"
        >
          <Icon name="phone" size={22} />
          <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-black/80 backdrop-blur-sm px-3 py-1.5 text-[0.85rem] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
            Call Us
          </span>
        </a>

        <a 
          href={siteConfig.emergency.href}
          className="relative flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#ef4444] px-5 text-white shadow-xl transition-transform hover:scale-105"
        >
           <span className="absolute inset-0 rounded-full bg-[#ef4444] animate-ping-small opacity-30"></span>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative w-5 h-5"><path d="M12 2v2"/><path d="M12 20v2"/><path d="M5 5l1.5 1.5"/><path d="M19 5l-1.5 1.5"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M5 19l1.5-1.5"/><path d="M19 19l-1.5-1.5"/><circle cx="12" cy="12" r="5"/></svg>
           <span className="relative font-bold whitespace-nowrap text-[0.95rem]">24/7 Emergency</span>
        </a>
      </div>
    </>
  );
}
