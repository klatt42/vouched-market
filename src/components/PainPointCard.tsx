export default function PainPointCard({
  emoji,
  title,
  quote,
  attribution,
}: {
  emoji: string;
  title: string;
  quote: string;
  attribution: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-card p-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl">
      <span className="mb-4 text-5xl">{emoji}</span>
      <h3 className="mb-3 text-base font-bold tracking-widest text-alert">
        {title}
      </h3>
      <p className="mb-4 flex-1 text-base italic leading-relaxed text-text-secondary">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="text-sm text-text-muted">&mdash; {attribution}</p>
    </div>
  );
}
