"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

type UpdateWorkerInput = {
  department: string;
  designation: string;
  status: "working" | "break" | "offline" | "emergency";
  zoneId: string;
};

export async function updateWorker(
  workerId: string,
  {
    department,
    designation,
    status,
    zoneId,
  }: UpdateWorkerInput
) {
  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("workers")
    .update({
      department,
      designation,
      status,
      zone_id: zoneId || null,
    })
    .eq("id", workerId);

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard/workers");
}