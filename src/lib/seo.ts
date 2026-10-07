import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

const BASE = siteConfig.url.replace(/\/$/, "");

export function abs(path: string) {
  if (path.startsWith("http")) return path;
  const p = path === "/" ? "" : path.replace(/\/$/, "");
  return `${BASE}${p}`;
}

export function makeMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = abs(path);
  // Titles carry the brand explicitly so the root layout template is never
  // appended a second time (Next applies `title.template` to string titles).
  const bare = title.replace(/\s*\|\s*Docathome\s*$/, "");
  const composed = bare.includes(siteConfig.name) ? bare : `${bare} | ${siteConfig.name}`;
  return {
    title: { absolute: composed },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: "en_IN",
      images: [
        {
          url: abs("/images/doctor-home-visit.jpg"),
          width: 1200,
          height: 800,
          alt: "A Docathome doctor examining an elderly patient at home in a Delhi NCR apartment",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: `@${siteConfig.name.toLowerCase()}`,
      images: [abs("/images/doctor-home-visit.jpg")],
    },
  };
}

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: i === items.length - 1 ? abs(item.path) : abs(item.path),
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${BASE}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: BASE,
    telephone: "+91-9625853584",
    priceRange: siteConfig.price.amount,
    areaServed: [
      { "@type": "City", name: "Delhi" },
      { "@type": "City", name: "Gurgaon" },
      { "@type": "City", name: "Noida" },
      { "@type": "City", name: "Ghaziabad" },
      { "@type": "Place", name: "Dwarka" },
    ],
    knowsAbout: [
      "doctor home visit",
      "fever and infections",
      "elderly care at home",
      "blood pressure and sugar monitoring",
      "children's consultations at home",
      "wound dressing and suturing at home",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9625853584",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
    image: `${BASE}/images/doctor-home-visit.jpg`,
    slogan: siteConfig.tagline,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${BASE}/#organization` },
  };
}

export function serviceSchema({
  name,
  description,
  url,
  areaName,
}: {
  name: string;
  description: string;
  url: string;
  areaName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    name,
    description,
    url: abs(url),
    provider: { "@id": `${BASE}/#organization` },
    areaServed: areaName ? { "@type": "City", name: areaName } : undefined,
    offers: {
      "@type": "Offer",
      price: "899",
      priceCurrency: "INR",
      description: "Flat visit fee, paid after the visit",
      availability: "https://schema.org/InStock",
      url: abs("/book"),
    },
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
