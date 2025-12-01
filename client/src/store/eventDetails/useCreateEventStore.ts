import { create } from "zustand";

interface CreateEventForm {
  name: string;
  sport: string;
  format: string;
  date: string;
  location: string;
}

interface CreateEventState {
  form: CreateEventForm;

  setField: <K extends keyof CreateEventForm>(key: K, value: CreateEventForm[K]) => void;

  reset: () => void;
}

export const useCreateEventStore = create<CreateEventState>((set) => ({
  form: {
    name: "",
    sport: "",
    format: "",
    date: "",
    location: "",
  },

  setField: (key, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [key]: value,
      },
    })),

  reset: () =>
    set({
      form: {
        name: "",
        sport: "",
        format: "",
        date: "",
        location: "",
      },
    }),
}));
