import { Icon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export function StickyActions() {
  return (
    <>
      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-3 bg-white/95 p-3 backdrop-blur-md border-t border-gray-200 md:hidden pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        {/* Phone Button */}
        <a 
          href={siteConfig.phone.href}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ec4899] text-white shadow-md transition-transform active:scale-95"
          aria-label="Call us"
        >
          <Icon name="phone" size={22} />
        </a>

        {/* Emergency Button */}
        <a 
          href={siteConfig.emergency.href}
          className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-3 text-white shadow-lg transition-transform active:scale-95 border-2 border-red-400/20"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-white to-blue-50 text-red-600 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2v2"/><path d="M12 20v2"/><path d="M5 5l1.5 1.5"/><path d="M19 5l-1.5 1.5"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M5 19l1.5-1.5"/><path d="M19 19l-1.5-1.5"/><circle cx="12" cy="12" r="5"/></svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[0.6rem] font-bold uppercase tracking-widest opacity-90 leading-none">Tap to Call</span>
            <span className="text-[1.05rem] font-extrabold leading-none mt-0.5">24/7 Emergency</span>
          </div>
        </a>

        {/* WhatsApp Button */}
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
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-4 md:flex">
        {/* WhatsApp Button (Top) */}
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

        {/* Phone Button */}
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

        {/* Emergency Button (Bottom) */}
        <a 
          href={siteConfig.emergency.href}
          className="group relative flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#ef4444] text-white shadow-xl transition-transform hover:scale-110"
          aria-label="24/7 Emergency"
        >
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M12 2v2"/><path d="M12 20v2"/><path d="M5 5l1.5 1.5"/><path d="M19 5l-1.5 1.5"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M5 19l1.5-1.5"/><path d="M19 19l-1.5-1.5"/><circle cx="12" cy="12" r="5"/></svg>
           <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-red-600 px-3 py-1.5 text-[0.85rem] font-bold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 pointer-events-none">
            24/7 Emergency
          </span>
        </a>
      </div>
    </>
  );
}
