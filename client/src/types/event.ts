// src/types/event.ts

export interface Event {
  judging: any;
  template: any;
  id: string;

  // Basic
  name: string;
  date: string;
  location: string;
  sport: string;
  format: string;
  eventCode?: string;
  isPaid: boolean;

  requiredFieldsFilled: boolean;

  // Detail info
  startTime?: string;
  endTime?: string;
  endDate?: string;

  capacity?: number;
  price?: number;
  organizer?: string;
  contactEmail?: string;
  imageUrl?: string;

  // Lists
  athletes?: {
    id: string;
    name: string;
    email?: string;
  }[];

  experts?: {
    id: string;
    name: string;
    email?: string;
  }[];

  sponsors?: {
    id: string;
    name: string;
    website?: string;
    label?: string;
    logoUrl?: string | null;
  }[];

  // Status
  status: "draft" | "pending" | "open" | "completed" | string;

  // Additional
  isActive: boolean;
}

export type EventStatus = Event["status"];
