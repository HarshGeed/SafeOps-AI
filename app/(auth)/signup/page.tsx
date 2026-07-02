import { AuthCard } from "@/components/auth/AuthCard";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthCard>
      <AuthHeader
        title="Create your account"
        description="Register to access SafeOps"
      />

      <SignupForm />
    </AuthCard>
  );
}