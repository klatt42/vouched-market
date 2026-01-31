export default function SurveyIntro({
  onStart,
}: {
  onStart: () => void;
}) {
  return (
    <div className="text-center">
      <h3 className="mb-4 text-2xl font-bold text-primary">
        Great &mdash; let&apos;s see if you qualify.
      </h3>
      <p className="mb-2 text-text-secondary">
        This takes about 3 minutes. Your answers help us build something that
        actually solves your problems.
      </p>
      <p className="mb-8 text-text-secondary">
        Answer honestly &mdash; there&apos;s no wrong answers, just real ones.
      </p>
      <button
        onClick={onStart}
        className="rounded-full bg-accent px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-accent-light"
      >
        Let&apos;s Go &rarr;
      </button>
    </div>
  );
}
