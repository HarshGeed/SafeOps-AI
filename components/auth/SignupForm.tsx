"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { signup, type SignupState } from "@/actions/auth/signup";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: SignupState = {
  success: false,
  message: "",
};

export function SignupForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    signup,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      router.push("/auth/check-email");
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>

          <Input
            id="firstName"
            name="firstName"
            placeholder="Harsh"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>

          <Input
            id="lastName"
            name="lastName"
            placeholder="Geed"
            required
          />
        </div>
      </div>

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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirm Password
        </Label>

        <Input
          id="confirmPassword"
          name="confirmPassword"
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
        {isPending ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}