"use client";

import { SurveyTrack } from "@/data/types";

export default function QualificationGate({
  onTrackSelect,
}: {
  onTrackSelect: (track: SurveyTrack) => void;
}) {
  return (
    <section id="qualify" className="px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-4xl font-bold text-primary md:text-5xl">
          We&apos;re looking for Founding Members.
        </h2>
        <p className="mb-3 text-xl font-semibold text-text-secondary">
          Not everyone will qualify.
        </p>
        <p className="mx-auto mb-12 max-w-2xl text-lg text-text-secondary md:text-xl">
          We&apos;re looking for serious marketplace buyers and sellers
          who&apos;ve lived this pain and want to help build something better.
          <br />
          <br />
          Take our 3-minute assessment. If you qualify, you&apos;re in.
        </p>

        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
          <button
            onClick={() => onTrackSelect("seller")}
            className="w-full rounded-full bg-primary px-10 py-5 text-xl font-bold tracking-wide text-white transition-colors hover:bg-primary-light sm:w-auto"
          >
            I&apos;M A SELLER
          </button>
          <button
            onClick={() => onTrackSelect("buyer")}
            className="w-full rounded-full bg-primary px-10 py-5 text-xl font-bold tracking-wide text-white transition-colors hover:bg-primary-light sm:w-auto"
          >
            I&apos;M A BUYER
          </button>
          <button
            onClick={() => onTrackSelect("both")}
            className="w-full rounded-full bg-accent px-10 py-5 text-xl font-bold tracking-wide text-white transition-colors hover:bg-accent-light sm:w-auto"
          >
            I DO BOTH
          </button>
        </div>

        <div className="mt-12 space-y-3 text-base text-text-muted">
          <p>&#10003; 847 people have qualified this month</p>
          <p>&#10003; Founding Members get locked-in lifetime pricing</p>
          <p>&#10003; Your feedback directly shapes what we build</p>
        </div>
      </div>
    </section>
  );
}
