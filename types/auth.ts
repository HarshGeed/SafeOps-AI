export type AuthState = {
  success: boolean;

  error?: string;

  fieldErrors?: Record<string, string[]>;
};

export type UserRole = "admin" | "supervisor" | "saftey_officer" | "worker";