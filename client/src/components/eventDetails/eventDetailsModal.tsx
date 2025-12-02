import { useEffect } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { EventDetailsLayout } from "@/components/eventDetails/eventDetailsLayout";
import { useEventDetailsStore } from "@/store/eventDetails/useEventDetailsStore";
import type { Event } from "@/types/event";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onUpdate: (updatedEvent: Event) => void;
}

export const EventDetailsModal = ({ isOpen, onClose, event, onUpdate }: Props) => {
  const { loadEvent, reset, resetDirty, form, template, judging, athletes, experts, sponsors, goToStep, isDirty } =
    useEventDetailsStore();

  // Initialize the store when the modal is opened
  useEffect(() => {
    if (isOpen && event) {
      loadEvent(event);
      goToStep(6);
      resetDirty();
    }
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!open) return;
  };

  const handleForceClose = () => {
    if (isDirty) {
      const ok = confirm("Are you sure you want to discard your changes?");
      if (!ok) return;
    }

    reset();
    resetDirty();
    onClose();
  };

  const handleSave = () => {
    if (!event) return;

    const updated: Event = {
      ...event,
      ...form,
      template,
      judging,
      athletes,
      experts,
      sponsors,
    };

    onUpdate(updated);
    resetDirty();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <VisuallyHidden>
        <DialogTitle>Event Details</DialogTitle>
        <DialogDescription>View and edit the details of the event.</DialogDescription>
      </VisuallyHidden>

      <DialogContent
        // Ignore outside clicks
        onInteractOutside={(e) => e.preventDefault()}
        // Ignore escape key
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="
          max-w-[95vw]
          flex flex-col
          p-0
          gap-0
          overflow-hidden

          h-[90vh]
          max-h-[800px]

          md:max-w-[1100px]
          md:h-[90vh]
          md:max-h-[900px]
        "
      >
        <EventDetailsLayout
          event={event}
          onSave={handleSave}
          onForceClose={handleForceClose} // Prevent accidental closure
        />
      </DialogContent>
    </Dialog>
  );
};
