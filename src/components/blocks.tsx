import Link from "next/link";
import type { ReactNode } from "react";
import {
  areas,
  comparison,
  demoNote,
  experienceNotes,
  faqs,
  services,
  siteConfig,
  steps,
  trustPoints,
  whyDocathome,
  type Area,
  type Service,
} from "@/lib/site";
import { Icon, type IconName } from "@/components/icons";
import { IconTile, SectionHead, WhatsAppButton, btn } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/Faq";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Page header (interior pages)                                        */
/* ------------------------------------------------------------------ */

export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
  chips,
  aside,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  crumbs?: { name: string; href: string }[];
  chips?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-tint blur-2xl"
        aria-hidden="true"
      />
      <div className="shell relative py-12 md:py-16 lg:py-20">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[0.82rem] text-muted">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <Icon name="arrowRight" size={13} className="text-line" />}
                  {i === crumbs.length - 1 ? (
                    <span className="font-semibold text-brand-deep">{c.name}</span>
                  ) : (
                    <Link href={c.href} className="underline-offset-2 hover:text-brand hover:underline">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={cn("grid gap-10", !!aside && "lg:grid-cols-[1.35fr_1fr] lg:items-center")}>
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h1 className="text-[clamp(2.15rem,5.2vw,3.25rem)] leading-[1.05]">{title}</h1>
            <p className="lede mt-5 max-w-2xl">{lede}</p>
            {chips && <div className="mt-7 flex flex-wrap gap-2.5">{chips}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}

export function Chip({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-2 text-[0.85rem] font-semibold text-brand-deep">
      <Icon name={icon} size={16} className="text-brand" />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Trust strip                                                         */
/* ------------------------------------------------------------------ */

export function TrustStrip({ items = null }: { items?: { value: string; label: string }[] | null }) {
  const data = items ?? [
    { value: siteConfig.price.amount, label: siteConfig.price.label },
    { value: siteConfig.arrival.short, label: siteConfig.arrival.label },
    { value: siteConfig.followUp.short, label: siteConfig.followUp.label },
    { value: siteConfig.areasLabel, label: "Home visits" },
  ];
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-y border-line bg-surface px-5 py-6 sm:px-7 md:grid-cols-4 md:divide-x md:divide-line md:py-7">
      {data.map((d, i) => (
        <div key={d.label} className={cn("flex items-baseline gap-3 md:block", i > 0 && "md:pl-6")}>
          <p className="num text-[1.6rem] font-extrabold leading-none text-brand md:text-[1.9rem]">{d.value}</p>
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.11em] text-muted md:mt-2">{d.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal as="li" delay={index * 60} className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="card card-hover group flex h-full flex-col p-5 focus-visible:outline-offset-4 sm:p-6"
      >
        <div className="flex items-start justify-between">
          <IconTile name={service.icon as IconName} />
          <span className="num text-[0.78rem] font-bold tracking-wider text-brand/45">
            {String(index + 1).padStart(2, "0")}
            <span className="text-line">/{String(services.length).padStart(2, "0")}</span>
          </span>
        </div>
        <h3 className="h3 mt-5">{service.name}</h3>
        <p className="mt-2.5 flex-1 text-[0.97rem] leading-relaxed text-muted">{service.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[0.88rem] font-bold text-brand">
          What a visit covers
          <Icon
            name="arrowRight"
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </Reveal>
  );
}

export function ServiceGrid({
  heading = true,
  limit,
}: {
  heading?: boolean;
  limit?: number;
}) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <section id="services" className="section scroll-mt-28">
      <div className="shell">
        {heading && (
          <SectionHead
            eyebrow="What we treat"
            title="Everyday illness and ongoing care"
            intro="Care for common health concerns, routine checks and patients who find it difficult to travel."
          />
        )}
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.95rem] text-muted">
          <span>Not sure which one fits? Describe it to us and we will tell you honestly.</span>
          <Link href="/services" className="inline-flex items-center gap-1.5 font-bold text-brand underline-offset-4 hover:underline">
            All services <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why choose us                                                       */
/* ------------------------------------------------------------------ */

export function WhyChooseUs() {
  return (
    <section id="why" className="section scroll-mt-28 bg-paper-warm">
      <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            eyebrow="Why Docathome"
            title="Why choose care at home?"
            intro="A home visit is not a shortcut around medicine. It is the same examination, prescription and advice, without the part that hurts most — travelling while you are unwell."
          />
          <div className="card mt-7 p-5">
            <ul className="space-y-3.5">
              {trustPoints.map((t) => (
                <li key={t.title} className="flex gap-3">
                  <IconTile name={t.icon as IconName} size={36} />
                  <div>
                    <p className="text-[0.95rem] font-bold leading-snug text-brand-deep">{t.title}</p>
                    <p className="mt-0.5 text-[0.88rem] leading-relaxed text-muted">{t.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {whyDocathome.map((w, i) => (
            <Reveal as="li" key={w.title} delay={i * 55} className="h-full">
              <div className="card card-hover flex h-full flex-col p-5">
                <IconTile name={w.icon as IconName} />
                <h3 className="mt-4 font-display text-[1.05rem] font-bold leading-snug text-brand-deep">{w.title}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

export function HowItWorks({ compact = false }: { compact?: boolean }) {
  return (
    <section id="how-it-works" className="section scroll-mt-28 bg-surface">
      <div className="shell">
        <SectionHead
          eyebrow="How it works"
          title="Four steps, and the doctor is at your door"
          intro="No app to install, no account to create. You speak to a person, and the visit is confirmed."
        />

        <ol className="relative mt-11 grid gap-9 lg:grid-cols-4 lg:gap-7">
          {!compact && (
            <span
              className="pointer-events-none absolute left-[27px] top-3 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-brand via-brand/45 to-line lg:left-0 lg:top-[27px] lg:h-px lg:w-full lg:bg-gradient-to-r lg:from-line lg:via-brand/40 lg:to-line"
              aria-hidden="true"
            />
          )}
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 90} className="relative flex gap-4 lg:block">
              <div className="relative z-10 flex flex-col items-start">
                <span className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-full border border-brand/25 bg-brand-tint font-display text-[1.15rem] font-extrabold text-brand shadow-[0_0_0_6px_rgba(255,255,255,1)]">
                  {s.n}
                </span>
                <span className="mt-3 h-10 w-px bg-line lg:hidden" aria-hidden="true" />
              </div>
              <div className={cn("flex-1", !compact && "lg:pt-1")}>
                <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-muted">
                  <Icon name={s.icon as IconName} size={15} className="text-brand" />
                  Step {s.n}
                </span>
                <h3 className="h3 mt-2">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Clinic vs home                                                      */
/* ------------------------------------------------------------------ */

export function ComparisonSection() {
  return (
    <section id="compare" className="section scroll-mt-28">
      <div className="shell">
        <SectionHead
          eyebrow="Clinic vs home"
          title="Why travel when the doctor can come to you?"
          intro="Hospitals are the right place for emergencies and complex care. For a routine consultation, the journey is often the hardest part of the day — so we remove it."
          align="center"
        />
        <div className="mt-10 overflow-hidden rounded-[24px] border border-line bg-surface">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
            <h3 className="border-b border-line bg-paper px-5 py-3.5 text-center font-display text-[0.85rem] font-bold uppercase tracking-[0.13em] text-muted md:border-b-0 md:border-r md:px-7">
              Traditional clinic visit
            </h3>
            <div aria-hidden="true" className="hidden items-center bg-paper px-3 md:flex">
              <span className="num text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-muted">vs</span>
            </div>
            <h3 className="border-t border-line bg-brand px-5 py-3.5 text-center font-display text-[0.85rem] font-bold uppercase tracking-[0.13em] text-white md:border-t-0 md:border-l md:px-7 lg:py-3.5">
              Docathome home visit
            </h3>
          </div>

          <ul>
            {comparison.map((row, i) => (
              <li
                key={row.label}
                className={cn(
                  "grid gap-1 px-5 py-4 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-0 md:px-7 md:py-5",
                  i !== comparison.length - 1 && "border-b border-line",
                )}
              >
                <span className="flex items-start gap-2.5 text-[0.97rem] text-muted md:pr-6">
                  <Icon name="close" size={16} className="mt-1 shrink-0 text-muted/60" />
                  <span className="line-through decoration-muted/25 decoration-1">{row.label}</span>
                </span>
                <span aria-hidden="true" className="hidden md:block md:px-4">
                  <Icon name="arrowRight" size={18} className="text-accent" />
                </span>
                <span className="flex items-start gap-2.5 text-[0.99rem] font-semibold text-brand-deep md:justify-end md:pl-6 md:text-right">
                  <span className="flex-1 md:flex-none">{row.home}</span>
                  <Icon name="check" size={17} className="mt-1 shrink-0 text-brand" />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-[0.88rem] leading-relaxed text-muted">
          Clinics and hospitals remain essential. Docathome is meant for appropriate non-emergency care where travel,
          queues or mobility are the obstacle.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Emergency notice                                                    */
/* ------------------------------------------------------------------ */

export function EmergencyNotice({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="emergency-title"
      className={cn(
        "rounded-[20px] border border-emerg-line bg-emerg-soft p-5 sm:p-6",
        className,
      )}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-emerg/10 text-emerg">
            <Icon name="alert" size={22} />
          </span>
          <div>
            <h2 id="emergency-title" className="font-display text-[1.2rem] font-extrabold text-emerg">
              Emergency?
            </h2>
            <p className="mt-1 max-w-xl text-[0.95rem] leading-relaxed text-brand-deep/80">
              For chest pain, breathing trouble, heavy bleeding or loss of consciousness, call 112 or go to the
              nearest hospital right away. Docathome is a home consultation service, not an ambulance or emergency
              service.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2.5">
          <a href={siteConfig.emergency.href} className={cn(btn.emerg, "min-h-[48px] px-5 text-[0.95rem]")}>
            <Icon name="phone" size={18} /> Call 112
          </a>
          <a
            href="https://www.google.com/maps/search/hospital+near+me"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              btn.outline,
              "min-h-[48px] border-emerg-line bg-surface px-5 text-[0.95rem] text-emerg hover:border-emerg",
            )}
          >
            <Icon name="mapPin" size={18} /> Find nearest hospital
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Areas                                                               */
/* ------------------------------------------------------------------ */

export function AreaCard({ area, index }: { area: Area; index: number }) {
  return (
    <Reveal as="li" delay={index * 55} className="h-full">
      <Link
        href={`/areas/${area.slug}`}
        className="card card-hover group relative flex h-full flex-col overflow-hidden p-5"
      >
        <span
          className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-tint transition-transform duration-300 group-hover:scale-125"
          aria-hidden="true"
        />
        <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-[12px] bg-brand-deep text-white">
          <Icon name="mapPin" size={19} />
        </span>
        <h3 className="relative mt-4 font-display text-[1.22rem] font-extrabold text-brand-deep">{area.name}</h3>
        <p className="relative mt-0.5 text-[0.78rem] font-semibold uppercase tracking-[0.11em] text-muted">
          {area.region}
        </p>
        <p className="relative mt-3 flex-1 text-[0.93rem] leading-relaxed text-muted">{area.line}</p>
        <span className="relative mt-4 inline-flex items-center gap-1.5 text-[0.86rem] font-bold text-brand">
          Doctor at home in {area.name}
          <Icon name="arrowRight" size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}

export function AreasSection({ heading = true }: { heading?: boolean }) {
  return (
    <section id="areas" className="section scroll-mt-28 bg-surface">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          {heading && (
            <SectionHead
              eyebrow="Where we visit"
              title="Delhi NCR areas we cover"
              intro={`Home visits across Delhi NCR. ${siteConfig.price.amount} flat visit fee. Call us to confirm your exact locality.`}
            />
          )}
          <p className="text-[0.93rem] leading-relaxed text-muted lg:pb-2">
            Coverage is confirmed on call so we never send a doctor to an address we cannot reach in time. If your
            area is not listed, still call — availability changes as our doctor network grows.
          </p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a, i) => (
            <AreaCard key={a.slug} area={a} index={i} />
          ))}
          <li className="flex flex-col justify-between rounded-[16px] border border-dashed border-brand/45 bg-brand-tint/50 p-5">
            <div>
              <h3 className="font-display text-[1.15rem] font-extrabold text-brand-deep">Outside these areas?</h3>
              <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">
                Message us the locality and the patient's condition. We will tell you straight away whether a home
                visit is possible.
              </p>
            </div>
            <WhatsAppButton
              label="Ask on WhatsApp"
              variant="outline"
              className="mt-4 min-h-[44px] w-full bg-surface px-4 text-[0.9rem]"
              text="Hi, do you cover my area for a doctor home visit?"
            />
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Visual / experience                                                 */
/* ------------------------------------------------------------------ */

export function VisualBand() {
  return (
    <section id="care-at-home" className="scroll-mt-28 bg-brand-deep text-white">
      <div className="shell grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <Reveal>
          <p className="eyebrow kicker-light mb-4">Care in the comfort of home</p>
          <h2 className="h2 text-white">The examination is the same. The waiting is gone.</h2>
          <p className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-white/72">
            The doctor examines the patient where they are most comfortable, explains the diagnosis in plain language
            and writes the prescription before leaving. Family can stay in the room, ask questions and keep the
            records.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {experienceNotes.map((n) => (
              <div key={n.title} className="rounded-[16px] border border-white/12 bg-white/[0.06] p-5">
                <span className="inline-flex items-center gap-2 font-display text-[0.95rem] font-bold text-white">
                  <Icon name={n.icon as IconName} size={18} className="text-accent" />
                  {n.title}
                </span>
                <ul className="mt-3 space-y-2">
                  {n.items.map((it) => (
                    <li key={it} className="flex gap-2 text-[0.9rem] leading-relaxed text-white/70">
                      <Icon name="check" size={15} className="mt-1 shrink-0 text-[#7ec5bd]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/how-it-works" className={cn(btn.primary, "border border-white/20 bg-white text-brand-deep hover:bg-white/90")}>
              See how it works
              <Icon name="arrowRight" size={18} />
            </Link>
            <WhatsAppButton
              label="Talk to us on WhatsApp"
              className="border border-white/22 bg-white/10 hover:bg-white/18"
              text="Hi Docathome, I would like to understand how a home visit works."
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <figure className="relative">
            <div className="overflow-hidden rounded-[24px] border border-white/12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/elderly-examination.jpg"
                width={900}
                height={675}
                loading="lazy"
                decoding="async"
                alt="An Indian woman doctor checking an elderly patient's blood pressure on a home sofa while his daughter stands beside them"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="absolute -bottom-5 left-4 right-4 rounded-[16px] border border-line bg-surface p-4 text-brand-deep shadow-lift sm:left-6 sm:right-auto sm:max-w-[300px]">
              <p className="flex items-center gap-2 font-display text-[0.95rem] font-bold">
                <Icon name="badge" size={17} className="text-brand" />
                Well-qualified MBBS doctors and specialists
              </p>
              <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">
                Our MBBS doctors, and specialists when your condition needs one, come to your home.
              </p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Photographic ribbon                                                 */
/* ------------------------------------------------------------------ */

export function ImageRibbon({
  src,
  alt,
  caption,
  note,
  className,
}: {
  src: string;
  alt: string;
  caption: string;
  note: string;
  className?: string;
}) {
  return (
    <section aria-label={caption} className={cn("pt-1", className)}>
      <div className="shell">
        <figure className="relative overflow-hidden rounded-[24px] border border-line bg-brand-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            width={1500}
            height={1000}
            loading="lazy"
            decoding="async"
            alt={alt}
            className="h-[210px] w-full object-cover sm:h-[250px] lg:h-[320px]"
          />
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-deep/88 via-brand-deep/45 to-transparent"
            aria-hidden="true"
          />
          <figcaption className="absolute inset-y-0 left-0 flex max-w-lg flex-col justify-center gap-2.5 p-5 sm:p-8">
            <p className="font-display text-[1.2rem] font-extrabold leading-tight text-white sm:text-[1.6rem]">
              {caption}
            </p>
            <p className="text-[0.92rem] leading-relaxed text-white/80">{note}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials (clearly sample content)                               */
/* ------------------------------------------------------------------ */

const samples = [
  {
    quote:
      "We called at 9pm when my father's fever crossed 101. The doctor reached in about fifteen minutes and we did not have to lift him into a car.",
    who: "Adult son booking for his father",
    place: "Dwarka",
  },
  {
    quote:
      "The dressing change every third day was impossible for my mother. Having it done at home, with the same doctor explaining each step, changed everything.",
    who: "Daughter, caregiver",
    place: "Gurgaon",
  },
  {
    quote:
      "Two lines on the prescription, clear dosing, and a follow-up call the next week with no extra charge. Simple, which is what you want when a child is sick.",
    who: "Parent of a four-year-old",
    place: "Noida",
  },
];

export function TestimonialSection() {
  return (
    <section id="patients" className="section scroll-mt-28">
      <div className="shell">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHead
            eyebrow="Patient experience"
            title="What families tell us matters"
            intro="How the service is meant to feel, described in the words we hope patients would use."
          />
          <p className="shrink-0 rounded-full border border-accent/60 bg-accent-soft px-3.5 py-1.5 text-[0.76rem] font-bold uppercase tracking-[0.1em] text-accent-ink">
            Demo content
          </p>
        </div>

        <p className="mt-5 max-w-2xl text-[0.86rem] font-semibold text-muted">{demoNote}</p>

        <ul className="mt-9 grid gap-5 md:grid-cols-3">
          {samples.map((s, i) => (
            <Reveal as="li" key={s.who} delay={i * 70} className="h-full">
              <figure className="card card-hover flex h-full flex-col p-6">
                <span aria-hidden="true" className="font-display text-[2.6rem] leading-[0.6] text-brand/25">
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 text-[1rem] leading-relaxed text-brand-deep/90">
                  {s.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-tint font-display text-[0.82rem] font-extrabold text-brand"
                    aria-hidden="true"
                  >
                    {s.place.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="text-[0.88rem] leading-tight">
                    <span className="block font-bold text-brand-deep">{s.who}</span>
                    <span className="block text-muted">{s.place} · sample feedback</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ block                                                           */
/* ------------------------------------------------------------------ */

export function FaqBlock({
  items = faqs,
  id = "faq",
  title = "Questions families ask before booking",
  eyebrow = "FAQ",
  intro = "Everything here reflects the information Docathome publishes. If your question is not answered, call us — we would rather answer it than guess.",
  extra,
}: {
  items?: { q: string; a: string; group?: string }[];
  id?: string;
  title?: string;
  eyebrow?: string;
  intro?: string;
  extra?: ReactNode;
}) {
  return (
    <section id={id} className={cn("section scroll-mt-28", id === "faq" ? "bg-surface" : "")}>
      <div className="shell grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead eyebrow={eyebrow} title={title} intro={intro} />
          <div className="card mt-6 p-5">
            <p className="font-display text-[1.02rem] font-bold text-brand-deep">Still unsure about something?</p>
            <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted">
              Ask a person directly. We will tell you if a home visit is not the right option.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a
                href={siteConfig.phone.href}
                className={cn(btn.outline, "min-h-[46px] px-4 text-[0.9rem]")}
                aria-label={`Call Docathome on ${siteConfig.phone.display}`}
              >
                <Icon name="phone" size={17} /> Call now
              </a>
              <WhatsAppButton
                label="Message us"
                className="min-h-[46px] px-4 text-[0.9rem]"
                text="Hi Docathome, I have a question before booking a home visit."
              />
            </div>
            {extra}
          </div>
        </div>
        <FaqAccordion items={items} idPrefix={id} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

export function FinalCta({
  title = "Book a doctor to come home today",
  body = "Tell us the patient's age, symptoms and your area. We confirm the visit, and the doctor usually reaches in about 15 minutes.",
  showForm = false,
}: {
  title?: string;
  body?: string;
  showForm?: boolean;
}) {
  return (
    <section id="book" className="section scroll-mt-28">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[28px] bg-brand px-6 py-10 text-white sm:px-9 lg:px-12 lg:py-14">
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.13]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />
          <span
            className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-2xl"
            aria-hidden="true"
          />
          <div className={cn("relative grid gap-9", showForm ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-center" : "")}>
            <div>
              <p className="eyebrow kicker-light mb-4">Ready when you are</p>
              <h2 className="h2 text-white">{title}</h2>
              <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-white/78">{body}</p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <Chip icon="rupee">{siteConfig.price.amount} flat, paid after the visit</Chip>
                <Chip icon="clock">Usually about 15 minutes</Chip>
                <Chip icon="refresh">1 week free follow-up</Chip>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className={cn(btn.primary, "bg-white text-brand-deep hover:bg-white/92")}
                >
                  Book a Home Visit
                  <Icon name="arrowRight" size={18} />
                </Link>
                <WhatsAppButton
                  label="WhatsApp Us"
                  className="border border-white/25 bg-white/12 hover:bg-white/20"
                  text="Hello Docathome, I need a doctor home visit."
                />
                <a
                  href={siteConfig.phone.href}
                  className={cn(btn.ghostLight, "border-transparent bg-transparent px-4 text-white/90 hover:bg-white/10")}
                >
                  <Icon name="phone" size={18} /> {siteConfig.phone.display}
                </a>
              </div>
            </div>
            {showForm && (
              <div className="rounded-[20px] border border-white/18 bg-white/[0.07] p-5 text-[0.93rem] leading-relaxed text-white/80">
                <p className="font-display text-[1.02rem] font-bold text-white">Three ways to book</p>
                <ol className="mt-3 space-y-2">
                  <li>
                    <span className="font-semibold text-white">1.</span> Use the request form — it writes out your
                    message on WhatsApp for you.
                  </li>
                  <li>
                    <span className="font-semibold text-white">2.</span> WhatsApp us directly at{" "}
                    {siteConfig.phone.display}.
                  </li>
                  <li>
                    <span className="font-semibold text-white">3.</span> Call {siteConfig.phone.display} and speak to
                    someone.
                  </li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Small helpers used across pages                                     */
/* ------------------------------------------------------------------ */

export function ServiceListLinks({ current }: { current?: string }) {
  return (
    <ul className="space-y-1.5">
      {services.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/services/${s.slug}`}
            aria-current={current === s.slug ? "page" : undefined}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[0.94rem] font-semibold transition-colors",
              current === s.slug
                ? "bg-brand text-white"
                : "text-brand-deep hover:bg-brand-tint hover:text-brand",
            )}
          >
            <span className="inline-flex items-center gap-2.5">
              <Icon name={s.icon as IconName} size={17} className={current === s.slug ? "text-white" : "text-brand"} />
              {s.name}
            </span>
            <Icon name="arrowRight" size={15} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function InfoCard({
  title,
  icon,
  children,
  tone = "brand",
}: {
  title: string;
  icon: IconName;
  children: ReactNode;
  tone?: "brand" | "accent" | "plain";
}) {
  const bg =
    tone === "brand" ? "bg-brand-tint/60 border-brand/20" : tone === "accent" ? "bg-accent-soft border-accent/40" : "bg-surface border-line";
  return (
    <div className={cn("rounded-[18px] border p-5", bg)}>
      <span className="inline-flex items-center gap-2 font-display text-[0.78rem] font-bold uppercase tracking-[0.12em] text-brand-deep">
        <Icon name={icon} size={16} />
        {title}
      </span>
      <div className="mt-3 text-[0.95rem] leading-relaxed text-muted">{children}</div>
    </div>
  );
}

export function Bullets({ items, tone = "brand" }: { items: string[]; tone?: "brand" | "plain" }) {
  return (
    <ul className="space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-2.5 text-[0.97rem] leading-relaxed text-brand-deep/85">
          <Icon
            name="check"
            size={17}
            className={cn("mt-1 shrink-0", tone === "brand" ? "text-brand" : "text-muted")}
          />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
