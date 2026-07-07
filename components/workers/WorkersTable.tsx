"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Worker = {
  id: string;

  employee_code: string;

  designation: string;

  department: string;

  status: string;

  profiles: {
    first_name: string;

    last_name: string;

    email: string;
  };

  zones: {
    name: string;
  } | null;
};

export function WorkersTable({
  workers,
}: {
  workers: Worker[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>

          <TableHead>Email</TableHead>

          <TableHead>Department</TableHead>

          <TableHead>Designation</TableHead>

          <TableHead>Zone</TableHead>

          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {workers.map((worker) => (
          <TableRow key={worker.id}>
            <TableCell>
              {worker.profiles.first_name}{" "}
              {worker.profiles.last_name}
            </TableCell>

            <TableCell>
              {worker.profiles.email}
            </TableCell>

            <TableCell>
              {worker.department}
            </TableCell>

            <TableCell>
              {worker.designation}
            </TableCell>

            <TableCell>
              {worker.zones?.name ?? "-"}
            </TableCell>

            <TableCell>
              {worker.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}