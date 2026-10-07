import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold leading-none transition-all duration-200 min-h-[52px] px-6 text-[1.02rem] active:translate-y-px";

export const btn = {
  primary: cn(base, "bg-brand text-white shadow-[0_10px_28px_-16px_rgba(11,111,107,0.9)] hover:bg-brand-dark"),
  wa: cn(base, "bg-wa text-white hover:bg-wa-dark"),
  outline: cn(base, "border border-line bg-surface text-brand-deep hover:border-brand hover:bg-brand-tint"),
  ghostLight: cn(base, "border border-white/25 bg-white/10 text-white hover:bg-white/20"),
  emerg: cn(base, "bg-emerg text-white hover:brightness-95"),
  quiet: cn(base, "border border-line bg-transparent text-brand-deep hover:bg-brand-tint"),
};

export function BookButton({
  label = "Book a Visit",
  className,
  size = "md",
  as = "link",
  href = "/book",
}: {
  label?: string;
  className?: string;
  size?: "md" | "lg";
  as?: "link" | "anchor";
  href?: string;
}) {
  const cls = cn(btn.primary, size === "lg" && "min-h-[58px] text-[1.08rem] px-8", className);
  return as === "link" ? (
    <Link href={href} className={cls}>
      {label}
      <Icon name="arrowRight" size={19} />
    </Link>
  ) : (
    <a href={href} className={cls}>
      {label}
      <Icon name="arrowRight" size={19} />
    </a>
  );
}

export function CallButton({
  label = "Call",
  className,
  variant = "outline",
  showNumber = false,
}: {
  label?: string;
  className?: string;
  variant?: "outline" | "primary" | "quiet";
  showNumber?: boolean;
}) {
  const styles =
    variant === "primary" ? btn.primary : variant === "quiet" ? btn.quiet : btn.outline;
  return (
    <a
      href={siteConfig.phone.href}
      className={cn(styles, className)}
      aria-label={`Call Docathome on ${siteConfig.phone.display}`}
    >
      <Icon name="phone" size={19} />
      {label}
      {showNumber && <span className="hidden sm:inline font-normal opacity-80">{siteConfig.phone.display}</span>}
    </a>
  );
}

export function WhatsAppButton({
  label = "WhatsApp Us",
  className,
  text,
  variant = "wa",
}: {
  label?: string;
  className?: string;
  text?: string;
  variant?: "wa" | "outline";
}) {
  const href = text
    ? `${siteConfig.phone.whatsapp}?text=${encodeURIComponent(text)}`
    : siteConfig.phone.whatsapp;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(variant === "wa" ? btn.wa : cn(btn.outline, "hover:border-wa hover:text-wa-dark"), className)}
      aria-label={`Message Docathome on WhatsApp at ${siteConfig.phone.display}`}
    >
      <Icon name="whatsapp" size={19} />
      {label}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Layout helpers                                                      */
/* ------------------------------------------------------------------ */

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-4", light && "text-white/70", align === "center" && "justify-center")}>
          {eyebrow}
        </p>
      )}
      <Heading className={cn(Heading === "h2" ? "h2" : "h3", light && "text-white")}>{title}</Heading>
      {intro && (
        <p className={cn("lede mt-4", light && "text-white/75", align === "center" && "mx-auto")}>{intro}</p>
      )}
    </div>
  );
}

export function IconTile({
  name,
  tone = "brand",
  size = 44,
}: {
  name: IconName;
  tone?: "brand" | "accent" | "light" | "emerg";
  size?: number;
}) {
  const tones = {
    brand: "bg-brand-tint text-brand",
    accent: "bg-accent-soft text-accent-ink",
    light: "bg-white/10 text-white",
    emerg: "bg-emerg-soft text-emerg",
  };
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-[14px]", tones[tone])}
      style={{ width: size, height: size }}
    >
      <Icon name={name} size={Math.round(size * 0.55)} />
    </span>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.78rem] font-semibold tracking-wide text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
