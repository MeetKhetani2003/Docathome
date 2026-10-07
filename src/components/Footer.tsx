import Link from "next/link";
import { siteConfig, footerNav, services, areas, legalNav } from "@/lib/site";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/Header";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-deep text-white/75">
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden="true" />
      <div className="shell relative py-14 md:py-16">
        <div className="grid gap-11 md:grid-cols-2 lg:grid-cols-[1.25fr_0.85fr_0.85fr_1fr] lg:gap-10">
          <div className="max-w-sm">
            <Logo onDark />
            <p className="mt-5 text-[0.97rem] leading-relaxed text-white/65">
              Doctor home visit service across Delhi NCR. A qualified doctor comes to the patient instead of the
              patient travelling to a clinic — {siteConfig.price.amount} flat visit fee, paid after the visit, with one
              week of free follow-up.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={siteConfig.phone.href}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-white/20 px-4 text-[0.92rem] font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Icon name="phone" size={17} /> {siteConfig.phone.display}
              </a>
              <a
                href={siteConfig.phone.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-wa px-4 text-[0.92rem] font-semibold text-white transition-colors hover:bg-wa-dark"
              >
                <Icon name="whatsapp" size={17} /> WhatsApp
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-quick">
            <h2 id="footer-quick" className="font-display text-[0.8rem] font-bold uppercase tracking-[0.16em] text-white">
              Quick links
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              {footerNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-white">
                    <span className="h-px w-0 bg-accent transition-all duration-200" aria-hidden="true" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="font-display text-[0.8rem] font-bold uppercase tracking-[0.16em] text-white">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-white/70 transition-colors hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 id="footer-areas" className="mt-7 font-display text-[0.8rem] font-bold uppercase tracking-[0.16em] text-white">
              Areas
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-[0.93rem]">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link href={`/areas/${a.slug}`} className="text-white/70 transition-colors hover:text-white">
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-[0.8rem] font-bold uppercase tracking-[0.16em] text-white">Contact</h2>
            <address className="mt-4 not-italic text-[0.95rem] leading-relaxed text-white/70">
              <span className="block text-white">{siteConfig.name}</span>
              <span className="mt-1 block">Phone &amp; WhatsApp</span>
              <a href={siteConfig.phone.href} className="text-[1.15rem] font-semibold text-white underline-offset-4 hover:underline">
                {siteConfig.phone.display}
              </a>
              <span className="mt-3 block text-[0.88rem] text-white/55">{siteConfig.hours}</span>
            </address>
            <div className="mt-5 rounded-[14px] border border-emerg/40 bg-emerg/12 p-4">
              <p className="text-[0.86rem] font-semibold text-white">Not for emergencies</p>
              <p className="mt-1 text-[0.85rem] leading-relaxed text-white/70">
                For chest pain, breathing trouble, heavy bleeding or loss of consciousness, call 83838 81773 or go to the
                nearest hospital immediately.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/12 pt-6 text-[0.85rem] md:flex-row md:items-center md:justify-between">
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-white/70">© {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
