import { useRouteError, Link } from "react-router";

export default function GlobalError() {
  const error = useRouteError() as any;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-4">Oops! Something went wrong.</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        {error?.statusText || error?.message || "An unexpected error occurred. Our team has been notified."}
      </p>
      <Link to="/" className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg">
        Back to Home
      </Link>
    </div>
  );
}