import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";

export class WorkerService {
  static async getWorkers() {
    const cookieStore = await cookies();

    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("workers")
      .select(`
        *,
        profiles (
          first_name,
          last_name,
          email
        ),
        zones (
          name
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return data;
  }
}