"use client";

export default function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-primary md:text-5xl lg:text-[3rem]">
          Scammed. Ghosted. No-showed.
          <br />
          <span className="text-alert">
            Your reputation locked in a platform that doesn&apos;t care.
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
          We&apos;re building a network where your reputation travels with
          you&mdash;verified by real transactions, backed by people who vouch
          for you.
        </p>
        <button
          onClick={onCtaClick}
          className="rounded-full bg-accent px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-accent-light hover:shadow-xl"
        >
          See If You Qualify for Founding Access
        </button>
        <p className="mt-4 text-sm text-text-muted">
          Takes 3 minutes. Not everyone qualifies.
        </p>
      </div>
    </section>
  );
}
