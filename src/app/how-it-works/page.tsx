import Link from "next/link";
import {
  Chip,
  EmergencyNotice,
  FaqBlock,
  FinalCta,
  InfoCard,
  PageHeader,
  TrustStrip,
} from "@/components/blocks";
import { BookingForm } from "@/components/BookingForm";
import { Icon, type IconName } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { makeMetadata, breadcrumb } from "@/lib/seo";
import { faqs, siteConfig } from "@/lib/site";

export const metadata = makeMetadata({
  title: "How a Doctor Home Visit Works | Docathome",
  description:
    "From the first call to the free follow-up: how Docathome confirms a visit, when the doctor usually arrives, what happens during the examination, how the ₹899 fee works and what follow-up includes.",
  path: "/how-it-works",
  keywords: ["how doctor home visit works", "doctor home visit process", "pay after visit doctor at home"],
});

type Phase = {
  key: string;
  label: string;
  title: string;
  icon: IconName;
  body: string;
  points: string[];
};

const phases: Phase[] = [
  {
    key: "booking",
    label: "Phase 1",
    title: "Booking",
    icon: "chat",
    body: "You call or send a WhatsApp message. No app, no sign-up, no portal login. A family member can make the call for the patient — that is common and completely normal.",
    points: [
      "Tell us the patient's name, age and the main symptoms.",
      "Give the area and building details so we can judge travel time.",
      "Mention ongoing conditions and medicines if there are any.",
      "Use the request form on this site and we receive the same details written out.",
    ],
  },
  {
    key: "confirmation",
    label: "Phase 2",
    title: "Confirmation",
    icon: "clipboard",
    body: "We check that a home visit is appropriate for what you describe, then confirm the visit and the arrival window with you.",
    points: [
      "If the symptoms sound like an emergency, we will tell you to call 112 or go to a hospital instead of booking.",
      "You are told the expected arrival time before we dispatch — the doctor usually reaches in about 15 minutes.",
      "If we cannot reach your area in reasonable time, we say so rather than take the booking.",
    ],
  },
  {
    key: "arrival",
    label: "Phase 3",
    title: "Doctor arrival",
    icon: "house",
    body: "The doctor comes to your door with the examination kit needed for the visit. You pay nothing at the door.",
    points: [
      "The doctor is a qualified MBBS doctor; a specialist is arranged when the condition needs one.",
      "Please keep the patient's current medicines and any past reports together — it saves a lot of guessing.",
      "A family member should stay with the patient during the visit.",
    ],
  },
  {
    key: "examination",
    label: "Phase 4",
    title: "Examination",
    icon: "stethoscope",
    body: "A proper consultation, done where the patient is comfortable: history, physical examination, vitals, and an explanation of what is likely going on.",
    points: [
      "Vitals such as pulse, blood pressure and temperature are checked at home.",
      "The doctor explains the diagnosis and the plan in plain language.",
      "Where tests are needed, you are told which ones and why.",
      "Questions are answered before the doctor leaves — ask everything now.",
    ],
  },
  {
    key: "prescription",
    label: "Phase 5",
    title: "Prescription",
    icon: "prescription",
    body: "Every visit ends with something written: the prescription, the dose, the timing and the duration, plus simple home-care advice.",
    points: [
      "Written medicine instructions you can follow at night without phoning anyone.",
      "Advice on food, fluids, rest and warning signs to watch for.",
      "A copy of the reasoning for the family, useful when someone else manages the patient's care.",
    ],
  },
  {
    key: "payment",
    label: "Phase 6",
    title: "Payment",
    icon: "rupee",
    body: "The flat visit fee is ₹899, settled after the examination is done. No advance payment is required on this website.",
    points: [
      "₹899 is the visit fee for the consultation at home.",
      "You pay only after the doctor has examined the patient.",
      "Laboratory tests, if advised, are arranged separately and quoted at that point.",
    ],
  },
  {
    key: "followup",
    label: "Phase 7",
    title: "Free follow-up",
    icon: "refresh",
    body: "For one week after the visit, follow-up is free. If symptoms continue or the medicines raise questions, call or WhatsApp us.",
    points: [
      "One week of free follow-up after the visit.",
      "Questions about the same prescription are included.",
      "If the patient is not improving, we can arrange a further review and advise whether a hospital visit is now needed.",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="From one message to a doctor at your door"
        lede="Here is the whole process, phase by phase, including what we need from you at each step and where the ₹899 fee and the free follow-up fit in."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "How it works", href: "/how-it-works" },
        ]}
        chips={
          <>
            <Chip icon="rupee">{siteConfig.price.amount} after the visit</Chip>
            <Chip icon="clock">{siteConfig.arrival.sentence}</Chip>
            <Chip icon="refresh">{siteConfig.followUp.sentence}</Chip>
          </>
        }
        aside={<BookingForm />}
      />

      <div className="border-b border-line bg-surface">
        <div className="shell">
          <TrustStrip />
        </div>
      </div>

      <section className="section">
        <div className="shell">
          <ol className="relative space-y-6 lg:space-y-0">
            {phases.map((p, i) => (
              <li
                key={p.key}
                id={p.key}
                className="relative scroll-mt-32 border-b border-line pb-6 lg:flex lg:gap-10 lg:border-none lg:py-8"
              >
                <div className="flex items-center gap-4 lg:w-56 lg:shrink-0 lg:flex-col lg:items-start">
                  <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full border border-brand/25 bg-paper font-display text-[1.2rem] font-extrabold text-brand shadow-[0_0_0_6px_rgba(245,248,247,1)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[0.76rem] font-bold uppercase tracking-[0.16em] text-muted">
                    {p.label}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[0.86rem] font-semibold text-brand lg:mt-1">
                    <Icon name={p.icon} size={15} />
                    {p.title}
                  </span>
                </div>

                <div className="mt-4 lg:mt-0 lg:max-w-3xl">
                  <h2 className="h3 text-[1.32rem]">{p.title}</h2>
                  <p className="mt-2.5 text-[1rem] leading-relaxed text-muted">{p.body}</p>
                  <ul className="mt-4 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-brand-deep/85">
                        <Icon name="check" size={16} className="mt-1 shrink-0 text-brand" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <InfoCard title="Emergency guidance" icon="alert">
              Docathome handles appropriate non-emergency care at home. Chest pain, breathing trouble, heavy bleeding or
              loss of consciousness need emergency services, not a house call. Please do not wait for a home visit.
              <Link href="/medical-disclaimer" className="mt-3 inline-flex items-center gap-1.5 font-bold text-brand underline underline-offset-4">
                Read the medical disclaimer <Icon name="arrowRight" size={15} />
              </Link>
            </InfoCard>
            <InfoCard title="What we ask you not to do" icon="shield" tone="accent">
              Do not stop or change long-term medicines on your own, do not share a prescription written for someone
              else, and do not delay a hospital visit because a home visit is convenient. The doctor at your home will
              tell you plainly when the right place is a hospital.
            </InfoCard>
          </div>

          <EmergencyNotice className="mt-8" />
        </div>
      </section>

      <FaqBlock
        items={faqs.filter((f) => ["Pricing", "Timing", "After the visit", "Booking"].includes(f.group ?? ""))}
        title="Process questions"
        eyebrow="Process FAQ"
      />

      <FinalCta
        title="Start with one message"
        body={`Tell us the patient's age, symptoms and area. We confirm the visit, and you pay ${siteConfig.price.amount} afterwards.`}
      />

      <JsonLd
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to book a doctor home visit with Docathome",
            description:
              "Book a doctor to visit a patient's home in Delhi NCR, get examined and receive a written prescription, then use the free one-week follow-up.",
            totalTime: "PT15M",
            estimatedCost: { "@type": "MonetaryAmount", currency: "INR", value: "899" },
            step: phases.map((p, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: p.title,
              text: p.body,
              url: `#${p.key}`,
            })),
          },
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "How it works", path: "/how-it-works" },
          ]),
        ]}
      />
    </>
  );
}
