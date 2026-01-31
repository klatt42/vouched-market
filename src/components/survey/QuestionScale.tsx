import { SurveyQuestion } from "@/data/types";

export default function QuestionScale({
  question,
  value,
  onChange,
}: {
  question: SurveyQuestion;
  value: number;
  onChange: (val: number) => void;
}) {
  const min = question.min ?? 1;
  const max = question.max ?? 10;
  const range = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div>
      <label className="mb-2 block text-xl font-semibold text-text">
        {question.label}
        {question.required && <span className="text-alert"> *</span>}
      </label>
      {question.instruction && (
        <p className="mb-6 text-base text-text-muted">{question.instruction}</p>
      )}
      <div className="flex flex-wrap justify-center gap-3">
        {range.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex h-14 w-14 items-center justify-center rounded-full text-xl font-semibold transition-all ${
              value === n
                ? "bg-accent text-white shadow-md"
                : "bg-gray-100 text-text-muted hover:bg-gray-200"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-sm text-text-muted">
        <span>Not valuable</span>
        <span>Extremely valuable</span>
      </div>
    </div>
  );
}
