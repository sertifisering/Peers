import { StateCreator } from "zustand";
import type { EventDetailsState } from "@/store/eventDetails/types";
import { defaultJudging } from "@/store/eventDetails/defaults";

/* Judging logic */
export const createJudgingSlice: StateCreator<EventDetailsState, [], [], Partial<EventDetailsState>> = (set) => ({
  judging: { ...defaultJudging },

  updateJudgingField: (key, value) =>
    set((state) => {
      let next = value;

      if (key.endsWith("Criteria")) {
        const prev = Array.isArray(state.judging[key]) ? state.judging[key] : [];
        next = typeof value === "function" ? value(prev) : value;
        if (!Array.isArray(next)) next = [];
      }

      return {
        judging: {
          ...state.judging,
          [key]: next,
        },
        isDirty: true,
      };
    }),
});
