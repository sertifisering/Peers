import type { TemplateState } from "./types";

export const buildTemplatePayload = (t: TemplateState) => {
  if (t.eventFormat === "ranking") {
    return {
      format: "ranking",
      roundsPerAthlete: t.roundsPerAthlete,
      scoringFormat: t.scoringFormat,
      emojiType: t.emojiType,
      eventStage: t.eventStage,
    };
  }

  if (t.eventFormat === "battle") {
    return {
      format: "battle",
      roundsPerBattle: t.roundsPerBattle,
      differentFinalRounds: t.differentFinalRounds,
      bracketStageStart: t.bracketStageStart,
    };
  }

  return {
    format: "poll",
    roundsPerAthlete: t.roundsPerAthlete,
    pollFormat: t.pollFormat,
    pollEmojiType: t.pollEmojiType,
    pollStartDate: t.pollStartDate,
    pollEndDate: t.pollEndDate,
  };
};
