"use client";

import LoginScreen from "./LoginScreen";

export default function QuotePageContent({
  authenticated,
}: {
  authenticated: boolean;
}) {
  if (!authenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-sky-50">
      <p className="text-slate-600">Quote form placeholder</p>
    </div>
  );
}
