import { useState, useEffect } from "react";
import { Search, UserCircle, Plus, Upload, FileSpreadsheet, Trash2, Award } from "lucide-react";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ExpertManualModal } from "@/components/eventDetails/modals/expertManualModal";
import { useEventDetailsStore } from "@/store/eventDetails/useEventDetailsStore";

export const ExpertsScreen = () => {
  const {
    experts,
    availableExperts,
    expertSearch,
    setExpertSearch,
    loadExpertList,
    addExpert,
    removeExpert,
    markDirty,
  } = useEventDetailsStore();

  const [manualOpen, setManualOpen] = useState(false);

  const filtered = availableExperts.filter((e) =>
    expertSearch
      ? e.name.toLowerCase().includes(expertSearch.toLowerCase()) ||
        (e.email ?? "").toLowerCase().includes(expertSearch.toLowerCase())
      : true
  );

  useEffect(() => {
    loadExpertList();
  }, []);

  return (
    <>
      {/* Manual Modal */}
      <ExpertManualModal
        open={manualOpen}
        onClose={() => setManualOpen(false)}
        onSave={(e: any) => {
          addExpert(e);
        }}
      />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6" />
          <h3>Manage Experts</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-4">
            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={expertSearch}
                onChange={(e) => setExpertSearch(e.target.value)}
                placeholder="Search expert..."
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
                filtered.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => {
                      addExpert(e);
                      markDirty();
                    }}
                    className="w-full flex items-center gap-3 p-3 transition-colors hover:bg-gray-200 border-b last:border-none"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <UserCircle className="w-5 h-5 text-gray-500" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm">{e.name}</p>
                      <p className="text-xs text-gray-500 truncate">{e.email}</p>
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

            {/* Invite link */}
            <div className="pt-4 border-t">
              <Label className="text-sm text-gray-600">Link to send to un-registered expert</Label>
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
              <Label className="text-sm text-gray-600">Select expert from previous events</Label>
              <div className="flex gap-2 mt-2">
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select an expert" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableExperts.map((a) => (
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

          {/* RIGHT */}
          <div className="space-y-2 md:border-l md:pl-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm">Added Experts</h4>
              <span className="text-sm text-gray-500">{experts.length} total</span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {experts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No experts added yet</div>
              ) : (
                experts.map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center justify-between p-3 border rounded-lg bg-white hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserCircle className="w-5 h-5 text-gray-500" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="truncate">{e.name}</p>
                        <p className="text-sm text-gray-500 truncate">{e.email}</p>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={() => removeExpert(e.id)}>
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
