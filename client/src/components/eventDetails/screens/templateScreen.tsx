// src/components/event-details/screens/TemplateScreen.tsx

import { useState } from "react";
import { useEventDetailsStore } from "@/store/eventDetails/useEventDetailsStore";
import { TemplatePreviewRouter } from "@/components/eventDetails/preview/templatePreviewRouter";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { Layers } from "lucide-react";
import { ImageWithFallback } from "@/components/imageWithFallback";

export const TemplateScreen = () => {
  const { template, updateTemplateField } = useEventDetailsStore();
  const { eventFormat } = template;

  // UI-only
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Layers className="w-6 h-6" />
        <h3>Event Template</h3>
      </div>

      {/* Format selector*/}
      <FormatSelector eventFormat={eventFormat} onChange={(f: any) => updateTemplateField("eventFormat", f)} />

      {/* Screen for each format */}
      {eventFormat === "ranking" && (
        <RankingUI
          template={template}
          updateTemplateField={updateTemplateField}
          eventFormat={eventFormat}
          showMobilePreview={showMobilePreview}
          setShowMobilePreview={setShowMobilePreview}
        />
      )}

      {eventFormat === "battle" && (
        <BattleUI
          template={template}
          updateTemplateField={updateTemplateField}
          eventFormat={eventFormat}
          showMobilePreview={showMobilePreview}
          setShowMobilePreview={setShowMobilePreview}
        />
      )}

      {eventFormat === "poll" && (
        <PollUI
          template={template}
          updateTemplateField={updateTemplateField}
          eventFormat={eventFormat}
          showMobilePreview={showMobilePreview}
          setShowMobilePreview={setShowMobilePreview}
        />
      )}
    </div>
  );
};

// Format Selector Component
const FormatSelector = ({ eventFormat, onChange }: any) => {
  return (
    <div>
      <Label>Event Format</Label>
      <div className="flex gap-2 mt-2">
        <Button
          type="button"
          variant={eventFormat === "ranking" ? "default" : "outline"}
          onClick={() => onChange("ranking")}
          className={eventFormat === "ranking" ? "bg-gray-900 text-white" : ""}
        >
          Ranking
        </Button>

        <Button
          type="button"
          variant={eventFormat === "battle" ? "default" : "outline"}
          onClick={() => onChange("battle")}
          className={eventFormat === "battle" ? "bg-gray-900 text-white" : ""}
        >
          Battle
        </Button>

        <Button
          type="button"
          variant={eventFormat === "poll" ? "default" : "outline"}
          onClick={() => onChange("poll")}
          className={eventFormat === "poll" ? "bg-gray-900 text-white" : ""}
        >
          Poll
        </Button>
      </div>
    </div>
  );
};

// Ranking UI Component
const RankingUI = ({ template, updateTemplateField, eventFormat }: any) => {
  const { roundsPerAthlete, scoringFormat, emojiType, eventStage } = template;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left */}
      <div className="space-y-6 order-2 md:order-1">
        {/* Rounds Per Athlete */}
        <div>
          <Label>Number of Rounds per Athlete</Label>
          <Input
            type="number"
            min="1"
            value={roundsPerAthlete}
            onChange={(e) => updateTemplateField("roundsPerAthlete", Number(e.target.value))}
            className="mt-2"
          />
        </div>

        {/* Scoring Format */}
        <div>
          <Label>Scoring Format</Label>
          <Select value={scoringFormat} onValueChange={(v: any) => updateTemplateField("scoringFormat", v)}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Score Voting">Score Voting</SelectItem>
              <SelectItem value="Like/Dislike">Like/Dislike</SelectItem>
              <SelectItem value="Star Rating">Star Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Emoji Type */}
        <div>
          <Label>Emoji Type (Optional)</Label>
          <Select value={emojiType} onValueChange={(v: any) => updateTemplateField("emojiType", v)}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="Fire">🔥 Fire</SelectItem>
              <SelectItem value="Heart">❤️ Heart</SelectItem>
              <SelectItem value="Star">⭐ Star</SelectItem>
              <SelectItem value="Trophy">🏆 Trophy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Event Stage */}
        <div>
          <Label>Event Stage</Label>
          <Select value={eventStage} onValueChange={(v: any) => updateTemplateField("eventStage", v)}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Qualification">Qualification</SelectItem>
              <SelectItem value="Semi-Final">Semi-Final</SelectItem>
              <SelectItem value="Final">Final</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Right: Preview */}
      <div className="order-1 md:order-2 md:relative md:-top-24">
        <Label>Preview</Label>
        <div className="mt-3">
          <TemplatePreviewRouter eventFormat={eventFormat} template={template} />
        </div>
      </div>
    </div>
  );
};

// Battle UI Component
const BattleUI = ({ template, updateTemplateField, eventFormat }: any) => {
  const { roundsPerBattle, differentFinalRounds, bracketStageStart } = template;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* LEFT */}
      <div className="space-y-6 order-2 md:order-1">
        {/* Rounds Per Battle */}
        <div>
          <Label>Rounds per Battle</Label>
          <Input
            type="number"
            min="1"
            value={roundsPerBattle}
            onChange={(e) => updateTemplateField("roundsPerBattle", Number(e.target.value))}
            className="mt-2"
          />
        </div>

        {/* Different Final Rounds */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={differentFinalRounds}
            onChange={(e) => updateTemplateField("differentFinalRounds", e.target.checked)}
          />
          <Label>Use different number of rounds for the Final</Label>
        </div>

        {/* Bracket Start Round */}
        <div>
          <Label>Bracket Starting Stage</Label>
          <Select value={bracketStageStart} onValueChange={(v) => updateTemplateField("bracketStageStart", v)}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Round of 16">Round of 16</SelectItem>
              <SelectItem value="Quarterfinal">Quarterfinal</SelectItem>
              <SelectItem value="Semifinal">Semifinal</SelectItem>
              <SelectItem value="Final">Final</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* RIGHT: Preview Placeholder */}
      {/* Right: Preview */}
      <div className="order-1 md:order-2 md:relative md:-top-24">
        <Label>Preview</Label>
        <div className="mt-3">
          <TemplatePreviewRouter eventFormat={eventFormat} template={template} />
        </div>
      </div>
    </div>
  );
};

const PollUI = ({ template, updateTemplateField, eventFormat }: any) => {
  const { pollFormat, pollEmojiType, pollStartDate, pollEndDate } = template;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* LEFT */}
      <div className="space-y-6 order-2 md:order-1">
        {/* Poll Format */}
        <div>
          <Label>Poll Format</Label>
          <Select value={pollFormat} onValueChange={(v) => updateTemplateField("pollFormat", v)}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Like Voting">Like Voting</SelectItem>
              <SelectItem value="Score Voting">Score Voting</SelectItem>
              <SelectItem value="Star Rating">Star Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Poll Emoji Type */}
        <div>
          <Label>Emoji Type (Optional)</Label>
          <Select value={pollEmojiType} onValueChange={(v) => updateTemplateField("pollEmojiType", v)}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fire">🔥 Fire</SelectItem>
              <SelectItem value="Heart">❤️ Heart</SelectItem>
              <SelectItem value="Star">⭐ Star</SelectItem>
              <SelectItem value="ThumbsUp">👍 Thumbs Up</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Date */}
        <div>
          <Label>Poll Start Date</Label>
          <Input
            type="datetime-local"
            value={pollStartDate}
            onChange={(e) => updateTemplateField("pollStartDate", e.target.value)}
            className="mt-2"
          />
        </div>

        {/* End Date */}
        <div>
          <Label>Poll End Date</Label>
          <Input
            type="datetime-local"
            value={pollEndDate}
            onChange={(e) => updateTemplateField("pollEndDate", e.target.value)}
            className="mt-2"
          />
        </div>
      </div>

      {/* RIGHT: Preview Placeholder */}
      <div className="order-1 md:order-2 md:relative md:-top-24">
        <Label>Preview</Label>
        <div className="mt-3">
          <TemplatePreviewRouter eventFormat={eventFormat} template={template} />
        </div>
      </div>
    </div>
  );
};
