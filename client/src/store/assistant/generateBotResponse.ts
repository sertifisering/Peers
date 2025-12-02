import type { ExtractedData } from "@/types/chat";

function getMissing(data: ExtractedData) {
  const req = ["name", "date", "location", "sport", "format"];
  return req.filter((k) => !data[k as keyof ExtractedData]);
}

export function generateBotResponse(text: string, d: ExtractedData): string {
  const missing = getMissing(d);
  // temporary holde text
  console.log("User input:", text);

  // all fields ready
  if (missing.length === 0) {
    return (
      `Perfect! I have all the information:\n\n` +
      `Event Name: ${d.name}\n` +
      `Sport: ${d.sport}\n` +
      `Date: ${d.date}\n` +
      `Location: ${d.location}\n` +
      `Format: ${d.format}\n\n` +
      `Reply 'yes' to create or 'no' to cancel.`
    );
  }

  // partial info
  let r = "Great! I found this info:\n\n";
  if (d.name) r += `Event Name: ${d.name}\n`;
  if (d.sport) r += `Sport: ${d.sport}\n`;
  if (d.date) r += `Date: ${d.date}\n`;
  if (d.location) r += `Location: ${d.location}\n`;
  if (d.format) r += `Format: ${d.format}\n`;
  r += "\n";

  // ask for missing field
  if (missing.includes("name")) r += "What is the event name?\n";
  else if (missing.includes("sport")) r += "What sport is this event for?\n";
  else if (missing.includes("date")) r += "When will the event happen?\n";
  else if (missing.includes("location")) r += "Where will it be held?\n";
  else if (missing.includes("format")) r += "Which format will it use?\n";

  return r;
}
