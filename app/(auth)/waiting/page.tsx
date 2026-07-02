import { Card, CardContent } from "@/components/ui/card";

export default function WaitingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="max-w-lg">
        <CardContent className="space-y-4 p-8 text-center">
          <h1 className="text-3xl font-bold">
            Verify Your Email
          </h1>

          <p className="text-muted-foreground">
            We've sent a verification link to your email
            address.
          </p>

          <p className="text-muted-foreground">
            After verifying your email, your account will
            remain pending until an administrator approves
            it.
          </p>

          <p className="font-medium">
            You can close this page now.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}