import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

import { ApproveUserDialog } from "@/components/admin/ApproveUserDialog";

import { RejectUserDialog } from "@/components/admin/RejectUserDialog";

export default async function PendingUsersPage() {
  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);

  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .eq("status", "pending");

  const { data: zones } = await supabase
    .from("zones")
    .select("id,name")
    .order("name");

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-3xl font-bold">Pending Users</h1>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted">
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">
                  {user.first_name} {user.last_name}
                </td>

                <td className="p-4">{user.email}</td>

                <td className="flex gap-2">
                  <ApproveUserDialog user={user} zones={zones ?? []} />

                  <RejectUserDialog profileId={user.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
