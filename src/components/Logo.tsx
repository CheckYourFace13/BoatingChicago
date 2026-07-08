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
    lg: { icon: 56, text: "text-3xl" },
  };
  const s = sizes[size];

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
        <circle cx="52" cy="12" r="8" fill="#FFD23F" />
        <rect x="8" y="38" width="4" height="14" fill="#0B3D6B" rx="1" />
        <rect x="14" y="34" width="4" height="18" fill="#0B3D6B" rx="1" />
        <rect x="20" y="30" width="4" height="22" fill="#0B3D6B" rx="1" />
        <rect x="26" y="26" width="4" height="26" fill="#0B3D6B" rx="1" />
        <rect x="32" y="32" width="4" height="20" fill="#4DA6E8" rx="1" />
        <rect x="38" y="28" width="4" height="24" fill="#4DA6E8" rx="1" />
        <rect x="44" y="34" width="4" height="18" fill="#0B3D6B" rx="1" />
        <path
          d="M4 46 C16 42, 28 44, 40 42 C48 41, 56 43, 62 46 L62 52 C48 48, 32 50, 16 52 L4 52 Z"
          fill="#4DA6E8"
        />
        <path
          d="M6 50 C18 47, 30 49, 42 47 C50 46, 58 48, 62 50 L62 54 C50 52, 34 54, 18 56 L6 56 Z"
          fill="#0B3D6B"
          opacity="0.3"
        />
        <path
          d="M28 38 L36 32 L44 36 L40 42 L32 44 L26 42 Z"
          fill="#FFFFFF"
          stroke="#0B3D6B"
          strokeWidth="1.5"
        />
        <path d="M32 32 L32 24" stroke="#FF6B4A" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M32 24 L28 30 M32 24 L36 30"
          stroke="#FF6B4A"
          strokeWidth="1.5"
          strokeLinecap="round"
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
