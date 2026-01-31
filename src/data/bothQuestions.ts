import { SurveyQuestion } from "./types";

export const bothQuestions: SurveyQuestion[] = [
  {
    id: "platforms_sell",
    type: "checkbox",
    label: "Which platforms do you currently sell on?",
    instruction: "Select all that apply.",
    required: true,
    options: [
      "Facebook Marketplace",
      "eBay",
      "Poshmark",
      "Mercari",
      "OfferUp",
      "Craigslist",
      "Whatnot",
      "Depop",
      "Etsy",
    ],
    allowOther: true,
  },
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
    id: "sell_volume_6mo",
    type: "radio",
    label:
      "In the past 6 months, approximately how many items have you sold across all platforms?",
    required: true,
    options: [
      "0-10 items",
      "11-30 items",
      "31-75 items",
      "76-150 items",
      "150+ items",
    ],
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
    id: "pain_points_seller",
    type: "matrix",
    label: "Rate how much each SELLING issue has impacted you.",
    instruction: "(1 = Never a problem, 5 = Constant frustration)",
    required: true,
    rows: [
      { id: "pain_ghosting", label: "Buyers ghosting after agreeing to buy" },
      { id: "pain_scam", label: "Scam attempts (fake payments, etc.)" },
      { id: "pain_verify", label: "Can't verify if buyer is legitimate" },
      {
        id: "pain_reputation",
        label: "Reputation doesn't transfer between platforms",
      },
    ],
    columns: ["1", "2", "3", "4", "5"],
  },
  {
    id: "pain_points_buyer",
    type: "matrix",
    label: "Rate how much each BUYING issue has impacted you.",
    instruction: "(1 = Never a problem, 5 = Constant concern)",
    required: true,
    rows: [
      { id: "pain_seller_response", label: "Sellers not responding to inquiries" },
      { id: "pain_item_mismatch", label: "Items not matching the listing" },
      { id: "pain_seller_legit", label: "Difficulty knowing if seller is legit" },
      { id: "pain_scam_listings", label: "Scam listings or counterfeit items" },
    ],
    columns: ["1", "2", "3", "4", "5"],
  },
  {
    id: "value_portable_rep",
    type: "scale",
    label:
      "If you could carry your verified reputation across ALL platforms, how valuable would that be?",
    instruction: "(1 = Not valuable at all, 10 = Extremely valuable)",
    required: true,
    min: 1,
    max: 10,
  },
  {
    id: "willing_share_data",
    type: "radio",
    label:
      "Would you be willing to share your transaction history (anonymized) to help build a community trust database?",
    required: true,
    options: [
      "Yes, absolutely \u2014 happy to contribute",
      "Yes, if my privacy is protected",
      "Maybe \u2014 I'd need more details",
      "No, I'm not comfortable sharing that",
    ],
  },
  {
    id: "willing_verify_identity",
    type: "radio",
    label:
      "Would you be willing to verify your own identity (once) to join a trusted network?",
    required: true,
    options: [
      "Yes \u2014 happy to verify if it helps",
      "Yes \u2014 if it's simple and secure",
      "Maybe \u2014 depends on what's required",
      "No \u2014 too much hassle",
    ],
  },
  {
    id: "monthly_revenue",
    type: "radio",
    label:
      "What's your approximate monthly revenue from marketplace selling?",
    required: true,
    options: [
      "Under $500",
      "$500 - $1,000",
      "$1,000 - $3,000",
      "$3,000 - $10,000",
      "$10,000+",
    ],
  },
  {
    id: "biggest_frustration_seller",
    type: "textarea",
    label:
      "In one sentence, what's your single biggest frustration as a SELLER?",
    placeholder: "Type your answer here...",
    maxLength: 200,
    required: false,
  },
  {
    id: "trust_increase_buyer",
    type: "textarea",
    label:
      "In one sentence, what would make you trust a stranger seller more as a BUYER?",
    placeholder: "Type your answer here...",
    maxLength: 200,
    required: false,
  },
];
