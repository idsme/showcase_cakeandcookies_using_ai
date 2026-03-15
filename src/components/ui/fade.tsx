"use client";

interface FadeProps {
  children: React.ReactNode;
  show: boolean;
  delay?: number;
}

export function Fade({ children, show, delay = 0 }: FadeProps) {
  return (
    <div
      className="transition-all duration-600 ease-out"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
