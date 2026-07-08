"use server";

import { revalidatePath } from "next/cache";

import {
  workerSchema,
} from "@/lib/validations/worker";

import { WorkerService } from "@/services/workers/worker.service";

export async function updateWorker(
  id: string,
  values: unknown
) {
  const result =
    workerSchema.safeParse(values);

  if (!result.success) {
    throw new Error(
      result.error.issues[0].message
    );
  }

  await WorkerService.updateWorker(
    id,
    result.data
  );

  revalidatePath("/dashboard/workers");
}