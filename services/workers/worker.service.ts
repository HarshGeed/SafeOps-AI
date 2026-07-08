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
        profiles(
          first_name,
          last_name,
          email
        ),
        zones(
          name
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return data;
  }

  static async createWorker(values: {
    profileId: string;
    employeeCode: string;
    department: string;
    designation: string;
    zoneId: string | null;
    status: string;
  }) {
    const cookieStore = await cookies();

    const supabase = createClient(cookieStore);

    const { error } = await supabase
      .from("workers")
      .insert({
        profile_id: values.profileId,
        employee_code: values.employeeCode,
        department: values.department,
        designation: values.designation,
        zone_id: values.zoneId,
        status: values.status,
      });

    if (error) throw error;
  }

  static async updateWorker(
    id: string,
    values: {
      employeeCode: string;
      department: string;
      designation: string;
      zoneId: string | null;
      status: string;
    }
  ) {
    const cookieStore = await cookies();

    const supabase = createClient(cookieStore);

    const { error } = await supabase
      .from("workers")
      .update({
        employee_code: values.employeeCode,
        department: values.department,
        designation: values.designation,
        zone_id: values.zoneId,
        status: values.status,
      })
      .eq("id", id);

    if (error) throw error;
  }

  static async deleteWorker(id: string) {
    const cookieStore = await cookies();

    const supabase = createClient(cookieStore);

    const { error } = await supabase
      .from("workers")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}