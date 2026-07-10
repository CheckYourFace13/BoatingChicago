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
  const markFill = variant === "light" ? "#FFD23F" : "#0B3D6B";
  const waveFill = variant === "light" ? "#4DA6E8" : "#4DA6E8";

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
        <circle cx="48" cy="16" r="7" fill="#FFD23F" opacity="0.95" />
        <path
          d="M8 34 L22 22 L32 30 L44 18 L56 28"
          stroke={markFill}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M6 44 C16 40 24 48 34 44 C44 40 52 46 58 43 L58 50 C48 52 40 48 30 51 C20 54 12 50 6 52 Z"
          fill={waveFill}
        />
        <path
          d="M10 48 C20 45 28 51 38 47 C46 44 52 48 58 46"
          stroke={variant === "light" ? "#E8F4FD" : "#0B3D6B"}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M26 42 L32 36 L40 39 L36 45 L28 46 Z"
          fill={variant === "light" ? "#FFFFFF" : "#FFFFFF"}
          stroke={markFill}
          strokeWidth="1.25"
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
