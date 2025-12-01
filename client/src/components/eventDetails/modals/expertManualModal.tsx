import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ExpertManualModal = ({ open, onClose, onSave }: any) => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    if (!first.trim() && !last.trim()) return;

    onSave({
      name: `${first.trim()} ${last.trim()}`.trim(),
      email: email.trim(),
    });

    setFirst("");
    setLast("");
    setEmail("");

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Expert</DialogTitle>
          <DialogDescription>Enter expert details below.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Input placeholder="First name" value={first} onChange={(e) => setFirst(e.target.value)} />
          <Input placeholder="Last name" value={last} onChange={(e) => setLast(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <DialogFooter>
          <Button onClick={handleSave} className="w-full bg-gray-900 text-white">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
