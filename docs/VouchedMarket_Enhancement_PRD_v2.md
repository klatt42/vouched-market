# VouchedMarket Enhancement PRD v2
## From Landing Page to Trust Intelligence Platform

**Date:** February 12, 2026
**Version:** 2.0
**Status:** Phase 1 deployment + assumption validation
**Base:** VouchedMarket Landing PRD v1.0 + FBM Community Trust Ecosystem Strategic Framework
**Part of:** FB Marketplace Copilot Suite (Trust Layer)
**Author:** ROKon / Biz Insider Pro

---

## 1. Executive Summary

VouchedMarket is the **trust layer** that sits above every tool in the FB Marketplace Copilot Suite. While CopilotInbox manages messaging, CopilotMetrics tracks performance, CopilotGuard detects fraud, and CopilotList optimizes listings, VouchedMarket is the intelligence fabric that weaves behavioral signals from all of them into a single, portable reputation identity for marketplace sellers and buyers.

**The thesis:** Every Copilot tool feeds behavioral signals in; trust scores and verified badges flow out. A seller's response speed in CopilotInbox, their transaction consistency in CopilotMetrics, their clean fraud record in CopilotGuard, and their listing quality in CopilotList all contribute to a composite trust profile that follows them across every marketplace they operate in.

**The strategic position:** VouchedMarket is simultaneously the highest-ceiling and highest-risk component of the Copilot Suite. If validated, it transforms a collection of productivity tools into a defensible network with compounding value. If its core assumptions fail, it becomes a support-tier community feature rather than a standalone platform. This PRD is built around disciplined validation gates that prevent premature investment while maintaining the full vision.

**The immediate priority:** Deploy the existing MVP landing page, connect it to lead capture infrastructure, collect survey data, and rigorously test whether the assumptions that justify Phase 2+ investment actually hold.

---

## 2. Current State Assessment

### 2.1 What's Built

The VouchedMarket MVP is a Next.js 16 waitlist landing page with a qualification survey, built in a single development session and refined across 5 git commits.

**Technical Stack:**
- Next.js 16.1.6 with React 19.2.3 and TypeScript
- Tailwind CSS v4 for styling
- Mobile-first responsive design
- Inter font (Google Fonts) per brand guidelines
- Dev port: 4050

**Completed Components:**
| Component | Status | Notes |
|-----------|--------|-------|
| Header (sticky) | Complete | Logo + "Get Early Access" CTA |
| Hero Section | Complete | Pain-focused headline, subheadline, primary CTA |
| Pain Points Section | Complete | 5 pain cards (Scammed, Ghosted, No-Show, Trapped, Anonymous) |
| Vision Section | Complete | 4 bullet points + teaser text |
| Qualification Gate | Complete | 3-track CTA (Seller / Buyer / Both) + trust builders |
| Footer | Complete | Powered by Biz Insider Pro, privacy/contact links |
| Survey Modal | Complete | Full overlay flow with progress indicator |
| Seller Survey (10q) | Complete | Platforms, volume, pain matrix, scam loss, time waste, portable rep value, data sharing, vouch willingness, revenue, open-ended |
| Buyer Survey (10q) | Complete | Platforms, frequency, pain matrix, scam experience, profile trust, trust score value, identity verification, buyer badge, categories, open-ended |
| Both Survey (12q) | Complete | Combined key questions from both tracks |
| Email Capture | Complete | Email (required), first name, phone (optional) |
| Confirmation Screen | Complete | Founding Member benefits confirmation |
| Webhook Submission Utility | Complete | Flattens matrix responses, sends POST to configurable URL |
| localStorage Progressive Save | Complete | Recovers mid-survey if user leaves |

**Git History (5 commits):**
```
68d0165 [ROK] Session 2: Context recovery and handoff doc
63753df Update claude-progress.txt for session handoff
2381ea3 Increase font sizes and touch targets across entire landing page and survey
b110b6d feat: VouchedMarket MVP landing page with qualification survey
d8fa16f Initial commit from Create Next App
```

**Brand Identity (established):**
- Brand Name: VouchedMarket (one word, CamelCase)
- Tagline: "People vouch for people."
- Primary: #1E3A5F (deep blue -- trust, stability)
- Accent: #D4A520 (amber/gold -- value, earned status)
- Alert: #E85D4C (coral red -- pain point callouts)
- Background: #F8F6F3 (off-white -- clean, approachable)

### 2.2 What's Missing

| Gap | Severity | Blocking? |
|-----|----------|-----------|
| **No webhook endpoint configured** | HIGH | Blocks data collection |
| **Not deployed anywhere** | HIGH | Blocks user access |
| **No analytics tracking** | HIGH | Blocks funnel measurement |
| **No email nurture sequence** | MEDIUM | Limits lead engagement |
| **No SEO meta tags / OG images** | MEDIUM | Limits organic + social sharing |
| **No custom favicon or logo asset** | LOW | Polish item |
| **No accessibility audit** | MEDIUM | Compliance + reach |
| **Mobile responsive not visually validated** | MEDIUM | Assumed correct, unconfirmed |
| **No domain registered** | MEDIUM | Blocks branded deployment |
| **No lead scoring implementation** | MEDIUM | Limits prioritization |

### 2.3 Assumption Validation Status

The FBM Community Trust Ecosystem Strategic Framework identified 8 core assumptions. None have been validated through primary research. The survey instrument exists (built into the landing page) but has collected zero responses because the page is not deployed.

| # | Assumption | Confidence | Status |
|---|------------|------------|--------|
| A1 | FBM sellers want portable reputation beyond Facebook | MEDIUM | **UNVALIDATED** -- Survey Q6 (seller), Q7 (both) measure this |
| A2 | Trust/fraud is a top-3 pain point for serious sellers | HIGH | Partially validated by prior research, survey Q3 confirms |
| A3 | Users will contribute data to a third-party trust network | LOW-MEDIUM | **UNVALIDATED** -- Survey Q7 (seller), Q8 (both) measure this |
| A4 | Community value can exist without Facebook data access | MEDIUM | **UNVALIDATED** -- Requires feature testing |
| A5 | Willingness to pay $29-79/mo for community features | MEDIUM | **UNVALIDATED** -- Not in current survey; requires follow-up |
| A6 | Network effects can compound from tools to community | LOW | **UNVALIDATED** -- Requires long-term metric tracking |
| A7 | This market is underserved vs. existing communities | HIGH | Validated by competitive analysis (no FBM-specific trust network exists) |
| A8 | Facebook won't build equivalent features | MEDIUM | **UNVALIDATED** -- Requires ongoing monitoring |

**Critical gap:** The current survey does not directly test willingness to pay (A5). This must be addressed either through a survey update or through the email nurture sequence follow-up.

---

## 3. Phase 1: Deploy & Collect (IMMEDIATE -- Q1 2026)

Phase 1 has one job: **get the landing page live, collect survey data, and measure whether the assumptions that justify Phase 2 investment are real.**

No new features. No trust engine. No profiles. Just deploy, collect, and analyze.

> **Phase 1 is intentionally minimal. The total engineering investment before the validation gate should be:**
> - Connect survey webhook to GHL for email nurture sequences (~2 hours)
> - Deploy existing Next.js app to Vercel (~1 hour)
> - Configure domain and SSL (~30 minutes)
> - Set up basic analytics (Vercel Analytics) (~30 minutes)
>
> **Total Phase 1 engineering: ~4 hours.** Everything else waits for survey data.

### 3.1 Webhook Integration

**Priority:** CRITICAL -- without this, survey completions are lost to console.log

**3.1.1 Webhook Endpoint Setup**

The `submitSurvey.ts` utility already constructs a flattened JSON payload and POSTs to `NEXT_PUBLIC_WEBHOOK_URL`. The following integration options are available:

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| GoHighLevel (GHL) webhook | CRM built-in, automations, email sequences | Requires GHL subscription, learning curve | **Preferred if GHL already in use** |
| Make.com (Integromat) webhook | Flexible routing to multiple destinations, visual workflow | Additional SaaS cost, another tool to maintain | Good middleware option |
| Custom Next.js API route + Supabase | Full data ownership, direct SQL queries for analysis | Requires backend work, self-hosted | **Preferred for data analysis** |
| Google Sheets via Apps Script webhook | Zero cost, familiar, easy to share | Not scalable, limited automation | Acceptable for initial validation |

**Recommended approach:** Implement a **dual-write strategy**:
1. Next.js API route at `/api/survey/submit` that writes to a Supabase table for direct analysis
2. Optionally forward to GHL webhook for email nurture automation

**Webhook payload structure** (already implemented in `submitSurvey.ts`):
```json
{
  "survey_type": "seller|buyer|both",
  "email": "user@example.com",
  "first_name": "John",
  "phone": "+1234567890",
  "platforms_sell": ["facebook_marketplace", "ebay"],
  "sell_volume_6mo": "31-75",
  "pain_ghosting": 4,
  "pain_noshow": 3,
  "pain_scam": 5,
  "pain_lowball": 2,
  "pain_verify": 4,
  "pain_reputation": 5,
  "scam_loss_seller": "yes_significant",
  "time_waste_weekly": "3-5_hours",
  "value_portable_rep": 9,
  "willing_share_data": "yes_if_protected",
  "willing_vouch": "yes",
  "monthly_revenue": "1000-3000",
  "biggest_frustration_seller": "Ghosting drives me insane",
  "submitted_at": "2026-01-31T15:30:00Z",
  "qualification_tier": "priority"
}
```

**3.1.2 Lead Scoring Logic**

Implement qualification scoring based on survey responses to segment leads into tiers:

| Tier | Criteria | Action |
|------|----------|--------|
| **Priority** | Monthly revenue $3K+, OR sell volume 76+, OR pain_reputation >= 4 AND willing_share_data = "yes_absolutely" | Fast-track nurture, personal outreach |
| **Qualified** | Monthly revenue $1K+, OR sell volume 31+, OR value_portable_rep >= 7 | Standard nurture sequence |
| **Standard** | All other completed surveys | Welcome sequence, lower priority |

The `qualification_tier` field should be computed server-side (in the API route) and stored alongside the raw survey data.

**3.1.3 Email Nurture Sequence**

Per the original PRD v1, activate a 5-email sequence over 30 days for all qualified leads:

| Email | Timing | Subject / Theme | Purpose |
|-------|--------|-----------------|---------|
| 1 | Immediate | "Welcome, Founding Member" | Confirm signup, reinforce exclusivity |
| 2 | Day 3 | "We heard you: [top pain point]" | Reflect their survey answers back, show empathy |
| 3 | Day 10 | "Here's what we're building" | Share vision specifics, tease trust score concept |
| 4 | Day 20 | "Your feedback is shaping VouchedMarket" | Aggregate survey stats, social proof |
| 5 | Day 30 | "Ready to go deeper?" | Invite to deeper interview, price sensitivity test, referral ask |

**Email 5 is the critical assumption validator:** Include a willingness-to-pay question ("What would you pay monthly for a tool that protects your reputation across every marketplace?") with $0 / $9 / $19 / $29 / $49 / $79 options. This fills the A5 gap in the current survey.

### 3.2 Vercel Deployment

**3.2.1 Domain Strategy**

| Domain | Availability | Recommendation |
|--------|-------------|----------------|
| vouchedmarket.com | Check availability | Primary choice -- matches brand name exactly |
| getvouched.com | Check availability | Alternative -- shorter, action-oriented |
| vouched.market | Check availability | Alternative -- uses .market TLD |

**Action:** Register primary domain. Set up DNS pointing to Vercel.

**3.2.2 Deployment Configuration**

```
Platform: Vercel (free tier sufficient for validation)
Framework: Next.js 16 (auto-detected)
Build command: npm run build
Output: .next
Environment variables:
  - NEXT_PUBLIC_WEBHOOK_URL (survey submission endpoint)
  - SUPABASE_URL (if using Supabase backend)
  - SUPABASE_SERVICE_KEY (if using Supabase backend)
```

**3.2.3 Analytics Setup**

| Tool | Purpose | Priority |
|------|---------|----------|
| Google Analytics 4 | Page views, session duration, bounce rate | HIGH |
| Custom event tracking | Funnel steps (see below) | HIGH |
| Vercel Analytics | Core Web Vitals, performance | MEDIUM |
| Hotjar or Microsoft Clarity | Heatmaps, session recordings | LOW (Phase 1 nice-to-have) |

**Custom funnel events to track:**

| Event Name | Trigger | Maps To |
|------------|---------|---------|
| `page_view` | Landing page loaded | Top of funnel |
| `cta_click_header` | Header "Get Early Access" clicked | Engagement |
| `cta_click_hero` | Hero CTA clicked | Engagement |
| `survey_track_selected` | Seller / Buyer / Both button clicked | Funnel entry |
| `survey_started` | "Let's Go" clicked on intro screen | Survey start |
| `survey_question_answered` | Each question completed (with question ID) | Progress tracking |
| `survey_completed` | Last question answered | Survey completion |
| `email_submitted` | Email capture form submitted | Conversion |
| `confirmation_viewed` | Confirmation screen displayed | Success |
| `share_clicked` | Share button clicked | Viral coefficient |

**Target funnel metrics** (from PRD v1):

| Metric | Target | Kill Criteria |
|--------|--------|---------------|
| Visitor to CTA Click | >15% | <8% |
| CTA Click to Survey Start | >60% | <30% |
| Survey Start to Complete | >70% | <40% |
| Complete to Email Submit | >85% | <50% |
| "Willing to share data" = Yes/Yes-if-protected | >40% | <15% |
| Avg "Portable reputation value" | >7/10 | <5/10 |

**3.2.4 SEO & Social Configuration**

Add to `layout.tsx`:
- `<title>` -- "VouchedMarket -- Your Reputation Follows You"
- `<meta name="description">` -- "A trust network for marketplace buyers and sellers. Portable reputation verified by real transactions, backed by people who vouch for you."
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags
- Canonical URL
- Robots meta (index, follow)

Create OG image (1200x630px):
- VouchedMarket logo/text
- Tagline: "People vouch for people."
- Brand colors (deep blue background, amber accent)

### 3.3 Survey Data Analysis Pipeline

**3.3.1 Database Schema (Supabase)**

```sql
CREATE TABLE survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_type TEXT NOT NULL CHECK (survey_type IN ('seller', 'buyer', 'both')),
  email TEXT NOT NULL,
  first_name TEXT,
  phone TEXT,
  qualification_tier TEXT NOT NULL CHECK (qualification_tier IN ('priority', 'qualified', 'standard')),
  responses JSONB NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Denormalized assumption-validation fields for fast queries
  value_portable_rep INTEGER,           -- 1-10 scale (A1 validation)
  willing_share_data TEXT,              -- A3 validation
  willing_verify_identity TEXT,         -- Buyer A3 variant
  willing_vouch TEXT,                   -- Community participation signal
  pain_reputation INTEGER,             -- 1-5 scale (A1 supporting)
  monthly_revenue TEXT,                 -- Segment indicator
  sell_volume_6mo TEXT                  -- Segment indicator
);

CREATE INDEX idx_survey_type ON survey_responses(survey_type);
CREATE INDEX idx_qualification_tier ON survey_responses(qualification_tier);
CREATE INDEX idx_submitted_at ON survey_responses(submitted_at);
```

**3.3.2 Analysis Dashboard Queries**

Define SQL views or dashboard queries for real-time assumption monitoring:

**A1: Portable Reputation Desire**
```sql
-- Percentage scoring 7+ on portable reputation value
SELECT
  COUNT(*) FILTER (WHERE value_portable_rep >= 7) * 100.0 / COUNT(*) AS pct_high_value,
  AVG(value_portable_rep) AS avg_value,
  COUNT(*) AS total_responses
FROM survey_responses
WHERE value_portable_rep IS NOT NULL;
-- PASS: pct_high_value >= 60%
-- KILL: pct_high_value < 40%
```

**A3: Data Sharing Willingness**
```sql
-- Percentage willing to share data (yes_absolutely + yes_if_protected)
SELECT
  COUNT(*) FILTER (WHERE willing_share_data IN ('yes_absolutely', 'yes_if_protected')) * 100.0 / COUNT(*) AS pct_willing,
  COUNT(*) AS total_responses
FROM survey_responses
WHERE willing_share_data IS NOT NULL;
-- PASS: pct_willing >= 25%
-- KILL: pct_willing < 15%
```

**Pain Reputation Score (A1 supporting signal):**
```sql
-- Average reputation pain score (sellers who feel locked-in)
SELECT
  AVG(pain_reputation) AS avg_pain,
  COUNT(*) FILTER (WHERE pain_reputation >= 4) * 100.0 / COUNT(*) AS pct_high_pain
FROM survey_responses
WHERE pain_reputation IS NOT NULL;
-- SIGNAL: avg_pain >= 3.5 supports A1
```

**Segment Analysis:**
```sql
-- Assumption validation broken down by seller tier
SELECT
  monthly_revenue,
  COUNT(*) AS n,
  AVG(value_portable_rep) AS avg_rep_value,
  COUNT(*) FILTER (WHERE willing_share_data IN ('yes_absolutely', 'yes_if_protected')) * 100.0 / COUNT(*) AS pct_data_willing
FROM survey_responses
WHERE survey_type IN ('seller', 'both')
GROUP BY monthly_revenue
ORDER BY monthly_revenue;
```

**3.3.3 Weekly Review Cadence**

| Week | Action | Decision |
|------|--------|----------|
| Week 1-2 | Monitor funnel conversion rates | Adjust page/survey if drop-off detected |
| Week 3-4 | First assumption check (need n>=50) | Preliminary signal assessment |
| Week 5-6 | Segment analysis by seller tier | Identify highest-value segments |
| Week 7-8 | Full assumption validation (need n>=200) | **DECISION GATE** |

### 3.4 Acceptance Criteria for Phase 1

Phase 1 is complete when ALL of the following are true:

- [ ] Landing page deployed to production URL (Vercel + custom domain)
- [ ] Webhook endpoint configured and receiving submissions
- [ ] Survey data writing to persistent storage (Supabase or equivalent)
- [ ] Lead scoring logic computing qualification tier on each submission
- [ ] GA4 tracking active with all custom funnel events firing
- [ ] Email nurture sequence configured and triggered on submission
- [ ] SEO meta tags and OG image deployed
- [ ] Analysis dashboard or queries available for assumption monitoring
- [ ] First 10 survey submissions received and verified in database
- [ ] Weekly review cadence established

**Estimated effort:** 2-3 development sessions (8-12 hours total)

---

## 4. DECISION GATE: Assumption Validation

This is the most important section of this document. Phase 2 represents a substantial investment in architecture, data infrastructure, and product complexity. That investment is only justified if real users validate the core assumptions.

### 4.1 Validation Thresholds

| Assumption | Survey Signal | Required Threshold | Kill Criteria | Measurement |
|------------|---------------|-------------------|---------------|-------------|
| **A1: Portable reputation desire** | `value_portable_rep` >= 7 AND/OR `pain_reputation` >= 4 | 60%+ of respondents score >= 7 on portable rep value | <40% score >= 7 = **STOP community features** | Survey Q6 (seller), Q7 (both), Q3 matrix row 6 |
| **A3: Data sharing willingness** | `willing_share_data` = yes_absolutely OR yes_if_protected | 25%+ select positive options | <15% = **PIVOT to privacy-first model** | Survey Q7 (seller), Q8 (both) |
| **A5: Willingness to pay** | Email 5 price sensitivity response | 3%+ indicate $29+/mo acceptable | <1% = **Free-only model, monetize through tools** | Email nurture sequence Day 30 |
| **A2: Trust as top pain** | `pain_scam` >= 4 OR `pain_verify` >= 4 | Top-3 pain point by average score | Not top-5 = reconsider positioning | Survey Q3 matrix |
| **Buyer engagement** | Buyer track + Both track selection rate | 30%+ of surveys are buyer/both tracks | <15% = **Seller-only network** | Track selection analytics |

### 4.2 Decision Timeline

```
Week 0 ---------> Week 8 ---------> Week 10 --------> Week 12+
  |                  |                   |                  |
  Deploy          DECISION           Architecture      Phase 2
  & Collect        GATE              Planning          Begins
                                    (if validated)
```

**Minimum requirements before decision:**
- 200 completed survey submissions (across all tracks)
- 8 weeks of collection time (accounts for traffic ramp-up)
- At least 30 responses in each track (seller, buyer, both)
- Email nurture sequence fully deployed for first cohort (30-day cycle)

**If requirements are not met by Week 8:** Extend collection period. Do NOT make a go/no-go decision on insufficient data. Invest in traffic acquisition (social media, community outreach, paid ads) rather than building product.

### 4.3 Decision Matrix

| Outcome | A1 Result | A3 Result | A5 Result | Action |
|---------|-----------|-----------|-----------|--------|
| **FULL GO** | 60%+ | 25%+ | 3%+ | Proceed to Phase 2 as specified |
| **MODIFIED GO** | 60%+ | 25%+ | <3% | Proceed with free-only model; monetize through tool bundle upsell |
| **PRIVACY PIVOT** | 60%+ | <25% | Any | Build reputation without cross-user data sharing; self-reported + tool-verified only |
| **SELLER-ONLY** | 60%+ seller, <40% buyer | Any | Any | Build professional seller network; drop buyer-side features |
| **TOOL FEATURE** | 40-59% | Any | Any | Downscope to community features within CopilotInbox/Guard; not standalone |
| **STOP** | <40% | <15% | <1% | Kill VouchedMarket. Redirect resources to CopilotSource or other tools |

### 4.4 Pivot Options if Assumptions Fail

**Pivot A: Tool-Embedded Community**
If portable reputation desire is moderate (40-59%) but not strong enough for a standalone platform, embed lightweight community features directly into CopilotInbox and CopilotGuard:
- Shared blocklist (CopilotGuard users contribute/consume)
- Buyer repeat-purchase indicator (CopilotInbox shows "this buyer completed 3 purchases with other users")
- No standalone VouchedMarket product; community is a feature, not a platform

**Pivot B: Seller-Only Professional Network**
If buyers don't engage but sellers show strong demand, pivot to a professional peer network (not a two-sided marketplace):
- Seller profiles with tool-verified performance data
- Peer networking (connect sellers in same niche/market)
- Mentorship matching
- No buyer-facing trust scores; seller-to-seller value only

**Pivot C: Free Community, Tool Monetization**
If users love the concept but won't pay for community features:
- Community is free forever (loss leader)
- Monetize through premium tiers of Copilot tools that include community-powered features
- "CopilotInbox Pro includes VouchedMarket verified buyer badges" -- community drives tool upsell

**Pivot D: Kill and Redirect**
If assumptions fail across the board:
- Archive the landing page
- Redirect vouchedmarket.com to FBMarketplaceCopilot.com
- Reallocate development resources to CopilotSource (highest-confidence new tool opportunity)
- Retain the email list for future Copilot Suite marketing

---

## 5. Phase 2: Trust Intelligence Platform (Q3-Q4 2026, IF VALIDATED)

**Prerequisites:** Decision Gate passes with FULL GO or MODIFIED GO. Minimum 200 validated survey responses supporting A1 and A3 thresholds.

### 5.1 Seller/Buyer Profile System

Every VouchedMarket user gets a **portable identity page** that aggregates their marketplace reputation into a single, shareable view.

**Seller Profile:**
- Display name (real or business name, user choice)
- Verification level badge (Basic / Verified / Premium)
- Platforms active on (with optional linked accounts)
- Trust Score (composite, see 5.2)
- Performance badges earned (see 6.1)
- Transaction history summary (volume, completion rate -- no dollar amounts exposed)
- Response metrics (average response time, response rate)
- Vouch count and recent vouches
- Member since date + Founding Member badge (if applicable)
- Categories sold in

**Buyer Profile:**
- Display name
- Verification level badge
- Trust Score (buyer variant)
- Purchase history summary (verified purchases, completion rate)
- Follow-through rate (showed up / completed transaction)
- Vouch count from sellers
- Member since date

**Profile Sharing:**
- Unique URL: `vouchedmarket.com/u/{username}`
- Shareable link for marketplace listings ("Check my VouchedMarket profile")
- QR code generation for in-person meetups
- Embeddable badge/widget for external use

**Privacy Controls:**
- Users control what is visible on their profile
- Options: Public / VouchedMarket Members Only / Private
- Individual field-level visibility toggles
- Right to data deletion (GDPR/CCPA compliant)

### 5.2 Trust Score Engine

The Trust Score is VouchedMarket's core product -- a composite reputation metric built from verified behavioral data across all Copilot tools and peer interactions.

**Composite Score Algorithm:**

| Signal Source | Weight | Inputs | Update Frequency |
|---------------|--------|--------|------------------|
| **CopilotInbox** | 30% | Response speed, conversation quality (completion rate of initiated conversations), message professionalism score | Real-time on each conversation |
| **CopilotMetrics** | 25% | Transaction volume, revenue consistency, listing-to-sale conversion rate, days-on-market averages | Daily batch |
| **CopilotGuard** | 25% | Clean fraud record (positive), fraud reports filed against user (negative), false positive rate on their reports | Event-driven (on report/flag) |
| **CopilotList** | 10% | Listing quality scores, photo quality, pricing accuracy vs. sold comps, description completeness | Daily batch |
| **Peer Signals** | 10% | Vouches received (weighted by voucher's trust score), dispute resolution rate, community contributions | Event-driven (on vouch/dispute) |

**Score Characteristics:**
- Range: 0-100 (displayed as a percentage or letter grade)
- New users start at 50 (neutral) and build up or down
- Score decays slowly without recent activity (reputation is not permanent)
- Decay rate: -2 points per month of complete inactivity, floor of 30
- Score is public by default but can be set to members-only

**Anti-Gaming Measures:**
- Minimum transaction volume before score is displayed (prevents fake accounts)
- Sudden score changes flagged for review (manipulation detection)
- Peer vouches from low-trust accounts carry near-zero weight
- Self-vouching detection (same IP, device fingerprint, social graph analysis)
- Score is based on behavioral signals, not self-reported data

**Score Breakdown Display:**
Users can see their score breakdown but not the exact algorithm weights. Each contributing factor shows a qualitative indicator (Excellent / Good / Average / Below Average / Poor) so users understand what to improve without being able to game specific inputs.

### 5.3 Cross-Tool Data Ingestion Pipeline

VouchedMarket must consume behavioral events from all Copilot tools without creating tight coupling or single points of failure.

**Architecture: Event-Driven with Message Queue**

```
CopilotInbox ──> [Event Bus] ──> VouchedMarket Ingestion Service
CopilotMetrics ─>    |              |
CopilotGuard ──>     |              ├── Normalize events
CopilotList ───>     |              ├── Validate + deduplicate
                     |              ├── Aggregate into trust signals
                     |              └── Update trust scores
                     |
                     └── Events: CONVERSATION_COMPLETED, SALE_RECORDED,
                         FRAUD_REPORTED, LISTING_SCORED, etc.
```

**Event Schema (standardized across all tools):**
```json
{
  "event_type": "CONVERSATION_COMPLETED",
  "source_tool": "copilot_inbox",
  "user_id": "vm_user_123",
  "timestamp": "2026-09-15T14:30:00Z",
  "payload": {
    "conversation_id": "conv_abc",
    "outcome": "sale_completed",
    "response_time_avg_seconds": 180,
    "messages_exchanged": 8
  },
  "event_id": "evt_unique_id",
  "schema_version": "1.0"
}
```

**Data Normalization Layer:**
- Each tool emits raw events in its own format
- Ingestion service normalizes to VouchedMarket's internal schema
- Normalization adapters are tool-specific (one adapter per tool)
- Schema versioning allows tools to evolve independently

**Privacy-Preserving Aggregation:**
- Raw events are processed and discarded (not stored permanently)
- Only aggregated signals are persisted (e.g., "average response time: 3 min" not individual conversation logs)
- User can request full data export or deletion at any time
- Cross-user comparisons use anonymized, aggregated benchmarks only
- No tool can access another tool's raw data through VouchedMarket

### 5.4 Community Blocklist

A shared database of verified bad actors that protects all VouchedMarket members.

**Report Workflow:**
1. User reports a buyer/seller via any Copilot tool or directly on VouchedMarket
2. Report includes: reason (scam, no-show, harassment, fake listing), evidence (screenshots, conversation excerpts), severity level
3. Reports are queued for verification (prevent weaponized reporting)
4. Verification criteria: 2+ independent reports from different users, OR 1 report with strong evidence (fake payment screenshot, etc.)
5. Verified entries added to community blocklist
6. Reported party can dispute (appeal process)

**Blocklist Integration:**
- CopilotGuard: Real-time lookup when analyzing a buyer in conversation
- CopilotInbox: Warning banner displayed when a blocklisted user messages
- Bidirectional sync: CopilotGuard's existing scammer database feeds VouchedMarket, and VouchedMarket community reports feed back into CopilotGuard

**Abuse Prevention:**
- Rate limiting on reports per user per day (max 3)
- Report accuracy score per user (users who file false reports lose reporting privileges)
- Dispute resolution process with human review for contested cases
- No public shaming -- blocklist entries are visible only as warnings, not searchable profiles

---

## 6. Phase 3: Community & Reputation (2027+)

**Prerequisites:** Phase 2 launched and achieving engagement targets. Minimum 5,000 active profiles. Trust Score adopted by at least 30% of Copilot tool users.

### 6.1 Verified Seller Badges

Badges earned through verifiable tool usage data -- not self-reported, not purchasable, not fakeable.

| Badge | Criteria | Data Source |
|-------|----------|-------------|
| **Top Responder** | Response time in top 10% of category for 90+ days | CopilotInbox |
| **Power Lister** | 50+ active listings with quality score >= 80% | CopilotList |
| **Quick Sale Artist** | Average days-to-sale in bottom 25% (fastest) for category | CopilotMetrics |
| **Trusted Seller** | Trust Score >= 85 for 180+ consecutive days | VouchedMarket Trust Engine |
| **Clean Record** | Zero fraud flags, zero unresolved disputes for 1 year | CopilotGuard |
| **Community Protector** | 10+ verified scammer reports with 90%+ accuracy | VouchedMarket Blocklist |
| **Volume Champion** | 500+ completed transactions across all platforms | CopilotMetrics |
| **Founding Member** | Signed up during pre-launch waitlist phase | VouchedMarket (permanent) |

**Badge Display:**
- Badges appear on VouchedMarket profiles
- Top 3 badges can be selected for "showcase" display
- Badges visible in CopilotInbox when the seller/buyer has a linked VouchedMarket profile
- Embeddable badge widget for marketplace listings

**Badge Maintenance:**
- Performance badges are recalculated monthly
- Badges can be lost if performance drops below threshold for 60+ days
- Founding Member badge is permanent and non-revocable
- Badge history is visible (earned, active, expired)

### 6.2 Peer Vouching System

The core social mechanic -- users vouch for each other after successful transactions, building a web of trust that compounds over time.

**How Vouching Works:**
1. After a transaction is marked as completed (via CopilotInbox or manually), both parties are prompted to vouch for each other
2. A vouch is a short endorsement: "Great buyer, showed up on time, paid cash as agreed" (max 200 characters)
3. Vouches are public on the recipient's profile
4. Each vouch carries a weight based on the voucher's own trust score

**Vouch Weighting:**
- Trust Score 80+: Full weight (1.0x)
- Trust Score 60-79: Standard weight (0.7x)
- Trust Score 40-59: Reduced weight (0.4x)
- Trust Score <40: Minimal weight (0.1x)
- New accounts (<30 days): Minimal weight (0.1x) regardless of score

This prevents trust score inflation through collusion between low-quality accounts.

**Anti-Fraud Measures:**
- Cannot vouch for the same person more than once per 90 days
- Mutual vouching (A vouches B, B vouches A same day) flagged for review
- Vouch-for-vouch rings detected through graph analysis
- Users can report suspicious vouches

### 6.3 Seller Performance Benchmarking (Enhancement 12)

Anonymous peer comparison that motivates improvement and creates engagement loops. This is the bridge between the Copilot tool suite and the VouchedMarket community platform.

**Benchmark Categories:**

| Metric | Source | Display |
|--------|--------|---------|
| Response time | CopilotInbox | "Your average response time is faster than 78% of sellers in Electronics" |
| Days to sale | CopilotMetrics | "Your electronics sell in 4.2 days (category average: 6.8 days)" |
| Listing quality | CopilotList | "Your listing quality score is in the top 15%" |
| Transaction completion rate | CopilotMetrics | "You complete 94% of initiated transactions (average: 71%)" |
| Buyer satisfaction | VouchedMarket vouches | "92% of your buyers vouched for you (average: 64%)" |

**Category-Specific Benchmarks:**
- Electronics, Furniture, Clothing, Vehicles, Collectibles, etc.
- Benchmarks are only meaningful within category (furniture sells slower than electronics -- that's normal)
- Minimum 50 active sellers in a category before benchmarks are shown

**Gamification (light touch):**
- Monthly "Seller of the Month" per category per market (if enough data)
- Percentile improvements highlighted ("You moved from top 40% to top 25% this month")
- Benchmark trends over time (are you improving?)

**Privacy:**
- All benchmarks are anonymized -- no seller can see another specific seller's data
- Benchmarks require opt-in (not forced on tool users)
- Users can hide their benchmark position from their profile

### 6.4 Professional Networking

Connect sellers as business peers, not just transactional counterparties.

**Features:**
- **Niche Connections:** Suggest connections with sellers in same category + geographic market
- **Mentorship Matching:** Experienced sellers (Trust Score 80+, 1 year+, $5K+/mo revenue) matched with newer sellers who request guidance
- **Supplier Network:** Sellers who source inventory can connect with sellers who have excess/wholesale inventory
- **Local Market Groups:** Geographic communities for sharing local market intelligence (what sells in [city], best meetup spots, local buyer behavior patterns)

**Important constraint:** Professional networking is a Phase 3 feature because it requires critical mass. A networking feature with 50 users is useless. Wait until there are thousands of active profiles before investing in this.

---

## 7. Integration Architecture

> **INTEGRATION GATE: ALL cross-tool integration in this section is BLOCKED until the VouchedMarket validation gate passes.**
>
> **Gate criteria:** >=60% portable reputation desire AND >=25% data-sharing willingness from survey respondents.
> **Gate target date:** April 2026 (requires sufficient survey volume -- minimum 200 completed surveys).
> **Current status:** Pre-gate. Phase 1 (landing page + survey + email nurture) only.
>
> **Until the gate passes:**
> - No Copilot tool consumes VouchedMarket trust scores, badges, or blocklist data
> - No Copilot tool sends behavioral signals to VouchedMarket
> - VouchedMarket operates as a standalone landing page collecting validation data
> - Engineering investment is ZERO beyond webhook connection + Vercel deployment
>
> **If the gate FAILS:** Pivot options are documented in the Assumption Validation section. No engineering resources have been committed.
>
> The integration architecture below is the **post-gate blueprint** -- preserved for when/if the gate passes.

### 7.1 Trust Layer Position

VouchedMarket is not a peer of the Copilot tools -- it sits **above** them as a reputation aggregation and distribution layer.

```
                 ┌──────────────────────────────────────────┐
                 │          VouchedMarket                    │
                 │     Trust Intelligence Platform           │
                 │                                          │
                 │  Trust Scores | Badges | Blocklist |     │
                 │  Profiles | Vouches | Benchmarks         │
                 └──────────┬───────────────┬───────────────┘
                            │               │
              Behavioral    │               │  Trust signals
              signals UP    │               │  flow DOWN
                            │               │
    ┌───────────┬───────────┴───┬───────────┴───┬───────────┐
    │ Copilot   │ Copilot       │ Copilot       │ Copilot   │
    │ Inbox     │ Metrics       │ Guard         │ List      │
    │           │               │               │           │
    │ Messaging │ Analytics     │ Fraud         │ Listings  │
    │ & CRM     │ & P/L         │ Protection    │ & SEO     │
    └───────────┴───────────────┴───────────────┴───────────┘
                            │
                            │  (Future)
                    ┌───────┴───────┐
                    │ Copilot       │
                    │ Source        │
                    │ Sourcing/Deals│
                    └───────────────┘
```

**Key architectural principle:** Every Copilot tool works independently. VouchedMarket enhances them but is never a dependency. If VouchedMarket goes down, every tool continues to function. Trust data is additive, not required.

### 7.2 Data VouchedMarket CONSUMES

> **POST-GATE ONLY.** None of these data flows are active until the validation gate passes. No Copilot tool is configured to send data to VouchedMarket during Phase 1.

| Source Tool | Data Signals | Purpose | Update Frequency |
|-------------|-------------|---------|------------------|
| **CopilotInbox** | Response speed (avg seconds to first reply), conversation completion rate, message professionalism score, buyer interaction patterns | Trust score input (30% weight) | Real-time per conversation |
| **CopilotMetrics** | Transaction volume (monthly count), revenue consistency (variance), listing-to-sale conversion, average days-on-market, completion rate | Trust score input (25% weight) | Daily batch aggregation |
| **CopilotGuard** | Fraud flags filed against user, fraud reports submitted by user, false positive rate, risk score history, scammer reports | Trust score input (25% weight) | Event-driven on each flag/report |
| **CopilotList** | Listing quality scores, photo quality ratings, pricing accuracy vs. market, description completeness, SEO optimization score | Trust score input (10% weight) | Daily batch aggregation |
| **CopilotSource** (future) | Sourcing ROI, deal follow-through rate, supplier relationship quality | Trust score input (future rebalance) | TBD |

### 7.3 Data VouchedMarket EXPOSES

> **POST-GATE ONLY.** These API endpoints will not be built or deployed until the validation gate passes and Phase 2 development begins.

| Endpoint | Response | Purpose | Consumers |
|----------|----------|---------|-----------|
| `GET /api/trust/score/{userId}` | `{ score: 87, grade: "A", last_updated: "..." }` | Retrieve user's trust score | All Copilot tools |
| `GET /api/trust/profile/{userId}` | Full profile object (name, badges, vouches, stats) | Display trust profile in tool UIs | All Copilot tools |
| `GET /api/trust/badges/{userId}` | `{ badges: ["top_responder", "trusted_seller", ...] }` | Display earned badges | CopilotInbox, CopilotList |
| `GET /api/blocklist/check/{identifier}` | `{ blocked: true/false, reason: "...", severity: "..." }` | Community blocklist lookup | CopilotGuard, CopilotInbox |
| `GET /api/benchmarks/{userId}/{category}` | `{ percentiles: { response_time: 78, days_to_sale: 65, ... } }` | Seller benchmarking data | CopilotMetrics |

**Authentication:** All API endpoints require a valid Copilot Suite API key. User-specific data requires the user's VouchedMarket auth token.

**Rate Limits:**
- Trust score lookup: 1000 requests/minute per tool
- Profile lookup: 100 requests/minute per tool
- Blocklist check: 5000 requests/minute per tool (high-frequency, low-latency required)

### 7.4 Events Emitted

> **POST-GATE ONLY.** VouchedMarket does not emit events during Phase 1. Event emission begins with Phase 2 trust score engine development.

VouchedMarket publishes events that other tools can subscribe to:

| Event | Payload | Subscribers |
|-------|---------|-------------|
| `TRUST_SCORE_UPDATED` | `{ userId, oldScore, newScore, changedSignals }` | All tools (UI refresh) |
| `SELLER_BADGE_EARNED` | `{ userId, badge, earnedAt }` | CopilotInbox (display), CopilotList (listing badge) |
| `SELLER_BADGE_LOST` | `{ userId, badge, lostAt, reason }` | CopilotInbox, CopilotList |
| `BLOCKLIST_ENTRY_ADDED` | `{ reportedUserId, severity, source }` | CopilotGuard, CopilotInbox |
| `BLOCKLIST_ENTRY_REMOVED` | `{ userId, reason }` | CopilotGuard, CopilotInbox |
| `VOUCH_RECEIVED` | `{ recipientId, voucherId, voucherScore }` | CopilotInbox (notification) |
| `BENCHMARK_MILESTONE` | `{ userId, metric, oldPercentile, newPercentile }` | CopilotMetrics (notification) |

### 7.5 Events Consumed

> **POST-GATE ONLY.** VouchedMarket does not subscribe to any events during Phase 1. Event consumption begins with Phase 2 data ingestion pipeline development.

VouchedMarket subscribes to events from all Copilot tools:

| Event | Source | VouchedMarket Action |
|-------|--------|----------------------|
| `CONVERSATION_COMPLETED` | CopilotInbox | Update response speed + completion rate signals |
| `SALE_COMPLETED` | CopilotInbox / CopilotMetrics | Update transaction volume, prompt vouch exchange |
| `FRAUD_REPORTED` | CopilotGuard | Update fraud signal (negative), trigger blocklist review |
| `FRAUD_CLEARED` | CopilotGuard | Update fraud signal (positive -- false alarm resolved) |
| `LISTING_SCORED` | CopilotList | Update listing quality signal |
| `LISTING_SOLD` | CopilotList / CopilotMetrics | Update sales velocity signal |
| `BLOCKLIST_ENTRY_ADDED` | CopilotGuard | Ingest into community blocklist (bidirectional sync) |
| `USER_DEACTIVATED` | Any tool | Freeze trust score, mark profile as inactive |

---

## 8. Technical Architecture

### 8.1 Tech Stack

Consistent with the Copilot Suite conventions and the existing VouchedMarket MVP:

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js 16 + React 19 + TypeScript | Existing MVP stack, SSR for SEO, App Router |
| **Styling** | Tailwind CSS v4 | Existing MVP, utility-first, responsive |
| **Backend API** | Next.js API Routes (Phase 1), standalone Node.js service (Phase 2+) | Start simple, extract when needed |
| **Database** | Supabase (PostgreSQL) | Existing ROK infrastructure, real-time subscriptions, Row Level Security |
| **Event Bus** | Supabase Realtime (Phase 2), Redis Streams or NATS (Phase 3+) | Start with what we have, scale as needed |
| **Auth** | Supabase Auth (email + OAuth) | Consistent with suite, supports social login |
| **Hosting** | Vercel (frontend), Supabase (backend/DB) | Serverless scaling, zero DevOps for Phase 1-2 |
| **CDN/Assets** | Vercel Edge Network + Supabase Storage | Static assets, OG images, profile photos |
| **Monitoring** | Vercel Analytics + Sentry (error tracking) | Performance + error visibility |

### 8.2 Database Schema for Trust Data

**Phase 2 schema extension** (builds on Phase 1 survey_responses table):

```sql
-- User profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  verification_level TEXT DEFAULT 'basic' CHECK (verification_level IN ('basic', 'verified', 'premium')),
  profile_visibility TEXT DEFAULT 'public' CHECK (profile_visibility IN ('public', 'members_only', 'private')),
  is_seller BOOLEAN DEFAULT false,
  is_buyer BOOLEAN DEFAULT false,
  platforms JSONB DEFAULT '[]',
  categories JSONB DEFAULT '[]',
  member_since TIMESTAMPTZ DEFAULT NOW(),
  is_founding_member BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trust scores (historical + current)
CREATE TABLE trust_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  grade TEXT NOT NULL CHECK (grade IN ('A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F')),
  -- Signal breakdown
  inbox_signal NUMERIC(5,2),        -- 0-100 normalized
  metrics_signal NUMERIC(5,2),      -- 0-100 normalized
  guard_signal NUMERIC(5,2),        -- 0-100 normalized
  list_signal NUMERIC(5,2),         -- 0-100 normalized
  peer_signal NUMERIC(5,2),         -- 0-100 normalized
  -- Metadata
  data_sources_count INTEGER DEFAULT 0,
  is_current BOOLEAN DEFAULT true,
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_trust_current ON trust_scores(user_id, is_current) WHERE is_current = true;

-- Badges
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_badges_user ON badges(user_id, is_active);

-- Vouches
CREATE TABLE vouches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  voucher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT CHECK (char_length(message) <= 200),
  voucher_trust_score INTEGER,     -- Score at time of vouching (for weight calculation)
  transaction_id TEXT,             -- Optional reference to the transaction
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Prevent duplicate vouches within 90 days
  CONSTRAINT unique_vouch_90d UNIQUE (voucher_id, recipient_id)
  -- Note: 90-day constraint enforced at application level with date check
);

CREATE INDEX idx_vouches_recipient ON vouches(recipient_id, created_at DESC);

-- Blocklist
CREATE TABLE blocklist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reported_user_identifier TEXT NOT NULL,  -- Could be email, phone, FB ID, etc.
  reported_by UUID REFERENCES auth.users(id),
  reason TEXT NOT NULL CHECK (reason IN ('scam', 'no_show', 'harassment', 'fake_listing', 'other')),
  evidence JSONB DEFAULT '{}',
  severity TEXT DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'disputed', 'removed')),
  verified_at TIMESTAMPTZ,
  report_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blocklist_identifier ON blocklist(reported_user_identifier, status);
CREATE INDEX idx_blocklist_status ON blocklist(status);

-- Behavioral events (processed, not raw -- privacy-preserving)
CREATE TABLE trust_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  signal_type TEXT NOT NULL,           -- 'response_speed', 'completion_rate', etc.
  source_tool TEXT NOT NULL,           -- 'copilot_inbox', 'copilot_metrics', etc.
  value NUMERIC NOT NULL,              -- Normalized value
  period_start TIMESTAMPTZ NOT NULL,   -- Aggregation period
  period_end TIMESTAMPTZ NOT NULL,
  sample_size INTEGER DEFAULT 0,       -- Number of events in this aggregation
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_signals_user_type ON trust_signals(user_id, signal_type, period_end DESC);
```

### 8.3 Privacy Architecture

Privacy is not optional -- it is a structural requirement for a trust network that handles cross-user behavioral data.

**Data Classification:**

| Classification | Examples | Storage | Access |
|---------------|----------|---------|--------|
| **Public** | Display name, trust score, badges, vouches | Supabase (no RLS) | Anyone |
| **Members-Only** | Profile details, benchmark position, vouch messages | Supabase + RLS | Authenticated VouchedMarket users |
| **Private** | Email, phone, raw survey data, individual signal values | Supabase + RLS + encryption | Owner only + admin |
| **Internal** | Raw behavioral events, algorithm weights, abuse reports | Supabase + strict RLS | System only |

**Key Privacy Principles:**
1. **No raw data exposure:** VouchedMarket never exposes one user's raw data to another user. Only aggregated, anonymized signals.
2. **Consent-first:** Users explicitly opt in to each data source. Copilot tool usage does NOT automatically feed VouchedMarket.
3. **Granular controls:** Users can disable individual signal sources (e.g., "don't use my CopilotInbox data").
4. **Data portability:** Users can export all their data in JSON format at any time.
5. **Right to deletion:** Users can delete their profile and all associated data. Trust score is zeroed, vouches are anonymized.
6. **No third-party sharing:** VouchedMarket data is never sold or shared with external parties.

**Compliance Requirements:**
- CCPA (California Consumer Privacy Act): Applies to all US users
- GDPR readiness: Even if not currently required, build for it from the start
- Privacy policy must be updated to reflect cross-tool data aggregation
- Cookie consent for analytics tracking

---

## 9. Business Model

### 9.1 Free Tier

Available to all registered users. Provides enough value to drive adoption and network growth.

| Feature | Included |
|---------|----------|
| Basic profile page | Yes |
| Trust score visible to others | Yes (composite score only, no breakdown) |
| Community blocklist access | Yes (check 10 users/day) |
| Receive vouches | Yes (unlimited) |
| Give vouches | Yes (5/month) |
| View own benchmarks | Yes (1 category) |
| Badges | Founding Member only |

### 9.2 Pro Tier ($19/month)

For active sellers who want to leverage their reputation for competitive advantage.

| Feature | Included |
|---------|----------|
| Everything in Free | Yes |
| Trust score breakdown by signal source | Yes |
| Detailed analytics (score trends, vouch velocity) | Yes |
| Benchmarking across all categories | Yes |
| Unlimited vouches per month | Yes |
| Unlimited blocklist checks | Yes |
| Priority badge display (select top 3 showcase badges) | Yes |
| Performance badges (Top Responder, Quick Sale Artist, etc.) | Yes |
| Custom profile URL | Yes |
| Embeddable trust badge for listings | Yes |

### 9.3 Premium Tier ($39/month)

For professional resellers and power sellers who treat marketplace selling as a business.

| Feature | Included |
|---------|----------|
| Everything in Pro | Yes |
| Verified Seller certification (KYC verification process) | Yes |
| Professional networking access | Yes |
| Mentorship matching (as mentor or mentee) | Yes |
| Advanced benchmarking with trend analysis | Yes |
| API access for custom integrations | Yes |
| Priority support | Yes |
| Early access to new features | Yes |
| Verified Seller badge (highest-tier, KYC-backed) | Yes |

**Pricing Notes:**
- Original strategic framework estimated $29-79/mo. Reduced to $19-39/mo based on risk of A5 (willingness to pay) validation.
- Founding Members receive permanent 40% discount ($11.40/mo Pro, $23.40/mo Premium)
- Annual billing discount: 2 months free (effectively ~17% off)
- Bundle discount: Users with active Copilot tool subscriptions get 25% off VouchedMarket

**Revenue Projections (conservative, Year 1 post-Phase 2 launch):**

| Scenario | Active Users | Free % | Pro % | Premium % | Monthly Revenue | ARR |
|----------|-------------|--------|-------|-----------|-----------------|-----|
| Conservative | 5,000 | 90% | 8% | 2% | $11,400 | $136,800 |
| Moderate | 10,000 | 85% | 12% | 3% | $34,200 | $410,400 |
| Optimistic | 25,000 | 80% | 15% | 5% | $118,750 | $1,425,000 |

---

## 10. Success Metrics

### Phase 1 Metrics (Deploy & Collect)

| Metric | Target | Measurement | Kill Criteria |
|--------|--------|-------------|---------------|
| Survey completions (8 weeks) | 200+ | Supabase row count | <100 = extend, <50 = traffic problem |
| Funnel: visitor to CTA click | >15% | GA4 events | <8% = page redesign needed |
| Funnel: CTA to survey complete | >42% (60% x 70%) | GA4 events | <20% = survey too long or broken |
| Funnel: complete to email submit | >85% | GA4 events | <50% = email step friction |
| A1: portable rep desire (7+/10) | >60% | Survey Q6/Q7 | <40% = STOP |
| A3: data sharing willing | >25% | Survey Q7/Q8 | <15% = PIVOT |
| Email open rate (nurture) | >30% | Email platform | <15% = subject/content problem |
| Email 5 price sensitivity response | >20% response rate | Email platform | <5% = question not compelling |

### Phase 2 Metrics (Trust Platform)

| Metric | Target | Timeframe | Kill Criteria |
|--------|--------|-----------|---------------|
| Profile creation (from existing leads) | 30% conversion | First 30 days | <10% |
| Profile completion rate | 50%+ verified | First 90 days | <25% |
| Tool data opt-in rate | 40%+ | First 90 days | <15% |
| Weekly active users | 20%+ of profiles | Ongoing | <5% |
| Vouch activity | 0.5 vouches/user/month | Ongoing | <0.1 |
| Paid conversion (free to Pro/Premium) | 5%+ | First 6 months | <2% |
| Trust score adoption (tool users checking scores) | 30%+ of Copilot users | First 6 months | <10% |
| Blocklist contribution rate | 5%+ of users submit reports | Ongoing | <1% |
| Net Promoter Score | >40 | Quarterly survey | <20 |

### Phase 3 Metrics (Community & Reputation)

| Metric | Target | Timeframe | Kill Criteria |
|--------|--------|-----------|---------------|
| Active community members | 10,000+ | Year 1 post-Phase 2 | <2,000 |
| Badge adoption (users with 1+ badge) | 40% of active users | Ongoing | <15% |
| Benchmark engagement | 30% weekly check-in | Ongoing | <10% |
| Cross-tool correlation (VouchedMarket users retain tools longer) | 20%+ retention lift | 6-month cohort analysis | No measurable lift |
| Network retention (90-day) | 60%+ | Ongoing | <40% |
| Revenue (ARR) | $500K+ | Year 1 post-Phase 2 | <$100K |
| Organic growth (non-paid signups) | 30%+ of new users | Ongoing | <10% (too dependent on paid) |

---

## 11. Risk Assessment

### 11.1 Two-Sided Market Challenge

**Risk Level:** HIGH
**Probability:** HIGH
**Impact:** CRITICAL

VouchedMarket needs both sellers AND buyers to participate. This is the classic chicken-and-egg problem. Buyers won't join a network with no sellers, and seller trust scores are less valuable without buyer participation.

**Mitigations:**
- Start seller-first. Seller-to-seller value (benchmarking, networking, professional reputation) provides single-sided value before buyers arrive.
- Trust scores are useful even without buyer participation (sellers share profiles on marketplace listings to attract buyers).
- CopilotGuard's existing blocklist gives buyers immediate value (protection) as an entry point.
- Monitor buyer survey track selection rate as early signal. If <15% choose buyer/both tracks, plan for seller-only network.

### 11.2 Privacy & Data Concerns

**Risk Level:** MEDIUM-HIGH
**Probability:** MEDIUM
**Impact:** HIGH

Cross-user behavioral data aggregation is inherently sensitive. Users may resist sharing tool usage data with a trust network, especially if they perceive it as surveillance.

**Mitigations:**
- Consent-first architecture: nothing is automatic, everything is opt-in.
- Granular controls: users choose exactly which data sources contribute.
- Transparent score breakdown: users see what signals affect their score.
- No raw data exposure: only aggregated signals, never individual transaction details.
- Survey A3 (data sharing willingness) is a gate: if <15% are willing, the architecture must change to self-reported + tool-verified only.

### 11.3 Platform Dependency

**Risk Level:** MEDIUM
**Probability:** MEDIUM
**Impact:** HIGH

The Copilot tools depend on browser access to Facebook Marketplace. If Facebook blocks extensions or changes their platform, the data pipeline breaks.

**Mitigations:**
- VouchedMarket itself is platform-independent. It aggregates reputation, it doesn't depend on FBM access.
- Multi-platform positioning: reputation across eBay, Poshmark, OfferUp, Craigslist, not just FBM.
- If FBM tools are disrupted, VouchedMarket's value proposition (portable reputation) becomes MORE relevant, not less.
- Community-contributed data (vouches, blocklist reports) is platform-independent.

### 11.4 Critical Mass Requirements

**Risk Level:** HIGH
**Probability:** MEDIUM
**Impact:** HIGH

Network effects require density. A trust network with 50 users in Dallas and 30 in Phoenix provides almost no local matching or benchmarking value.

**Mitigations:**
- Don't launch nationally. Focus on 2-3 geographic markets where existing Copilot tool users are concentrated.
- Achieve density in one market before expanding (the VarageSale lesson from the strategic framework).
- Tool-first approach: every Copilot tool user is a potential VouchedMarket user, providing a built-in acquisition channel.
- Benchmarks and trust scores have value even without local density (they compare you to the full network, not just your city).

### 11.5 Competitive Response

**Risk Level:** MEDIUM
**Probability:** MEDIUM
**Impact:** MEDIUM

If VouchedMarket gains traction, competitors (Vendoo, List Perfectly) or platforms (Facebook itself) could build equivalent features.

**Mitigations:**
- Speed matters: first mover in FBM-specific trust networks.
- Integration depth: competitors don't have messaging + analytics + fraud + listings tools feeding into a trust engine.
- Network effects compound: once users have vouches and trust scores, switching costs are high.
- Multi-platform positioning makes VouchedMarket harder for any single platform to replicate (Facebook can't vouch for your eBay behavior).

### 11.6 Trust Score Manipulation

**Risk Level:** MEDIUM
**Probability:** HIGH (will be attempted)
**Impact:** MEDIUM

Any reputation system will be gamed. Fake transactions, collusive vouching, false reports against competitors.

**Mitigations:**
- Behavioral signals from real tool usage are hard to fake (you can't fake 1,000 conversations in CopilotInbox).
- Vouch weighting by voucher's trust score prevents low-quality collusion.
- Graph analysis detects vouch rings and suspicious patterns.
- Minimum activity thresholds before score is displayed.
- Score is based on consistency over time, not single events (hard to sustain a fake pattern).
- Human review escalation for anomalies.

---

## 12. Development Roadmap Summary

| Phase | Timeline | Key Deliverable | Investment | Gate |
|-------|----------|----------------|------------|------|
| **1: Deploy & Collect** | Q1 2026 (NOW) | Deployed landing page, webhook, analytics, email nurture, survey data collection | 2-3 sessions (8-12 hours) | None -- execute immediately |
| **Decision Gate** | Week 8 (April 2026) | Assumption validation report (n>=200) | Analysis only | 60% A1, 25% A3, review A5 |
| **2: Trust Platform** | Q3-Q4 2026 | Trust score engine, user profiles, cross-tool data ingestion, community blocklist, API endpoints | 3-4 months dev | Decision Gate passes |
| **3: Community** | H1 2027+ | Badges, peer vouching, seller benchmarking, professional networking | 2-3 months dev | Phase 2 engagement metrics: 20% WAU, 5% paid conversion |
| **Ongoing** | Continuous | Score algorithm refinement, new badge types, geographic expansion, platform partnerships | Maintenance + iteration | Quarterly metric reviews |

### Critical Path

```
Feb 2026                                  Apr 2026                    Jul 2026
  |                                          |                          |
  [Deploy webhook + Vercel]                  [DECISION GATE]            [Phase 2 begins]
  [Set up analytics]                         [200+ surveys]             [if validated]
  [Launch email nurture]                     [Analyze assumptions]
  [Drive traffic to page]                    [Go / No-Go / Pivot]
  |                                          |
  |--- 8 weeks of data collection -----------|
```

### Resource Estimate

| Phase | Effort | Skills Required |
|-------|--------|-----------------|
| Phase 1 | 8-12 hours | Next.js, Vercel, Supabase, GA4, email marketing |
| Decision Gate | 4-8 hours | Data analysis, SQL, business judgment |
| Phase 2 | 400-600 hours | Full-stack, event architecture, security, privacy, API design |
| Phase 3 | 200-400 hours | Frontend, gamification, networking features, moderation tools |

---

## Appendix A: Relationship to FBM Copilot Suite Documents

| Document | Relationship to This PRD |
|----------|--------------------------|
| VouchedMarket Landing PRD v1.0 | **Predecessor.** Defined the MVP landing page (now built). This PRD extends from there. |
| FBM Community Trust Ecosystem Strategic Framework | **Foundation.** Provided the assumption inventory, staged verification plan, and competitive analysis that inform this PRD's gate structure. |
| FBM New Tool Opportunities (Opportunity 3: CopilotConnect) | **Sibling.** CopilotConnect is the ecosystem-level name for this concept. VouchedMarket is the consumer-facing brand. |
| FBM Suite Enhancements Roadmap (Enhancement 12: Seller Performance Benchmarking) | **Incorporated.** Section 6.3 of this PRD defines how benchmarking integrates with VouchedMarket. |

## Appendix B: Open Questions

1. **Domain availability:** Has vouchedmarket.com been registered? If not, register immediately before writing this domain into marketing materials.
2. **GHL vs. Supabase for Phase 1 data:** If GHL is already configured for other Copilot tools, use it. If not, Supabase is simpler and gives direct SQL access for analysis.
3. **Survey pricing question:** Should we add a willingness-to-pay question to the survey itself (before email capture) or rely on Email 5 in the nurture sequence? Adding to survey risks lowering completion rate but gets data faster.
4. **Copilot tool readiness:** Phase 2 trust score ingestion requires at least CopilotInbox to be shipping data. What is CopilotInbox's timeline for event emission?
5. **Legal review:** Cross-user behavioral data aggregation may require legal review before Phase 2. Budget for this.
6. **Identity verification provider:** Phase 3 Premium tier includes KYC verification. Evaluate providers (Stripe Identity, Persona, Jumio) before Phase 2 architecture is finalized.

## Appendix C: Glossary

| Term | Definition |
|------|-----------|
| **Trust Score** | Composite reputation metric (0-100) built from verified behavioral signals across all Copilot tools and peer vouches |
| **Vouch** | A peer endorsement given after a successful transaction, weighted by the voucher's own trust score |
| **Blocklist** | Community-maintained database of verified bad actors (scammers, serial ghosters, etc.) |
| **Badge** | Earned recognition for specific performance achievements, verified through tool data |
| **Signal** | A normalized behavioral data point from a Copilot tool that contributes to the trust score |
| **Founding Member** | Users who signed up during the pre-launch waitlist phase; receive permanent badge and pricing discount |
| **Decision Gate** | A checkpoint where collected data is evaluated against predefined thresholds before committing to the next phase |
| **Kill Criteria** | The threshold below which an assumption is considered disproven and the project pivots or stops |

---

*VouchedMarket Enhancement PRD v2*
*Version 2.0 | February 12, 2026*
*Prepared for ROKon / Biz Insider Pro / FB Marketplace Copilot Suite*
