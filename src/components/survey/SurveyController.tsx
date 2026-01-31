"use client";

import { useState, useEffect } from "react";
import { SurveyTrack, SurveyQuestion, SurveyResponses } from "@/data/types";
import { sellerQuestions } from "@/data/sellerQuestions";
import { buyerQuestions } from "@/data/buyerQuestions";
import { bothQuestions } from "@/data/bothQuestions";
import { submitSurvey } from "@/utils/submitSurvey";
import SurveyProgress from "./SurveyProgress";
import SurveyIntro from "./SurveyIntro";
import QuestionRadio from "./QuestionRadio";
import QuestionCheckbox from "./QuestionCheckbox";
import QuestionMatrix from "./QuestionMatrix";
import QuestionScale from "./QuestionScale";
import QuestionTextarea from "./QuestionTextarea";
import EmailCapture from "./EmailCapture";
import Confirmation from "./Confirmation";

type Phase = "intro" | "questions" | "email" | "confirmation";

const STORAGE_KEY = "vouched_survey";

function getQuestions(track: SurveyTrack): SurveyQuestion[] {
  switch (track) {
    case "seller":
      return sellerQuestions;
    case "buyer":
      return buyerQuestions;
    case "both":
      return bothQuestions;
  }
}

export default function SurveyController({
  track,
  onClose,
}: {
  track: SurveyTrack;
  onClose: () => void;
}) {
  const questions = getQuestions(track);
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<SurveyResponses>({});
  const [firstName, setFirstName] = useState("");
  const [validationError, setValidationError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.track === track) {
          setResponses(parsed.responses || {});
          setStep(parsed.step || 0);
          if (parsed.phase === "questions" || parsed.phase === "email") {
            setPhase(parsed.phase);
          }
        }
      }
    } catch {
      // ignore
    }
  }, [track]);

  // Save to localStorage
  useEffect(() => {
    if (phase === "questions" || phase === "email") {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ track, responses, step, phase })
        );
      } catch {
        // ignore
      }
    }
  }, [track, responses, step, phase]);

  const currentQuestion = questions[step];

  const updateResponse = (id: string, val: string | string[] | number | Record<string, number>) => {
    setResponses((prev) => ({ ...prev, [id]: val }));
    setValidationError("");
  };

  const validateCurrent = (): boolean => {
    if (!currentQuestion.required) return true;

    const val = responses[currentQuestion.id];

    switch (currentQuestion.type) {
      case "radio":
        if (!val) {
          setValidationError("Please select an option.");
          return false;
        }
        break;
      case "checkbox":
        if (!Array.isArray(val) || val.length === 0) {
          setValidationError("Please select at least one option.");
          return false;
        }
        break;
      case "matrix": {
        const matVal = val as Record<string, number> | undefined;
        const rows = currentQuestion.rows || [];
        if (!matVal || Object.keys(matVal).length < rows.length) {
          setValidationError("Please rate all items.");
          return false;
        }
        break;
      }
      case "scale":
        if (!val) {
          setValidationError("Please select a value.");
          return false;
        }
        break;
    }
    return true;
  };

  const next = () => {
    if (!validateCurrent()) return;
    setValidationError("");
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setPhase("email");
    }
  };

  const prev = () => {
    setValidationError("");
    if (step > 0) setStep(step - 1);
  };

  const handleEmailSubmit = async (data: {
    email: string;
    first_name: string;
    phone: string;
  }) => {
    setSubmitting(true);
    setFirstName(data.first_name);

    await submitSurvey({
      survey_type: track,
      email: data.email,
      first_name: data.first_name,
      phone: data.phone,
      responses,
      submitted_at: new Date().toISOString(),
    });

    localStorage.removeItem(STORAGE_KEY);
    setSubmitting(false);
    setPhase("confirmation");
  };

  const renderQuestion = () => {
    const q = currentQuestion;
    const val = responses[q.id];

    switch (q.type) {
      case "radio":
        return (
          <QuestionRadio
            question={q}
            value={(val as string) || ""}
            onChange={(v) => updateResponse(q.id, v)}
          />
        );
      case "checkbox":
        return (
          <QuestionCheckbox
            question={q}
            value={(val as string[]) || []}
            onChange={(v) => updateResponse(q.id, v)}
          />
        );
      case "matrix":
        return (
          <QuestionMatrix
            question={q}
            value={(val as Record<string, number>) || {}}
            onChange={(v) => updateResponse(q.id, v)}
          />
        );
      case "scale":
        return (
          <QuestionScale
            question={q}
            value={(val as number) || 0}
            onChange={(v) => updateResponse(q.id, v)}
          />
        );
      case "textarea":
        return (
          <QuestionTextarea
            question={q}
            value={(val as string) || ""}
            onChange={(v) => updateResponse(q.id, v)}
          />
        );
    }
  };

  if (phase === "intro") {
    return <SurveyIntro onStart={() => setPhase("questions")} />;
  }

  if (phase === "confirmation") {
    return <Confirmation firstName={firstName} onClose={onClose} />;
  }

  if (phase === "email") {
    return submitting ? (
      <div className="py-12 text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
        <p className="text-lg text-text-secondary">Submitting your responses...</p>
      </div>
    ) : (
      <EmailCapture onSubmit={handleEmailSubmit} />
    );
  }

  return (
    <div>
      <SurveyProgress current={step + 1} total={questions.length} />
      <div className="min-h-[300px]">{renderQuestion()}</div>
      {validationError && (
        <p className="mt-3 text-base text-alert">{validationError}</p>
      )}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={prev}
          disabled={step === 0}
          className="rounded-full px-8 py-3 text-base font-medium text-text-muted transition-colors hover:text-text disabled:invisible"
        >
          &larr; Back
        </button>
        <button
          onClick={next}
          className="rounded-full bg-accent px-10 py-4 text-lg font-semibold text-white transition-colors hover:bg-accent-light"
        >
          {step === questions.length - 1 ? "Finish" : "Continue"} &rarr;
        </button>
      </div>
    </div>
  );
}
