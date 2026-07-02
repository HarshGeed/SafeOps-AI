import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container flex min-h-screen items-center justify-center py-10">
        {children}
      </div>
    </main>
  );
}