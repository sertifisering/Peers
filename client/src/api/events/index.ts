import { api } from "@api/axios";

// Fetch events from the API
// If ownerId is provided, fetch events for that specific owner
export const getEvents = async (ownerId?: number) => {
  try {
    const res = await api.get("/api/events/", {
      params: ownerId ? { owner: ownerId } : {},
    });
    return res.data;
  
  }catch (error:any) {
    console.error("getEvents error:", error.message);
    throw new Error("Failed to fetch events");
  }

};

// Fetch a single event by its ID
export const getEvent = async (id: number) => {
  try {
  const res = await api.get(`/api/events/${id}/`);
  
  return res.data;

  } catch (error: any) {
    console.error("getEvent error:", error.message);
    throw new Error("Failed to fetch event");
  }
};