import { useEventDetailsStore } from "@/store/eventDetails/useEventDetailsStore";
import { Badge } from "@/components/ui/badge";

export const ReviewScreen = () => {
  const { form, athletes, experts, sponsors } = useEventDetailsStore();

  // Completion checks
  const isBasicDone = Boolean(form.name && form.date && form.location && form.sport && form.format);
  // If all basic info fields are filled, set to true

  const isTemplateDone = true;
  // If the tmplate screen is completed, set to true

  const isJudgingDone = true;
  // If the judging screen is completed, set to true

  const isAthletesDone = athletes.length > 0;
  const isExpertsDone = experts.length > 0;
  const isSponsorsDone = sponsors.length > 0;

  const allDone = isBasicDone && isSponsorsDone;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold">Review</h3>
      </div>

      {/* Completion Status */}
      <div className="bg-white rounded-lg border p-4 space-y-2">
        <h4 className="font-medium mb-2">Completion Status</h4>

        <div className="space-y-2 text-sm">
          <Row label="Basic Information" done={isBasicDone} />

          <Row label="Event Template" done={isTemplateDone} />

          <Row label="Judging Settings" done={isJudgingDone} />

          <Row label={`Athletes (${athletes.length})`} done={isAthletesDone} optional />

          <Row label={`Experts (${experts.length})`} done={isExpertsDone} optional />

          <Row label={`Sponsors (${sponsors.length})`} done={isSponsorsDone} />
        </div>
      </div>

      {/* Basic Info Summary */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        <h4 className="font-medium">Basic Information</h4>

        <p>
          <strong>Name:</strong> {form.name || "Not set"}
        </p>
        <p>
          <strong>Sport:</strong> {form.sport || "Not set"}
        </p>
        <p>
          <strong>Format:</strong> {form.format || "Not set"}
        </p>
        <p>
          <strong>Date:</strong> {form.date || "Not set"}
        </p>
        <p>
          <strong>Location:</strong> {form.location || "Not set"}
        </p>
      </div>

      {/* Participants */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        <h4 className="font-medium">Participants</h4>

        <p>
          <strong>Athletes:</strong> {athletes.length}
        </p>
        <p>
          <strong>Experts:</strong> {experts.length}
        </p>
      </div>

      {/* Sponsors */}
      {sponsors.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h4 className="font-medium">Sponsors</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sponsors.map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-3 bg-white border rounded">
                {s.logoUrl && (
                  <div className="w-10 h-10 rounded overflow-hidden bg-white border">
                    <img src={s.logoUrl} className="w-full h-full object-contain" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alerts */}
      {!allDone && (
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-lg">
          ⚠️ Please complete all required fields.
        </div>
      )}

      {allDone && (
        <div className="bg-blue-50 border border-blue-300 text-blue-800 p-4 rounded-lg">
          ✓ All required fields are complete!
        </div>
      )}
    </div>
  );
};

/* Small component to show each row with badge */
const Row = ({ label, done, optional = false }: { label: string; done: boolean; optional?: boolean }) => {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      {optional && !done ? (
        <Badge className="bg-yellow-100 text-yellow-700">Optional</Badge>
      ) : done ? (
        <Badge className="bg-green-100 text-green-700">Complete</Badge>
      ) : (
        <Badge className="bg-red-100 text-red-700">Incomplete</Badge>
      )}
    </div>
  );
};
