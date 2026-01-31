export type QuestionType =
  | "radio"
  | "checkbox"
  | "matrix"
  | "scale"
  | "textarea";

export interface SurveyQuestion {
  id: string;
  type: QuestionType;
  label: string;
  instruction?: string;
  required: boolean;
  options?: string[];
  allowOther?: boolean;
  rows?: { id: string; label: string }[];
  columns?: string[];
  min?: number;
  max?: number;
  placeholder?: string;
  maxLength?: number;
}

export type SurveyTrack = "seller" | "buyer" | "both";

export interface SurveyResponses {
  [key: string]: string | string[] | number | Record<string, number>;
}
