import { StateCreator } from "zustand";
import type { EventDetailsState } from "@/store/eventDetails/types";
import { athleteApi } from "@/api/athleteApi";

/* Athlete list and actions */
export const createAthleteSlice: StateCreator<EventDetailsState, [], [], Partial<EventDetailsState>> = (set, get) => ({
  athletes: [],
  availableAthletes: [],
  athleteSearch: "",

  /* Update search text */
  setAthleteSearch: (v) => set({ athleteSearch: v }),

  /* Load athlete list */
  loadAthleteList: async () => {
    const { eventId } = get();
    if (!eventId) return;

    const all = await athleteApi.getAll();
    const used = await athleteApi.getByEvent(eventId);

    /* Filter out assigned athletes */
    const available = all.filter(
      (a) => !used.some((u) => u.email && a.email && u.email.toLowerCase() === a.email.toLowerCase())
    );

    set({
      athletes: used,
      availableAthletes: available,
    });
  },

  /* Add athlete */
  addAthlete: async (a) => {
    const { eventId, athletes } = get();
    if (!eventId) return;

    /* prevent duplicates */
    if (a.email && athletes.some((x) => x.email && x.email.toLowerCase() === a.email!.toLowerCase())) {
      console.warn("Duplicate athlete skipped");
      return;
    }

    await athleteApi.addAthlete(eventId, {
      name: a.name,
      email: a.email ?? "",
    });

    await get().loadAthleteList();
  },

  /* Remove athlete */
  removeAthlete: async (id) => {
    const { eventId } = get();
    if (!eventId) return;

    await athleteApi.removeAthlete(eventId, id);
    await get().loadAthleteList();
  },
});
