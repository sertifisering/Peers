import { useEventDetailsStore } from "@/store/eventDetails/useEventDetailsStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar, Upload, Trash2 } from "lucide-react";
import { ImageWithFallback } from "@/components/imageWithFallback";

export const BasicInfoScreen = () => {
  const { form, setField } = useEventDetailsStore();

  // Handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setField("image_url", preview);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6" />
        <h3>Basic Information</h3>
      </div>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Event Image Upload */}
          <div>
            <Label>Event Image</Label>
            <div className="mt-2">
              {form.image_url ? (
                <div
                  className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  <ImageWithFallback src={form.image_url} alt="Event preview" className="w-full h-full object-cover" />

                  {/* Delete Image Button */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setField("image_url", "");
                    }}
                    className="absolute top-2 right-2 bg-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="w-full aspect-[16/9] rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Tap to select</p>
                  <p className="text-xs text-gray-400 mt-1">from your device</p>
                </div>
              )}
            </div>

            <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>

          {/* Event Name */}
          <div>
            <Label htmlFor="edit-name">Event Name *</Label>
            <Input
              id="edit-name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Sport */}
          <div>
            <Label htmlFor="edit-sport">Sport *</Label>
            <Input
              id="edit-sport"
              value={form.sport}
              onChange={(e) => setField("sport", e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Format */}
          <div>
            <Label htmlFor="edit-format">Format *</Label>
            <Input
              id="edit-format"
              value={form.format}
              onChange={(e) => setField("format", e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Start Date */}
          <div>
            <Label htmlFor="edit-start-date">Start Date *</Label>
            <Input
              id="edit-start-date"
              type="date"
              value={form.date}
              onChange={(e) => setField("date", e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Start Time */}
          <div>
            <Label htmlFor="edit-start-time">Start Time *</Label>
            <Input
              id="edit-start-time"
              type="time"
              value={form.start_time || ""}
              onChange={(e) => setField("start_time", e.target.value)}
              className="mt-2"
            />
          </div>

          {/* End Date */}
          <div>
            <Label htmlFor="edit-end-date">End Date *</Label>
            <Input
              id="edit-end-date"
              type="date"
              value={form.end_date || ""}
              onChange={(e) => setField("end_date", e.target.value)}
              className="mt-2"
            />
          </div>

          {/* End Time */}
          <div>
            <Label htmlFor="edit-end-time">End Time *</Label>
            <Input
              id="edit-end-time"
              type="time"
              value={form.end_time || ""}
              onChange={(e) => setField("end_time", e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="edit-location">Location *</Label>
            <Input
              id="edit-location"
              value={form.location}
              onChange={(e) => setField("location", e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
