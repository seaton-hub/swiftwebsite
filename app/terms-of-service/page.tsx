import type { Metadata } from "next";
import LegalPage, { LegalSection as Section } from "@/components/LegalPage";

const title = "Terms of Service — Seaton Swift";
const description =
  "Seaton Swift Terms of Service — platform rules, commission structure, user responsibilities.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms-of-service" },
  openGraph: { title, description, url: "/terms-of-service", type: "article" },
  twitter: { title, description },
};

const SECTIONS = [
  "1. Agreement to Terms",
  "2. Platform Description",
  "3. Eligibility",
  "4. Shop Responsibilities",
  "5. Rider Responsibilities",
  "6. Commission and Payment",
  "7. Prohibited Items and Activities",
  "8. Account Suspension and Termination",
  "9. Ratings and Reviews",
  "10. Dispute Resolution",
  "11. Limitation of Liability",
  "12. Intellectual Property",
  "13. Changes to Terms",
  "14. Governing Law",
  "15. Contact",
];

export default function TermsPage() {
  const updated = "26 May 2025";
  return (
    <LegalPage title="Terms of Service" updated={updated} sections={SECTIONS}>
      <></>
          <Section title="1. Agreement to Terms">
            <p>By downloading, registering, or using the Seaton Swift platform (the &quot;App&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree, do not use the platform. These Terms constitute a legally binding agreement between you and Seaton Swift, a product of Seaton Logistics, Kumasi, Ghana.</p>
          </Section>

          <Section title="2. Platform Description">
            <p>Seaton Swift is a marketplace that connects shops (businesses that post delivery jobs) with independent riders (individuals who accept and complete those deliveries). Seaton Swift facilitates the connection and provides tracking, payment, and support infrastructure but is not itself a delivery company and does not employ riders.</p>
          </Section>

          <Section title="3. Eligibility">
            <p>To use Seaton Swift you must be at least 18 years of age, legally able to enter into contracts under Ghanaian law, and provide accurate registration information. Accounts created with false information will be suspended.</p>
          </Section>

          <Section title="4. Shop Responsibilities">
            <p>As a shop posting deliveries, you agree to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Provide accurate pickup and drop-off locations</li>
              <li>Ensure packages are securely packaged before rider collection</li>
              <li>Only send items that are legal and permitted under Ghanaian law</li>
              <li>Not post deliveries for prohibited items (see Section 7)</li>
              <li>Pay the delivery fee as shown before confirmation</li>
              <li>Be available or have a representative available at the pickup point at the agreed time</li>
              <li>Not harass, abuse, or threaten riders</li>
            </ul>
          </Section>

          <Section title="5. Rider Responsibilities">
            <p>As a rider, you agree to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Maintain a valid riding licence and roadworthy vehicle at all times</li>
              <li>Collect and deliver packages safely and on time</li>
              <li>Treat shops and recipients with professionalism and respect</li>
              <li>Not open, damage, or tamper with packages</li>
              <li>Only accept deliveries you intend to complete</li>
              <li>Report incidents or failed deliveries immediately through the app</li>
              <li>Not operate the platform while under the influence of alcohol or drugs</li>
              <li>Comply with all Ghanaian road traffic laws</li>
            </ul>
          </Section>

          <Section title="6. Commission and Payment">
            <p><strong className="text-ink">Shop fees:</strong> Delivery fees are calculated dynamically from the distance travelled, the service selected, and prevailing conditions including demand, pricing zone, time of day and weather. Seaton Swift may vary these rates at any time. The full price for a delivery is always displayed and must be accepted before that delivery is confirmed, and the accepted price is fixed for that delivery. No charge is made if no rider accepts the delivery.</p>
            <p><strong className="text-ink">Rider commission:</strong> Seaton Swift deducts a platform commission of 10% on Swift deliveries and 12% on Carry and Move deliveries. Riders retain 88–90% of each completed delivery. There are no sign-up fees or subscription charges for riders.</p>
            <p><strong className="text-ink">Payouts:</strong> Rider earnings are paid out daily to the Mobile Money wallet or bank account registered on the platform. Seaton Swift reserves the right to withhold payment pending investigation of any reported incident or dispute.</p>
          </Section>

          <Section title="7. Prohibited Items and Activities">
            <p>The following are strictly prohibited on Seaton Swift:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Illegal drugs, narcotics, or controlled substances</li>
              <li>Firearms, ammunition, or weapons</li>
              <li>Counterfeit goods</li>
              <li>Hazardous materials, flammable liquids, or explosives</li>
              <li>Live animals</li>
              <li>Human remains or body parts</li>
              <li>Any item prohibited under Ghanaian law</li>
              <li>Using the platform to conduct fraud or money laundering</li>
              <li>Creating multiple accounts to abuse promotional offers</li>
            </ul>
            <p className="mt-3">Violation of this section will result in immediate account suspension and may be reported to law enforcement.</p>
          </Section>

          <Section title="8. Account Suspension and Termination">
            <p>Seaton Swift may suspend or permanently ban any account that violates these Terms, receives a pattern of negative ratings or complaints, engages in fraudulent activity, or is involved in criminal conduct. Suspended users may appeal by contacting support@seatonlogistics.com within 7 days of suspension.</p>
            <p>You may delete your account at any time from within the app settings. Outstanding balances or pending deliveries must be resolved before deletion is finalised.</p>
          </Section>

          <Section title="9. Ratings and Reviews">
            <p>Both shops and riders are rated after each delivery. Ratings are averaged over the last 100 deliveries. Accounts with consistently low ratings (below 3.5 stars) may be suspended pending review. Manipulating ratings through fake reviews or coercing users is prohibited.</p>
          </Section>

          <Section title="10. Dispute Resolution">
            <p>In the event of a dispute between a shop and a rider, both parties should first attempt resolution through the in-app support chat. If unresolved within 48 hours, Seaton Swift&apos;s support team will review the delivery record, GPS data, and communications and issue a binding determination within 5 business days.</p>
            <p>Seaton Swift&apos;s decisions on disputes are final within the platform. Either party may seek legal remedy under Ghanaian law independently of the platform process.</p>
          </Section>

          <Section title="11. Limitation of Liability">
            <p>Seaton Swift is a marketplace and not a common carrier. We are not liable for loss, damage, or delay of packages during delivery. Maximum platform liability for any single incident shall not exceed the value of the delivery fee paid for that specific delivery.</p>
            <p>We are not liable for indirect, incidental, or consequential damages arising from use of the platform, including but not limited to loss of business revenue, loss of data, or reputational damage.</p>
          </Section>

          <Section title="12. Intellectual Property">
            <p>All platform content, trademarks, logos, and software are the property of Seaton Swift / Seaton Logistics. You may not reproduce, distribute, or create derivative works from platform content without prior written permission.</p>
          </Section>

          <Section title="13. Changes to Terms">
            <p>We may update these Terms at any time. We will notify active users via the app or email at least 7 days before material changes take effect. Continued use of the platform after the effective date constitutes acceptance of the updated Terms.</p>
          </Section>

          <Section title="14. Governing Law">
            <p>These Terms are governed by and construed in accordance with the laws of the Republic of Ghana. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Ghana.</p>
          </Section>

          <Section title="15. Contact">
            <p>
              Seaton Swift — a product of Seaton Logistics<br />
              Kumasi, Ashanti Region, Ghana<br />
              Email: <a href="mailto:support@seatonlogistics.com" className="text-brand hover:underline">support@seatonlogistics.com</a>
            </p>
          </Section>
    </LegalPage>
  );
}
