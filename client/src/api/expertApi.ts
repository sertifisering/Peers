import { api } from "@/api/axiosInstance";
import type { Expert } from "@/types/expert";

// Expert-related API calls
export const expertApi = {
  // Get all experts
  getAll: async (): Promise<Expert[]> => {
    const res = await api.get(`/api/experts/`);
    return res.data;
  },

  // Get experts for a specific event
  getByEvent: async (eventId: string): Promise<Expert[]> => {
    const res = await api.get(`/api/experts/${eventId}/`);
    return res.data;
  },

  // Create a new expert for an event
  addExpert: async (eventId: string | number, data: { name: string; email: string }): Promise<Expert> => {
    const res = await api.post(`/api/experts/add/${eventId}/`, data);
    return res.data; // { id, name, email }
  },

  // Remove an expert from an event
  removeExpert: async (eventId: string, expertId: string): Promise<void> => {
    await api.delete(`/api/experts/remove/${eventId}/${expertId}/`);
  },
};
