import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light";
}

export function Logo({ className = "", showText = true, size = "md", variant = "default" }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-lg" },
    md: { icon: 40, text: "text-xl" },
    lg: { icon: 52, text: "text-3xl" },
  };
  const s = sizes[size];
  const skyline = variant === "light" ? "#FFFFFF" : "#0B3D6B";
  const wave = "#4DA6E8";
  const waveDeep = variant === "light" ? "#E8F4FD" : "#0B3D6B";
  const boat = variant === "light" ? "#FFD23F" : "#FF6B4A";
  const sun = "#FFD23F";

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Sun */}
        <circle cx="52" cy="12" r="6.5" fill={sun} />

        {/* Chicago skyline — stepped rectangular towers (not peaks) */}
        {/* Low left building */}
        <rect x="6" y="30" width="7" height="16" rx="0.5" fill={skyline} />
        {/* Mid building */}
        <rect x="14" y="24" width="6" height="22" rx="0.5" fill={skyline} />
        {/* Tall tower with antenna (Willis-style) */}
        <rect x="21" y="14" width="8" height="32" rx="0.5" fill={skyline} />
        <rect x="24" y="10" width="2" height="5" fill={skyline} />
        <circle cx="25" cy="9" r="1.2" fill={skyline} />
        {/* Mid-right tower */}
        <rect x="30" y="20" width="7" height="26" rx="0.5" fill={skyline} />
        {/* Hancock-style stepped top */}
        <rect x="38" y="17" width="6" height="29" rx="0.5" fill={skyline} />
        <rect x="39.5" y="14" width="3" height="4" fill={skyline} />
        {/* Shorter right building */}
        <rect x="45" y="26" width="6" height="20" rx="0.5" fill={skyline} />

        {/* Window accents on tallest tower */}
        <rect x="23" y="18" width="1.5" height="1.5" fill={variant === "light" ? "#0B3D6B" : "#4DA6E8"} opacity="0.55" />
        <rect x="26" y="18" width="1.5" height="1.5" fill={variant === "light" ? "#0B3D6B" : "#4DA6E8"} opacity="0.55" />
        <rect x="23" y="22" width="1.5" height="1.5" fill={variant === "light" ? "#0B3D6B" : "#4DA6E8"} opacity="0.55" />
        <rect x="26" y="22" width="1.5" height="1.5" fill={variant === "light" ? "#0B3D6B" : "#4DA6E8"} opacity="0.55" />

        {/* Lake Michigan waves */}
        <path
          d="M4 48 C12 44 18 50 26 46 C34 42 40 48 48 45 C54 43 58 46 60 48 L60 56 L4 56 Z"
          fill={wave}
        />
        <path
          d="M4 52 C14 49 22 54 32 51 C42 48 50 52 60 50 L60 56 L4 56 Z"
          fill={waveDeep}
          opacity="0.35"
        />

        {/* Simple boat on the water */}
        <path
          d="M18 46 L28 46 L26 50 L16 50 Z"
          fill={boat}
        />
        <path
          d="M22 46 L22 40 L27 46 Z"
          fill={boat}
        />
      </svg>
      {showText && (
        <span className={`font-extrabold tracking-tight ${s.text}`}>
          {variant === "light" ? (
            <>
              <span className="text-white">Boating</span>{" "}
              <span className="text-sun-yellow">Chicago</span>
            </>
          ) : (
            <>
              <span className="text-lake-blue">Boating</span>{" "}
              <span className="text-sky-blue">Chicago</span>
            </>
          )}
        </span>
      )}
    </Link>
  );
}
