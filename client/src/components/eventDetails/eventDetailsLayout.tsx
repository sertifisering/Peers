import {
  ArrowLeft,
  X,
  Save,
  Calendar,
  Layers,
  Gavel,
  Trophy,
  UserCircle,
  DollarSign,
  Check,
  RotateCcw,
} from "lucide-react";
import { BasicInfoScreen } from "@/components/eventDetails/screens/basicInfoScreen";
import { TemplateScreen } from "@/components/eventDetails/screens/templateScreen";
import { JudgingScreen } from "@/components/eventDetails/screens/judgingScreen";
import { AthletesScreen } from "@/components/eventDetails/screens/athletesScreen";
import { ExpertsScreen } from "@/components/eventDetails/screens/expertsSccreen";
import { SponsorsScreen } from "@/components/eventDetails/screens/sponsorScreen";
import { ReviewScreen } from "@/components/eventDetails/screens/reviewScreen";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useEventDetailsStore } from "@/store/eventDetails/useEventDetailsStore";
import type { Event } from "@/types/event";

interface Props {
  event: Event | null;
  onSave: () => void;
  onForceClose: () => void;
}

export const EventDetailsLayout = ({ event, onSave, onForceClose }: Props) => {
  const {
    eventId,
    step,
    goToStep,
    form,
    template,
    athletes,
    experts,
    sponsors,
    isDirty,
    resetStepData,
    markDirty,
    resetDirty,
    updateForm,
  } = useEventDetailsStore();

  const steps = [
    { id: 0, label: "Basic Info", icon: Calendar },
    { id: 1, label: "Event Template", icon: Layers },
    { id: 2, label: "Judging", icon: Gavel },
    { id: 3, label: "Athletes", icon: Trophy },
    { id: 4, label: "Experts", icon: UserCircle },
    { id: 5, label: "Sponsors", icon: DollarSign },
    { id: 6, label: "Review", icon: Check },
  ];

  const isBasicDone = Boolean(form.name && form.date && form.location && form.sport && form.format);
  const isTemplateDone = Boolean(template.eventFormat);
  const isJudgingDone = true;
  const isAthletesDone = athletes.length > 0;
  const isExpertsDone = experts.length > 0;
  const isSponsorsDone = sponsors.length > 0;

  const stepCompletion: Record<number, boolean> = {
    0: isBasicDone,
    1: isTemplateDone,
    2: isJudgingDone,
    3: isAthletesDone,
    4: isExpertsDone,
    5: isSponsorsDone,
    6: isBasicDone && isTemplateDone && isJudgingDone && isAthletesDone && isExpertsDone && isSponsorsDone,
  };

  const renderScreen = () => {
    switch (step) {
      case 0:
        return <BasicInfoScreen />;
      case 1:
        return <TemplateScreen />;
      case 2:
        return <JudgingScreen />;
      case 3:
        return <AthletesScreen />;
      case 4:
        return <ExpertsScreen />;
      case 5:
        return <SponsorsScreen />;
      case 6:
        return <ReviewScreen />;
      default:
        return <BasicInfoScreen />;
    }
  };

  const handleResetClick = () => {
    if (!confirm("Are you sure you want to reset the data for this step?")) {
      return;
    }
    resetStepData(step);
    markDirty();
  };

  // Handle back button click
  const handleBack = () => {
    if (step > 0) goToStep(step - 1);
  };

  const handleSave = async () => {
    if (!eventId) return;

    try {
      await updateForm(eventId);
      resetDirty();
      onSave();
    } catch (error) {
      console.error(error);
      alert("Save failed");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <div className="relative flex items-center px-4 md:px-6 pt-4 pb-3 border-b flex-shrink-0">
        <Button variant="ghost" size="icon" className="hover:bg-gray-100 transition-colors" onClick={handleBack}>
          <ArrowLeft />
        </Button>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <Badge>{event?.status?.toUpperCase() ?? "UNKNOWN"}</Badge>
          <h2>Manage Event</h2>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto hover:bg-gray-100 transition-colors"
          onClick={onForceClose}
        >
          <X />
        </Button>
      </div>

      {/* MOBILE STEP NAV */}
      <div className="md:hidden border-b bg-white sticky top-0 z-20 flex-shrink-0">
        <div className="flex px-3 py-3 overflow-x-auto gap-2">
          {steps.map((s) => {
            const Icon = s.icon;
            const active = step === s.id;
            const done = stepCompletion[s.id];

            const colorClass = active
              ? "bg-black text-white"
              : done
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700";

            return (
              <button
                key={s.id}
                onClick={() => goToStep(s.id)}
                className={`flex items-center justify-center w-12 h-12 rounded-md text-xs ${colorClass}`}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>

      {/* DESKTOP STEP NAV */}
      <div className="hidden md:flex gap-3 px-6 py-3 border-b justify-center flex-shrink-0">
        {steps.map((s) => {
          const Icon = s.icon;
          const active = step === s.id;
          const done = stepCompletion[s.id];

          const colorClass = active
            ? "bg-gray-900 text-white"
            : done
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700";

          return (
            <button
              key={s.id}
              onClick={() => goToStep(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${colorClass}`}
            >
              <Icon className="w-4 h-4" />
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">{renderScreen()}</div>

      {/* FOOTER */}
      <div className="border-t px-4 py-4 flex gap-2 flex-shrink-0 bg-white">
        {step !== 6 && (
          <>
            <Button className="flex-1 bg-gray-900 text-white" onClick={handleSave} disabled={!isDirty}>
              <Save className="w-4 h-4 mr-2" /> Save
            </Button>

            <Button type="button" variant="outline" className="w-16" onClick={handleResetClick}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </>
        )}

        {step === 6 && (
          <Button
            className={`
        flex-1 text-white bg-green-600 hover:bg-green-700`}
            disabled={!stepCompletion[6]}
            onClick={() => alert("Event Setup Completed")}
          >
            Complete Event Setup
          </Button>
        )}
      </div>
    </div>
  );
};
