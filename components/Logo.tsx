interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MGM A/C Appliances logo"
    >
      {/* Outer circle — AC vent ring */}
      <circle cx="60" cy="60" r="56" stroke="#0EA5E9" strokeWidth="3" opacity="0.25" />
      <circle cx="60" cy="60" r="48" stroke="#0EA5E9" strokeWidth="2" opacity="0.15" />

      {/* Inner filled circle — dark backdrop */}
      <circle cx="60" cy="60" r="44" fill="#0F172A" />

      {/* Subtle radial glow behind snowflake */}
      <radialGradient id="logo-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
      </radialGradient>
      <circle cx="60" cy="60" r="38" fill="url(#logo-glow)" />

      {/* Snowflake / fan hybrid — 6 blades radiating from center */}
      <g transform="translate(60, 60)">
        {/* Main axis lines — snowflake arms */}
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            {/* Main arm */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-28"
              stroke="#BAE6FD"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Crystal branch left */}
            <line
              x1="0"
              y1="-14"
              x2="-7"
              y2="-21"
              stroke="#BAE6FD"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Crystal branch right */}
            <line
              x1="0"
              y1="-14"
              x2="7"
              y2="-21"
              stroke="#BAE6FD"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Tip diamond */}
            <circle
              cx="0"
              cy="-28"
              r="2"
              fill="#0EA5E9"
            />
          </g>
        ))}

        {/* Center hub — fan motor */}
        <circle r="6" fill="#0EA5E9" />
        <circle r="3.5" fill="#0F172A" />
        <circle r="1.8" fill="#BAE6FD" />
      </g>

      {/* Curved airflow lines — wrapping around the snowflake */}
      <path
        d="M 30 38 Q 38 30, 50 28"
        stroke="#0EA5E9"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M 26 50 Q 32 40, 44 35"
        stroke="#0EA5E9"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M 90 82 Q 82 90, 70 92"
        stroke="#0EA5E9"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M 94 70 Q 88 80, 76 85"
        stroke="#0EA5E9"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />

      {/* Outer accent dots — like condensation / cool mist */}
      <circle cx="24" cy="60" r="1.5" fill="#BAE6FD" opacity="0.5" />
      <circle cx="96" cy="60" r="1.5" fill="#BAE6FD" opacity="0.5" />
      <circle cx="60" cy="24" r="1.5" fill="#BAE6FD" opacity="0.5" />
      <circle cx="60" cy="96" r="1.5" fill="#BAE6FD" opacity="0.5" />
    </svg>
  );
}
