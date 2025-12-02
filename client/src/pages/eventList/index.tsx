import { useEffect, useState } from "react";

import { ArrowRight, Search, Trash2, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import type { Event } from "@/types/event";
import { useEventStore } from "@/store/eventDetails/useEventStore";

import { CreateEventModal } from "@/components/eventCreate/createEventModal";
import { EventDetailsModal } from "@/components/eventDetails/eventDetailsModal";

export function EventList() {
  const {
    events,
    selectedEvent,
    isCreateModalOpen,
    isDetailsModalOpen,
    openCreateModal,
    closeCreateModal,
    openDetailsModal,
    closeDetailsModal,
    fetchEvents,
    updateEvent,
    deleteEvent,
    changeStatus,
    markPaid,
  } = useEventStore();

  const [receiptEvent, setReceiptEvent] = useState<Event | null>(null);
  const [search, setSearch] = useState("");

  // temporary hold receiptEvent
  console.log("Receipt Event:", receiptEvent);

  // Initial fetch
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Search filter
  const filteredEvents = events.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));

  // Create Event Modal
  const handleCreated = async (_created: Event) => {
    // Refresh list
    await fetchEvents();
  };

  // Details
  const handleUpdate = async (updated: Event) => {
    await updateEvent(updated.id, updated);
    useEventStore.getState().setSelectedEvent(updated);
  };

  // Delete
  const handleDelete = async (id: string, isPaid: boolean) => {
    if (!confirm("Delete this event?")) return;

    if (!isPaid) {
      await deleteEvent(id); // hard delete
    } else {
      await updateEvent(id, { isActive: false }); // soft delete
    }
  };

  // Status Select (pending / live / completed ...)
  const handleStatusChange = async (id: string, newStatus: Event["status"]) => {
    await changeStatus(id, newStatus);
  };

  // Payment
  const handlePayment = async (id: string) => {
    await markPaid(id);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="mb-8">My Events</h1>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Button onClick={openCreateModal} className="bg-gray-900 hover:bg-gray-800 rounded-full px-6">
            New Peers Event
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <div className="relative w-full sm:w-auto sm:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search my events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 text-sm"
            />
          </div>
        </div>
      </div>

      {/* EMPTY */}
      {events.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <h3 className="text-gray-500 mb-2">No events yet</h3>
            <p className="text-gray-400 text-sm">Create your first event to get started</p>
          </div>
        </div>
      )}

      {/* LIST */}
      {events.length > 0 && (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg px-6 py-3 hidden md:grid grid-cols-12 gap-4 text-xs text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">Event Name</div>
            <div className="col-span-2">Sport</div>
            <div className="col-span-2">Format</div>
            <div className="col-span-2">Start Date</div>
            <div className="col-span-3">Event Code</div>
          </div>

          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg border hover:shadow-lg transition-shadow">
              <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400" />
                  <button className="text-blue-600 hover:underline text-left" onClick={() => openDetailsModal(event)}>
                    {event.name}
                  </button>
                </div>

                <div className="col-span-2 text-gray-700">{event.sport}</div>
                <div className="col-span-2 text-gray-700">{event.format}</div>
                <div className="col-span-2 text-gray-700">{event.date}</div>
                <div className="col-span-3 text-gray-700">{event.eventCode}</div>
              </div>

              {/* CONTROLS */}
              <div className="bg-gray-50 px-6 py-4 border-t flex flex-wrap items-center gap-3">
                <div className="w-32">
                  <Select
                    value={event.status}
                    onValueChange={(value) => handleStatusChange(event.id, value as Event["status"])}
                    disabled={!event.isPaid}
                  >
                    <SelectTrigger className="h-9 text-sm bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="open">Publish</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={() => openDetailsModal(event)}>Manage</Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (event.isPaid ? setReceiptEvent(event) : handlePayment(event.id))}
                  disabled={event.isPaid || event.status !== "pending" || !event.requiredFieldsFilled}
                >
                  {event.isPaid ? (
                    <>
                      <Receipt className="w-4 h-4 mr-1" />
                      Paid
                    </>
                  ) : (
                    "Payment"
                  )}
                </Button>

                <Button variant="outline" size="sm" disabled={!event.isPaid}>
                  Results
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 ml-auto"
                  onClick={() => handleDelete(event.id, event.isPaid)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <CreateEventModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onCreated={handleCreated} />
      )}

      {/* Details Modal */}
      {selectedEvent && (
        <EventDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={closeDetailsModal}
          event={selectedEvent}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
