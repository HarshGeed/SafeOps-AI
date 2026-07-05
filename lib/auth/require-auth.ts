import { redirect } from "next/navigation";

import { getCurrentProfile } from "./auth";

export async function requireAuth() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/login");
  }

  if (profile.status === "pending") {
    redirect("/auth/waiting");
  }

  if (profile.status === "rejected") {
    redirect("/auth/unauthorized");
  }

  if (profile.status === "inactive") {
    redirect("/auth/unauthorized");
  }

  return profile;
}