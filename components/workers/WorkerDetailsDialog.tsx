"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Worker = {
  id: string;

  employee_code?: string;

  department: string;

  designation: string;

  status: "working" | "break" | "offline" | "emergency";

  helmetDetected: boolean;

  lastSeen: Date | null;

  profile: {
    employeeId: string | null;
    firstName: string;
    lastName: string;
    email: string;
  };

  zone: {
    id: string;
    name: string;
  } | null;
};

export function WorkerDetailsDialog({
  worker,
}: {
  worker: Worker;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
        >
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Worker Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">

          <Info
            label="Employee ID"
            value={worker.profile.employeeId ?? "-"}
          />

          <Info
            label="Full Name"
            value={`${worker.profile.firstName} ${worker.profile.lastName}`}
          />

          <Info
            label="Email"
            value={worker.profile.email}
          />

          <Info
            label="Department"
            value={worker.department}
          />

          <Info
            label="Designation"
            value={worker.designation}
          />

          <Info
            label="Zone"
            value={worker.zone?.name ?? "-"}
          />

          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Status
            </p>

            {worker.status === "working" && (
              <Badge>
                Working
              </Badge>
            )}

            {worker.status === "break" && (
              <Badge variant="secondary">
                Break
              </Badge>
            )}

            {worker.status === "offline" && (
              <Badge variant="destructive">
                Offline
              </Badge>
            )}

            {worker.status === "emergency" && (
              <Badge variant="destructive">
                Emergency
              </Badge>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Helmet Detection
            </p>

            <Badge
              variant={
                worker.helmetDetected
                  ? "default"
                  : "destructive"
              }
            >
              {worker.helmetDetected
                ? "Detected"
                : "Not Detected"}
            </Badge>
          </div>

          <Info
            label="Last Seen"
            value={
              worker.lastSeen
                ? worker.lastSeen.toLocaleString()
                : "-"
            }
          />

        </div>
      </DialogContent>
    </Dialog>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-1">
        {label}
      </p>

      <p className="font-medium">
        {value ?? "-"}
      </p>
    </div>
  );
}