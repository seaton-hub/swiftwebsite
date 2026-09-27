"use client";

import { useState } from "react";

// Falls back to the LIVE backend, not localhost, so a build that forgets to set
// NEXT_PUBLIC_API_URL still reaches production instead of a dead localhost. The
// env var still wins when set. The URL is public (shipped in the mobile apps),
// and the website origin is listed in the backend's CORS_ORIGINS.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.seatonlogistics.com";

type Role = "rider" | "shop";

export default function DeleteAccountForm() {
  const [role, setRole] = useState<Role>("rider");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Read the number the way the apps do (shop_app/utils/phone.js
    // toGhanaLogin): typed with or without +233, with spaces or dashes. It used
    // to demand exactly 0XXXXXXXXX and refuse "+233 24 412 3456".
    const compact = phone.trim().replace(/[\s\-().]/g, "");
    const national = compact.replace(/^(\+233|00233)/, "").replace(/^233(?=\d{9,10}$)/, "").replace(/^0/, "");
    if (!/^[1-9]\d{8}$/.test(national)) {
      setError("Check your phone number. Use the 10 digits starting with 0, like 024 123 4567.");
      return;
    }
    if (!password) {
      setError("Enter your account password.");
      return;
    }

    setWorking(true);
    try {
      const phone_number = `+233${national}`;

      // 1. Verify credentials — same login the apps use
      const loginRes = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number, password, role }),
      });
      const loginData = await loginRes.json();
      if (!loginRes.ok || !loginData?.data?.token) {
        throw new Error(loginData?.message || "Sign-in failed. Check your phone number and password.");
      }

      // 2. Delete the account and all data
      const delRes = await fetch(`${API_URL}/api/auth/me`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginData.data.token}`,
        },
        body: JSON.stringify({ password }),
      });
      const delData = await delRes.json();
      if (!delRes.ok) {
        throw new Error(delData?.message || "Deletion failed. Please try again.");
      }

      setDone(true);
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Could not reach the server. Check your connection and try again."
          : (err as Error).message
      );
    } finally {
      setWorking(false);
    }
  };

  if (done) {
    return (
      <div className="bg-surface border border-line rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center mx-auto mb-5">
          <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-ink text-xl font-bold mb-2">Account Deleted</h2>
        <p className="text-muted text-sm leading-relaxed">
          Your account is deleted and you have been signed out everywhere. Verification
          documents are destroyed on the schedule set out above. You&apos;re welcome back
          on Seaton Swift anytime.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface border border-line rounded-2xl p-6 sm:p-8">
      {/* Account type. A fieldset, so a screen reader announces the two
          buttons as one choice, and aria-pressed says which one is chosen. */}
      <fieldset className="mb-6">
        <legend className="block text-muted text-xs font-semibold uppercase tracking-widest mb-3">
          Account Type
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {(["rider", "shop"] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              aria-pressed={role === r}
              className={`py-3 rounded-xl text-sm font-semibold border transition-colors ${
                role === r
                  ? "border-brand bg-brand/10 text-ink"
                  : "border-line bg-canvas-deep text-muted hover:border-muted"
              }`}
            >
              {/* The app is Swift Merchant, and plenty of its users have no
                  shop. The value sent is still "shop", the account's role. */}
              {r === "rider" ? "Rider (Seaton Swift)" : "Merchant (Swift Merchant)"}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Phone */}
      <label htmlFor="phone" className="block text-muted text-xs font-semibold uppercase tracking-widest mb-3">
        Registered Phone Number
      </label>
      <input
        id="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="e.g. 024 123 4567"
        value={phone}
        onChange={(e) => { setPhone(e.target.value); setError(""); }}
        className="w-full bg-canvas-deep border border-line rounded-xl px-4 py-3 text-sm text-ink placeholder-muted focus:border-brand focus:outline-none mb-6"
      />

      {/* Password */}
      <label htmlFor="password" className="block text-muted text-xs font-semibold uppercase tracking-widest mb-3">
        Password
      </label>
      <div className="relative mb-2">
        <input
          id="password"
          type={showPass ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Your account password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          className="w-full bg-canvas-deep border border-line rounded-xl px-4 py-3 pr-16 text-sm text-ink placeholder-muted focus:border-brand focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPass((v) => !v)}
          aria-label={showPass ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-xs font-semibold"
        >
          {showPass ? "Hide" : "Show"}
        </button>
      </div>

      {/* role="alert" so the reason is read out the moment it appears; a
          sighted user sees it, a screen reader user used to hear nothing. */}
      <p role={error ? "alert" : undefined} className={`text-xs mb-6 min-h-4 ${error ? "text-danger-text" : "text-transparent"}`}>{error || " "}</p>

      <button
        type="submit"
        disabled={working}
        className="w-full py-3.5 rounded-xl bg-danger hover:bg-danger-hover disabled:opacity-60 text-white text-sm font-bold transition-colors"
      >
        {working ? "Deleting…" : "Permanently Delete My Account"}
      </button>
      <p className="text-muted text-xs text-center mt-4">
        This action is immediate and cannot be undone.
      </p>
    </form>
  );
}
