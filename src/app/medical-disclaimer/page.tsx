import { LegalShell, Prose } from "@/components/Prose";
import { EmergencyNotice } from "@/components/blocks";
import { makeMetadata, breadcrumb } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export const metadata = makeMetadata({
  title: "Medical Disclaimer",
  description:
    "Docathome provides doctor home visits for appropriate non-emergency care. This disclaimer explains what the website can and cannot do, and why emergencies need 112 or the nearest hospital.",
  path: "/medical-disclaimer",
});

export default function MedicalDisclaimerPage() {
  return (
    <>
      <LegalShell
        eyebrow="Legal · Safety"
        title="Medical Disclaimer"
        lede="Please read this before using the website to make a decision about someone's health."
        path="/medical-disclaimer"
        crumbName="Medical Disclaimer"
      >
        <Prose>
          <h2>This website does not diagnose or treat</h2>
          <p>
            Everything published on this website — including the service descriptions, FAQ and process pages — is
            general information about the Docathome home visit service. It is not medical advice, not a diagnosis and
            not a treatment recommendation for you or anyone else. No condition can be assessed from a form or a
            message.
          </p>

          <h2>Emergency care is elsewhere</h2>
          <p>
            <strong>
              Docathome is not an emergency service and is not a substitute for emergency medical care, an ambulance
              or a hospital.
            </strong>{" "}
            For chest pain, breathing trouble, heavy bleeding, loss of consciousness, suspected stroke, severe
            accident injury, or any symptom you believe is life-threatening, call <strong>112</strong> or go to the
            nearest hospital immediately. Do not wait for a home visit, and do not use this website to arrange one.
          </p>

          <h2>Decisions are made at an examination</h2>
          <p>
            Whether a home visit is clinically appropriate for a particular patient is decided at the time of booking
            by our team and, in full, by the attending doctor on examination. We may decline a booking when a hospital
            or a clinic is the safer place for the patient. That decision is made for the patient&rsquo;s benefit.
          </p>

          <h2>Medicines</h2>
          <p>
            Prescriptions are written only after an in-person examination by the attending doctor, and apply to that
            patient on that day. Never take a prescription written for someone else, never share your own, and never
            start, stop or change the dose of a medicine — including blood pressure, sugar, antibiotic or psychiatric
            medicines — without a doctor&rsquo;s instruction.
          </p>

          <h2>Timings are estimates</h2>
          <p>
            Statements such as &ldquo;the doctor usually reaches in about 15 minutes&rdquo; describe a typical
            expectation, not a guaranteed response time. Traffic, distance, weather and current availability all affect
            it, and the confirmed time is given to you at booking.
          </p>

          <h2>Follow-up does not replace reassessment</h2>
          <p>
            One week of free follow-up is provided so that questions about the same visit can be answered. It is not a
            licence to delay care: if a patient worsens, call us immediately and, if the picture is serious, go to a
            hospital.
          </p>

          <h2>Limits of liability</h2>
          <p>
            To the extent permitted by law, Docathome is not liable for decisions made on the basis of website content
            alone. If you are ever unsure whether something is serious, treat it as serious and seek emergency care.
          </p>

          <h2>Questions</h2>
          <p>
            Anything about suitability of a home visit for a particular patient can be discussed on{" "}
            {siteConfig.phone.display} before you book.
          </p>
        </Prose>

        <div className="mt-10">
          <EmergencyNotice />
        </div>
      </LegalShell>
      <JsonLd schemas={[breadcrumb([{ name: "Home", path: "/" }, { name: "Medical Disclaimer", path: "/medical-disclaimer" }])]} />
    </>
  );
}
