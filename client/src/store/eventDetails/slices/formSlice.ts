import { StateCreator } from "zustand";
import type { EventDetailsState } from "@/store/eventDetails/types";
import { defaultForm } from "@/store/eventDetails/defaults";

/* Form fields and updates */
export const createFormSlice: StateCreator<EventDetailsState, [], [], Partial<EventDetailsState>> = (set) => ({
  form: { ...defaultForm },

  setField: (key, value) =>
    set((state) => ({
      form: { ...state.form, [key]: value },
      isDirty: true,
    })),
});
