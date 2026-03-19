import { SurveyTrack, SurveyResponses } from "@/data/types";

interface SubmitData {
  survey_type: SurveyTrack;
  email: string;
  first_name: string;
  phone: string;
  responses: SurveyResponses;
  submitted_at: string;
}

export interface SubmitResult {
  success: boolean;
  qualification_tier?: "priority" | "qualified" | "standard";
}

export async function submitSurvey(data: SubmitData): Promise<SubmitResult> {
  // Flatten matrix responses into top-level keys
  const flat: Record<string, unknown> = {
    survey_type: data.survey_type,
    email: data.email,
    first_name: data.first_name,
    phone: data.phone,
    submitted_at: data.submitted_at,
  };

  for (const [key, val] of Object.entries(data.responses)) {
    if (typeof val === "object" && !Array.isArray(val)) {
      // Matrix: flatten each row
      for (const [rowKey, rowVal] of Object.entries(val)) {
        flat[rowKey] = rowVal;
      }
    } else {
      flat[key] = val;
    }
  }

  try {
    const res = await fetch("/api/survey/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flat),
    });

    if (!res.ok) {
      console.error("Survey submission failed:", res.status);
      return { success: false };
    }

    const result = await res.json();
    return {
      success: true,
      qualification_tier: result.qualification_tier,
    };
  } catch (err) {
    console.error("Survey submission error:", err);
    return { success: false };
  }
}
