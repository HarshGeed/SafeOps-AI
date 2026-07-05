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

  const [employeeCode, setEmployeeCode] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [zoneId, setZoneId] = useState("");

  const handleApprove = async () => {
    await approveUser({
      profileId: user.id,
      employeeCode,
      department,
      designation,
      zoneId,
    });

    setOpen(false);
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Approve</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Approve {user.first_name} {user.last_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Employee Code</Label>

            <Input
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
            />
          </div>

          <div>
            <Label>Department</Label>

            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="production">Production</SelectItem>

                <SelectItem value="maintenance">Maintenance</SelectItem>

                <SelectItem value="quality">Quality</SelectItem>

                <SelectItem value="safety">Safety</SelectItem>

                <SelectItem value="warehouse">Warehouse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Designation</Label>

            <Input
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>

          <div>
            <Label>Zone ID</Label>

            <Select value={zoneId} onValueChange={setZoneId}>
              <SelectTrigger>
                <SelectValue placeholder="Select Zone" />
              </SelectTrigger>

              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" onClick={handleApprove}>
            Approve User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
