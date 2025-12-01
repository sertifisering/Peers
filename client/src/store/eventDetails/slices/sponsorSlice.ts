import { StateCreator } from "zustand";
import type { EventDetailsState } from "@/store/eventDetails/types";

/* Sponsor list logic */
export const createSponsorSlice: StateCreator<EventDetailsState, [], [], Partial<EventDetailsState>> = (set) => ({
  sponsors: [],

  addSponsor: (s) =>
    set((state) => ({
      sponsors: [...state.sponsors, s],
      isDirty: true,
    })),

  removeSponsor: (id) =>
    set((state) => ({
      sponsors: state.sponsors.filter((x) => x.id !== id),
      isDirty: true,
    })),
});
