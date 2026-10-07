import { AreasSection, EmergencyNotice, FaqBlock, FinalCta, Chip, PageHeader } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { makeMetadata, abs } from "@/lib/seo";
import { areas, faqs, siteConfig } from "@/lib/site";

export const metadata = makeMetadata({
  title: "Doctor Home Visit Areas | Docathome",
  description:
    "Docathome doctors visit homes in Delhi, Gurgaon, Noida, Ghaziabad and Dwarka. Call or WhatsApp +91 96258 53584 to confirm your locality. ₹899 flat visit fee.",
  path: "/areas",
  keywords: ["doctor at home Delhi", "doctor home visit Gurgaon", "doctor at home Noida", "doctor home visit Ghaziabad", "doctor at home Dwarka"],
});

export default function AreasIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Where we visit"
        title="Doctor home visits across Delhi NCR"
        lede="We currently publish five service areas. Coverage of an exact locality is confirmed on call, because arrival time depends on where the nearest free doctor is."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Areas", href: "/areas" },
        ]}
        chips={
          <>
            <Chip icon="rupee">{siteConfig.price.amount} flat fee</Chip>
            <Chip icon="clock">Usually about 15 minutes</Chip>
            <Chip icon="phone">{siteConfig.phone.display}</Chip>
          </>
        }
      />
      <AreasSection heading={false} />
      <section className="bg-paper pb-3">
        <div className="shell">
          <EmergencyNotice />
        </div>
      </section>
      <FaqBlock
        items={faqs.filter((f) => ["Coverage", "Timing", "Booking"].includes(f.group ?? ""))}
        title="Coverage and timing questions"
        eyebrow="Area FAQ"
        intro="What we can promise before the call, and what we confirm on it."
      />
      <FinalCta
        title="Confirm a doctor for your area"
        body={`Send us your locality on WhatsApp or call ${siteConfig.phone.display}. If we cannot reach you in reasonable time, we will say so instead of taking the booking.`}
      />
      <JsonLd
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Docathome service areas",
            itemListElement: areas.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "City",
                name: a.name,
                url: abs(`/areas/${a.slug}`),
              },
            })),
          },
        ]}
      />
    </>
  );
}
