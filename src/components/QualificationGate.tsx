"use client";

import { SurveyTrack } from "@/data/types";

export default function QualificationGate({
  onTrackSelect,
}: {
  onTrackSelect: (track: SurveyTrack) => void;
}) {
  return (
    <section id="qualify" className="px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-6 text-3xl font-bold text-primary md:text-4xl">
          We&apos;re looking for Founding Members.
        </h2>
        <p className="mb-2 font-semibold text-text-secondary">
          Not everyone will qualify.
        </p>
        <p className="mx-auto mb-10 max-w-xl text-text-secondary">
          We&apos;re looking for serious marketplace buyers and sellers
          who&apos;ve lived this pain and want to help build something better.
          <br />
          <br />
          Take our 3-minute assessment. If you qualify, you&apos;re in.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => onTrackSelect("seller")}
            className="w-full rounded-full bg-primary px-8 py-4 text-lg font-bold tracking-wide text-white transition-colors hover:bg-primary-light sm:w-auto"
          >
            I&apos;M A SELLER
          </button>
          <button
            onClick={() => onTrackSelect("buyer")}
            className="w-full rounded-full bg-primary px-8 py-4 text-lg font-bold tracking-wide text-white transition-colors hover:bg-primary-light sm:w-auto"
          >
            I&apos;M A BUYER
          </button>
          <button
            onClick={() => onTrackSelect("both")}
            className="w-full rounded-full bg-accent px-8 py-4 text-lg font-bold tracking-wide text-white transition-colors hover:bg-accent-light sm:w-auto"
          >
            I DO BOTH
          </button>
        </div>

        <div className="mt-10 space-y-2 text-sm text-text-muted">
          <p>&#10003; 847 people have qualified this month</p>
          <p>&#10003; Founding Members get locked-in lifetime pricing</p>
          <p>&#10003; Your feedback directly shapes what we build</p>
        </div>
      </div>
    </section>
  );
}
