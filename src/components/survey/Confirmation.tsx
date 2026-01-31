"use client";

export default function Confirmation({
  firstName,
  onClose,
}: {
  firstName: string;
  onClose: () => void;
}) {
  const displayName = firstName || "Founder";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "VouchedMarket",
          text: "Check out VouchedMarket - a trust network for marketplace buyers and sellers.",
          url: window.location.origin,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.origin);
    }
  };

  return (
    <div className="text-center">
      <div className="animate-checkmark mb-4 text-5xl">&#127881;</div>
      <h3 className="mb-2 text-2xl font-bold text-primary">
        Welcome to VouchedMarket, {displayName}!
      </h3>
      <p className="mb-6 text-text-secondary">
        You&apos;re officially a Founding Member.
      </p>

      <div className="mb-8 space-y-4 text-left">
        <h4 className="font-semibold text-text">
          Here&apos;s what happens next:
        </h4>
        <ol className="list-inside list-decimal space-y-2 text-sm text-text-secondary">
          <li>
            <strong>Check your inbox</strong> &mdash; Confirmation email coming
            shortly
          </li>
          <li>
            <strong>Watch for updates</strong> &mdash; You&apos;ll be first to
            know when we&apos;re ready
          </li>
          <li>
            <strong>Share with friends</strong> &mdash; Know other frustrated
            sellers or buyers?
          </li>
        </ol>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={handleShare}
          className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-light"
        >
          Share VouchedMarket
        </button>
        <button
          onClick={onClose}
          className="rounded-full border-2 border-gray-200 px-6 py-3 font-semibold text-text-secondary transition-colors hover:border-gray-300"
        >
          Return to Homepage
        </button>
      </div>

      <hr className="mb-6 border-gray-200" />

      <div className="space-y-2 text-sm text-text-muted">
        <p className="font-semibold text-text-secondary">
          Your Founding Member benefits are locked in:
        </p>
        <p>&#10003; Guaranteed early access</p>
        <p>&#10003; Lifetime pricing discount</p>
        <p>&#10003; Direct input on features</p>
        <p>&#10003; Permanent &ldquo;Founding Member&rdquo; badge</p>
      </div>
    </div>
  );
}
