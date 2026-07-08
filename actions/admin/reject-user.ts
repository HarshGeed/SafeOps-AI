"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function rejectUser(profileId: string) {
  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      status: "rejected",
    })
    .eq("id", profileId);

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard/admin/users");
}