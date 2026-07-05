"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

type ApproveUserInput = {
  profileId: string;
  employeeCode: string;
  department: string;
  designation: string;
  zoneId: string;
};

export async function approveUser({
  profileId,
  employeeCode,
  department,
  designation,
  zoneId,
}: ApproveUserInput) {
  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);

  const {
    data: { user: admin },
  } = await supabase.auth.getUser();

  if (!admin) {
    throw new Error("Unauthorized");
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      status: "active",
      approved_by: admin.id,
      approved_at: new Date().toISOString(),
    })
    .eq("id", profileId);

  if (profileError) throw profileError;

  const { error: workerError } = await supabase
    .from("workers")
    .insert({
      profile_id: profileId,
      employee_code: employeeCode,
      department,
      designation,
      zone_id: zoneId,
    });

  if (workerError) throw workerError;

  revalidatePath("/dashboard/admin/users");
}