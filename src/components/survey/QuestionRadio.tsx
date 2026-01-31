import { SurveyQuestion } from "@/data/types";

export default function QuestionRadio({
  question,
  value,
  onChange,
}: {
  question: SurveyQuestion;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xl font-semibold text-text">
        {question.label}
        {question.required && <span className="text-alert"> *</span>}
      </label>
      {question.instruction && (
        <p className="mb-5 text-base text-text-muted">{question.instruction}</p>
      )}
      <div className="space-y-3">
        {question.options?.map((opt) => (
          <label
            key={opt}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-5 py-4 transition-colors ${
              value === opt
                ? "border-accent bg-accent/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="radio"
              name={question.id}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="h-5 w-5 accent-accent"
            />
            <span className="text-base text-text-secondary">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
