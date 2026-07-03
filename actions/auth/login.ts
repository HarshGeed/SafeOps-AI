"use server";

import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validations/auth";

export type LoginState = {
  success: boolean;
  message: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const values = Object.fromEntries(formData);

  const result = loginSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

  const { email, password } = result.data;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Authenticate user
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if(!user?.email_confirmed_at){
    await supabase.auth.signOut();

    return{
      success: false,
      message: "Please verify your email address before signing in"
    }
  }

  if (error || !user) {
    return {
      success: false,
      message: error?.message ?? "Invalid email or password.",
    };
  }

  // Fetch user's profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("status, role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    await supabase.auth.signOut();

    return {
      success: false,
      message: "Profile not found. Please contact the administrator.",
    };
  }

  // Account approval checks
  switch (profile.status) {
    case "pending":
      await supabase.auth.signOut();

      return {
        success: false,
        message:
          "Your account is awaiting administrator approval.",
      };

    case "rejected":
      await supabase.auth.signOut();

      return {
        success: false,
        message:
          "Your account has been rejected. Please contact the administrator.",
      };

    case "inactive":
      await supabase.auth.signOut();

      return {
        success: false,
        message:
          "Your account has been deactivated. Please contact the administrator.",
      };

    case "active":
      return {
        success: true,
        message: "Login successful.",
      };

    default:
      await supabase.auth.signOut();

      return {
        success: false,
        message: "Invalid account status.",
      };
  }
}