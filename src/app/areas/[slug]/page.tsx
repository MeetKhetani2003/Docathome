import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  AreasSection,
  Bullets,
  Chip,
  ComparisonSection,
  EmergencyNotice,
  FaqBlock,
  FinalCta,
  HowItWorks,
  InfoCard,
  PageHeader,
  ServiceListLinks,
} from "@/components/blocks";
import { BookingForm } from "@/components/BookingForm";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { makeMetadata, abs, breadcrumb, faqSchema, serviceSchema } from "@/lib/seo";
import { areaBySlug, areas, services, siteConfig, type Faq } from "@/lib/site";
import { WhatsAppButton } from "@/components/ui";

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

function metaFor(slug: string) {
  const area = areaBySlug(slug);
  if (!area) return null;
  return makeMetadata({
    title: `Doctor Home Visit ${area.name} | Docathome`,
    description: `A doctor comes to your home in ${area.name}. ${siteConfig.price.amount} flat visit fee, paid after the visit, usually about 15 minutes arrival and one week free follow-up. Call ${siteConfig.phone.display}.`,
    path: `/areas/${area.slug}`,
    keywords: [`doctor at home ${area.name}`, `doctor home visit ${area.name}`, `home doctor consultation ${area.name}`],
  });
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Metadata | Promise<Metadata> {
  return params.then(({ slug }) => metaFor(slug) ?? {});
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areaBySlug(slug);
  if (!area) notFound();

  const faqItems: Faq[] = [
    {
      q: `Do you cover every part of ${area.name}?`,
      a: `${area.name} is listed as a Docathome service area. ${area.note}`,
    },
    {
      q: `How fast can a doctor reach ${area.name}?`,
      a: "The doctor usually reaches in about 15 minutes. Traffic, the exact locality and current doctor availability affect that, so we confirm the time with you before dispatch.",
    },
    {
      q: `What does a home visit cost in ${area.name}?`,
      a: `The flat visit fee is ${siteConfig.price.amount}, paid after the visit. ${siteConfig.followUp.sentence}`,
    },
    {
      q: `Can I book for a relative living in ${area.name}?`,
      a: "Yes. A family member can give us the patient's age, symptoms and the address in the patient's building or locality, and we confirm the visit from there.",
    },
    {
      q: `Is Docathome an emergency service in ${area.name}?`,
      a: "No. For chest pain, breathing trouble, heavy bleeding or loss of consciousness, call 112 or go to the nearest hospital immediately.",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={`Doctor home visits · ${area.region}`}
        title={`A doctor at your door in ${area.name}`}
        lede={`${area.line} without the journey. Fever, infections, BP and sugar checks, elderly care, children's complaints and dressing changes — examined at home, prescription written on the spot, ${siteConfig.price.amount} flat fee paid after the visit.`}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Areas", href: "/areas" },
          { name: area.name, href: `/areas/${area.slug}` },
        ]}
        chips={
          <>
            <Chip icon="rupee">{siteConfig.price.amount} flat visit fee</Chip>
            <Chip icon="clock">{siteConfig.arrival.short} typical arrival</Chip>
            <Chip icon="refresh">1 week free follow-up</Chip>
          </>
        }
        aside={
          <div className="card p-5 shadow-soft">
            <p className="font-display text-[0.78rem] font-bold uppercase tracking-[0.13em] text-muted">
              Booking in {area.name}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
              The fastest route is a WhatsApp message with the patient&apos;s age, the problem and your locality. We
              reply with the confirmed arrival time.
            </p>
            <div className="mt-4 grid gap-2.5">
              <WhatsAppButton
                label={`Message us about ${area.name}`}
                className="w-full min-h-[48px] text-[0.95rem]"
                text={`Hello Docathome, I need a doctor home visit in ${area.name}.`}
              />
              <a
                href={siteConfig.phone.href}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-line px-4 text-[0.95rem] font-semibold text-brand-deep transition-colors hover:bg-brand-tint"
              >
                <Icon name="phone" size={17} /> Call {siteConfig.phone.display}
              </a>
            </div>
            <p className="mt-3 text-[0.82rem] text-muted">{area.note}</p>
          </div>
        }
      />

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <h2 className="h2">Home doctor care in {area.name}, without the clinic queue</h2>
            <p className="lede mt-4">
              For families in {area.name}, the obstacle to a consultation is rarely the consultation. It is the
              lift, the car, the traffic and the waiting room — especially when the patient is elderly, feverish or
              recovering from a procedure. A Docathome visit keeps the medical part and removes the travel part.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <InfoCard title={`Pricing in ${area.name}`} icon="rupee">
                The flat visit fee is {siteConfig.price.amount}, whatever the time of the request. You pay{" "}
                {siteConfig.price.amount} after the doctor has examined the patient — not before.
              </InfoCard>
              <InfoCard title="Arrival time" icon="clock" tone="accent">
                {siteConfig.arrival.sentence} It is an honest estimate rather than a guarantee, and we confirm it with
                you when you call.
              </InfoCard>
            </div>

            <h2 className="h2 mt-12">What we can see at a {area.name} home visit</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="card card-hover flex h-full items-start gap-3 p-4"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-brand-tint text-brand">
                      <Icon name={s.icon as never} size={19} />
                    </span>
                    <span>
                      <span className="block font-display text-[0.99rem] font-bold text-brand-deep">{s.name}</span>
                      <span className="mt-1 block text-[0.88rem] leading-snug text-muted">{s.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="h2 mt-12">Coverage in and around {area.name}</h2>
            <Bullets
              items={[
                `${area.name} is published as a Docathome service ${area.region ? `area (${area.region})` : "area"}.`,
                "Exact locality, sector or colony is confirmed on call — we do not promise an address we cannot reach.",
                "If the nearest available doctor would be late, we tell you before you commit.",
                "For an emergency in any part of the city, call 112 or go to the nearest hospital.",
              ]}
            />

            <EmergencyNotice className="mt-10" />
          </div>

          <aside className="lg:pt-2">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <BookingForm context={`Doctor home visit needed in ${area.name} — `} />
              <div className="card mt-6 p-5">
                <p className="font-display text-[0.78rem] font-bold uppercase tracking-[0.13em] text-muted">
                  Other areas we visit
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.95rem]">
                  {areas
                    .filter((a) => a.slug !== area.slug)
                    .map((a) => (
                      <li key={a.slug}>
                        <Link
                          href={`/areas/${a.slug}`}
                          className="font-semibold text-brand underline-offset-4 hover:underline"
                        >
                          {a.name}
                        </Link>
                      </li>
                    ))}
                </ul>
                <div className="mt-5 border-t border-line pt-4">
                  <p className="font-display text-[0.78rem] font-bold uppercase tracking-[0.13em] text-muted">
                    Other services
                  </p>
                  <div className="mt-2">
                    <ServiceListLinks />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <HowItWorks />
      <ComparisonSection />
      <FaqBlock items={faqItems} id="area-faq" eyebrow={`${area.name} FAQ`} title={`Questions from ${area.name} families`} />
      <AreasSection />
      <FinalCta
        title={`Book a doctor in ${area.name}`}
        body={`One call or one WhatsApp message. ${siteConfig.price.note} ${siteConfig.followUp.sentence}`}
      />

      <JsonLd
        schemas={[
          serviceSchema({
            name: `Doctor home visit in ${area.name}`,
            description: `${area.line}. ${siteConfig.price.amount} flat visit fee, paid after the visit.`,
            url: `/areas/${area.slug}`,
            areaName: area.name,
          }),
          faqSchema(faqItems.map(({ q, a }) => ({ q, a }))),
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Areas", path: "/areas" },
            { name: area.name, path: `/areas/${area.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            name: `Docathome — ${area.name} home visits`,
            url: abs(`/areas/${area.slug}`),
            description: `${area.line}. Non-emergency doctor home visits, ${siteConfig.price.amount} flat visit fee.`,
            areaServed: { "@type": "City", name: area.name },
            telephone: "+91-9625853584",
            priceRange: siteConfig.price.amount,
            availableService: services.map((s) => ({ "@type": "MedicalProcedure", name: s.name })),
            hasMap: undefined,
          },
        ]}
      />
    </>
  );
}
