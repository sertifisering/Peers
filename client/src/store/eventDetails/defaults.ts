import type { EventDetailsForm, TemplateState, JudgingState } from "./types";

export const defaultForm: EventDetailsForm = {
  name: "",
  date: "",
  location: "",
  sport: "",
  format: "",
  startTime: "",
  endTime: "",
  endDate: "",
  capacity: 0,
  price: 0,
  organizer: "",
  contactEmail: "",
  imageUrl: "",
};

export const defaultTemplate: TemplateState = {
  eventFormat: "ranking",

  roundsPerAthlete: 1,
  scoringFormat: "Score Voting",
  emojiType: "None",
  eventStage: "Final",

  roundsPerBattle: 1,
  differentFinalRounds: false,
  bracketStageStart: "Quarterfinal",

  pollFormat: "Like Voting",
  pollEmojiType: "Flame",
  pollStartDate: "",
  pollEndDate: "",
};

export const defaultJudging: JudgingState = {
  min: 0,
  max: 10,
  duration: 60,
  spectatorsMax: 0,

  audienceEnabled: true,
  audienceWeight: 33,
  audienceCriteria: [],

  expertEnabled: true,
  expertWeight: 34,
  expertCriteria: [],

  athleteEnabled: true,
  athleteWeight: 33,
  athleteCriteria: [],
};
