import { useState, useEffect } from "react";
import { Trophy, Search, UserCircle, Upload, Plus, FileSpreadsheet, Trash2 } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { AthleteManualModal } from "@/components/eventDetails/modals/athleteManualModal";
import { useEventDetailsStore } from "@/store/eventDetails/useEventDetailsStore";

export const AthletesScreen = () => {
  const {
    athletes,
    availableAthletes,
    athleteSearch,
    setAthleteSearch,
    loadAthleteList,
    addAthlete,
    removeAthlete,
    markDirty,
  } = useEventDetailsStore();

  const [manualOpen, setManualOpen] = useState(false);

  const filtered = availableAthletes.filter((a) =>
    athleteSearch
      ? a.name.toLowerCase().includes(athleteSearch.toLowerCase()) ||
        (a.email ?? "").toLowerCase().includes(athleteSearch.toLowerCase())
      : true
  );

  useEffect(() => {
    loadAthleteList();
  }, []);

  return (
    <>
      {/* Manual Modal */}
      <AthleteManualModal
        open={manualOpen}
        onClose={() => setManualOpen(false)}
        onSave={(a: any) => {
          addAthlete(a);
        }}
      />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6" />
          <h3>Manage Athletes</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-4">
            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={athleteSearch}
                onChange={(e) => setAthleteSearch(e.target.value)}
                placeholder="Search athlete..."
                className="pl-10"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered.length === 0) {
                    setManualOpen(true);
                  }
                }}
              />
            </div>

            {/* LIST */}
            <div className="hidden md:block border rounded-lg bg-gray-50 max-h-[200px] overflow-y-auto">
              {filtered.length > 0 ? (
                filtered.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      addAthlete(a);
                      markDirty();
                    }}
                    className="w-full flex items-center gap-3 p-3 transition-colors hover:bg-gray-200 border-b last:border-none"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <UserCircle className="w-5 h-5 text-gray-500" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm">{a.name}</p>
                      <p className="text-xs text-gray-500 truncate">{a.email}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-4 text-sm text-gray-500">No results</div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button onClick={() => setManualOpen(true)} className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Add manually
              </Button>
              <Button variant="outline" className="flex-1">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Upload CSV
              </Button>
            </div>
            {/* INVITE LINK */}
            <div className="pt-4 border-t">
              <Label className="text-sm text-gray-600">Link to send to un-registered athlete</Label>
              <div className="flex gap-2 mt-2">
                <Input value="https://www.peersevent.com/signup" readOnly className="flex-1 bg-gray-50" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigator.clipboard.writeText("https://www.peersevent.com/signup")}
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* SELECT FROM PREVIOUS EVENTS */}
            <div className="pt-4">
              <Label className="text-sm text-gray-600">Select athlete from previous events</Label>
              <div className="flex gap-2 mt-2">
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select an athlete" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAthletes.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name} ({a.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT: added athletes */}
          <div className="space-y-2 md:border-l md:pl-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm">Added Athletes</h4>
              <span className="text-sm text-gray-500">{athletes.length} total</span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {athletes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No athletes added yet</div>
              ) : (
                athletes.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserCircle className="w-5 h-5 text-gray-500" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="truncate">{a.name}</p>
                        <p className="text-sm text-gray-500 truncate">{a.email}</p>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={() => removeAthlete(a.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
