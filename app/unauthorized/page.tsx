export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">
          403
        </h1>

        <h2 className="text-2xl font-semibold">
          Access Denied
        </h2>

        <p className="text-muted-foreground">
          You don not have permission to access this page.
        </p>
      </div>
    </div>
  );
}