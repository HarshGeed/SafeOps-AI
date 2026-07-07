import { WorkerService } from "@/services/workers/worker.service";

import { WorkersTable } from "@/components/workers/WorkersTable";

export default async function WorkersPage() {
  const workers = await WorkerService.getWorkers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Workers
        </h1>
      </div>

      <WorkersTable workers={workers} />
    </div>
  );
}