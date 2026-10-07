import Link from "next/link";
import { Icon } from "@/components/icons";
import { siteConfig, heroTrust } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface" aria-labelledby="hero-title">
      {/* Hoisted into <head> by React: start the LCP image as early as possible. */}
      <link rel="preload" as="image" href="/images/doctor-home-visit.jpg" fetchPriority="high" />
      <div
        className="hairline-grid pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-brand-tint/70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-paper"
        aria-hidden="true"
      />

      <div className="shell relative pb-8 pt-9 sm:pt-11 lg:pb-12 lg:pt-12 xl:pb-16 xl:pt-14">
        <div className="grid gap-9 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 xl:grid-cols-[1.06fr_0.94fr] xl:gap-14">
          {/* ------------------------------------------------ copy */}
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-tint px-3.5 py-1.5 text-[0.76rem] font-bold uppercase tracking-[0.14em] text-brand">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Doctor home visits · Delhi NCR
            </p>

            <h1 id="hero-title" className="h1 mt-5">
              A qualified doctor,{" "}
              <span className="relative inline-block whitespace-nowrap text-brand">
                at your door.
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-accent"
                  viewBox="0 0 240 10"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                  height="9"
                >
                  <path
                    d="M2.5 7.2C48 3.1 150 2 237.5 6.1"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="lede mt-6 max-w-xl text-[1.06rem]">
              Fever, infections, blood pressure, sugar checks, care for elders and children. Skip the clinic queue and
              get examined where you are comfortable.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/book"
                className={cn(
                  "group inline-flex min-h-[56px] flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-7 text-[1.05rem] font-bold text-white shadow-[0_16px_36px_-18px_rgba(11,111,107,0.95)] transition-all hover:bg-brand-dark active:translate-y-px sm:flex-none",
                )}
              >
                Book a Home Visit
                <Icon name="arrowRight" size={19} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={siteConfig.phone.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[56px] flex-1 items-center justify-center gap-2 rounded-xl bg-wa px-6 text-[1.03rem] font-bold text-white transition-colors hover:bg-wa-dark active:translate-y-px sm:flex-none"
              >
                <Icon name="whatsapp" size={20} /> WhatsApp Us
              </a>
              <a
                href={siteConfig.phone.href}
                className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl border border-line px-5 text-[1rem] font-semibold text-brand-deep transition-colors hover:border-brand hover:bg-brand-tint"
                aria-label={`Call Docathome on ${siteConfig.phone.display}`}
              >
                <Icon name="phone" size={18} className="text-brand" />
                {siteConfig.phone.display}
              </a>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-4">
              {heroTrust.map((m) => (
                <li key={m.label} className="bg-surface px-4 py-3.5">
                  <p className="num text-[1.28rem] font-extrabold leading-none text-brand-deep">{m.value}</p>
                  <p className="mt-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-muted">
                    {m.label}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.88rem] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="badge" size={16} className="text-brand" />
                Well-qualified MBBS doctors and specialists
              </span>
              <span aria-hidden="true" className="text-line">
                |
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="rupee" size={16} className="text-brand" />
                {siteConfig.price.note}
              </span>
            </p>
          </div>

          {/* ------------------------------------------- visual + booking */}
          <div className="relative lg:h-full">
            <div className="relative overflow-hidden rounded-[22px] border border-line bg-brand-tint lg:h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/doctor-home-visit.jpg"
                width={1000}
                height={620}
                alt="An Indian doctor with a medical bag speaking with a calm elderly patient in the patient's own living room during a home visit"
                className="w-full object-cover aspect-[16/10] sm:aspect-[16/7] lg:aspect-auto lg:h-full"
                fetchPriority="high"
                decoding="async"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-deep/55 via-transparent to-transparent"
                aria-hidden="true"
              />
              <p className="absolute left-3 right-3 top-3 flex flex-wrap items-center gap-2 text-[0.8rem] font-semibold text-white drop-shadow sm:left-4 sm:top-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-deep/70 px-2.5 py-1 backdrop-blur-sm">
                  <Icon name="house" size={14} className="text-accent" /> Doctor comes home
                </span>
                <span className="hidden items-center gap-1.5 rounded-full bg-brand-deep/70 px-2.5 py-1 backdrop-blur-sm sm:inline-flex">
                  <Icon name="clock" size={14} className="text-accent" /> Usually about 15 minutes
                </span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
