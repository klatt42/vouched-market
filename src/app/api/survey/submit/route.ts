import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

type QualificationTier = "priority" | "qualified" | "standard";

interface SurveyPayload {
  survey_type: "seller" | "buyer" | "both";
  email: string;
  first_name: string;
  phone: string;
  submitted_at: string;
  [key: string]: unknown;
}

function computeQualificationTier(data: SurveyPayload): QualificationTier {
  const revenue = data.monthly_revenue as string | undefined;
  const volume = data.sell_volume_6mo as string | undefined;
  const painRep = data.pain_reputation as number | undefined;
  const willingShare = data.willing_share_data as string | undefined;
  const portableRepValue = data.value_portable_rep as number | undefined;

  // Priority: Revenue $3K+ OR volume 76+ OR (pain_reputation >= 4 AND data sharing = "yes_absolutely")
  const highRevenue = revenue === "3000-10000" || revenue === "10000_plus";
  const highVolume = volume === "76-150" || volume === "151_plus";
  const painAndWilling = (painRep ?? 0) >= 4 && willingShare === "yes_absolutely";

  if (highRevenue || highVolume || painAndWilling) {
    return "priority";
  }

  // Qualified: Revenue $1K+ OR volume 31+ OR portable rep value >= 7
  const midRevenue =
    highRevenue || revenue === "1000-3000";
  const midVolume =
    highVolume || volume === "31-75";
  const valuesPortableRep = (portableRepValue ?? 0) >= 7;

  if (midRevenue || midVolume || valuesPortableRep) {
    return "qualified";
  }

  return "standard";
}

export async function POST(request: NextRequest) {
  let body: SurveyPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.email || !body.survey_type) {
    return NextResponse.json(
      { error: "Missing required fields: email, survey_type" },
      { status: 400 }
    );
  }

  const qualification_tier = computeQualificationTier(body);

  // Write to Supabase
  const supabase = getSupabase();
  const { error: dbError } = await supabase.from("survey_responses").insert({
    survey_type: body.survey_type,
    email: body.email,
    first_name: body.first_name || null,
    phone: body.phone || null,
    qualification_tier,
    responses: body,
    submitted_at: body.submitted_at || new Date().toISOString(),
  });

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return NextResponse.json(
      { error: "Failed to save survey response" },
      { status: 500 }
    );
  }

  // Optional: forward to GHL webhook
  const ghlWebhookUrl = process.env.GHL_WEBHOOK_URL;
  if (ghlWebhookUrl) {
    try {
      await fetch(ghlWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, qualification_tier }),
      });
    } catch (err) {
      // Log but don't fail the request -- Supabase write is the source of truth
      console.error("GHL webhook forward failed:", err);
    }
  }

  return NextResponse.json({
    success: true,
    qualification_tier,
  });
}
