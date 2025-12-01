import { useEventDetailsStore } from "@/store/eventDetails/useEventDetailsStore";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Search, Check, X, Gavel } from "lucide-react";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty } from "@/components/ui/command";

export const JudgingScreen = () => {
  const { judging, updateJudgingField } = useEventDetailsStore();

  const {
    min,
    max,
    duration,
    spectatorsMax,

    audienceEnabled,
    audienceWeight,
    audienceCriteria,

    expertEnabled,
    expertWeight,
    expertCriteria,

    athleteEnabled,
    athleteWeight,
    athleteCriteria,
  } = judging;

  const [audienceCriteriaInput, setAudienceCriteriaInput] = useState("");
  const [expertCriteriaInput, setExpertCriteriaInput] = useState("");
  const [athleteCriteriaInput, setAthleteCriteriaInput] = useState("");

  const [audiencePopover, setAudiencePopover] = useState(false);
  const [expertPopover, setExpertPopover] = useState(false);
  const [athletePopover, setAthletePopover] = useState(false);

  const criteriaOptions = [
    "Amplitude",
    "Artistic",
    "Battle Performance",
    "Choreography",
    "Confidence",
    "Creativity",
    "Difficulty",
    "Efficiency",
    "Entertainment",
    "Execution",
    "Flight",
    "Flow",
    "Innovation",
    "Interpretive",
    "Landing",
    "Longevity",
    "Movement",
    "Musicality",
    "Originality",
    "Overall",
    "Power",
    "Precision",
    "Presentation",
    "Rhythm",
    "Style",
    "Technique",
    "Timing",
    "Transitions",
    "Variety",
  ];

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center gap-3">
        <Gavel className="w-6 h-6" />
        <h3 className="text-lg font-semibold">Judging Settings</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Score Range Min</Label>
              <Input
                type="number"
                value={min}
                onChange={(e) => updateJudgingField("min", Number(e.target.value))}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Score Range Max</Label>
              <Input
                type="number"
                value={max}
                onChange={(e) => updateJudgingField("max", Number(e.target.value))}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label>Judging Duration (seconds)</Label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => updateJudgingField("duration", Number(e.target.value))}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Spectators Judging (max)</Label>
            <Input
              type="number"
              value={spectatorsMax}
              onChange={(e) => updateJudgingField("spectatorsMax", Number(e.target.value))}
              className="mt-2"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <Label>Judge Types</Label>

          <JudgeGroup
            title="Audience Judging"
            enabled={audienceEnabled}
            weight={audienceWeight}
            criteria={audienceCriteria}
            popover={audiencePopover}
            setPopover={setAudiencePopover}
            input={audienceCriteriaInput}
            setInput={setAudienceCriteriaInput}
            updateJudgingField={updateJudgingField}
            field="audience"
            options={criteriaOptions}
          />

          <JudgeGroup
            title="Expert Panel Judging"
            enabled={expertEnabled}
            weight={expertWeight}
            criteria={expertCriteria}
            popover={expertPopover}
            setPopover={setExpertPopover}
            input={expertCriteriaInput}
            setInput={setExpertCriteriaInput}
            updateJudgingField={updateJudgingField}
            field="expert"
            options={criteriaOptions}
          />

          <JudgeGroup
            title="Athlete Judging"
            enabled={athleteEnabled}
            weight={athleteWeight}
            criteria={athleteCriteria}
            popover={athletePopover}
            setPopover={setAthletePopover}
            input={athleteCriteriaInput}
            setInput={setAthleteCriteriaInput}
            updateJudgingField={updateJudgingField}
            field="athlete"
            options={criteriaOptions}
          />
        </div>
      </div>
    </div>
  );
};

/* JUDGE GROUP – with real functional criteria update (no stale state) */
const JudgeGroup = ({
  title,
  enabled,
  weight,
  criteria,
  popover,
  setPopover,
  input,
  setInput,
  updateJudgingField,
  field,
  options,
}: any) => {
  const enabledKey = `${field}Enabled`;
  const weightKey = `${field}Weight`;
  const criteriaKey = `${field}Criteria`;

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Checkbox checked={enabled} onCheckedChange={(v) => updateJudgingField(enabledKey, v)} />
        <Label>{title}</Label>
      </div>

      {enabled && (
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <Label className="min-w-[100px]">Weight (%)</Label>
            <Input
              type="number"
              value={weight}
              className="w-24"
              onChange={(e) => updateJudgingField(weightKey, Number(e.target.value))}
            />
          </div>

          <div className="flex items-start gap-4">
            <Label className="min-w-[100px] mt-2">Judging Criteria</Label>

            <div className="flex-1">
              <Popover open={popover} onOpenChange={setPopover}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span className="text-gray-500">Type or select criteria…</span>
                    <Search className="w-4 h-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Type or select criteria…"
                      value={input}
                      onValueChange={setInput}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && input.trim()) {
                          e.preventDefault();

                          updateJudgingField(criteriaKey, (prev: string[]) =>
                            prev.includes(input.trim()) ? prev : [...prev, input.trim()]
                          );

                          setInput("");
                          setPopover(false);
                        }
                      }}
                    />

                    <CommandList>
                      <CommandEmpty>Press Enter to add "{input}"</CommandEmpty>
                      <CommandGroup>
                        {options.map((opt: string) => (
                          <CommandItem
                            key={opt}
                            onSelect={() => {
                              updateJudgingField(criteriaKey, (prev: string[]) =>
                                prev.includes(opt) ? prev : [...prev, opt]
                              );
                              setInput("");
                              setPopover(false);
                            }}
                          >
                            <Check className={`mr-2 h-4 w-4 ${criteria.includes(opt) ? "opacity-100" : "opacity-0"}`} />
                            {opt}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {criteria.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {criteria.map((c: string) => (
                    <Badge key={c} variant="secondary" className="px-3 py-1 flex items-center gap-1">
                      {c}
                      <button
                        type="button"
                        onClick={() => updateJudgingField(criteriaKey, (prev: string[]) => prev.filter((x) => x !== c))}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
