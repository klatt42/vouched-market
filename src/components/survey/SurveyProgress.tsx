export default function SurveyProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-sm text-text-muted">
        <span>
          Question {current} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
