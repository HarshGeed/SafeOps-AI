export default function WaitingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="max-w-lg rounded-xl border p-8 text-center shadow">
        <h1 className="text-3xl font-bold">
          Account Created Successfully
        </h1>

        <p className="mt-4 text-muted-foreground">
          Your email has been verified.
        </p>

        <p className="mt-2 text-muted-foreground">
          Your account is currently waiting for administrator approval.
        </p>

        <p className="mt-6 font-medium">
          Youll be able to log in once your account has been approved.
        </p>
      </div>
    </main>
  );
}