"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { login, type LoginState } from "@/actions/auth/login";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: LoginState = {
  success: false,
  message: "",
};

export function LoginForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    login,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          name="email"
          type="email"
          placeholder="harsh@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          name="password"
          type="password"
          required
        />
      </div>

      {state.message && (
        <p
          className={`text-sm ${
            state.success
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}