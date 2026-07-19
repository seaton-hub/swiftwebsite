import type { Metadata } from "next";
import Link from "next/link";
import DeleteAccountForm from "@/components/DeleteAccountForm";
import { GENERAL_EMAIL } from "@/lib/site";

const title = "Delete Your Account — Seaton Swift";
const description =
  "Permanently delete your Seaton Swift rider or shop account and all associated personal data.";

// Must stay publicly indexable: Google Play requires a reachable account-deletion
// URL for any app that creates accounts.
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/delete-account" },
  openGraph: { title, description, url: "/delete-account", type: "website" },
  twitter: { title, description },
};

export default function DeleteAccountPage() {
  return (
    <>
      {/* header */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-brand opacity-[0.06] rounded-full blur-[130px] -translate-y-1/2 translate-x-1/3" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(var(--hero-grid) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse at top, black 10%, transparent 65%)",
              WebkitMaskImage: "radial-gradient(ellipse at top, black 10%, transparent 65%)",
            }}
          />
        </div>
        <div className="max-w-3xl mx-auto px-5 relative">
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-semibold text-muted mb-5">
            Account
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">Delete Your Account</h1>
          <p className="text-muted text-lg leading-relaxed">
            Permanently remove your Seaton Swift account and personal data — no app required.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-5">
          {/* What deletion means. Card-less, like the rest of the site — but
              this one keeps a red left rule, because "permanent and cannot be
              undone" is the one place on the site that should stop the eye. */}
          <div className="border-l-2 border-[#EF4444] pl-6 sm:pl-8 mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-9 h-9 rounded-full bg-[#EF4444]/10 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><path d="M12 9v4M12 17h.01" /></svg>
              </span>
              <div>
                <h2 className="text-ink text-lg font-bold leading-tight">What gets deleted</h2>
                <p className="text-muted text-xs mt-0.5">This action is permanent and cannot be undone.</p>
              </div>
            </div>

            <ul className="divide-y divide-line border-y border-line">
              {[
                "Your profile, photo and account details",
                "Rider verification documents (Ghana Card, licence, vehicle photos)",
                "Delivery history, earnings and payment records",
                "Saved Mobile Money numbers, ratings, messages and notifications",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3.5 py-3.5 text-sm text-muted">
                  {/* Was a bare "✕" character — screen readers announced it as
                      punctuation and it didn't scale with the text. */}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.6" strokeLinecap="round" className="shrink-0" aria-hidden>
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2.5 text-sm text-muted">
              <p>
                <strong className="text-ink font-semibold">Before you delete:</strong> any active
                delivery must be completed or cancelled, and riders must settle any outstanding
                commission balance.
              </p>
              <p>
                Records we are legally required to keep (e.g. for tax or dispute resolution under
                Ghanaian law) may be retained for a limited period as described in our{" "}
                <Link href="/privacy-policy" className="text-brand hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Self-service form */}
          <DeleteAccountForm />

          {/* Fallback for users who can't sign in */}
          <div className="mt-10 border-t border-line pt-8">
            <h2 className="text-ink text-lg font-bold mb-3">Can&apos;t sign in?</h2>
            <p className="text-muted text-sm leading-relaxed">
              If you no longer have access to your password or phone number, email{" "}
              <a
                href={`mailto:${GENERAL_EMAIL}?subject=Account%20Deletion%20Request`}
                className="text-brand hover:underline"
              >
                {GENERAL_EMAIL}
              </a>{" "}
              with the subject &quot;Account Deletion Request&quot; and include your registered phone
              number. We will verify your identity and delete the account within 30 days.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
