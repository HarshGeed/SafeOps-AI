"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { EditWorkerDialog } from "./EditWorkerDialog";
import { WorkerDetailsDialog } from "./WorkerDetailsDialog";
import { ArchiveWorkerDialog } from "./ArchiveWorkerDialog";

type Worker = {
  id: string;

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

export function WorkersTable({
  workers,
}: {
  workers: Worker[];
}) {
  const [search, setSearch] = useState("");

  const filteredWorkers = useMemo(() => {
    const query = search.toLowerCase();

    return workers.filter((worker) => {
      return (
        worker.profile.employeeId
          ?.toLowerCase()
          .includes(query) ||
        worker.profile.firstName
          .toLowerCase()
          .includes(query) ||
        worker.profile.lastName
          .toLowerCase()
          .includes(query)
      );
    });
  }, [workers, search]);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by Employee ID or Name..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">
                Employee ID
              </th>

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Department
              </th>

              <th className="p-3 text-left">
                Designation
              </th>

              <th className="p-3 text-left">
                Zone
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredWorkers.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-muted-foreground"
                >
                  No workers found.
                </td>
              </tr>
            )}

            {filteredWorkers.map((worker) => (
              <tr
                key={worker.id}
                className="border-t"
              >
                <td className="p-3">
                  {worker.profile.employeeId}
                </td>

                <td className="p-3">
                  {worker.profile.firstName}{" "}
                  {worker.profile.lastName}
                </td>

                <td className="p-3">
                  {worker.department}
                </td>

                <td className="p-3">
                  {worker.designation}
                </td>

                <td className="p-3">
                  {worker.zone?.name ?? "-"}
                </td>

                <td className="p-3">
                  {worker.status ===
                    "working" && (
                    <Badge>
                      Working
                    </Badge>
                  )}

                  {worker.status ===
                    "break" && (
                    <Badge variant="secondary">
                      Break
                    </Badge>
                  )}

                  {worker.status ===
                    "offline" && (
                    <Badge variant="destructive">
                      Offline
                    </Badge>
                  )}

                  {worker.status ===
                    "emergency" && (
                    <Badge variant="destructive">
                      Emergency
                    </Badge>
                  )}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <WorkerDetailsDialog
                      worker={worker}
                    />

                    <EditWorkerDialog
                      worker={worker}
                    />

                    <ArchiveWorkerDialog
                      workerId={worker.id}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}