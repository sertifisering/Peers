import { create } from "zustand";
import type { Event, EventStatus } from "@/types/event";
import { eventApi } from "@/api/eventApi";

interface EventState {
  [x: string]: any;
  events: Event[];
  loading: boolean;

  selectedEvent: Event | null;
  isCreateModalOpen: boolean;
  isDetailsModalOpen: boolean;

  // selection
  selectEvent: (event: Event) => void;
  clearSelectedEvent: () => void;

  // modal
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openDetailsModal: (event: Event) => void;
  closeDetailsModal: () => void;
  setSelectedEvent: (event: Event | null) => void;

  // CRUD
  fetchEvents: () => Promise<void>;
  createEvent: (data: Partial<Event>) => Promise<void>;
  updateEvent: (id: string, data: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  changeStatus: (id: string, status: EventStatus) => Promise<void>;
  markPaid: (id: string) => Promise<void>;
}

function checkRequiredFields(event: Partial<Event>): boolean {
  return !!event.name && !!event.sport && !!event.format && !!event.date && !!event.eventCode;
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  loading: false,

  selectedEvent: null,
  isCreateModalOpen: false,
  isDetailsModalOpen: false,

  // Selection
  selectEvent: (event) => set({ selectedEvent: event }),
  clearSelectedEvent: () => set({ selectedEvent: null }),

  // Modals
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),

  // Set Selected Event
  setSelectedEvent: (event) => set({ selectedEvent: event }),

  openDetailsModal: (event) =>
    set({
      isDetailsModalOpen: true,
      selectedEvent: event,
    }),

  closeDetailsModal: () =>
    set({
      isDetailsModalOpen: false,
      selectedEvent: null,
    }),

  // Fetch All
  fetchEvents: async () => {
    set({ loading: true });
    try {
      const events = await eventApi.getAll();
      set({ events });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  // Create
  createEvent: async (data) => {
    try {
      const requiredFieldsFilled = checkRequiredFields(data);

      const created = await eventApi.create({
        ...data,
        requiredFieldsFilled,
      });
      set((s) => ({
        events: [created, ...s.events],
        isCreateModalOpen: false,
      }));
    } catch (err) {
      console.error(err);
    }
  },

  // Update
  updateEvent: async (id, payload) => {
    try {
      // Request to server for update
      const serverEvent = await eventApi.update(id, payload);

      set((state) => {
        // Check previous event state for merging
        const prev = state.events.find((e) => e.id === id);

        // Merge previous, server, and payload data
        const merged: Event = {
          ...(prev ?? {}),
          ...(serverEvent ?? {}),
          ...payload,

          // Nested merges for complex fields
          template: {
            ...(prev?.template ?? {}),
            ...(serverEvent?.template ?? {}),
            ...(payload.template ?? {}),
          },

          // Nested merges for complex fields
          judging: {
            ...(prev?.judging ?? {}),
            ...(serverEvent?.judging ?? {}),
            ...(payload.judging ?? {}),
          },

          // Athletes, Experts, Sponsors arrays
          athletes: payload.athletes ?? serverEvent.athletes ?? prev?.athletes ?? [],

          experts: payload.experts ?? serverEvent.experts ?? prev?.experts ?? [],

          sponsors: payload.sponsors ?? serverEvent.sponsors ?? prev?.sponsors ?? [],
        };

        // Return updated state
        return {
          // Update the events list and selected event if it matches
          events: state.events.map((e) => (e.id === id ? merged : e)),

          // Update selectedEvent if it is the one being updated
          selectedEvent: state.selectedEvent && state.selectedEvent.id === id ? merged : state.selectedEvent,
        };
      });
    } catch (err) {
      console.error("updateEvent failed:", err);
    }
  },

  // Delete
  deleteEvent: async (id) => {
    try {
      await eventApi.delete(id);
      set((s) => ({
        events: s.events.filter((e) => e.id !== id),
        selectedEvent: s.selectedEvent?.id === id ? null : s.selectedEvent,
        isDetailsModalOpen: s.selectedEvent?.id === id ? false : s.isDetailsModalOpen,
      }));
    } catch (err) {
      console.error(err);
    }
  },

  // Change Status
  changeStatus: async (id, status) => {
    await get().updateEvent(id, { status });
  },

  // Mark Paid
  markPaid: async (id) => {
    await get().updateEvent(id, { isPaid: true });
  },
}));
