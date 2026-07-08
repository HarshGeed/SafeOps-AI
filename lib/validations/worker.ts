import { z } from "zod";

export const workerSchema = z.object({
  profileId: z.uuid(),

  employeeCode: z
    .string()
    .min(3)
    .max(30),

  department: z.enum([
    "production",
    "maintenance",
    "quality",
    "safety",
    "warehouse",
  ]),

  designation: z
    .string()
    .min(2)
    .max(100),

  zoneId: z.uuid().nullable(),

  status: z.enum([
    "working",
    "break",
    "offline",
  ]),
});

export type WorkerInput = z.infer<typeof workerSchema>;