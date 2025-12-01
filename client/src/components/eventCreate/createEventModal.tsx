import { useState } from "react";
import { Check, ArrowLeft, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEventDetailsStore } from "@/store/eventDetails/useEventDetailsStore";
import { eventApi } from "@/api/eventApi";
import type { Event } from "@/types/event";

// --------------------

type Step = 1 | 2 | 3 | 4 | 5;

const SPORTS_OPTIONS = [
  "Football",
  "Basketball",
  "Baseball",
  "Tennis",
  "Volleyball",
  "Soccer",
  "Golf",
  "Swimming",
  "Running",
  "Cycling",
  "Badminton",
  "Table Tennis",
  "Cricket",
  "Rugby",
  "Hockey",
];

const questions = [
  {
    step: 1,
    question: "What should the event be called?",
    field: "name",
    placeholder: "e.g., Summer Basketball Tournament 2024",
    type: "text",
  },
  {
    step: 2,
    question: "What sport is it for?",
    field: "sport",
    type: "select",
    placeholder: "Search or select a sport...",
  },
  {
    step: 3,
    question: "When is the event?",
    field: "date",
    type: "date",
  },
  {
    step: 4,
    question: "Where will it take place?",
    field: "location",
    placeholder: "e.g., Central Sports Arena",
    type: "text",
  },
  {
    step: 5,
    question: "What format will it be?",
    field: "format",
    placeholder: "e.g., Tournament, League, Casual",
    type: "text",
  },
];

// --------------------

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (event: Event) => void;
}

export function CreateEventModal({ isOpen, onClose, onCreated }: Props) {
  const [currentStep, setCurrentStep] = useState<Step>(1);

  const { form, setField, reset } = useEventDetailsStore();

  const currentQuestion = questions.find((q) => q.step === currentStep)!;

  const getCurrentValue = (): string => {
    if (!currentQuestion) return "";
    const value = form[currentQuestion.field as keyof typeof form] ?? "";
    return String(value);
  };

  const handleInputChange = (value: string) => {
    if (!currentQuestion) return;
    setField(currentQuestion.field as any, value);
  };

  const isValid = getCurrentValue().trim() !== "";

  const handleNext = async () => {
    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as Step);
      return;
    }

    const payload: Partial<Event> = {
      name: form.name,
      sport: form.sport,
      format: form.format,
      date: form.date,
      location: form.location,
      status: "draft",
    };

    const created = await eventApi.create(payload);
    onCreated(created);
    handleClose();
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    reset();
    setCurrentStep(1);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <VisuallyHidden>
        <DialogTitle>Create Event</DialogTitle>
        <DialogDescription>Fill in the event details</DialogDescription>
      </VisuallyHidden>

      <DialogContent
        className="max-w-lg p-0 bg-white gap-0"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex flex-col h-[500px] sm:h-[600px]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            <Button onClick={handleBack} variant="ghost" size="icon" className="rounded-full -ml-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <Button onClick={handleClose} variant="ghost" size="icon" className="rounded-full -mr-2">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 pb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-2 rounded-full transition-all ${
                  step === currentStep ? "w-8 bg-gray-900" : step < currentStep ? "w-2 bg-gray-400" : "w-2 bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 flex items-center justify-center px-6 py-8 overflow-hidden">
            <div className="w-full max-w-md">
              <h2 className="text-center mb-8">{currentQuestion?.question}</h2>

              {currentQuestion?.type === "select" ? (
                <Command className="border-2 border-gray-300 rounded-xl">
                  <CommandInput placeholder={currentQuestion.placeholder} className="h-14 text-lg" />
                  <CommandList className="max-h-[300px]">
                    <CommandEmpty>No sport found.</CommandEmpty>
                    <CommandGroup>
                      {SPORTS_OPTIONS.map((sport) => (
                        <CommandItem
                          key={sport}
                          value={sport}
                          onSelect={(v: any) => handleInputChange(v)}
                          className="py-3 cursor-pointer"
                        >
                          <Check
                            className={`mr-2 h-4 w-4 ${getCurrentValue() === sport ? "opacity-100" : "opacity-0"}`}
                          />
                          {sport}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              ) : (
                <Input
                  type={currentQuestion.type}
                  value={getCurrentValue()}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="text-center py-6 text-lg border-2 border-gray-300 focus:border-gray-900 rounded-xl"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && isValid) handleNext();
                  }}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <Button
              onClick={handleNext}
              disabled={!isValid}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {currentStep === 5 ? "Create Draft" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
