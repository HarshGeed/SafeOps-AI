import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export class UserService {
  static async getProfile(userId: string) {
    const cookieStore = await cookies();

    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      return null;
    }

    return data;
  }

  static async getPendingUsers() {
    const cookieStore = await cookies();

    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("status", "pending")
      .order("created_at");

    if (error) {
      return [];
    }

    return data;
  }

  static async updateStatus(
    userId: string,
    status: "pending" | "active" | "rejected" | "inactive"
  ) {
    const cookieStore = await cookies();

    const supabase = createClient(cookieStore);

    return await supabase
      .from("profiles")
      .update({
        status,
      })
      .eq("id", userId);
  }
}