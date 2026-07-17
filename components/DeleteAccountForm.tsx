"use client";

import { useState } from "react";

// Set NEXT_PUBLIC_API_URL at build time to the deployed backend URL.
// The website origin must also be listed in the backend's CORS_ORIGINS.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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

    const digits = phone.replace(/[\s-]/g, "");
    if (!/^0\d{9}$/.test(digits)) {
      setError("Enter your phone number in the format 0XXXXXXXXX (10 digits).");
      return;
    }
    if (!password) {
      setError("Enter your account password.");
      return;
    }

    setWorking(true);
    try {
      const phone_number = `+233${digits.replace(/^0/, "")}`;

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
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center mx-auto mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-white text-xl font-bold mb-2">Account Deleted</h2>
        <p className="text-[#9E9E9E] text-sm leading-relaxed">
          Your account and personal data have been permanently removed.
          We&apos;re sorry to see you go — you&apos;re welcome back on Seaton Swift anytime.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8">
      {/* Account type */}
      <label className="block text-[#9E9E9E] text-xs font-semibold uppercase tracking-widest mb-3">
        Account Type
      </label>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {(["rider", "shop"] as Role[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`py-3 rounded-xl text-sm font-semibold border transition-colors ${
              role === r
                ? "border-[#E8402A] bg-[#E8402A]/10 text-white"
                : "border-[#2A2A2A] bg-[#0D0D0D] text-[#9E9E9E] hover:border-[#3A3A3A]"
            }`}
          >
            {r === "rider" ? "Rider" : "Shop"}
          </button>
        ))}
      </div>

      {/* Phone */}
      <label htmlFor="phone" className="block text-[#9E9E9E] text-xs font-semibold uppercase tracking-widest mb-3">
        Registered Phone Number
      </label>
      <input
        id="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="e.g. 0200000000"
        value={phone}
        onChange={(e) => { setPhone(e.target.value); setError(""); }}
        className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl px-4 py-3 text-sm text-white placeholder-[#5A5A5A] focus:border-[#E8402A] focus:outline-none mb-6"
      />

      {/* Password */}
      <label htmlFor="password" className="block text-[#9E9E9E] text-xs font-semibold uppercase tracking-widest mb-3">
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
          className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl px-4 py-3 pr-16 text-sm text-white placeholder-[#5A5A5A] focus:border-[#E8402A] focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPass((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] hover:text-white text-xs font-semibold"
        >
          {showPass ? "Hide" : "Show"}
        </button>
      </div>

      <p className={`text-xs mb-6 min-h-4 ${error ? "text-[#EF4444]" : "text-transparent"}`}>{error || "."}</p>

      <button
        type="submit"
        disabled={working}
        className="w-full py-3.5 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] disabled:opacity-60 text-white text-sm font-bold transition-colors"
      >
        {working ? "Deleting…" : "Permanently Delete My Account"}
      </button>
      <p className="text-[#6B6B6B] text-xs text-center mt-4">
        This action is immediate and cannot be undone.
      </p>
    </form>
  );
}
