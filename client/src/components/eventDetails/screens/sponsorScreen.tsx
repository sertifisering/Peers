// src/components/event-details/screens/SponsorsScreen.tsx

import { useState } from "react";
import { useEventDetailsStore } from "@/store/eventDetails/useEventDetailsStore";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/imageWithFallback";
import { Trash2, Upload } from "lucide-react";

export const SponsorsScreen = () => {
  const { sponsors, addSponsor, removeSponsor } = useEventDetailsStore();

  // Local UI state
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [label, setLabel] = useState("Powered by");
  const [logo, setLogo] = useState<string | null>(null);

  // Handlers
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!name.trim()) return;

    addSponsor({
      id: crypto.randomUUID(),
      name,
      website,
      label,
      logoUrl: logo,
    });

    setName("");
    setWebsite("");
    setLabel("Powered by");
    setLogo(null);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold">Sponsors</h3>
      </div>

      {/* Form */}
      <div className="rounded-lg border p-4 space-y-4">
        <h4 className="font-medium">Add Sponsor</h4>

        {/* Logo Upload */}
        <div>
          <Label>Sponsor Logo</Label>

          <div className="mt-2">
            {logo ? (
              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 border">
                <ImageWithFallback src={logo} alt="Logo preview" className="w-full h-full object-contain p-4" />

                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 bg-white"
                  onClick={() => setLogo(null)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <label
                htmlFor="sponsor-logo-input"
                className="w-full aspect-[16/9] cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-gray-400 transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Tap to select</p>
                <p className="text-xs text-gray-400">from your device</p>
              </label>
            )}

            <input
              id="sponsor-logo-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />
          </div>
        </div>

        {/* Name */}
        <div>
          <Label>Sponsor Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-2" placeholder="Sponsor name" />
        </div>

        {/* Website */}
        <div>
          <Label>Sponsor Website</Label>
          <Input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="mt-2"
            placeholder="https://example.com"
          />
        </div>

        {/* Label */}
        <div>
          <Label>Sponsor Label</Label>
          <Input value={label} onChange={(e) => setLabel(e.target.value)} className="mt-2" placeholder="Powered by" />
        </div>

        <Button type="button" className="bg-gray-900 text-white w-full" onClick={handleAdd}>
          + Add Sponsor
        </Button>
      </div>

      {/* Sponsor List */}
      <div className="space-y-3">
        <h4 className="font-medium">Sponsor List</h4>

        {sponsors.length === 0 && <p className="text-sm text-gray-500">No sponsors added yet.</p>}

        <div className="space-y-2">
          {sponsors.map((s) => (
            <div key={s.id} className="flex items-center justify-between px-3 py-2 bg-gray-100 rounded border">
              <div className="flex items-center gap-3">
                {s.logoUrl && (
                  <div className="w-12 h-12 rounded overflow-hidden bg-white border">
                    <ImageWithFallback src={s.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                )}

                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                  <p className="text-xs text-gray-400">{s.website}</p>
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={() => removeSponsor(s.id)}>
                <Trash2 className="w-5 h-5 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
