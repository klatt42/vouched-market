"use client";

import { useState } from "react";
import { SurveyQuestion } from "@/data/types";

export default function QuestionCheckbox({
  question,
  value,
  onChange,
}: {
  question: SurveyQuestion;
  value: string[];
  onChange: (val: string[]) => void;
}) {
  const [otherText, setOtherText] = useState("");

  const toggle = (opt: string) => {
    const next = value.includes(opt)
      ? value.filter((v) => v !== opt)
      : [...value, opt];
    onChange(next);
  };

  const handleOther = (text: string) => {
    setOtherText(text);
    const filtered = value.filter(
      (v) => question.options?.includes(v) ?? false
    );
    if (text.trim()) {
      onChange([...filtered, `Other: ${text}`]);
    } else {
      onChange(filtered);
    }
  };

  return (
    <div>
      <label className="mb-1 block text-lg font-semibold text-text">
        {question.label}
        {question.required && <span className="text-alert"> *</span>}
      </label>
      {question.instruction && (
        <p className="mb-4 text-sm text-text-muted">{question.instruction}</p>
      )}
      <div className="space-y-3">
        {question.options?.map((opt) => (
          <label
            key={opt}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 transition-colors ${
              value.includes(opt)
                ? "border-accent bg-accent/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={value.includes(opt)}
              onChange={() => toggle(opt)}
              className="h-4 w-4 accent-accent"
            />
            <span className="text-sm text-text-secondary">{opt}</span>
          </label>
        ))}
        {question.allowOther && (
          <div className="flex items-center gap-3 rounded-lg border-2 border-gray-200 px-4 py-3">
            <span className="text-sm text-text-secondary">Other:</span>
            <input
              type="text"
              value={otherText}
              onChange={(e) => handleOther(e.target.value)}
              placeholder="Type here..."
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
