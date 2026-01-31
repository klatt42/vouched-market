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
    <div className="flex flex-col rounded-xl bg-card p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
      <span className="mb-3 text-3xl">{emoji}</span>
      <h3 className="mb-3 text-sm font-bold tracking-widest text-alert">
        {title}
      </h3>
      <p className="mb-4 flex-1 text-sm italic leading-relaxed text-text-secondary">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="text-xs text-text-muted">&mdash; {attribution}</p>
    </div>
  );
}
