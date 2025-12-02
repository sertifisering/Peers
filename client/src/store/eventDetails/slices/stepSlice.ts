import { StateCreator } from "zustand";
import type { EventDetailsState } from "@/store/eventDetails/types";
import { defaultForm, defaultTemplate, defaultJudging } from "@/store/eventDetails/defaults";
import { eventApi } from "@/api/eventApi";
import { buildTemplatePayload } from "../buildTemplatePayload";

/* Step control + load/reset/updateForm */
export const createStepSlice: StateCreator<EventDetailsState, [], [], Partial<EventDetailsState>> = (set, get) => ({
  eventId: null,
  step: 0,

  isDirty: false,
  markDirty: () => set({ isDirty: true }),
  resetDirty: () => set({ isDirty: false }),

  goToStep: (s) => set({ step: s }),
  nextStep: () => set((st) => ({ step: st.step + 1 })),
  prevStep: () => set((st) => ({ step: st.step - 1 })),

  resetStepData: (s) =>
    set((state) => {
      switch (s) {
        case 0:
          return { form: { ...defaultForm }, isDirty: true };
        case 1:
          return { template: { ...defaultTemplate }, isDirty: true };
        case 2:
          return { judging: { ...defaultJudging }, isDirty: true };
        case 3:
          return { athletes: [], isDirty: true };
        case 4:
          return { experts: [], isDirty: true };
        case 5:
          return { sponsors: [], isDirty: true };
        default:
          return {};
      }
    }),

  /* Load full event */
  loadEvent: (event) =>
    set(() => {
      const j = event.judging ?? defaultJudging;

      return {
        eventId: event.id,
        form: { ...defaultForm, ...event },

        template: event.template ?? { ...defaultTemplate },

        judging: {
          ...defaultJudging,
          ...j,
          audienceCriteria: Array.isArray(j.audienceCriteria) ? j.audienceCriteria : [],
          expertCriteria: Array.isArray(j.expertCriteria) ? j.expertCriteria : [],
          athleteCriteria: Array.isArray(j.athleteCriteria) ? j.athleteCriteria : [],
        },

        athletes: event.athletes ?? [],
        experts: event.experts ?? [],
        sponsors: (event.sponsors ?? []).map((s) => ({
          id: s.id,
          name: s.name,
          website: s.website ?? "",
          label: s.label ?? "",
          logoUrl: s.logoUrl ?? null,
        })),

        step: 0,
        isDirty: false,
      };
    }),

  /* Reset whole modal */
  reset: () =>
    set({
      eventId: null,
      step: 0,
      form: { ...defaultForm },
      template: { ...defaultTemplate },
      judging: { ...defaultJudging },
      athletes: [],
      experts: [],
      sponsors: [],
      isDirty: false,
    }),

  /* updateForm */
  updateForm: async (eventId) => {
    const { form, template, judging, sponsors } = get();

    const payload = {
      ...form,
      template: buildTemplatePayload(template),
      judging,
      sponsors,
    };

    await eventApi.updateForm(eventId, payload);
  },
});
