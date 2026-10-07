"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig, primaryNav, areas } from "@/lib/site";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5"
      aria-label="Docathome — home"
    >
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-[13px] bg-brand text-white shadow-[0_8px_20px_-12px_rgba(11,111,107,0.9)] transition-transform duration-200 group-hover:-translate-y-0.5">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3.4 10.6 12 3.6l8.6 7v9.8H3.4Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path d="M12 9.8v6.2M8.9 12.9h6.2" stroke="#F2B544" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.32rem] font-extrabold tracking-[-0.03em]",
            onDark ? "text-white" : "text-brand-deep",
          )}
        >
          Docat<span className={onDark ? "text-[#7ec5bd]" : "text-brand"}>home</span>
        </span>
        <span
          className={cn(
            "mt-1 text-[0.63rem] font-semibold uppercase tracking-[0.19em]",
            onDark ? "text-white/55" : "text-muted",
          )}
        >
          Doctor home visits
        </span>
      </span>
    </Link>
  );
}

export function AnnouncementBar() {
  return (
    <div className="bg-brand-deep text-white">
      <div className="shell flex min-h-[38px] flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1.5 text-[0.78rem] sm:text-[0.82rem]">
        <p className="flex items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7ec5bd] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7ec5bd]" />
          </span>
          <span className="text-white/85">
            Doctors visiting homes in <strong className="font-semibold text-white">Delhi · Gurgaon · Noida · Ghaziabad</strong>
          </span>
        </p>
        <div className="flex items-center gap-4">
          <span className="hidden text-white/70 md:inline">₹899 flat visit fee · pay after the visit</span>
          <a
            href={siteConfig.phone.href}
            className="inline-flex items-center gap-1.5 font-semibold text-white underline-offset-4 hover:underline"
          >
            <Icon name="phone" size={14} />
            {siteConfig.phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}

function NavLinks({ onNavigate, onDark = false }: { onNavigate?: () => void; onDark?: boolean }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
      {primaryNav
        .filter((item) => item.href !== "/book")
        .map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.replace("#", "/#"));

          if (item.label === "Areas") {
            return (
              <div key={item.href} className="group relative">
                <Link
                  href="/areas"
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-[0.95rem] font-semibold transition-colors flex items-center gap-1",
                    onDark ? "text-white/80 hover:text-white" : "text-brand-deep/80 hover:text-brand",
                    !onDark && active && "text-brand",
                  )}
                >
                  Areas
                  <Icon name="chevronDown" size={14} className="opacity-70 transition-transform group-hover:rotate-180" />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-accent transition-transform duration-200",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48 z-50">
                  <div className="rounded-xl border border-line bg-surface p-1.5 shadow-lift">
                    {areas.map((area) => (
                      <Link
                        key={area.slug}
                        href={`/areas/${area.slug}`}
                        onClick={onNavigate}
                        className="block rounded-lg px-3 py-2 text-[0.9rem] font-semibold text-brand-deep hover:bg-brand-tint hover:text-brand transition-colors"
                      >
                        {area.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative rounded-lg px-3 py-2 text-[0.95rem] font-semibold transition-colors",
                onDark ? "text-white/80 hover:text-white" : "text-brand-deep/80 hover:text-brand",
                !onDark && active && "text-brand",
              )}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-accent transition-transform duration-200",
                  active ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          );
        })}
    </nav>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onFocusIn = (e: FocusEvent) => {
      if (!sheetRef.current || !e.target || !("contains" in sheetRef.current)) return;
      if (!(sheetRef.current as HTMLElement).contains(e.target as Node)) {
        (sheetRef.current as HTMLElement).focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open]);

  useEffect(() => setOpen(false), []);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  // Let the fixed mobile action bar get out of the way while the sheet is open.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("docathome:nav", { detail: open }));
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-line bg-surface/95 shadow-[0_6px_24px_-18px_rgba(16,53,54,0.5)] backdrop-blur-md"
            : "border-b border-transparent bg-surface",
        )}
      >
        <div
          className={cn(
            "shell flex items-center justify-between transition-[height] duration-300",
            scrolled ? "h-[62px]" : "h-[74px]",
          )}
        >
          <Logo />

          <div className="hidden xl:block">
            <NavLinks />
          </div>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.phone.href}
              className="hidden items-center gap-2 rounded-xl border border-line px-3.5 py-2.5 text-[0.92rem] font-semibold text-brand-deep transition-colors hover:border-brand hover:bg-brand-tint md:inline-flex"
              aria-label={`Call Docathome on ${siteConfig.phone.display}`}
            >
              <Icon name="phone" size={17} />
              <span className="hidden lg:inline">Call</span>
            </a>
            <a
              href={siteConfig.phone.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-xl bg-wa px-3.5 py-2.5 text-[0.92rem] font-semibold text-white transition-colors hover:bg-wa-dark sm:inline-flex"
              aria-label={`Message Docathome on WhatsApp at ${siteConfig.phone.display}`}
            >
              <Icon name="whatsapp" size={17} />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>
            <Link
              href="/book"
              className="hidden items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-[0.92rem] font-semibold text-white shadow-[0_10px_26px_-16px_rgba(11,111,107,0.95)] transition-colors hover:bg-brand-dark min-[420px]:inline-flex"
            >
              Book a Visit
              <Icon name="arrowRight" size={16} />
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line text-brand-deep transition-colors hover:bg-brand-tint xl:hidden"
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>

        {/* compact nav row on large-but-not-xl screens */}
        <div className="hidden border-t border-line bg-surface/80 py-1.5 backdrop-blur lg:block xl:hidden">
          <div className="shell">
            <NavLinks />
          </div>
        </div>
      </header>

      {/* Mobile / tablet sheet */}
      <div
        className={cn(
          "fixed inset-0 z-[70] xl:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        inert={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-brand-deep/45 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          id="mobile-nav"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          tabIndex={-1}
          className={cn(
            "absolute inset-x-0 top-0 flex max-h-[92vh] flex-col overflow-y-auto rounded-b-[26px] bg-surface shadow-lift outline-none transition-transform duration-300 ease-out",
            open ? "translate-y-0" : "-translate-y-full",
          )}
          style={{ boxShadow: open ? "0 24px 60px -20px rgba(16,53,54,0.45)" : "none" }}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              onClick={() => {
                setOpen(false);
                toggleRef.current?.focus();
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line text-brand-deep hover:bg-brand-tint"
              aria-label="Close navigation menu"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          <nav aria-label="Mobile" className="px-5 py-2">
            <ul className="divide-y divide-line">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[56px] items-center justify-between text-[1.08rem] font-semibold text-brand-deep"
                  >
                    {item.label}
                    <Icon name="arrowRight" size={18} className="text-brand" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-2.5 border-t border-line bg-paper px-5 py-5">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-xl bg-brand px-5 text-[1.02rem] font-semibold text-white"
            >
              Book a Home Visit
              <Icon name="arrowRight" size={18} />
            </Link>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={siteConfig.phone.href}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 text-[0.98rem] font-semibold text-brand-deep"
              >
                <Icon name="phone" size={18} /> Call
              </a>
              <a
                href={siteConfig.phone.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-wa px-4 text-[0.98rem] font-semibold text-white"
              >
                <Icon name="whatsapp" size={18} /> WhatsApp
              </a>
            </div>
            <p className="pt-1 text-center text-[0.82rem] text-muted">
              {siteConfig.price.amount} flat visit fee · {siteConfig.arrival.short} typical arrival
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
