import type { Metadata } from "next";
import LegalPage, { LegalSection as Section } from "@/components/LegalPage";

const title = "Privacy Policy — Seaton Swift";
const description = "Seaton Swift Privacy Policy — how we collect, use, and protect your data.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { title, description, url: "/privacy-policy", type: "article" },
  twitter: { title, description },
};

const SECTIONS = [
  "1. Introduction",
  "2. Data We Collect",
  "3. How We Use Your Data",
  "4. Data Sharing",
  "5. Data Retention",
  "6. Data Protection",
  "7. Your Rights",
  "8. Children's Privacy",
  "9. Cookies and Tracking",
  "10. Changes to This Policy",
  "11. Contact",
];

export default function PrivacyPolicyPage() {
  const updated = "26 May 2025";
  return (
    <LegalPage title="Privacy Policy" updated={updated} sections={SECTIONS}>
      <></>
          <Section title="1. Introduction">
            <p>Seaton Swift (&quot;we&quot;, &quot;our&quot;, or &quot;the Platform&quot;) is a product of Seaton Logistics, operating from Kumasi, Ashanti Region, Ghana. We operate a delivery marketplace that connects shops (businesses) with independent motorcycle and vehicle riders.</p>
            <p>This Privacy Policy explains what personal data we collect, why we collect it, how we use it, and the rights you have over your data. By using the Seaton Swift app or website, you agree to the practices described in this Policy.</p>
          </Section>

          <Section title="2. Data We Collect">
            <p><strong className="text-ink">Account information:</strong> When you register, we collect your full name, phone number, email address, and a profile photo — for shops, this is your shop logo.</p>
            <p><strong className="text-ink">Rider documents:</strong> For riders, we collect photographs of your government-issued ID (Ghana Card) and riding licence, including their expiry dates, together with a photograph of your vehicle and its registration number. These images are stored securely and are used solely to verify your identity, your eligibility to ride, and the vehicle you operate.</p>
            <p><strong className="text-ink">Location data:</strong> We collect real-time GPS location from riders while they are active on the platform, and pickup/drop-off address data from shops when posting deliveries.</p>
            <p><strong className="text-ink">Transaction data:</strong> We record delivery details including price, distance, time, and completion status.</p>
            <p><strong className="text-ink">Payment data:</strong> We collect Mobile Money wallet numbers and bank account details for rider payouts. We do not store card numbers directly.</p>
            <p><strong className="text-ink">Usage data:</strong> We collect app usage data including device type, operating system, session duration, and feature interactions to improve the platform.</p>
            <p><strong className="text-ink">Communications:</strong> If you contact our support team, we retain records of those communications.</p>
          </Section>

          <Section title="3. How We Use Your Data">
            <ul className="list-disc pl-5 space-y-2">
              <li>To create and manage your account</li>
              <li>To match shops with available riders</li>
              <li>To enable real-time delivery tracking</li>
              <li>To process rider payouts</li>
              <li>To verify rider identity and eligibility</li>
              <li>To resolve disputes between shops and riders</li>
              <li>To send transactional notifications (delivery updates, payment confirmations)</li>
              <li>To improve platform performance and user experience</li>
              <li>To comply with legal obligations under Ghanaian law</li>
            </ul>
          </Section>

          <Section title="4. Data Sharing">
            <p>We do not sell your personal data to third parties. We share data only in the following circumstances:</p>
            <p><strong className="text-ink">Between users:</strong> Shops see a rider&apos;s first name, rating, and live location during an active delivery. Riders see the pickup and drop-off address and shop contact number.</p>
            <p><strong className="text-ink">Payment processors:</strong> We share the minimum necessary data with Mobile Money processors and banking partners to complete payouts.</p>
            <p><strong className="text-ink">Legal compliance:</strong> We may disclose data to Ghanaian law enforcement or regulatory authorities when required by law or court order.</p>
            <p><strong className="text-ink">Service providers:</strong> We work with hosting, analytics, and customer support providers who process data on our behalf under strict data processing agreements.</p>
          </Section>

          <Section title="5. Data Retention">
            <p>We retain your account data for as long as your account is active. If you delete your account, we retain data required for legal, tax, or dispute resolution purposes for up to 7 years, after which it is permanently deleted.</p>
            <p>Delivery location data is retained for 90 days and then anonymised. Rider verification documents are retained for the duration of the rider relationship plus 2 years.</p>
          </Section>

          <Section title="6. Data Protection">
            <p>We implement industry-standard security measures including encrypted data transmission (TLS/SSL), encrypted storage of sensitive data, access controls limiting who within our team can view personal data, and regular security assessments.</p>
            <p>No method of electronic transmission is 100% secure. If you believe your account has been compromised, contact us immediately at privacy@seatonlogistics.com.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>Under applicable Ghanaian data protection law, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-ink">Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong className="text-ink">Correction:</strong> Request that we correct inaccurate data</li>
              <li><strong className="text-ink">Deletion:</strong> Request deletion of your account and associated data, subject to legal retention requirements</li>
              <li><strong className="text-ink">Portability:</strong> Request your data in a structured, machine-readable format</li>
              <li><strong className="text-ink">Objection:</strong> Object to certain processing activities</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:privacy@seatonlogistics.com" className="text-brand hover:underline">privacy@seatonlogistics.com</a>. We will respond within 30 days.</p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>Seaton Swift is not intended for users under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has registered, please contact us and we will delete the account.</p>
          </Section>

          <Section title="9. Cookies and Tracking">
            <p>Our website uses essential cookies to maintain session state. We may use analytics tools to understand how users interact with our website. You can disable cookies in your browser settings; however, some platform features may not function correctly as a result.</p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. When we make significant changes, we will notify users via the app or email. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision. Continued use of the platform after changes constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="11. Contact">
            <p>For privacy-related enquiries, contact:</p>
            <p>
              Seaton Swift (a product of Seaton Logistics)<br />
              Kumasi, Ashanti Region, Ghana<br />
              Email: <a href="mailto:privacy@seatonlogistics.com" className="text-brand hover:underline">privacy@seatonlogistics.com</a><br />
              Phone: +233 20 057 7600
            </p>
          </Section>
    </LegalPage>
  );
}
