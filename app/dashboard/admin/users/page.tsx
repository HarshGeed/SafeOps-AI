import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth/require-auth";

import { ApproveUserDialog } from "@/components/admin/ApproveUserDialog";
import { RejectUserDialog } from "@/components/admin/RejectUserDialog";

export default async function PendingUsersPage() {
  // Ensure user is authenticated
  const profile = await requireAuth();

  // Check if user is admin
  if (profile.role !== "admin") {
    throw new Error("Access denied. Admin role required.");
  }

  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);

  const [{ data: users, error: usersError }, { data: zones, error: zonesError }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("*")
        .eq("status", "pending")
        .eq("is_deleted", false)
        .order("created_at", { ascending: true }),

      supabase
        .from("zones")
        .select("id,name")
        .order("name"),
    ]);

  if (usersError) {
    throw new Error(usersError.message);
  }

  if (zonesError) {
    throw new Error(zonesError.message);
  }

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">
          Pending User Approvals
        </h1>

        <p className="text-muted-foreground mt-1">
          Review new registrations and approve their access.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Requested On</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {user.first_name} {user.last_name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">
                    {new Date(
                      user.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <ApproveUserDialog
                        user={user}
                        zones={zones ?? []}
                      />

                      <RejectUserDialog
                        profileId={user.id}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 text-center text-muted-foreground"
                >
                  No pending approval requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}