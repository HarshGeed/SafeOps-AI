"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

export async function archiveWorker(
  workerId: string
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
      is_archived: true,
    })
    .eq("id", workerId);

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard/workers");
}