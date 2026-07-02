import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name is required"),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name is required"),

    email: z
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const loginSchema = z.object({
  email: z.email(),

  password: z.string().min(1),
});