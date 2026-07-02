import { Card, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="space-y-6 p-8">
        {children}
      </CardContent>
    </Card>
  );
}