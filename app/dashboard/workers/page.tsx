import { WorkerService } from "@/services/workers/worker.service";
import { requireRole } from "@/lib/auth/require-role";
import { WorkersTable } from "@/components/workers/WorkersTable";

export default async function WorkersPage() {

  await requireRole([
    "admin",
    "supervisor",
    "saftey_officer"
  ]);
  const workers = await WorkerService.getWorkers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Workers
          </h1>

          <p className="text-muted-foreground">
            Manage all workers.
          </p>
        </div>

      </div>

      <WorkersTable
        workers={workers}
      />
    </div>
  );
}