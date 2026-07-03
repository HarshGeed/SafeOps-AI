"use server";

import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { signUpSchema } from "@/lib/validations/auth";

export type SignupState = {
  success: boolean;
  message: string;
};

export async function signup(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {

  const values = Object.fromEntries(formData);

  const result = signUpSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

  const { firstName, lastName, email, password } = result.data;

  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message:
      "Account created successfully. Please verify your email before logging in.",
  };
}