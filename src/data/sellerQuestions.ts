import { SurveyQuestion } from "./types";

export const sellerQuestions: SurveyQuestion[] = [
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
    id: "pain_points_seller",
    type: "matrix",
    label: "Rate how much each issue has impacted you in the past 6 months.",
    instruction: "(1 = Never a problem, 5 = Constant frustration)",
    required: true,
    rows: [
      { id: "pain_ghosting", label: "Buyers ghosting after agreeing to buy" },
      { id: "pain_noshow", label: "Buyers not showing up to meetups" },
      { id: "pain_scam", label: "Scam attempts (fake payments, etc.)" },
      { id: "pain_lowball", label: "Lowball offers wasting your time" },
      { id: "pain_verify", label: "Can't verify if buyer is legitimate" },
      {
        id: "pain_reputation",
        label: "Reputation doesn't transfer between platforms",
      },
    ],
    columns: ["1", "2", "3", "4", "5"],
  },
  {
    id: "scam_loss_seller",
    type: "radio",
    label:
      "Have you ever lost money or product due to a scam or fraud?",
    required: true,
    options: [
      "Yes, significant loss ($100+)",
      "Yes, minor loss (under $100)",
      "No, but I've had close calls",
      "No, never",
    ],
  },
  {
    id: "time_waste_weekly",
    type: "radio",
    label:
      "How much time per week do you estimate you waste on buyers who don't complete transactions?",
    required: true,
    options: [
      "Less than 1 hour",
      "1-3 hours",
      "3-5 hours",
      "More than 5 hours",
    ],
  },
  {
    id: "value_portable_rep",
    type: "scale",
    label:
      "If you could carry your verified reputation across ALL platforms you sell on, how valuable would that be to you?",
    instruction: "(1 = Not valuable at all, 10 = Extremely valuable)",
    required: true,
    min: 1,
    max: 10,
  },
  {
    id: "willing_share_data",
    type: "radio",
    label:
      "Would you be willing to share your transaction history (anonymized) to help build a community trust database that benefits all sellers?",
    required: true,
    options: [
      "Yes, absolutely \u2014 happy to contribute",
      "Yes, if my privacy is protected",
      "Maybe \u2014 I'd need more details",
      "No, I'm not comfortable sharing that",
    ],
  },
  {
    id: "willing_vouch",
    type: "radio",
    label:
      "Would you vouch for buyers you've had successful transactions with, to help them build trust with other sellers?",
    required: true,
    options: [
      "Yes \u2014 I'd vouch for good buyers",
      "Probably \u2014 if it's easy to do",
      "Maybe \u2014 depends on effort required",
      "No \u2014 not interested in vouching for others",
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
      "In one sentence, what's your single biggest frustration with selling on marketplaces?",
    placeholder: "Type your answer here...",
    maxLength: 200,
    required: false,
  },
];
