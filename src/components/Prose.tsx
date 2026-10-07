import type { ReactNode } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/blocks";
import { Icon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

/** Readable long-form wrapper for legal, policy and text-heavy pages. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="prose-x max-w-3xl">
      <style>{`
        .prose-x h2{font-family:var(--font-display);font-size:clamp(1.35rem,2.2vw,1.72rem);font-weight:800;letter-spacing:-0.02em;color:var(--color-brand-deep);margin-top:2.4rem;margin-bottom:0.7rem;line-height:1.15}
        .prose-x h3{font-family:var(--font-display);font-size:1.12rem;font-weight:700;color:var(--color-brand-deep);margin-top:1.6rem;margin-bottom:0.4rem}
        .prose-x p{margin:0 0 1rem;font-size:1rem;line-height:1.72;color:var(--color-muted)}
        .prose-x ul,.prose-x ol{margin:0 0 1.15rem;padding-left:1.25rem;color:var(--color-muted)}
        .prose-x ul{list-style:disc}
        .prose-x ol{list-style:decimal}
        .prose-x li{margin-bottom:0.45rem;font-size:0.98rem;line-height:1.65}
        .prose-x li::marker{color:var(--color-brand)}
        .prose-x strong{color:var(--color-brand-deep);font-weight:700}
        .prose-x a{color:var(--color-brand);font-weight:600;text-underline-offset:3px;text-decoration-line:underline}
        .prose-x a:hover{color:var(--color-brand-dark)}
      `}</style>
      {children}
    </div>
  );
}

export function LegalShell({
  title,
  eyebrow,
  lede,
  path,
  crumbName,
  children,
}: {
  title: string;
  eyebrow: string;
  lede: string;
  path: string;
  crumbName: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        crumbs={[
          { name: "Home", href: "/" },
          { name: crumbName, href: path },
        ]}
      />
      <section className="section">
        <div className="shell">
          <Prose>{children}</Prose>
          <div className="mt-12 rounded-[18px] border border-line bg-surface p-5">
            <p className="flex flex-wrap items-center gap-3 text-[0.95rem] text-muted">
              <Icon name="phone" size={17} className="text-brand" />
              Questions about this page? Call {siteConfig.phone.display} or{" "}
              <Link href="/contact" className="font-bold text-brand underline underline-offset-4">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
