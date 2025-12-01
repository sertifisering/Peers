import { StateCreator } from "zustand";
import type { EventDetailsState } from "@/store/eventDetails/types";
import { defaultTemplate } from "@/store/eventDetails/defaults";

/* Template editor slice */
export const createTemplateSlice: StateCreator<EventDetailsState, [], [], Partial<EventDetailsState>> = (set) => ({
  template: { ...defaultTemplate },

  updateTemplateField: (key, value) =>
    set((state) => ({
      template: { ...state.template, [key]: value },
      isDirty: true,
    })),
});
