import { LegalShell, Prose } from "@/components/Prose";
import { makeMetadata, breadcrumb } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export const metadata = makeMetadata({
  title: "Privacy Policy",
  description:
    "How Docathome handles information on this website: no accounts, no stored form data, and what happens when you send a booking request through WhatsApp or a phone call.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <>
      <LegalShell
        eyebrow="Legal"
        title="Privacy Policy"
        lede="Short and plain, because nobody wants to read a long privacy policy before booking a doctor."
        path="/privacy-policy"
        crumbName="Privacy Policy"
      >
        <Prose>
          <h2>1. What this page covers</h2>
          <p>
            This describes how information is handled when you visit the Docathome website and when you contact
            Docathome to arrange a doctor home visit. It applies to this website only, not to WhatsApp or to any
            telephone network you use to reach us.
          </p>

          <h2>2. The booking form does not send data to a server</h2>
          <p>
            The &ldquo;Request a visit&rdquo; form on this website is a convenience, not a submission. When you press
            <strong> Send on WhatsApp</strong>, the information you typed is written into a WhatsApp message and
            WhatsApp is opened with it, so you can read it before sending. The form does not transmit anything to this
            website&rsquo;s servers, and nothing is stored in a database by the page itself.
          </p>
          <p>The fields used are: patient name, age, area or address, when you need the doctor, and a short description of the problem.</p>

          <h2>3. Information you choose to share with us</h2>
          <p>
            When you call or message Docathome to arrange a visit, you share the patient&rsquo;s details, symptoms and
            location with our team so a visit can be arranged. That information is used for the purpose it was given
            for: confirming and carrying out the visit, and the follow-up that comes with it.
          </p>

          <h2>4. Health information</h2>
          <p>
            Medical details are shared with the attending doctor so that the patient can be examined and advised
            properly. Please do not send more clinical detail in a message than you are comfortable sharing; a phone
            call is usually enough, and the examination itself is where the detail matters.
          </p>

          <h2>5. Cookies, analytics and tracking</h2>
          <p>
            This website is built to stay light and does not add advertising or behavioural tracking scripts of its own.
            If you arrive through a search engine, a messaging app or a link, those third parties may handle data under
            their own policies. Standard browser information may be recorded by the hosting platform for security and
            performance purposes.
          </p>

          <h2>6. Disclosure</h2>
          <p>
            Information is shared only where it must be: with the doctor and team member handling your visit, or where
            disclosure is required by law. We do not sell personal information.
          </p>

          <h2>7. Retention</h2>
          <p>
            Messages and call records are kept only as long as needed for the visit, the follow-up period and any
            legitimate administrative requirement. You may ask us to delete information you sent by messaging us on{" "}
            {siteConfig.phone.display}.
          </p>

          <h2>8. Security limits</h2>
          <p>
            WhatsApp and telephone networks are operated by third parties and are outside our control. Please do not
            share documents such as government identity numbers in a message unless they are genuinely required.
          </p>

          <h2>9. Children</h2>
          <p>
            A parent or guardian may provide a child&rsquo;s details to arrange a home visit. This website is not
            intended for children to use on their own.
          </p>

          <h2>10. Changes and contact</h2>
          <p>
            This policy may be updated as the service changes. For any privacy question about this demo website,
            contact Docathome on {siteConfig.phone.display}.
          </p>
        </Prose>
      </LegalShell>
      <JsonLd schemas={[breadcrumb([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }])]} />
    </>
  );
}
