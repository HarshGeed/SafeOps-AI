import { eq } from "drizzle-orm";

import { db } from "@/db";
import { workers } from "@/db/schema/workers";

export class WorkerService {
  static async getWorkers() {
    return db.query.workers.findMany({
      where: eq(workers.isArchived, false),

      with: {
        profile: true,
        zone: true,
      },

      orderBy: (workers, { desc }) => [
        desc(workers.createdAt),
      ],
    });
  }

  static async getWorker(id: string) {
    return db.query.workers.findFirst({
      where: eq(workers.id, id),

      with: {
        profile: true,
        zone: true,
      },
    });
  }
}