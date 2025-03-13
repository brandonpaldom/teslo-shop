import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "default" | "lg" | "sm";
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "default",
  className,
  ...props
}: ButtonProps) {
  const baseClasses = "btn disabled:opacity-30 disabled:cursor-not-allowed";
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    outline: "btn-outline",
    danger: "btn-danger",
  };

  const sizeClasses = {
    default: "",
    lg: "btn-lg",
    sm: "btn-sm",
  };

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
