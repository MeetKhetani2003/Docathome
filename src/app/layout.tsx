import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { abs, organizationSchema, websiteSchema } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Docathome | Doctor Home Visits in Delhi NCR",
    template: "%s | Docathome",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "Docathome" }],
  creator: "Docathome",
  publisher: "Docathome",
  formatDetection: { telephone: true, address: false, email: false },
  alternates: { canonical: "/" },
  keywords: [
    "doctor home visit Delhi",
    "doctor at home Delhi NCR",
    "home doctor consultation Gurgaon",
    "doctor at home Noida",
    "house call doctor Ghaziabad",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "health",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
    url: abs("/"),
    title: "Docathome | Doctor Home Visits in Delhi NCR",
    description: siteConfig.description,
    images: [
      {
        url: abs("/images/doctor-home-visit.jpg"),
        width: 1200,
        height: 800,
        alt: "Indian doctor examining an elderly patient at home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Docathome | Doctor Home Visits in Delhi NCR",
    description: "A qualified doctor comes to your home. ₹899 flat visit fee, paid after the visit.",
    images: [abs("/images/doctor-home-visit.jpg")],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml", sizes: "any" }],
  },

};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b6f6b",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <body className="bg-paper text-ink antialiased">
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18234588536"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18234588536');
          `}
        </Script>
        {/* Enables scroll-reveal only when scripting is available and wanted. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js')}}catch(e){}`,
          }}
        />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
        <JsonLd schemas={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
