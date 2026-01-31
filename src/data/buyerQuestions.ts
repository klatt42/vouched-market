import { SurveyQuestion } from "./types";

export const buyerQuestions: SurveyQuestion[] = [
  {
    id: "platforms_buy",
    type: "checkbox",
    label: "Which platforms do you currently buy from?",
    instruction: "Select all that apply.",
    required: true,
    options: [
      "Facebook Marketplace",
      "eBay",
      "OfferUp",
      "Craigslist",
      "Poshmark",
      "Mercari",
      "Whatnot",
      "Depop",
    ],
    allowOther: true,
  },
  {
    id: "buy_frequency",
    type: "radio",
    label: "How often do you typically make purchases on marketplaces?",
    required: true,
    options: [
      "Multiple times per week",
      "About once a week",
      "A few times per month",
      "Once a month or less",
    ],
  },
  {
    id: "pain_points_buyer",
    type: "matrix",
    label: "Rate how much each issue has impacted your buying experience.",
    instruction: "(1 = Never a problem, 5 = Constant concern)",
    required: true,
    rows: [
      { id: "pain_seller_response", label: "Sellers not responding to inquiries" },
      { id: "pain_item_mismatch", label: "Items not matching the listing" },
      { id: "pain_seller_noshow", label: "Sellers not showing up to meetups" },
      { id: "pain_safety", label: "Concerns about personal safety" },
      { id: "pain_seller_legit", label: "Difficulty knowing if seller is legit" },
      { id: "pain_scam_listings", label: "Scam listings or counterfeit items" },
    ],
    columns: ["1", "2", "3", "4", "5"],
  },
  {
    id: "scam_experience_buyer",
    type: "radio",
    label:
      "Have you ever been scammed or received an item significantly different than described?",
    required: true,
    options: [
      "Yes, significant issue (lost $100+)",
      "Yes, minor issue",
      "No, but I've been very cautious",
      "No, never had a problem",
    ],
  },
  {
    id: "profile_trust_reliance",
    type: "radio",
    label:
      "How much do you rely on a seller's Facebook profile to decide if you trust them?",
    required: true,
    options: [
      "Heavily \u2014 I won't buy from new/blank profiles",
      "Somewhat \u2014 I check but it's not definitive",
      "Minimally \u2014 I mostly ignore it",
      "Not at all \u2014 I don't look at profiles",
    ],
  },
  {
    id: "value_seller_trust_score",
    type: "scale",
    label:
      "If you could see a seller's verified transaction history and trust score before contacting them, how valuable would that be?",
    instruction: "(1 = Not valuable at all, 10 = Extremely valuable)",
    required: true,
    min: 1,
    max: 10,
  },
  {
    id: "willing_verify_identity",
    type: "radio",
    label:
      "Would you be willing to verify your own identity (once) to join a trusted buyer network?",
    required: true,
    options: [
      "Yes \u2014 happy to verify if it helps",
      "Yes \u2014 if it's simple and secure",
      "Maybe \u2014 depends on what's required",
      "No \u2014 too much hassle",
    ],
  },
  {
    id: "value_buyer_badge",
    type: "radio",
    label:
      'If having a "Verified Buyer" badge made sellers more likely to respond to you quickly, would you want one?',
    required: true,
    options: [
      "Absolutely \u2014 I'd even pay for faster responses",
      "Yes \u2014 would be useful",
      "Maybe \u2014 not a huge priority",
      "No \u2014 doesn't matter to me",
    ],
  },
  {
    id: "buy_categories",
    type: "checkbox",
    label: "What do you typically buy on marketplaces?",
    instruction: "Select all that apply.",
    required: true,
    options: [
      "Furniture / Home goods",
      "Electronics",
      "Clothing / Accessories",
      "Vehicles / Auto parts",
      "Collectibles / Vintage",
      "Baby / Kids items",
      "Sports / Outdoor gear",
    ],
    allowOther: true,
  },
  {
    id: "trust_increase_buyer",
    type: "textarea",
    label: "In one sentence, what would make you trust a stranger seller more?",
    placeholder: "Type your answer here...",
    maxLength: 200,
    required: false,
  },
];
