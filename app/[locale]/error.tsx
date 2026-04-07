"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
      <div className="text-center max-w-md">
        <h2
          className="font-black text-slate-900 text-2xl mb-4"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          Something went wrong
        </h2>
        <p className="text-slate-600 mb-6">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="bg-sky-500 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
