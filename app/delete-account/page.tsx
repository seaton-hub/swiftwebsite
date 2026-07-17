import type { Metadata } from "next";
import Link from "next/link";
import DeleteAccountForm from "../../components/DeleteAccountForm";

export const metadata: Metadata = {
  title: "Delete Your Account — Seaton Swift",
  description:
    "Permanently delete your Seaton Swift rider or shop account and all associated personal data.",
};

export default function DeleteAccountPage() {
  return (
    <section className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-5">
        <div className="mb-10">
          <span className="text-[#E8402A] text-xs font-semibold uppercase tracking-widest">Account</span>
          <h1 className="text-4xl font-extrabold mt-2 mb-2">Delete Your Account</h1>
          <p className="text-[#9E9E9E] text-sm">
            Permanently remove your Seaton Swift account and personal data — no app required.
          </p>
        </div>

        {/* What deletion means */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 mb-6">
          <h2 className="text-white text-lg font-bold mb-4">What gets deleted</h2>
          <ul className="space-y-2 text-sm text-[#9E9E9E]">
            {[
              "Your profile, photo and account details",
              "Rider verification documents (Ghana Card, licence, vehicle photos)",
              "Delivery history, earnings and payment records",
              "Saved Mobile Money numbers, ratings, messages and notifications",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-[#EF4444] mt-0.5">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#2A2A2A] mt-6 pt-5 space-y-2 text-sm text-[#9E9E9E]">
            <p>
              <strong className="text-white">Before you delete:</strong> any active delivery must be
              completed or cancelled, and riders must settle any outstanding commission balance.
            </p>
            <p>
              Records we are legally required to keep (e.g. for tax or dispute resolution under
              Ghanaian law) may be retained for a limited period as described in our{" "}
              <Link href="/privacy-policy" className="text-[#E8402A] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Self-service form */}
        <DeleteAccountForm />

        {/* Fallback for users who can't sign in */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 mt-6">
          <h2 className="text-white text-lg font-bold mb-3">Can&apos;t sign in?</h2>
          <p className="text-[#9E9E9E] text-sm leading-relaxed">
            If you no longer have access to your password or phone number, email{" "}
            <a
              href="mailto:hello@seatonswift.com?subject=Account%20Deletion%20Request"
              className="text-[#E8402A] hover:underline"
            >
              hello@seatonswift.com
            </a>{" "}
            with the subject &quot;Account Deletion Request&quot; and include your registered phone
            number. We will verify your identity and delete the account within 30 days.
          </p>
        </div>
      </div>
    </section>
  );
}
