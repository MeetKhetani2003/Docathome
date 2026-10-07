"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Mobile-only fixed action bar. Hidden while the nav sheet is open
 * (body scroll lock) and never covers the footer thanks to the body
 * padding rule in globals.css.
 */
export function MobileCtaBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onNav = (e: Event) => setHidden((e as CustomEvent<boolean>).detail === true);
    window.addEventListener("docathome:nav", onNav);
    return () => window.removeEventListener("docathome:nav", onNav);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-surface/98 backdrop-blur-md transition-transform duration-300 lg:hidden",
        hidden ? "translate-y-full" : "translate-y-0",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      role="region"
      aria-label="Quick actions"
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={siteConfig.phone.href}
          className="inline-flex min-h-[50px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-line bg-surface text-[0.95rem] font-semibold text-brand-deep"
          aria-label={`Call Docathome on ${siteConfig.phone.display}`}
        >
          <Icon name="phone" size={18} />
          Call Now
        </a>
        <a
          href={siteConfig.phone.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[50px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-wa text-[0.95rem] font-semibold text-white"
          aria-label="Message Docathome on WhatsApp"
        >
          <Icon name="whatsapp" size={18} />
          WhatsApp
        </a>
        <Link
          href="/book"
          className="inline-flex min-h-[50px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand text-[0.95rem] font-semibold text-white"
        >
          <Icon name="calendar" size={18} />
          Book Visit
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2 border-t border-line/70 py-1 text-[0.72rem] font-semibold text-muted">
        <span>{siteConfig.price.amount} flat fee</span>
        <span aria-hidden="true">·</span>
        <span>{siteConfig.arrival.short} typical arrival</span>
      </div>
    </div>
  );
}
