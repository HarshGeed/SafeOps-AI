import { redirect } from "next/navigation";

import { getCurrentProfile } from "./get-current-profile";

import { UserRole } from "@/types/auth"

export async function requireRole(
  allowedRoles: UserRole[]
) {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  if (!allowedRoles.includes(profile.role)) {
    redirect("/unauthorized");
  }

  return profile;
}