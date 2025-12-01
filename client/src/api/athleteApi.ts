// src/api/athleteApi.ts
import { api } from "@/api/axiosInstance";
import type { Athlete } from "@/store/useEventDetailsStore";

export const athleteApi = {
  // GET all athletes (global)
  getAll: async (): Promise<Athlete[]> => {
    const res = await api.get(`/api/athletes/`);
    return res.data;
  },

  // GET athletes for a specific event
  getByEvent: async (eventId: string): Promise<Athlete[]> => {
    const res = await api.get(`/api/athletes/${eventId}/`);
    return res.data;
  },

  // POST create athlete inside an event
  addAthlete: async (eventId: string | number, data: { name: string; email: string }): Promise<Athlete> => {
    const res = await api.post(`/api/athletes/add/${eventId}/`, data);
    return res.data; // { id, name, email }
  },

  // REMOVE athlete from event
  removeAthlete: async (eventId: string, athleteId: string): Promise<void> => {
    await api.delete(`/api/athletes/remove/${eventId}/${athleteId}/`);
  },
};
