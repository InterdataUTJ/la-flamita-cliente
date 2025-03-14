import React from "react";
import { Link } from "react-router";

interface ButtonProps {
  children: React.ReactNode | React.ReactNode[];

  // Button
  type?: "button" | "submit" | "reset";
  onClick?: () => void;

  // Link
  as?: "button" | typeof Link;
  to?: string;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
}

export default function Button({ children, type = "button", onClick, as = "button", to, disabled, loading, color = "primary" }: ButtonProps) {
  if (as === Link && to) {
    return (
      <Link
        to={to}
        className={`w-full font-bold rounded-lg text-sm px-5 py-2 text-center flex items-center justify-center gap-2 hover:bg-gray-100 active:bg-gray-200 text-white bg-${color}-600 hover:bg-${color}-500 active:bg-${color}-700`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={
        `${disabled || loading ? `bg-${color}-300` : `bg-${color}-600 hover:bg-${color}-500 active:bg-${color}-700`} 
        ${loading ? "cursor-wait" : ""} 
        w-full font-bold rounded-lg text-sm px-5 py-2 text-center flex items-center justify-center gap-2 text-white`
      }
    >
      {children}
    </button>
  );
}
