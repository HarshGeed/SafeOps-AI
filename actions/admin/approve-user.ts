"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { getCurrentProfile } from "@/lib/auth/get-current-profile";
import { createClient } from "@/lib/supabase/server";

type ApproveUserInput = {
  profileId: string;
  employeeId: string;
  role: "admin" | "supervisor" | "safety_officer" | "worker";

  department?:
    | "production"
    | "maintenance"
    | "quality"
    | "safety";
  designation?: string;
  zoneId?: string;
};

export async function approveUser({
  profileId,
  employeeId,
  role,
  department,
  designation,
  zoneId,
}: ApproveUserInput) {
  const admin = await getCurrentProfile();

  if (!admin || admin.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      employee_id: employeeId,
      role,
      status: "active",
      approved_by: admin.id,
      approved_at: new Date().toISOString(),
    })
    .eq("id", profileId);

  if (profileError) {
    throw profileError;
  }

  if (role === "worker") {
    if (!department || !designation || !zoneId) {
      throw new Error(
        "Department, designation and zone are required for workers."
      );
    }

    const { error: workerError } = await supabase
      .from("workers")
      .insert({
        profile_id: profileId,
        department,
        designation,
        zone_id: zoneId,
        status: "working",
      });

    if (workerError) {
      throw workerError;
    }
  }

  revalidatePath("/dashboard/admin/users");
}