export type AuthState = {
  success: boolean;

  error?: string;

  fieldErrors?: Record<string, string[]>;
};