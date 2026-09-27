import type { Metadata } from "next";
import LegalPage, { LegalSection as Section } from "@/components/LegalPage";

const title = "Privacy Policy | Seaton Swift";
const description = "Seaton Swift Privacy Policy: how we collect, use, and protect your data.";

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
  const updated = "27 September 2026";
  return (
    <LegalPage title="Privacy Policy" updated={updated} sections={SECTIONS}>
      <></>
          <Section title="1. Introduction">
            <p>Seaton Swift (&quot;we&quot;, &quot;our&quot;, or &quot;the Platform&quot;) is a product of Seaton Logistics, operating from Kumasi, Ashanti Region, Ghana. We operate a delivery marketplace that connects shops (businesses) with independent motorcycle and vehicle riders.</p>
            <p>This Privacy Policy explains what personal data we collect, why we collect it, how we use it, and the rights you have over your data. By using the Seaton Swift app or website, you agree to the practices described in this Policy.</p>
          </Section>

          <Section title="2. Data We Collect">
            <p><strong className="text-ink">Account information:</strong> When you register, we collect your full name, phone number, email address, and a profile photo. For shops, this is your shop logo.</p>
            <p><strong className="text-ink">Rider documents:</strong> For riders, we collect photographs of your government-issued ID (Ghana Card) and riding licence, including their expiry dates, together with a photograph of your vehicle and its registration number. These images are stored securely and are used solely to verify your identity, your eligibility to ride, and the vehicle you operate.</p>
            <p><strong className="text-ink">Rider identity numbers:</strong> We also collect the number printed on your Ghana Card, and your licence number if your vehicle requires a licence. We use these to confirm that the document you uploaded belongs to you, and to make sure the same person does not hold more than one rider account. A vehicle registration number can only be held by one rider account at a time.</p>
            <p><strong className="text-ink">Identity photograph:</strong> Riders are asked to take a photograph of themselves holding their Ghana Card. We use it once, to confirm that the person registering is the person named on the card. It is reviewed by our team, stored with your other verification documents, and is never shown to shops, to customers, or to other riders.</p>
            <p><strong className="text-ink">Location data:</strong> We collect real-time GPS location from riders while they are online. <strong className="text-ink">This collection continues in the background</strong> while the app is minimised, while you are using a navigation app, and while your phone is locked, so that shops can follow a delivery in progress and so we can settle disputes about what happened on a trip. Location is sampled roughly every 30 seconds while you are online, and every 5 seconds during an active delivery. Background collection runs only while you are online: it stops the moment you go offline, and you can end it at any time by going offline or by withdrawing the location permission in your device settings. From shops we collect the pickup and drop-off addresses entered when a delivery is posted and, with your permission, your device location while the Merchant app is open, in order to fill in a pickup address. The Merchant app does not collect location in the background.</p>
            <p><strong className="text-ink">Transaction data:</strong> We record delivery details including price, distance, time, and completion status.</p>
            <p><strong className="text-ink">Payment data:</strong> Riders save the Mobile Money number, and its network, that they pay their weekly commission from. The payment itself is taken by our payment processor, Paystack. We keep the amount and the payment reference, never a PIN or a card number. We do not pay money out to riders, so we do not collect bank account details.</p>
            <p><strong className="text-ink">People who receive deliveries:</strong> When a sender posts a delivery, they give us the recipient&apos;s name, phone number and delivery address. We use these only for that delivery. The rider sees them in order to complete it, and the recipient gets a text message when the rider collects the package, with a link to follow it. That tracking link shows the recipient&apos;s first name, the delivery address and, only while the delivery is in progress, the rider&apos;s position. If a recipient reports a problem through the link, we keep what they write and, if they choose to give them, their name and phone number.</p>
            <p><strong className="text-ink">Our website:</strong> The website sets no cookies and runs no analytics or advertising software. If you choose light or dark mode, that choice is kept in your own browser and never sent to us. If you write to us through the contact form, your name, email address and message are sent to our team&apos;s inbox so we can reply. They are not stored in our database. See our <a href="/cookie-policy" className="text-brand-text hover:underline">Cookie Policy</a>.</p>
            <p><strong className="text-ink">Usage data:</strong> Our apps contain no analytics, advertising, or crash-reporting software. We do not track how you move around inside the app, and we do not build a profile of your behaviour.</p>
            <p><strong className="text-ink">Messages:</strong> Riders and shops can send each other short messages about a delivery in progress. We store these messages so that both sides keep a record, and so that we can investigate disputes or reported misconduct.</p>
            <p><strong className="text-ink">Communications:</strong> If you contact our support team, we retain records of those communications.</p>
          </Section>

          <Section title="3. How We Use Your Data">
            <ul className="list-disc pl-5 space-y-2">
              <li>To create and manage your account</li>
              <li>To match shops with available riders</li>
              <li>To enable real-time delivery tracking</li>
              <li>To take riders&apos; weekly commission payments</li>
              <li>To tell a delivery&apos;s recipient that it is on the way, and let them follow it</li>
              <li>To verify rider identity and eligibility</li>
              <li>To prevent one person holding several rider accounts, and to stop a removed rider registering again</li>
              <li>To resolve disputes between shops and riders</li>
              <li>To send transactional notifications (delivery updates, payment confirmations)</li>
              <li>To improve platform performance and user experience</li>
              <li>To comply with legal obligations under Ghanaian law</li>
            </ul>
          </Section>

          <Section title="4. Data Sharing">
            <p>We do not sell your personal data to third parties. We share data only in the following circumstances:</p>
            <p><strong className="text-ink">Between users:</strong> Shops see a rider&apos;s first name, rating, and live location during an active delivery. Riders see the pickup and drop-off address, the shop&apos;s contact number, and the recipient&apos;s name and phone number.</p>
            <p><strong className="text-ink">Payment processor:</strong> Riders&apos; commission payments are taken through Paystack, which receives the Mobile Money number and the amount needed to complete each payment.</p>
            <p><strong className="text-ink">Legal compliance:</strong> We may disclose data to Ghanaian law enforcement or regulatory authorities when required by law or court order.</p>
            <p><strong className="text-ink">Mapping and routing:</strong> We send pickup, drop-off and rider coordinates to Google Maps Platform to draw maps, suggest addresses, and measure road distances and travel times. This is how we work out what a delivery costs and how far a rider must travel to reach a pickup. Google receives coordinates only, never your name, phone number or documents.</p>
            <p><strong className="text-ink">Service providers:</strong> We work with hosting, messaging, and customer support providers who process data on our behalf under strict data processing agreements. We do not use advertising networks, and we do not share your data with advertisers or data brokers.</p>
          </Section>

          <Section title="5. Data Retention">
            <p>We retain your account data for as long as your account is active. If you delete your account, we retain data required for legal, tax, or dispute resolution purposes for up to 7 years, after which it is permanently deleted.</p>
            <p><strong className="text-ink">After you delete your account:</strong> the deliveries, commission and payment records, and ratings you gave others stay, because the people on the other side of those deliveries and our own accounts depend on them. They are detached from your account and carry only the name as it appeared at the time. Your profile photo or logo is destroyed after 30 days.</p>
            <p><strong className="text-ink">Location:</strong> a rider&apos;s location trail for a delivery is deleted after 90 days. The four points that record the delivery itself (accepted, arrived, collected, delivered) are kept with the delivery record, because they are what a dispute is settled from.</p>
            <p><strong className="text-ink">Messages:</strong> messages between riders and shops about a delivery are deleted after 12 months, unless they are part of a dispute.</p>
            <p>Rider verification documents, including the identity photograph, are retained for the duration of the rider relationship plus 2 years.</p>
            <p><strong className="text-ink">Removed accounts:</strong> If we remove a rider for fraud, theft, or serious misconduct, we keep a one-way cryptographic hash of their Ghana Card number so that the same person cannot simply register again. A hash cannot be reversed, so the number itself is not retained and cannot be recovered from it. The record is erased if the removal is later reversed.</p>
            <p><strong className="text-ink">Closed accounts:</strong> When a rider closes their own account we keep one thing: a separate one-way cryptographic hash of the Ghana Card number, with a count of how many accounts that card has held. It cannot be reversed, and it holds no name, number, phone number or document. It exists only so that one-time joining rewards go to genuinely new riders rather than to the same person registering repeatedly. <strong className="text-ink">It never prevents anyone from registering.</strong> Closing an account and opening a new one is allowed, and the new account works normally in every respect; it simply is not treated as a first account for the purposes of a joining bonus. Deleting your account still deletes your account, your documents, your trip history and your personal data as described above.</p>
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
              <li><strong className="text-ink">Deletion:</strong> Request deletion of your account and associated data, subject to legal retention requirements. You cannot delete an account while a delivery is in progress or while commission is outstanding. Deletion does not clear either of the one-way hashes described in section 5: the misconduct hash, or the joining-reward hash that applies to every closed account</li>
              <li><strong className="text-ink">Portability:</strong> Request your data in a structured, machine-readable format</li>
              <li><strong className="text-ink">Objection:</strong> Object to certain processing activities</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:privacy@seatonlogistics.com" className="text-brand-text hover:underline">privacy@seatonlogistics.com</a>. We will respond within 30 days.</p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>Seaton Swift is not intended for users under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has registered, please contact us and we will delete the account.</p>
          </Section>

          <Section title="9. Cookies and Tracking">
            <p>Our website sets no cookies and uses no analytics, advertising or tracking tools. The only thing it stores on your device is your light or dark mode choice, if you make one, and that stays in your browser. Our apps keep your sign-in on your phone so you stay signed in. The details are in our <a href="/cookie-policy" className="text-brand-text hover:underline">Cookie Policy</a>.</p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. When we make significant changes, we will notify users via the app or email. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision. Continued use of the platform after changes constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="11. Contact">
            <p>For privacy-related enquiries, contact:</p>
            <p>
              Seaton Swift (a product of Seaton Logistics)<br />
              Kumasi, Ashanti Region, Ghana<br />
              Email: <a href="mailto:privacy@seatonlogistics.com" className="text-brand-text hover:underline">privacy@seatonlogistics.com</a>
            </p>
          </Section>
    </LegalPage>
  );
}
