"use client";

import { SurveyQuestion } from "@/data/types";

export default function QuestionMatrix({
  question,
  value,
  onChange,
}: {
  question: SurveyQuestion;
  value: Record<string, number>;
  onChange: (val: Record<string, number>) => void;
}) {
  const set = (rowId: string, col: number) => {
    onChange({ ...value, [rowId]: col });
  };

  return (
    <div>
      <label className="mb-2 block text-xl font-semibold text-text">
        {question.label}
        {question.required && <span className="text-alert"> *</span>}
      </label>
      {question.instruction && (
        <p className="mb-5 text-base text-text-muted">{question.instruction}</p>
      )}

      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr>
              <th className="pb-3 text-left text-base font-medium text-text-muted" />
              {question.columns?.map((col) => (
                <th
                  key={col}
                  className="pb-3 text-center text-base font-medium text-text-muted"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {question.rows?.map((row) => (
              <tr key={row.id} className="border-t border-gray-100">
                <td className="py-4 pr-4 text-base text-text-secondary">
                  {row.label}
                </td>
                {question.columns?.map((col) => (
                  <td key={col} className="py-4 text-center">
                    <button
                      type="button"
                      onClick={() => set(row.id, parseInt(col))}
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-base transition-colors ${
                        value[row.id] === parseInt(col)
                          ? "bg-accent text-white"
                          : "bg-gray-100 text-text-muted hover:bg-gray-200"
                      }`}
                    >
                      {col}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked */}
      <div className="space-y-6 md:hidden">
        {question.rows?.map((row) => (
          <div key={row.id}>
            <p className="mb-3 text-base font-medium text-text-secondary">
              {row.label}
            </p>
            <div className="flex gap-3">
              {question.columns?.map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => set(row.id, parseInt(col))}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-base transition-colors ${
                    value[row.id] === parseInt(col)
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-text-muted hover:bg-gray-200"
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
