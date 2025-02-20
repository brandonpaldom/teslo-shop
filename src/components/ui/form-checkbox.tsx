"use client";

import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormCheckboxProps {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  className?: string;
  disabled?: boolean;
}

export default function FormCheckbox({
  label,
  id,
  register,
  className,
  disabled = false,
}: FormCheckboxProps) {
  return (
    <div className={clsx("flex items-center", className)}>
      <input
        type="checkbox"
        id={id}
        className="h-4 w-4 rounded border-transparent bg-neutral-100 text-primary focus:ring-2 focus:ring-primary"
        {...register}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className="ms-2 text-[0.875rem] font-medium text-neutral-900"
      >
        {label}
      </label>
    </div>
  );
}
