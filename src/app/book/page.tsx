import { BookingForm } from "@/components/BookingForm";
import { Chip, EmergencyNotice, PageHeader } from "@/components/blocks";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { CallButton, WhatsAppButton } from "@/components/ui";
import { makeMetadata, breadcrumb, serviceSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = makeMetadata({
  title: "Book a Doctor Home Visit | Docathome",
  description:
    "Request a doctor home visit in Delhi, Gurgaon, Noida, or Ghaziabad. Fill in the patient's details and send them to us on WhatsApp, or call +91 83838 81773. ₹899 flat fee, paid after the visit.",
  path: "/book",
  keywords: ["book doctor home visit", "doctor at home booking Delhi", "home visit appointment"],
});

const reassurance = [
  {
    icon: "chat" as const,
    title: "One message is enough",
    body: "Tell us who the patient is, what is wrong and where you are. We confirm the visit from there.",
  },
  {
    icon: "clock" as const,
    title: "Usually about 15 minutes",
    body: "Arrival time depends on your location and doctor availability, so we confirm it before dispatch.",
  },
  {
    icon: "rupee" as const,
    title: "₹899, after the visit",
    body: "The flat visit fee is paid once the doctor has examined the patient.",
  },
  {
    icon: "refresh" as const,
    title: "One week free follow-up",
    body: "Questions about the same prescription within a week do not cost extra.",
  },
];

export default function BookPage() {
  return (
    <>
      <PageHeader
        eyebrow="Request a home visit"
        title="Tell us about the patient. We will confirm the visit."
        lede="Fill in the short form and send it to us on WhatsApp, or call if that is easier. Nothing is stored on this page and no account is needed."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Book a visit", href: "/book" },
        ]}
        chips={
          <>
            <Chip icon="rupee">{siteConfig.price.amount} flat visit fee</Chip>
            <Chip icon="clock">{siteConfig.arrival.sentence}</Chip>
            <Chip icon="mapPin">Delhi · Gurgaon · Noida · Ghaziabad</Chip>
          </>
        }
      />

      <section className="section">
        <div className="shell grid gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          {/* form first on mobile, right on desktop */}
          <div className="order-1 lg:order-2">
            <BookingForm variant="page" />
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <CallButton label={`Call ${siteConfig.phone.display}`} variant="outline" />
              <WhatsAppButton label="Talk to us on WhatsApp" text="Hello Docathome, I need to book a doctor home visit." />
            </div>
          </div>

          <div className="order-2 lg:order-1 lg:pt-2">
            <h2 className="h2">Why families book here instead of driving to a clinic</h2>
            <p className="lede mt-4">
              For a fever, an infection, a dressing change or a routine check on an elderly parent, the journey is most
              of the suffering. A home visit removes it without removing the examination.
            </p>
            <ul className="mt-8 space-y-3">
              {reassurance.map((r, i) => (
                <li key={r.title} className="card flex gap-4 p-5">
                  <span className="num flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-[0.85rem] font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="flex items-center gap-2 font-display text-[1.02rem] font-bold text-brand-deep">
                      <Icon name={r.icon} size={17} className="text-brand" />
                      {r.title}
                    </p>
                    <p className="mt-1 text-[0.94rem] leading-relaxed text-muted">{r.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <EmergencyNotice className="mt-6" />
          </div>
        </div>
      </section>

      <JsonLd
        schemas={[
          serviceSchema({
            name: "Doctor home visit booking",
            description:
              "Request a Docathome doctor home visit by WhatsApp or phone. Flat ₹899 visit fee, paid after the consultation.",
            url: "/book",
          }),
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Book a visit", path: "/book" },
          ]),
        ]}
      />
    </>
  );
}
