import Link from "next/link";
import { Chip, EmergencyNotice, FinalCta, InfoCard, PageHeader, TrustStrip } from "@/components/blocks";
import { BookingForm } from "@/components/BookingForm";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { makeMetadata, abs, breadcrumb } from "@/lib/seo";
import { areas, siteConfig } from "@/lib/site";
import { WhatsAppButton } from "@/components/ui";

export const metadata = makeMetadata({
  title: "Contact Docathome | Call or WhatsApp a Doctor Home Visit",
  description:
    "Reach Docathome on +91 83838 81773 by phone or WhatsApp to book a doctor home visit in Delhi, Gurgaon, Noida, and Ghaziabad. You can also send the request form straight to WhatsApp.",
  path: "/contact",
  keywords: ["Docathome contact", "doctor home visit phone number Delhi", "WhatsApp doctor at home"],
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="One number for booking, questions and follow-up"
        lede="Call or WhatsApp Docathome on the same number. Tell us the patient's age, the problem and your area — that is all we need to start."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
        chips={
          <>
            <Chip icon="phone">{siteConfig.phone.display}</Chip>
            <Chip icon="mapPin">Delhi · Gurgaon · Noida · Ghaziabad</Chip>
          </>
        }
        aside={
          <div className="rounded-[22px] bg-brand-deep p-6 text-white shadow-lift">
            <p className="font-display text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white/60">
              Docathome
            </p>
            <p className="mt-3 font-display text-[1.9rem] font-extrabold leading-none">
              <a href={siteConfig.phone.href} className="hover:underline underline-offset-4">
                {siteConfig.phone.display}
              </a>
            </p>
            <p className="mt-3 text-[0.94rem] leading-relaxed text-white/70">
              Phone and WhatsApp, the same number. Bookings are taken by call and message; a person reads every
              request.
            </p>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              <a
                href={siteConfig.phone.href}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-white px-4 text-[0.95rem] font-bold text-brand-deep transition-colors hover:bg-white/90"
                aria-label={`Call Docathome on ${siteConfig.phone.display}`}
              >
                <Icon name="phone" size={17} /> Call Now
              </a>
              <a
                href={siteConfig.phone.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-wa px-4 text-[0.95rem] font-bold text-white transition-colors hover:bg-wa-dark"
              >
                <Icon name="whatsapp" size={17} /> WhatsApp Us
              </a>
            </div>
            <Link
              href="/book"
              className="mt-3 inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-white/25 px-4 text-[0.95rem] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Request a Visit <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        }
      />

      <div className="border-b border-line bg-surface">
        <div className="shell">
          <TrustStrip />
        </div>
      </div>

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <h2 className="h2">What to have ready when you call</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <InfoCard title="About the patient" icon="users">
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <Icon name="check" size={15} className="mt-1 shrink-0 text-brand" /> Name and age
                  </li>
                  <li className="flex gap-2">
                    <Icon name="check" size={15} className="mt-1 shrink-0 text-brand" /> Main symptoms and since when
                  </li>
                  <li className="flex gap-2">
                    <Icon name="check" size={15} className="mt-1 shrink-0 text-brand" /> Ongoing conditions, if any
                  </li>
                  <li className="flex gap-2">
                    <Icon name="check" size={15} className="mt-1 shrink-0 text-brand" /> Medicines currently being
                    taken
                  </li>
                </ul>
              </InfoCard>
              <InfoCard title="About the visit" icon="mapPin" tone="accent">
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <Icon name="check" size={15} className="mt-1 shrink-0 text-accent-ink" /> Area, sector or locality
                  </li>
                  <li className="flex gap-2">
                    <Icon name="check" size={15} className="mt-1 shrink-0 text-accent-ink" /> Building and floor for
                    directions
                  </li>
                  <li className="flex gap-2">
                    <Icon name="check" size={15} className="mt-1 shrink-0 text-accent-ink" /> When you need the doctor
                  </li>
                  <li className="flex gap-2">
                    <Icon name="check" size={15} className="mt-1 shrink-0 text-accent-ink" /> A reachable phone number
                  </li>
                </ul>
              </InfoCard>
            </div>

            <h2 className="h2 mt-12">Service areas</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}`}
                    className="card card-hover flex items-center gap-3 p-4"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-[11px] bg-brand-tint text-brand">
                      <Icon name="mapPin" size={17} />
                    </span>
                    <span>
                      <span className="block font-display text-[1rem] font-bold text-brand-deep">{a.name}</span>
                      <span className="block text-[0.82rem] text-muted">{a.region}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-muted">
              If your locality is not on the list, message us anyway — coverage changes as doctors become available,
              and we will tell you honestly whether we can reach you.
            </p>

            <EmergencyNotice className="mt-10" />
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <BookingForm variant="page" />
            <div className="card mt-6 p-5">
              <p className="font-display text-[0.78rem] font-bold uppercase tracking-[0.13em] text-muted">
                Other ways to reach us
              </p>
              <div className="mt-3 grid gap-2.5">
                <a
                  href={siteConfig.phone.href}
                  className="inline-flex min-h-[48px] items-center justify-between gap-3 rounded-xl border border-line px-4 text-[0.95rem] font-semibold text-brand-deep transition-colors hover:bg-brand-tint"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon name="phone" size={17} className="text-brand" /> Telephone
                  </span>
                  <span className="font-bold">{siteConfig.phone.display}</span>
                </a>
                <WhatsAppButton
                  label="Chat on WhatsApp"
                  className="w-full min-h-[48px] justify-between px-4 text-[0.95rem]"
                  text="Hello Docathome, I would like to book a doctor home visit."
                />
              </div>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-muted">
                We do not publish an email address or a clinic address — the service is a home visit, and the phone
                and WhatsApp number reach the same team.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <FinalCta
        title="Ready when you are"
        body={`Call ${siteConfig.phone.display}, message us on WhatsApp, or use the request form. ${siteConfig.price.note}`}
      />

      <JsonLd
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Docathome",
            url: abs("/contact"),
            mainEntity: { "@id": `${abs("/")}/#organization` },
          },
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
    </>
  );
}
