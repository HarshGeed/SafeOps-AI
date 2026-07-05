"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function rejectUser(profileId: string) {
  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);

  await supabase
    .from("profiles")
    .update({
      status: "rejected",
    })
    .eq("id", profileId);

  revalidatePath("/dashboard/admin/users");
}