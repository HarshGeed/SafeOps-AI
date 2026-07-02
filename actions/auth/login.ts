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

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Login successful.",
  };
}