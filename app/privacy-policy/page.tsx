import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Seaton Swift",
  description: "Seaton Swift Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  const updated = "26 May 2025";
  return (
    <section className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-5">
        <div className="mb-10">
          <span className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest">Legal</span>
          <h1 className="text-4xl font-extrabold mt-2 mb-2">Privacy Policy</h1>
          <p className="text-[#9E9E9E] text-sm">Last updated: {updated} · Governing law: Republic of Ghana</p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-10 text-[#9E9E9E]">
          <Section title="1. Introduction">
            <p>Seaton Swift (&quot;we&quot;, &quot;our&quot;, or &quot;the Platform&quot;) is a product of Seaton Logistics, operating from Kumasi, Ashanti Region, Ghana. We operate a delivery marketplace that connects shops (businesses) with independent motorcycle and vehicle riders.</p>
            <p>This Privacy Policy explains what personal data we collect, why we collect it, how we use it, and the rights you have over your data. By using the Seaton Swift app or website, you agree to the practices described in this Policy.</p>
          </Section>

          <Section title="2. Data We Collect">
            <p><strong className="text-white">Account information:</strong> When you register, we collect your full name, phone number, email address, and profile photo.</p>
            <p><strong className="text-white">Rider documents:</strong> For riders, we collect government-issued ID (Ghana Card), riding licence details, and vehicle registration information for verification purposes.</p>
            <p><strong className="text-white">Location data:</strong> We collect real-time GPS location from riders while they are active on the platform, and pickup/drop-off address data from shops when posting deliveries.</p>
            <p><strong className="text-white">Transaction data:</strong> We record delivery details including price, distance, time, and completion status.</p>
            <p><strong className="text-white">Payment data:</strong> We collect Mobile Money wallet numbers and bank account details for rider payouts. We do not store card numbers directly.</p>
            <p><strong className="text-white">Usage data:</strong> We collect app usage data including device type, operating system, session duration, and feature interactions to improve the platform.</p>
            <p><strong className="text-white">Communications:</strong> If you contact our support team, we retain records of those communications.</p>
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
            <p><strong className="text-white">Between users:</strong> Shops see a rider&apos;s first name, rating, and live location during an active delivery. Riders see the pickup and drop-off address and shop contact number.</p>
            <p><strong className="text-white">Payment processors:</strong> We share the minimum necessary data with Mobile Money processors and banking partners to complete payouts.</p>
            <p><strong className="text-white">Legal compliance:</strong> We may disclose data to Ghanaian law enforcement or regulatory authorities when required by law or court order.</p>
            <p><strong className="text-white">Service providers:</strong> We work with hosting, analytics, and customer support providers who process data on our behalf under strict data processing agreements.</p>
          </Section>

          <Section title="5. Data Retention">
            <p>We retain your account data for as long as your account is active. If you delete your account, we retain data required for legal, tax, or dispute resolution purposes for up to 7 years, after which it is permanently deleted.</p>
            <p>Delivery location data is retained for 90 days and then anonymised. Rider verification documents are retained for the duration of the rider relationship plus 2 years.</p>
          </Section>

          <Section title="6. Data Protection">
            <p>We implement industry-standard security measures including encrypted data transmission (TLS/SSL), encrypted storage of sensitive data, access controls limiting who within our team can view personal data, and regular security assessments.</p>
            <p>No method of electronic transmission is 100% secure. If you believe your account has been compromised, contact us immediately at privacy@seatonswift.com.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>Under applicable Ghanaian data protection law, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong className="text-white">Correction:</strong> Request that we correct inaccurate data</li>
              <li><strong className="text-white">Deletion:</strong> Request deletion of your account and associated data, subject to legal retention requirements</li>
              <li><strong className="text-white">Portability:</strong> Request your data in a structured, machine-readable format</li>
              <li><strong className="text-white">Objection:</strong> Object to certain processing activities</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:privacy@seatonswift.com" className="text-[#E8402A] hover:underline">privacy@seatonswift.com</a>. We will respond within 30 days.</p>
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
              Email: <a href="mailto:privacy@seatonswift.com" className="text-[#E8402A] hover:underline">privacy@seatonswift.com</a><br />
              Phone: +233 20 057 7600
            </p>
          </Section>
        </div>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[#2A2A2A] pt-8">
      <h2 className="text-white text-lg font-bold mb-4">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
