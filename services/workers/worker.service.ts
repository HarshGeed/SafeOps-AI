import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export class WorkerService {
  static async getWorkers() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("workers")
      .select("*, profile:profiles(*), zone:zones(*)");

    if (error) {
      console.error("Error fetching workers:", error);
      throw new Error(`Failed to fetch workers: ${error.message}`);
    }
    return data;
  }

  static async getWorker(id: string) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("workers")
      .select("*, profile:profiles(*), zone:zones(*)")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching worker:", error);
      throw new Error(`Failed to fetch worker: ${error.message}`);
    }
    return data;
  }
}