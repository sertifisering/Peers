import { create } from "zustand";
import type { EventDetailsState } from "./types";

import { defaultForm, defaultTemplate, defaultJudging } from "./defaults";

import { createFormSlice } from "./slices/formSlice";
import { createTemplateSlice } from "./slices/templateSlice";
import { createJudgingSlice } from "./slices/judgingSlice";

import { createAthleteSlice } from "./slices/athleteSlice";
import { createExpertSlice } from "./slices/expertSlice";

import { createSponsorSlice } from "./slices/sponsorSlice";
import { createStepSlice } from "./slices/stepSlice";

export const useEventDetailsStore = create<EventDetailsState>()((...a) => ({
  /* ---------- REQUIRED ROOT BASE ---------- */

  eventId: null,
  step: 0,

  form: { ...defaultForm },
  template: { ...defaultTemplate },
  judging: { ...defaultJudging },

  athletes: [],
  experts: [],
  sponsors: [],

  availableAthletes: [],
  availableExperts: [],

  athleteSearch: "",
  expertSearch: "",

  isDirty: false,

  /* ----------- PRE-DECLARE ALL ACTION KEYS (fix TS) ------------ */
  setAthleteSearch: () => {},
  setExpertSearch: () => {},

  loadAthleteList: async () => {},
  addAthlete: () => {},
  removeAthlete: () => {},

  loadExpertList: async () => {},
  addExpert: () => {},
  removeExpert: () => {},

  addSponsor: () => {},
  removeSponsor: () => {},

  markDirty: () => {},
  resetDirty: () => {},

  loadEvent: () => {},
  reset: () => {},

  goToStep: () => {},
  nextStep: () => {},
  prevStep: () => {},
  resetStepData: () => {},

  setField: () => {},
  updateTemplateField: () => {},
  updateJudgingField: () => {},

  updateForm: async () => {},

  /* ---------- ACTUAL SLICE MERGES ---------- */
  ...createFormSlice(...a),
  ...createTemplateSlice(...a),
  ...createJudgingSlice(...a),

  ...createAthleteSlice(...a),
  ...createExpertSlice(...a),

  ...createSponsorSlice(...a),
  ...createStepSlice(...a),
}));
