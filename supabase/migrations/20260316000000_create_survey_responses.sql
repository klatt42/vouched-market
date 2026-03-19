-- VouchedMarket: survey_responses table for Phase 1 data collection
CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  survey_type text NOT NULL CHECK (survey_type IN ('seller', 'buyer', 'both')),
  email text NOT NULL,
  first_name text,
  phone text,
  qualification_tier text NOT NULL CHECK (qualification_tier IN ('priority', 'qualified', 'standard')),
  responses jsonb NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_survey_responses_email ON survey_responses(email);
CREATE INDEX IF NOT EXISTS idx_survey_responses_tier ON survey_responses(qualification_tier);
CREATE INDEX IF NOT EXISTS idx_survey_responses_type ON survey_responses(survey_type);

COMMENT ON TABLE survey_responses IS 'VouchedMarket qualification survey responses with lead scoring';

-- Enable RLS but allow service_role full access (API route uses service key)
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS automatically, so no policies needed for the API route.
-- Add anon insert policy so the table is explicitly locked down for anon users.
-- (Our API route uses service_role, not anon, so this is defense-in-depth.)
