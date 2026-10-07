import Link from "next/link";
import { Chip, EmergencyNotice, FinalCta, PageHeader } from "@/components/blocks";
import { FaqAccordion } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { makeMetadata, breadcrumb, faqSchema } from "@/lib/seo";
import { faqs, siteConfig } from "@/lib/site";
import { WhatsAppButton } from "@/components/ui";

export const metadata = makeMetadata({
  title: "Doctor Home Visit FAQ | Docathome",
  description:
    "Answers on pricing (₹899 flat, paid after the visit), typical arrival time, coverage across Delhi NCR, booking for parents and children, follow-up, and what to do in an emergency.",
  path: "/faq",
  keywords: ["doctor home visit cost Delhi", "doctor at home FAQ", "home visit price", "doctor home visit Delhi NCR questions"],
});

export default function FaqPage() {
  const groups = Array.from(new Set(faqs.map((f) => f.group ?? "General")));

  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Straight answers before you book"
        lede="Pricing, arrival time, coverage, booking for someone else, follow-up and the limits of a home visit. If something is still unclear, ask us directly — we would rather answer than have you guess."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
        chips={
          <>
            <Chip icon="rupee">{siteConfig.price.amount} flat visit fee</Chip>
            <Chip icon="clock">{siteConfig.arrival.short} typical arrival</Chip>
            <Chip icon="refresh">1 week free follow-up</Chip>
          </>
        }
      />

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <nav aria-label="FAQ categories" className="mb-7 flex flex-wrap gap-2">
              {groups.map((g) => (
                <a
                  key={g}
                  href={`#${encodeURIComponent(g.toLowerCase().replace(/\s+/g, "-"))}`}
                  className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.82rem] font-semibold text-brand-deep transition-colors hover:border-brand hover:bg-brand-tint"
                >
                  {g}
                </a>
              ))}
            </nav>

            <div className="space-y-9">
              {groups.map((g) => (
                <div key={g} id={g.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-32">
                  <h2 className="font-display text-[0.8rem] font-bold uppercase tracking-[0.15em] text-muted">
                    {g}
                  </h2>
                  <FaqAccordion
                    className="mt-3"
                    idPrefix={`faq-${g.toLowerCase().replace(/\s+/g, "-")}`}
                    items={faqs.filter((f) => (f.group ?? "General") === g)}
                  />
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="card p-5">
              <p className="font-display text-[1.08rem] font-bold text-brand-deep">Talk to us</p>
              <p className="mt-2 text-[0.94rem] leading-relaxed text-muted">
                Describe the patient&apos;s condition in one message. We will tell you whether a home visit makes
                sense, and what the arrival time would likely be.
              </p>
              <div className="mt-4 grid gap-2.5">
                <a
                  href={siteConfig.phone.href}
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-brand px-4 text-[0.96rem] font-bold text-white transition-colors hover:bg-brand-dark"
                  aria-label={`Call Docathome on ${siteConfig.phone.display}`}
                >
                  <Icon /> Call {siteConfig.phone.display}
                </a>
                <WhatsAppButton
                  label="Ask on WhatsApp"
                  className="w-full min-h-[50px] text-[0.96rem]"
                  text="Hi Docathome, I have a question before booking a doctor home visit."
                />
                <Link
                  href="/book"
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-line px-4 text-[0.95rem] font-semibold text-brand-deep transition-colors hover:bg-brand-tint"
                >
                  Request a visit form
                </Link>
              </div>
            </div>
            <EmergencyNotice className="mt-6" />
          </aside>
        </div>
      </section>

      <FinalCta />

      <JsonLd schemas={[faqSchema(faqs), breadcrumb([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])]} />
    </>
  );
}

function Icon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.2 3.6 9.9 7 8.1 8.8a12 12 0 0 0 6.3 6.3l1.8-1.8 3.4 1.7v3a1.8 1.8 0 0 1-2 1.8C10.9 19.3 4.4 12.8 3.6 5.6a1.8 1.8 0 0 1 1.8-2Z" />
    </svg>
  );
}
