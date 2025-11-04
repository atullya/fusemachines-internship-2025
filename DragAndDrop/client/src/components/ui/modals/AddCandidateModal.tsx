import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../dialog";
import { Label } from "../label";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Button } from "../button";

export type CandidateType = "internal" | "external";

export interface AddCandidateForm {
  name: string;
  roleTitle: string;
  email: string;
  phone: string;
  resumeUrl: string;
  candidateType: CandidateType;
  remarks: string;
}

interface AddCandidateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AddCandidateForm) => Promise<void> | void; // parent handles API call
}

export default function AddCandidateModal({
  open,
  onOpenChange,
  onSubmit,
}: AddCandidateModalProps) {
  const [form, setForm] = React.useState<AddCandidateForm>({
    name: "",
    roleTitle: "",
    email: "",
    phone: "",
    resumeUrl: "",
    candidateType: "internal",
    remarks: "",
  });
  const [submitting, setSubmitting] = React.useState(false);

  const handleChange =
    (key: keyof AddCandidateForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.roleTitle.trim()) return;
    try {
      setSubmitting(true);
      await onSubmit(form);
      onOpenChange(false); // close on success
      // reset
      setForm({
        name: "",
        roleTitle: "",
        email: "",
        phone: "",
        resumeUrl: "",
        candidateType: "internal",
        remarks: "",
      });
    } catch (err) {
      console.error("Add candidate failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Candidate</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="e.g. Ram Dhakal"
              value={form.name}
              onChange={handleChange("name")}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange("email")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="+977-98..."
                value={form.phone}
                onChange={handleChange("phone")}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Resume URL (Google Drive)*</Label>
            <Input
              id="resume"
              placeholder="https://drive.google.com/..."
              value={form.resumeUrl}
              onChange={handleChange("resumeUrl")}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="roleTitle">Role Title *</Label>
              <Input
                id="roleTitle"
                placeholder="Sr. Frontend Developer"
                value={form.roleTitle}
                onChange={handleChange("roleTitle")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Candidate Type</Label>
              <RadioGroup
                value={form.candidateType}
                onValueChange={(val) =>
                  setForm((f) => ({
                    ...f,
                    candidateType: val as CandidateType,
                  }))
                }
                className="flex gap-6 pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="internal" value="internal" />
                  <Label htmlFor="internal">Internal Employee</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="external" value="external" />
                  <Label htmlFor="external">Externally Sourced</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              placeholder="Notes about the candidate..."
              value={form.remarks}
              onChange={handleChange("remarks")}
            />
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                submitting || !form.name.trim() || !form.roleTitle.trim()
              }
            >
              {submitting ? "Adding..." : "Add Candidate"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
