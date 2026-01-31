"use client";

import { SurveyQuestion } from "@/data/types";

export default function QuestionTextarea({
  question,
  value,
  onChange,
}: {
  question: SurveyQuestion;
  value: string;
  onChange: (val: string) => void;
}) {
  const maxLen = question.maxLength ?? 200;
  const remaining = maxLen - value.length;

  return (
    <div>
      <label className="mb-2 block text-xl font-semibold text-text">
        {question.label}
        {question.required ? (
          <span className="text-alert"> *</span>
        ) : (
          <span className="text-base font-normal text-text-muted">
            {" "}
            (optional)
          </span>
        )}
      </label>
      <textarea
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= maxLen) onChange(e.target.value);
        }}
        placeholder={question.placeholder}
        rows={3}
        className="mt-2 w-full rounded-xl border-2 border-gray-200 px-5 py-4 text-base text-text-secondary outline-none transition-colors focus:border-accent"
      />
      <p
        className={`mt-1 text-right text-sm ${
          remaining < 20 ? "text-alert" : "text-text-muted"
        }`}
      >
        {remaining} characters remaining
      </p>
    </div>
  );
}
