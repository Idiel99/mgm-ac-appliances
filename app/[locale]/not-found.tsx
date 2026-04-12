import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-[#0c1e3e] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div
          className="text-8xl font-black text-sky-500 mb-4"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          404
        </div>
        <h1
          className="text-2xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          Page Not Found
        </h1>
        <p className="text-white/50 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/en"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Go to Homepage
          </Link>
          <a
            href="tel:7863520084"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3 rounded-lg border border-white/15 transition-colors"
          >
            📞 (786) 352-0084
          </a>
        </div>
      </div>
    </div>
  );
}
