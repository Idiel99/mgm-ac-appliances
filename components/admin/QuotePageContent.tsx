"use client";

export default function QuotePageContent({
  authenticated,
}: {
  authenticated: boolean;
}) {
  if (!authenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-sky-50">
        <p className="text-slate-600">Login screen placeholder</p>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-sky-50">
      <p className="text-slate-600">Quote form placeholder</p>
    </div>
  );
}
