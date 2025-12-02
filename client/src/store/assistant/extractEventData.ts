import type { ExtractedData } from "@/types/chat";

const SPORTS_KEYWORDS = [
  "football",
  "basketball",
  "baseball",
  "tennis",
  "volleyball",
  "soccer",
  "golf",
  "swimming",
  "running",
  "cycling",
  "badminton",
  "table tennis",
  "cricket",
  "rugby",
  "hockey",
];

const FORMAT_KEYWORDS = [
  "tournament",
  "league",
  "championship",
  "casual",
  "friendly",
  "competition",
  "match",
  "game",
  "series",
  "cup",
];

export function extractEventData(text: string): ExtractedData {
  const lower = text.toLowerCase();
  const out: ExtractedData = {};

  // sport
  for (const s of SPORTS_KEYWORDS) {
    if (lower.includes(s)) {
      out.sport = s.charAt(0).toUpperCase() + s.slice(1);
      break;
    }
  }

  // format
  for (const f of FORMAT_KEYWORDS) {
    if (lower.includes(f)) {
      out.format = f.charAt(0).toUpperCase() + f.slice(1);
      break;
    }
  }

  // date
  const datePatterns = [
    /(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{1,2}/i,
    /\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}/,
  ];
  for (const p of datePatterns) {
    const m = text.match(p);
    if (m) {
      out.date = m[0];
      break;
    }
  }

  // location “at X” / “in X”
  const locPattern = /(?:at|in)\s+([A-Z][a-zA-Z\s]+?)(?:\s+(?:on|for|with)|$)/;
  const loc = text.match(locPattern);
  if (loc) out.location = loc[1].trim();

  // explicit name
  const namePattern = /(?:called|named)\s+["']?([^"']+)["']?/i;
  const nm = text.match(namePattern);
  if (nm) out.name = nm[1].trim();

  // fallback name
  if (!out.name && (out.sport || out.format)) {
    const parts = [];
    if (out.sport) parts.push(out.sport);
    if (out.format) parts.push(out.format);
    if (parts.length) out.name = parts.join(" ");
  }

  return out;
}
