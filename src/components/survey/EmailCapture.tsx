"use client";

import { useState } from "react";

export default function EmailCapture({
  onSubmit,
}: {
  onSubmit: (data: {
    email: string;
    first_name: string;
    phone: string;
  }) => void;
}) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    onSubmit({ email: email.trim(), first_name: firstName.trim(), phone: phone.trim() });
  };

  return (
    <div className="text-center">
      <div className="animate-checkmark mb-6 text-6xl">&#127881;</div>
      <h3 className="mb-3 text-3xl font-bold text-primary">You&apos;re in.</h3>
      <p className="mb-8 text-lg text-text-secondary">
        Based on your responses, you qualify for Founding Member access.
      </p>

      <div className="mb-8 space-y-3 text-left text-base text-text-secondary">
        <p>&#10003; You&apos;ll be among the first to access VouchedMarket</p>
        <p>&#10003; Locked-in lifetime pricing (never pay full price)</p>
        <p>&#10003; Direct input into what we build</p>
        <p>&#10003; Founding Member badge on your profile forever</p>
      </div>

      <hr className="mb-6 border-gray-200" />

      <p className="mb-8 text-lg font-semibold text-text">
        Where should we send your Founding Member confirmation?
      </p>

      <div className="space-y-5 text-left">
        <div>
          <label className="mb-2 block text-base font-medium text-text-secondary">
            Email <span className="text-alert">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 text-base outline-none transition-colors focus:border-accent"
          />
          {error && <p className="mt-1 text-sm text-alert">{error}</p>}
        </div>
        <div>
          <label className="mb-2 block text-base font-medium text-text-secondary">
            First Name{" "}
            <span className="font-normal text-text-muted">(optional)</span>
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your first name"
            className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 text-base outline-none transition-colors focus:border-accent"
          />
        </div>
        <div>
          <label className="mb-2 block text-base font-medium text-text-secondary">
            Phone (for SMS updates){" "}
            <span className="font-normal text-text-muted">(optional)</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 text-base outline-none transition-colors focus:border-accent"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-8 w-full rounded-full bg-accent px-8 py-5 text-xl font-semibold text-white transition-colors hover:bg-accent-light"
      >
        Claim My Founding Member Spot &rarr;
      </button>

      <p className="mt-4 text-sm text-text-muted">
        We&apos;ll only email you with important updates. No spam, ever.
      </p>
    </div>
  );
}
