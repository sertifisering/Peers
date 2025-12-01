import { api } from "@/api/axiosInstance";
import type { Event, EventStatus } from "@/types/event";

export const eventApi = {
  // GET /api/events/
  getAll: async (): Promise<Event[]> => {
    const res = await api.get("/api/events/");
    return res.data;
  },

  // GET /api/events/:id/
  getOne: async (id: string): Promise<Event> => {
    const res = await api.get(`/api/events/${id}/`);
    return res.data;
  },

  // POST /api/events/
  create: async (data: Partial<Event>): Promise<Event> => {
    const res = await api.post("/api/events/", data);
    return res.data;
  },

  // PUT /api/events/:id/
  update: async (id: string, data: Partial<Event>): Promise<Event> => {
    const res = await api.put(`/api/events/${id}/`, data);
    return res.data;
  },

  // DELETE /api/events/:id/
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/events/${id}/`);
  },

  // PATCH /api/events/:id/status/
  updateStatus: async (id: string, status: EventStatus): Promise<Event> => {
    const res = await api.patch(`/api/events/${id}/`, { status });
    return res.data;
  },

  // PATCH /api/events/:id/paid/
  markPaid: async (id: string): Promise<Event> => {
    const res = await api.patch(`/api/events/${id}/`, { isPaid: true });
    return res.data;
  },

  // Update event form data
  updateForm: async (id: string, data: any) => {
    await api.put(`/api/events/update/${id}/`, data);
  },
};
