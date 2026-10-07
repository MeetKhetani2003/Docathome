import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Bullets,
  Chip,
  EmergencyNotice,
  FaqBlock,
  FinalCta,
  HowItWorks,
  InfoCard,
  PageHeader,
  ServiceListLinks,
} from "@/components/blocks";
import { BookingForm } from "@/components/BookingForm";
import { Icon, type IconName } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { makeMetadata, abs, breadcrumb, faqSchema, serviceSchema } from "@/lib/seo";
import { areas, serviceBySlug, services, siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function metaFor(slug: string) {
  const s = serviceBySlug(slug);
  if (!s) return null;
  return makeMetadata({
    title: `${s.name} Doctor Home Visit | Docathome`,
    description: `${s.summary} A doctor examines the patient at home across Delhi NCR. ${siteConfig.price.amount} flat visit fee, paid after the visit, with one week of free follow-up.`,
    path: `/services/${s.slug}`,
    keywords: [
      `${s.shortName.toLowerCase()} doctor at home`,
      `${s.shortName.toLowerCase()} home visit Delhi`,
      `doctor home visit for ${s.shortName.toLowerCase()}`,
    ],
  });
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Metadata | Promise<Metadata> {
  return params.then(({ slug }) => metaFor(slug) ?? {});
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  const faqItems = [...service.faqs, { q: "How much does this home visit cost?", a: `The flat visit fee is ${siteConfig.price.amount}, paid after the visit. One week of follow-up for the same problem is free.` }];

  return (
    <>
      <PageHeader
        eyebrow={`Service · ${service.name}`}
        title={service.name}
        lede={service.intro}
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
        chips={
          <>
            <Chip icon="rupee">{siteConfig.price.amount} flat visit fee</Chip>
            <Chip icon="clock">Usually reaches in about 15 minutes</Chip>
            <Chip icon="refresh">1 week free follow-up</Chip>
            <Chip icon="mapPin">Delhi NCR</Chip>
          </>
        }
        aside={
          <div className="relative rounded-[22px] border border-line bg-surface p-5 shadow-soft">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-[16px] bg-brand text-white">
              <Icon name={service.icon as IconName} size={28} />
            </span>
            <p className="mt-4 font-display text-[1.05rem] font-bold text-brand-deep">Book this visit</p>
            <p className="mt-1.5 text-[0.93rem] leading-relaxed text-muted">
              Send us the patient&apos;s details and we confirm the doctor and the arrival time.
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <Link
                href="/book"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-brand px-5 text-[0.98rem] font-bold text-white transition-colors hover:bg-brand-dark"
              >
                Book a Home Visit <Icon name="arrowRight" size={17} />
              </Link>
              <a
                href={siteConfig.phone.href}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-line px-5 text-[0.96rem] font-semibold text-brand-deep transition-colors hover:bg-brand-tint"
              >
                <Icon name="phone" size={17} /> {siteConfig.phone.display}
              </a>
            </div>
          </div>
        }
      />

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h2 className="h2">What this service covers</h2>
            <div className="mt-6">
              <Bullets items={service.covers} />
            </div>

            <h2 className="h2 mt-12">What to expect during the visit</h2>
            <ol className="mt-6 space-y-3">
              {service.expect.map((e, i) => (
                <li key={e} className="flex gap-4 rounded-[16px] border border-line bg-surface p-4">
                  <span className="num inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-tint text-[0.85rem] font-extrabold text-brand">
                    {i + 1}
                  </span>
                  <span className="text-[0.97rem] leading-relaxed text-brand-deep/85">{e}</span>
                </li>
              ))}
            </ol>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              <InfoCard title="Who it may help" icon="users">
                {service.who}
              </InfoCard>
              <InfoCard title="When a home visit is useful" icon="house" tone="accent">
                <ul className="space-y-2">
                  {service.usefulWhen.map((u) => (
                    <li key={u} className="flex gap-2">
                      <Icon name="check" size={15} className="mt-1 shrink-0 text-accent-ink" />
                      {u}
                    </li>
                  ))}
                </ul>
              </InfoCard>
            </div>

            <EmergencyNotice className="mt-10" />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
            <BookingForm />

            <div className="card p-5">
              <p className="font-display text-[0.78rem] font-bold uppercase tracking-[0.13em] text-muted">
                Also booked for
              </p>
              <div className="mt-3">
                <ServiceListLinks current={service.slug} />
              </div>
            </div>

            <div className="rounded-[18px] bg-brand-deep p-5 text-white">
              <p className="font-display text-[0.78rem] font-bold uppercase tracking-[0.13em] text-white/70">
                Where we visit
              </p>
              <ul className="mt-3 space-y-2 text-[0.95rem]">
                {areas.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/areas/${a.slug}`}
                      className="inline-flex items-center gap-2 text-white/85 underline-offset-4 hover:text-white hover:underline"
                    >
                      <Icon name="mapPin" size={15} className="text-accent" /> Doctor at home in {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <HowItWorks compact />

      <FaqBlock
        id="service-faq"
        items={faqItems}
        eyebrow="Service FAQ"
        title={`${service.name} — common questions`}
        intro="Short answers based on what Docathome publishes. Anything specific to the patient should be asked at the visit."
      />

      <FinalCta
        title={`Book a ${service.shortName.toLowerCase()} home visit`}
        body={`Call ${siteConfig.phone.display} or send the details on WhatsApp. ${siteConfig.price.note} ${siteConfig.followUp.sentence}`}
      />

      <JsonLd
        schemas={[
          serviceSchema({
            name: `Doctor home visit — ${service.name}`,
            description: service.summary,
            url: `/services/${service.slug}`,
          }),
          faqSchema(faqItems.map(({ q, a }) => ({ q, a }))),
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: `${service.name} | Docathome`,
            url: abs(`/services/${service.slug}`),
            about: { "@id": `${abs("/")}/#organization` },
          },
        ]}
      />
    </>
  );
}
