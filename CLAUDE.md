# VouchedMarket - Trust Network for Marketplace Buyers & Sellers

## Project Overview
- **Type**: Waitlist landing page with qualification survey
- **Stack**: Next.js 16 + TypeScript + Tailwind CSS v4
- **Port**: 4050 (dev server)
- **Repo**: https://github.com/klatt42/vouched-market
- **Status**: MVP Development

## Architecture
- Single-page landing with 5 sections: Header, Hero, Pain Points, Vision, Qualification Gate, Footer
- Survey modal flow with 3 tracks: Seller (10q), Buyer (10q), Both (12q)
- Email capture + confirmation screen
- Webhook-ready payload structure for GHL integration

## Key Decisions
- Using Inter font (Google Fonts) per brand guidelines
- Mobile-first responsive design
- Survey state managed via React useState + localStorage progressive save
- No backend yet - webhook URL configurable via env var

## Brand
- Primary: #1E3A5F (deep blue)
- Accent: #D4A520 (amber/gold)
- Alert: #E85D4C (coral red)
- Background: #F8F6F3 (off-white)
- Tagline: "People vouch for people."

## Commands
```bash
PORT=4050 npm run dev    # Start dev server
npm run build            # Production build
npm run lint             # ESLint check
```

## File Structure
```
src/
  app/
    layout.tsx           # Root layout with Inter font
    page.tsx             # Landing page
    globals.css          # Brand tokens + Tailwind
  components/
    Header.tsx
    Hero.tsx
    PainPointsSection.tsx
    PainPointCard.tsx
    VisionSection.tsx
    QualificationGate.tsx
    Footer.tsx
    survey/
      SurveyModal.tsx
      SurveyController.tsx
      SurveyProgress.tsx
      SurveyIntro.tsx
      QuestionRadio.tsx
      QuestionCheckbox.tsx
      QuestionMatrix.tsx
      QuestionScale.tsx
      QuestionTextarea.tsx
      EmailCapture.tsx
      Confirmation.tsx
  data/
    sellerQuestions.ts
    buyerQuestions.ts
    bothQuestions.ts
    painCards.ts
  hooks/
    useSurvey.ts
  utils/
    submitSurvey.ts
```
