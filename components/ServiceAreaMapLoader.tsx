"use client";

import dynamic from "next/dynamic";

const ServiceAreaMap = dynamic(() => import("./ServiceAreaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] rounded-2xl bg-slate-200 animate-pulse" />
  ),
});

export default function ServiceAreaMapLoader() {
  return <ServiceAreaMap />;
}
