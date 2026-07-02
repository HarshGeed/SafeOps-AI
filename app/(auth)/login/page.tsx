import { AuthCard } from "@/components/auth/AuthCard";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard>
      <AuthHeader
        title="Welcome Back"
        description="Sign in to SafeOps"
      />

      <LoginForm />
    </AuthCard>
  );
}