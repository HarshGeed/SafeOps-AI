"use client";

import { useState } from "react";

import { approveUser } from "@/actions/admin/approve-user";

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

type Props = {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };

  zones: {
    id: string;
    name: string;
  }[];
};

export function ApproveUserDialog({
  user,
  zones,
}: Props) {
  const [open, setOpen] = useState(false);

  const [employeeId, setEmployeeId] = useState("");

  const [role, setRole] = useState<
    "admin" | "supervisor" | "safety_officer" | "worker"
  >("worker");

  const [department, setDepartment] = useState<
    "production" | "maintenance" | "quality" | "safety" | ""
  >("");

  const [designation, setDesignation] = useState("");

  const [zoneId, setZoneId] = useState("");

  const isWorker = role === "worker";
  const workerDepartment = isWorker && department
    ? department
    : undefined;
  const workerDesignation = isWorker
    ? designation || undefined
    : undefined;
  const workerZoneId = isWorker
    ? zoneId || undefined
    : undefined;

  const handleApprove = async () => {
    await approveUser({
      profileId: user.id,
      employeeId,
      role,
      department: workerDepartment,
      designation: workerDesignation,
      zoneId: workerZoneId,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          Approve
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Approve {user.first_name} {user.last_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Employee ID</Label>

            <Input
              value={employeeId}
              onChange={(e) =>
                setEmployeeId(e.target.value)
              }
              placeholder="EMP001"
            />
          </div>

          <div>
            <Label>Role</Label>

            <Select
              value={role}
              onValueChange={(value) =>
                setRole(
                  value as
                    | "admin"
                    | "supervisor"
                    | "safety_officer"
                    | "worker"
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="admin">
                  Admin
                </SelectItem>

                <SelectItem value="supervisor">
                  Supervisor
                </SelectItem>

                <SelectItem value="safety_officer">
                  Safety Officer
                </SelectItem>

                <SelectItem value="worker">
                  Worker
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isWorker && (
            <>
              <div>
                <Label>Department</Label>

                <Select
                  value={department}
                  onValueChange={(value) =>
                    setDepartment(
                      value as
                        | "production"
                        | "maintenance"
                        | "quality"
                        | "safety"
                        | ""
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
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
            </>
          )}

          <Button
            className="w-full"
            onClick={handleApprove}
          >
            Approve User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}