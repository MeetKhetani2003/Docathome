import Link from "next/link";
import {
  AreasSection,
  Bullets,
  Chip,
  EmergencyNotice,
  FinalCta,
  HowItWorks,
  InfoCard,
  PageHeader,
} from "@/components/blocks";
import { Icon, type IconName } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { makeMetadata, abs, breadcrumb } from "@/lib/seo";
import { services, siteConfig } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export const metadata = makeMetadata({
  title: "About Docathome | Doctor Home Visit Service in Delhi NCR",
  description:
    "Docathome brings qualified doctors to patients' homes across Delhi, Gurgaon, Noida, Ghaziabad and Dwarka for non-emergency care, at a flat ₹899 visit fee with one week of free follow-up.",
  path: "/about",
  keywords: ["about Docathome", "doctor home visit service Delhi NCR", "home healthcare Delhi"],
});

const principles: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "house",
    title: "The patient stays where they are",
    body: "Care should not depend on whether a feverish patient can manage a car journey, a lift and a queue.",
  },
  {
    icon: "rupee",
    title: "One price, stated plainly",
    body: "₹899 for the visit, paid after the examination. The number is on every page for the same reason.",
  },
  {
    icon: "chat",
    title: "A person, not a portal",
    body: "Booking is a call or a WhatsApp message. Someone reads it, confirms the visit and answers questions.",
  },
  {
    icon: "shield",
    title: "Honest about our limits",
    body: "We are not an emergency service. Where a hospital is the right place, we say so before anything is booked.",
  },
  {
    icon: "refresh",
    title: "Care continues after the door closes",
    body: "A prescription without follow-up is half a consultation, so one week of follow-up is included.",
  },
  {
    icon: "users",
    title: "Built for the family, not just the patient",
    body: "Most bookings are made by an adult child, a spouse or a caregiver. The process is written for them.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Docathome"
        title="Medical care that comes to you, and says what it can do"
        lede="Docathome is a doctor home visit service for Delhi NCR. A qualified doctor attends the patient at home for appropriate non-emergency care, at a flat ₹899 visit fee, with one week of free follow-up."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
        chips={
          <>
            <Chip icon="mapPin">Delhi · Gurgaon · Noida · Ghaziabad · Dwarka</Chip>
            <Chip icon="clock">Usually about 15 minutes</Chip>
          </>
        }
      />

      <section className="section">
        <div className="shell grid gap-11 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <h2 className="h2">What Docathome is</h2>
            <div className="mt-5 space-y-4 text-[1.02rem] leading-relaxed text-muted">
              <p>
                It is a simple idea with a practical purpose: for many health problems, the consultation itself is
                short and easy — it is everything around it that is hard. Getting an elderly parent dressed, down the
                stairs, into a vehicle, through traffic and into a waiting room can be more taxing than the illness.
              </p>
              <p>
                Docathome arranges the medical part at the patient&apos;s address. Our MBBS doctors, and specialists
                when your condition needs one, come to your home, examine the patient, explain what they found, write
                the prescription and tell you what to watch for.
              </p>
              <p>
                It is deliberately not a hospital substitute. Serious emergencies belong with emergency services and a
                hospital, and we would rather turn a booking down than attend something that needs an ambulance.
              </p>
            </div>

            <h2 id="mission" className="h2 mt-12 scroll-mt-32">
              Our mission
            </h2>
            <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
              To make a proper doctor&apos;s opinion reachable without travel — for the person who is too weak to
              commute, for the parent who cannot leave two children alone with a fever, for the family managing an
              elderly relative&apos;s blood pressure and sugar from another city. Accessible does not mean lower
              standard: the examination, the prescription and the advice are the point of the visit.
            </p>

            <h2 id="why-home-care" className="h2 mt-12 scroll-mt-32">
              Why home-based care matters
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {principles.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 55} className="h-full">
                  <div className="card h-full p-5">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-[13px] bg-brand-tint text-brand">
                      <Icon name={p.icon} size={21} />
                    </span>
                    <h3 className="mt-4 font-display text-[1.02rem] font-bold text-brand-deep">{p.title}</h3>
                    <p className="mt-1.5 text-[0.93rem] leading-relaxed text-muted">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <EmergencyNotice className="mt-10" />
          </div>

          <aside className="lg:pt-1">
            <div className="card overflow-hidden">
              <div className="overflow-hidden bg-brand-tint">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/elderly-examination.jpg"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  alt="A doctor checking an elderly patient's blood pressure at home while a family member looks on"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="font-display text-[1.15rem] font-bold text-brand-deep">What patients can expect</h2>
                <div className="mt-4">
                  <Bullets
                    items={[
                      "A qualified doctor attending at the address given.",
                      "A physical examination, not advice over the phone.",
                      "A written prescription with clear instructions.",
                      "An honest statement about whether a hospital is needed.",
                      siteConfig.followUp.sentence,
                    ]}
                  />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
                  {[
                    { v: siteConfig.price.amount, l: "Visit fee" },
                    { v: "~15 min", l: "Typical arrival" },
                    { v: "1 week", l: "Free follow-up" },
                  ].map((s) => (
                    <div key={s.l}>
                      <p className="num text-[1.05rem] font-extrabold text-brand">{s.v}</p>
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-muted">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[18px] bg-brand-deep p-6 text-white">
              <h2 className="font-display text-[1.15rem] font-bold text-white">Our service philosophy</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-white/72">
                Convenience is not a soft extra in healthcare — it decides whether someone gets seen at all. But it
                only works on clear terms: a stated price, a stated arrival expectation, stated limits on what a home
                visit can handle, and a real person on the phone.
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <Link
                  href="/book"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-white px-5 text-[0.95rem] font-bold text-brand-deep"
                >
                  Request a home visit <Icon name="arrowRight" size={16} />
                </Link>
                <a
                  href={siteConfig.phone.href}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/25 px-5 text-[0.95rem] font-semibold text-white hover:bg-white/10"
                >
                  <Icon name="phone" size={16} /> {siteConfig.phone.display}
                </a>
              </div>
            </div>

            <div className="card mt-6 p-5">
              <p className="font-display text-[0.78rem] font-bold uppercase tracking-[0.13em] text-muted">
                What we treat at home
              </p>
              <ul className="mt-3 space-y-2 text-[0.94rem]">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-2 text-brand-deep underline-offset-4 hover:text-brand hover:underline"
                    >
                      <Icon name={s.icon as IconName} size={16} className="text-brand" />
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section id="convenience" className="section scroll-mt-32 bg-paper-warm">
        <div className="shell grid gap-9 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow mb-4">Convenience</p>
            <h2 className="h2">Convenience, designed properly, is medicine too</h2>
            <p className="lede mt-4">
              A patient who is not exhausted by the journey explains their symptoms better, sleeps more, and recovers
              in the environment they know. Families can stay in the room. Nothing about the examination is skipped —
              only the part that wore people out.
            </p>
            <div className="mt-6">
              <InfoCard title="Where a home visit fits best" icon="house">
                <Bullets
                  items={[
                    "Fever and infections in adults and children",
                    "Routine checks for elders who find travel hard",
                    "Blood pressure and sugar reviews with medicine checks",
                    "Dressing changes and follow-up after minor procedures",
                  ]}
                />
              </InfoCard>
            </div>
          </div>
          <div>
            <p className="eyebrow mt-[3.05rem] mb-4 lg:mt-0">Continuity</p>
            <h2 className="h2">The week after the visit is where care actually happens</h2>
            <p className="lede mt-4">
              Most questions arrive on day two: is this dose right, should we continue the antibiotic, is this rash
              expected? So the follow-up period is included rather than sold separately, and it is reachable by the
              same number you used to book.
            </p>
            <div className="mt-6">
              <InfoCard title="Included with every visit" icon="refresh" tone="accent">
                <Bullets
                  items={[
                    "One week of free follow-up after the visit.",
                    "Questions about the same prescription and its medicines.",
                    "A further review arranged if the patient is not improving.",
                    "Clear direction to a hospital if the picture changes.",
                  ]}
                />
              </InfoCard>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <AreasSection />
      <FinalCta
        title="Care that comes to you — and tells you the truth about what it can do"
        body={`Call ${siteConfig.phone.display}, or send the patient's details on WhatsApp. ${siteConfig.price.note}`}
      />

      <JsonLd
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Docathome",
            url: abs("/about"),
            mainEntity: { "@id": `${abs("/")}/#organization` },
          },
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
    </>
  );
}
