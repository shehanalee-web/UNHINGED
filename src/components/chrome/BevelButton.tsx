import type { ButtonHTMLAttributes } from "react";

export function BevelButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bevel inline-flex min-h-11 items-center justify-center px-4 py-2 font-ui text-sm uppercase tracking-wide ${className}`}
      {...props}
    />
  );
}
