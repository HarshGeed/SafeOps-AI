"use client";

import { useState, useTransition } from "react";

import { updateWorker } from "@/actions/workers/update-worker";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Worker = {
  id: string;

  department: string;

  designation: string;

  status: "working" | "break" | "offline" | "emergency";

  zone: {
    id: string;
    name: string;
  } | null;
};

type Zone = {
  id: string;
  name: string;
};

export function EditWorkerDialog({
  worker,
  zones = [],
}: {
  worker: Worker;
  zones?: Zone[];
}) {
  const [open, setOpen] = useState(false);

  const [department, setDepartment] = useState(worker.department);

  const [designation, setDesignation] = useState(worker.designation);

  const [status, setStatus] = useState(worker.status);

  const [zoneId, setZoneId] = useState(worker.zone?.id ?? "");

  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    startTransition(async () => {
      try {
        await updateWorker(worker.id, {
          department,
          designation,
          status,
          zoneId,
        });

        setOpen(false);
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Worker</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <Label>Department</Label>

            <Select
              value={department}
              onValueChange={setDepartment}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="production">
                  Production
                </SelectItem>

                <SelectItem value="maintenance">
                  Maintenance
                </SelectItem>

                <SelectItem value="quality">
                  Quality
                </SelectItem>

                <SelectItem value="safety">
                  Safety
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Designation</Label>

            <Input
              value={designation}
              onChange={(e) =>
                setDesignation(e.target.value)
              }
            />
          </div>

          <div>
            <Label>Status</Label>

            <Select
              value={status}
              onValueChange={(value) =>
                setStatus(
                  value as
                    | "working"
                    | "break"
                    | "offline"
                    | "emergency"
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="working">
                  Working
                </SelectItem>

                <SelectItem value="break">
                  Break
                </SelectItem>

                <SelectItem value="offline">
                  Offline
                </SelectItem>

                <SelectItem value="emergency">
                  Emergency
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Zone</Label>

            <Select
              value={zoneId}
              onValueChange={setZoneId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Zone" />
              </SelectTrigger>

              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem
                    key={zone.id}
                    value={zone.id}
                  >
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            disabled={isPending}
            onClick={handleSubmit}
          >
            {isPending
              ? "Saving..."
              : "Save Changes"}
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}