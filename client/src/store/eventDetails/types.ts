import type { Event } from "@/types/event";

export interface Athlete {
  id: string;
  name: string;
  email?: string;
}

export interface Expert {
  id: string;
  name: string;
  email?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  website: string;
  label: string;
  logoUrl: string | null;
}

export interface EventDetailsForm {
  name: string;
  date: string;
  location: string;
  sport: string;
  format: string;
  start_time?: string;
  end_time?: string;
  end_date?: string;
  capacity?: number;
  price?: number;
  organizer?: string;
  contact_email?: string;
  image_url?: string;
}

export interface TemplateState {
  eventFormat: "ranking" | "battle" | "poll";

  roundsPerAthlete: number;
  scoringFormat: string;
  emojiType: string;
  eventStage: string;

  roundsPerBattle: number;
  differentFinalRounds: boolean;
  bracketStageStart: string;

  pollFormat: string;
  pollEmojiType: string;
  pollStartDate: string;
  pollEndDate: string;
}

export interface JudgingState {
  min: number;
  max: number;
  duration: number;
  spectatorsMax: number;

  audienceEnabled: boolean;
  audienceWeight: number;
  audienceCriteria: string[];

  expertEnabled: boolean;
  expertWeight: number;
  expertCriteria: string[];

  athleteEnabled: boolean;
  athleteWeight: number;
  athleteCriteria: string[];
}

export interface EventDetailsState {
  eventId: string | null;
  step: number;

  form: EventDetailsForm;
  template: TemplateState;
  judging: JudgingState;

  athletes: Athlete[];
  experts: Expert[];
  sponsors: Sponsor[];

  availableAthletes: Athlete[];
  availableExperts: Expert[];

  athleteSearch: string;
  expertSearch: string;
  setAthleteSearch: (v: string) => void;
  setExpertSearch: (v: string) => void;

  loadAthleteList: () => Promise<void>;
  addAthlete: (a: Athlete) => void;
  removeAthlete: (id: string) => void;

  loadExpertList: () => Promise<void>;
  addExpert: (e: Expert) => void;
  removeExpert: (id: string) => void;

  addSponsor: (s: Sponsor) => void;
  removeSponsor: (id: string) => void;

  isDirty: boolean;
  markDirty: () => void;
  resetDirty: () => void;

  loadEvent: (event: Event) => void;
  reset: () => void;

  goToStep: (s: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetStepData: (s: number) => void;

  setField: <K extends keyof EventDetailsForm>(key: K, value: EventDetailsForm[K]) => void;
  updateTemplateField: (key: keyof TemplateState, value: any) => void;
  updateJudgingField: (key: keyof JudgingState, value: any) => void;

  updateForm: (eventId: string) => Promise<void>;
}
