import { StateCreator } from "zustand";
import type { EventDetailsState } from "@/store/eventDetails/types";
import { expertApi } from "@/api/expertApi";

/* Expert list and actions */
export const createExpertSlice: StateCreator<EventDetailsState, [], [], Partial<EventDetailsState>> = (set, get) => ({
  experts: [],
  availableExperts: [],
  expertSearch: "",

  /* Update search text */
  setExpertSearch: (v) => set({ expertSearch: v }),

  /* Load expert list */
  loadExpertList: async () => {
    const { eventId } = get();
    if (!eventId) return;

    const all = await expertApi.getAll();
    const used = await expertApi.getByEvent(eventId);

    /* Filter out assigned experts */
    const available = all.filter(
      (e) => !used.some((u) => u.email && e.email && u.email.toLowerCase() === e.email.toLowerCase())
    );

    set({
      experts: used,
      availableExperts: available,
    });
  },

  /* Add expert */
  addExpert: async (e) => {
    const { eventId, experts } = get();
    if (!eventId) return;

    /* prevent duplicates */
    if (e.email && experts.some((x) => x.email && x.email.toLowerCase() === e.email!.toLowerCase())) {
      console.warn("Duplicate expert skipped");
      return;
    }

    await expertApi.addExpert(eventId, {
      name: e.name,
      email: e.email ?? "",
    });

    await get().loadExpertList();
  },

  /* Remove expert */
  removeExpert: async (id) => {
    const { eventId } = get();
    if (!eventId) return;

    await expertApi.removeExpert(eventId, id);
    await get().loadExpertList();
  },
});
