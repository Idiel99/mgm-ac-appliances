"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    const locale = browserLang.startsWith("es") ? "es" : "en";
    router.replace(`/${locale}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50">
      <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
    </div>
  );
}
