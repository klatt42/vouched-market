import { SurveyTrack, SurveyResponses } from "@/data/types";

interface SubmitData {
  survey_type: SurveyTrack;
  email: string;
  first_name: string;
  phone: string;
  responses: SurveyResponses;
  submitted_at: string;
}

export async function submitSurvey(data: SubmitData): Promise<boolean> {
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

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

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flat),
      });
      return res.ok;
    } catch {
      console.error("Webhook submission failed");
      return false;
    }
  }

  // Dev mode: log to console
  console.log("Survey submission (no webhook configured):", flat);
  return true;
}
