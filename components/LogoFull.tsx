import Logo from "./Logo";

interface LogoFullProps {
  className?: string;
  iconSize?: number;
}

export default function LogoFull({ className = "", iconSize = 36 }: LogoFullProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Logo size={iconSize} />
      <span
        className="font-black text-xl text-white tracking-tight leading-none"
        style={{ fontFamily: "var(--font-outfit), sans-serif" }}
      >
        MGM{" "}
        <span className="text-sky-400">A/C</span>
      </span>
    </span>
  );
}
