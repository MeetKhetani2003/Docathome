import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { ConcernsMarquee } from "@/components/sections/ConcernsMarquee";
import { BookingForm } from "@/components/BookingForm";
import {
  AreasSection,
  ComparisonSection,
  EmergencyNotice,
  FaqBlock,
  FinalCta,
  HowItWorks,
  ServiceGrid,
  VisualBand,
  WhyChooseUs,
} from "@/components/blocks";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";
import { JsonLd } from "@/components/JsonLd";
import { AIPopup } from "@/components/AIPopup";
import connectDB from "@/lib/db";
import Testimonial from "@/models/Testimonial";
import { makeMetadata, faqSchema, serviceSchema, abs } from "@/lib/seo";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { faqs, homeFaqSubset, siteConfig } from "@/lib/site";

export const metadata = makeMetadata({
  title: "Docathome | Doctor Home Visits in Delhi NCR",
  description:
    "A qualified doctor comes to your home in Delhi, Gurgaon, Noida, and Ghaziabad. ₹899 flat visit fee, paid after the visit, with one week of free follow-up. Call or WhatsApp +91 83838 81773.",
  path: "/",
  keywords: [
    "doctor home visit Delhi",
    "doctor at home Delhi NCR",
    "home doctor consultation",
    "doctor home visit Gurgaon",
    "doctor at home Noida",
  ],
});

const valueStrip: { icon: IconName; label: string }[] = [
  { icon: "route", label: "No travel for the patient" },
  { icon: "badge", label: "MBBS doctors, specialists when needed" },
  { icon: "prescription", label: "Written prescription at the visit" },
  { icon: "rupee", label: "Pay ₹899 after the visit" },
  { icon: "refresh", label: "1 week free follow-up" },
  { icon: "chat", label: "Book by call or WhatsApp" },
];

function ValueStrip() {
  return (
    <div className="border-y border-line bg-paper">
      <div className="shell overflow-hidden">
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 py-3.5 lg:flex-nowrap lg:justify-between">
          {valueStrip.map((v, i) => (
            <li
              key={v.label}
              className={cn(
                "flex shrink-0 items-center gap-2 text-[0.86rem] font-semibold text-muted",
                i > 1 && "hidden sm:flex",
                i > 3 && "hidden lg:flex",
              )}
            >
              <Icon name={v.icon} size={17} className="text-brand" />
              {v.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ContinuitySection() {
  return (
    <section id="follow-up" className="section scroll-mt-28 bg-surface" aria-labelledby="continuity-title">
      <div className="shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-[24px] border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/prescription-writing.jpg"
              width={900}
              height={675}
              loading="lazy"
              decoding="async"
              alt="An Indian doctor writing a prescription on a clipboard at a small table in a patient's home"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -right-2 bottom-5 w-[15.5rem] rounded-[16px] border border-line bg-surface p-4 shadow-lift sm:-right-4 lg:-right-8">
            <p className="flex items-center gap-2 font-display text-[0.82rem] font-bold uppercase tracking-[0.11em] text-brand">
              <Icon name="refresh" size={15} /> After the visit
            </p>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">
              Questions about the same prescription within one week? Follow-up is free.
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow mb-4">Continuity of care</p>
          <h2 id="continuity-title" className="h2">
            The visit does not end when the doctor leaves
          </h2>
          <p className="lede mt-5">
            A single consultation is only useful if something happens afterwards. Docathome keeps the line open for a
            week, so a change in symptoms, a question about dosing or a report you do not understand does not mean
            booking and paying for another visit.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "One week free follow-up",
                body: "Call or WhatsApp us if symptoms continue or you have questions about the medicines.",
                icon: "refresh" as IconName,
              },
              {
                title: "Clear medicine instructions",
                body: "The prescription is written and explained before the doctor leaves, in language you can follow at night.",
                icon: "prescription" as IconName,
              },
              {
                title: "Records for the family",
                body: "Useful when someone else is managing care for a parent and needs the details in writing.",
                icon: "clipboard" as IconName,
              },
              {
                title: "Referral when needed",
                body: "If the doctor feels a hospital, laboratory or specialist review is required, you will be told at the visit.",
                icon: "shield" as IconName,
              },
            ].map((c) => (
              <div key={c.title} className="card p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] bg-brand-tint text-brand">
                  <Icon name={c.icon} size={20} />
                </span>
                <h3 className="mt-3.5 font-display text-[1.02rem] font-bold text-brand-deep">{c.title}</h3>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>
          <Link
            href="/how-it-works"
            className="mt-7 inline-flex items-center gap-2 font-bold text-brand underline-offset-4 hover:underline"
          >
            See the full visit process <Icon name="arrowRight" size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const homeFaqs = homeFaqSubset.map((i) => faqs[i]);

  await connectDB();
  const rawTestimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
  const dbTestimonials = rawTestimonials.map((t: any) => ({
    _id: t._id.toString(),
    name: t.name,
    place: t.place,
    date: t.date,
    quote: t.quote
  }));
  return (
    <>
      <AIPopup />
      <Hero />
      <ConcernsMarquee />
      <ValueStrip />
      <ServiceGrid />
      <WhyChooseUs />
      <HowItWorks />
      <ComparisonSection />
      <ContinuitySection />
      <VisualBand />
      <section aria-label="Emergency guidance" className="bg-paper py-10">
        <div className="shell">
          <EmergencyNotice />
        </div>
      </section>
      <AreasSection />
      <TestimonialsCarousel data={dbTestimonials} />
      <FaqBlock
        items={homeFaqs}
        extra={
          <Link
            href="/faq"
            className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-bold text-brand underline-offset-4 hover:underline"
          >
            Read all questions <Icon name="arrowRight" size={16} />
          </Link>
        }
      />
      <section className="section bg-surface" id="booking-form">
        <div className="shell max-w-3xl mx-auto">
          <BookingForm variant="page" />
        </div>
      </section>
      <FinalCta />

      <JsonLd
        schemas={[
          serviceSchema({
            name: "Doctor home visit",
            description:
              "A qualified doctor visits the patient's home in Delhi NCR for non-emergency consultation, examination, prescription and follow-up advice.",
            url: "/",
          }),
          faqSchema(homeFaqs.map(({ q, a }) => ({ q, a }))),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${abs("/")}#webpage`,
            url: abs("/"),
            name: "Docathome | Doctor Home Visits in Delhi NCR",
            description: siteConfig.description,
            isPartOf: { "@id": `${abs("/")}/#website` },
            about: { "@id": `${abs("/")}/#organization` },
          },
        ]}
      />
    </>
  );
}
