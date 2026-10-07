import { LegalShell, Prose } from "@/components/Prose";
import { makeMetadata, breadcrumb } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export const metadata = makeMetadata({
  title: "Terms of Service",
  description:
    "The terms that apply when you use the Docathome website and request a doctor home visit in Delhi NCR, including the ₹899 visit fee, confirmation of arrival times and emergency exclusions.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <LegalShell
        eyebrow="Legal"
        title="Terms"
        lede="The agreement between you and Docathome when you use this website to arrange a home visit."
        path="/terms"
        crumbName="Terms"
      >
        <Prose>
          <h2>1. The service</h2>
          <p>
            Docathome arranges for a qualified doctor to attend a patient at a given address for non-emergency medical
            consultation. The website exists to explain the service and to help you start a booking by phone or
            WhatsApp.
          </p>

          <h2>2. Booking is confirmed by us, not by this page</h2>
          <p>
            Submitting the request form only opens a WhatsApp message. A visit is arranged once our team replies and
            confirms it. Until a visit is confirmed on {siteConfig.phone.display}, no visit has been booked.
          </p>

          <h2>3. Fee and payment</h2>
          <p>
            The published flat visit fee is <strong>{siteConfig.price.amount}</strong>, payable{" "}
            <strong>after</strong> the doctor has examined the patient. Laboratory tests, medicines or any other
            service arranged separately are quoted at that point and are not included in the visit fee. Prices shown
            are in Indian Rupees.
          </p>

          <h2>4. Arrival time</h2>
          <p>
            Where this site says the doctor usually reaches in about 15 minutes, that is a typical expectation and not
            a guarantee. Actual arrival depends on traffic, the exact location and doctor availability at that moment,
            and is confirmed with you at the time of booking.
          </p>

          <h2>5. Coverage</h2>
          <p>
            The service areas published on this website are Delhi, Gurgaon, Noida, Ghaziabad and Dwarka. Availability
            within an area is confirmed on call; a request may be declined if no doctor can reach the address in a
            reasonable time.
          </p>

          <h2>6. Not an emergency service</h2>
          <p>
            Docathome is not an ambulance or emergency service and is not a substitute for hospital care. If a patient
            has chest pain, breathing trouble, heavy bleeding, loss of consciousness or any other potentially
            life-threatening symptom, you must call 112 or go to the nearest hospital immediately. Do not use this
            website to arrange a home visit for an emergency.
          </p>

          <h2>7. Medical decisions</h2>
          <p>
            Any diagnosis, prescription or advice given during a visit is the responsibility of the attending doctor
            and applies to that patient on that day. Content on this website is general information about the service;
            it is not medical advice and must not be used in place of an examination. Never start, stop or change
            prescribed medicines without speaking to a doctor.
          </p>

          <h2>8. Cancellations</h2>
          <p>
            If you no longer need a visit, please tell us as early as you can by call or WhatsApp so the doctor can be
            released. Once a doctor has been dispatched and arrives, the visit fee applies as confirmed at booking.
          </p>

          <h2>9. Use of the website</h2>
          <p>
            You may use this website for your own personal purposes: reading about the service and contacting us. You
            may not copy, reproduce or present the design, text or imagery of this website as your own, or use it for
            any unlawful purpose.
          </p>

          <h2>10. Availability of this site</h2>
          <p>
            We aim to keep the website available but do not promise uninterrupted access. If the site is down, the
            phone and WhatsApp number continue to work, and that is the route we recommend for anything urgent.
          </p>

          <h2>11. Governing law</h2>
          <p>These terms are governed by the laws of India, with courts in Delhi having jurisdiction.</p>

          <h2>12. Changes</h2>
          <p>
            Terms may be updated as the service develops. The version published on this page is the version that
            applies when you use the website.
          </p>
        </Prose>
      </LegalShell>
      <JsonLd schemas={[breadcrumb([{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }])]} />
    </>
  );
}
