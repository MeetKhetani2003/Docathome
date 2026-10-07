import Link from "next/link";
import {
  AreasSection,
  Bullets,
  ComparisonSection,
  EmergencyNotice,
  FaqBlock,
  FinalCta,
  HowItWorks,
  PageHeader,
  ServiceListLinks,
  Chip,
} from "@/components/blocks";
import { Icon, type IconName } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { makeMetadata, breadcrumb, serviceSchema } from "@/lib/seo";
import { faqs, services, siteConfig } from "@/lib/site";
import { WhatsAppButton } from "@/components/ui";

export const metadata = makeMetadata({
  title: "Doctor Home Visit Services | Docathome",
  description:
    "Home doctor services in Delhi NCR: fever and infections, elderly care, blood pressure and sugar monitoring, children, injury dressing and suturing, and written prescriptions. ₹899 flat visit fee.",
  path: "/services",
  keywords: [
    "home doctor services Delhi",
    "fever doctor at home",
    "elderly care at home Delhi",
    "dressing change at home",
    "doctor home visit for children",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everyday illness and ongoing care, handled at home"
        lede="Care for common health concerns, routine checks and patients who find it difficult to travel. Each visit is a full consultation: history, examination, written prescription and clear instructions."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
        chips={
          <>
            <Chip icon="rupee">{siteConfig.price.amount} flat visit fee</Chip>
            <Chip icon="clock">Usually reaches in about 15 minutes</Chip>
            <Chip icon="refresh">1 week free follow-up</Chip>
          </>
        }
        aside={
          <div className="card p-5 shadow-soft">
            <p className="font-display text-[0.78rem] font-bold uppercase tracking-[0.13em] text-muted">
              Browse by service
            </p>
            <div className="mt-4">
              <ServiceListLinks />
            </div>
            <WhatsAppButton
              label="Not sure? Describe the problem"
              className="mt-4 w-full min-h-[48px] px-4 text-[0.92rem]"
              text="Hi Docathome, I am not sure a home visit is right for this problem. Can you advise?"
            />
          </div>
        }
      />

      <section className="section">
        <div className="shell space-y-5">
          {services.map((s, i) => (
            <article
              key={s.slug}
              className="card grid gap-6 p-5 transition-colors hover:border-brand-tint-2 sm:p-7 lg:grid-cols-[auto_1.15fr_1fr_auto] lg:items-start lg:gap-9"
            >
              <div className="flex items-center gap-4 lg:block">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-[16px] bg-brand-tint text-brand">
                  <Icon name={s.icon as IconName} size={27} />
                </span>
                <p className="num text-[0.8rem] font-bold tracking-[0.12em] text-brand/50 lg:mt-4 lg:text-center">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>

              <div>
                <h2 className="h3">{s.name}</h2>
                <p className="mt-2.5 text-[1rem] leading-relaxed text-muted">{s.intro}</p>
                <Link
                  href={`/services/${s.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 font-bold text-brand underline-offset-4 hover:underline"
                >
                  Full details for {s.shortName.toLowerCase()} <Icon name="arrowRight" size={16} />
                </Link>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
                <div>
                  <p className="text-[0.76rem] font-bold uppercase tracking-[0.12em] text-muted">What it covers</p>
                  <ul className="mt-2 space-y-1.5">
                    {s.covers.slice(0, 4).map((c) => (
                      <li key={c} className="flex gap-2 text-[0.93rem] leading-snug text-brand-deep/85">
                        <Icon name="check" size={15} className="mt-1 shrink-0 text-brand" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.76rem] font-bold uppercase tracking-[0.12em] text-muted">Who it may help</p>
                  <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">{s.who}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 lg:w-44">
                <Link
                  href="/book"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-brand px-4 text-[0.92rem] font-bold text-white transition-colors hover:bg-brand-dark"
                >
                  Request a visit
                </Link>
                <a
                  href={siteConfig.phone.href}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-line px-4 text-[0.92rem] font-semibold text-brand-deep transition-colors hover:bg-brand-tint"
                >
                  <Icon name="phone" size={16} /> Call
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-paper-warm">
        <div className="shell grid gap-8 py-14 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="eyebrow mb-4">What every visit includes</p>
            <h2 className="h2">The same essentials as a clinic consultation</h2>
            <p className="lede mt-4">
              A home visit is a consultation, not a phone opinion. Here is what you should expect on any Docathome
              visit.
            </p>
          </div>
          <Bullets
            items={[
              "A qualified doctor attends in person at the address you provide.",
              "History and physical examination of the patient.",
              "Explanation of the diagnosis in plain language, with the family present if the patient wishes.",
              "A written prescription with clear medicine instructions: dose, timing and duration.",
              "Advice on tests, diet and care at home where relevant.",
              "One week of free follow-up for questions about the same problem.",
            ]}
          />
        </div>
      </section>

      <HowItWorks compact />
      <ComparisonSection />
      <AreasSection />
      <section className="bg-paper pb-3 pt-9">
        <div className="shell">
          <EmergencyNotice />
        </div>
      </section>
      <FaqBlock items={faqs} title="Service questions, answered" eyebrow="Service FAQ" />
      <FinalCta
        title="Tell us what is wrong. We will tell you if we can help."
        body="Send the patient's age, symptoms and your area on WhatsApp, or call. We confirm the visit, the fee stays ₹899."
      />

      <JsonLd
        schemas={[
          ...services.map((s) =>
            serviceSchema({
              name: `Doctor home visit — ${s.name}`,
              description: s.summary,
              url: `/services/${s.slug}`,
            }),
          ),
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
    </>
  );
}
