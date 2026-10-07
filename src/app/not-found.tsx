import Link from "next/link";
import { Icon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell max-w-2xl py-10 text-center lg:py-20">
        <p className="eyebrow justify-center">Page not found</p>
        <h1 className="h1 mt-5 text-[clamp(2.2rem,7vw,3.2rem)]">That page has moved — the doctor has not</h1>
        <p className="lede mx-auto mt-5">
          The page you were looking for is not here. You can go back to the homepage, read how a home visit works, or
          simply call us.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-brand px-6 font-bold text-white transition-colors hover:bg-brand-dark"
          >
            Back to home <Icon name="arrowRight" size={18} />
          </Link>
          <a
            href={siteConfig.phone.href}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-line bg-surface px-6 font-semibold text-brand-deep transition-colors hover:bg-brand-tint"
          >
            <Icon name="phone" size={18} /> {siteConfig.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
