import { z } from "zod";

export const approveUserSchema = z.object({
  profileId: z.uuid(),
  employeeCode: z.string().min(3).max(30),
  department: z.enum([
    "production",
    "maintenance",
    "quality",
    "safety",
  ]),
  designation: z.string().min(2).max(100),
  zoneId: z.uuid(),
});