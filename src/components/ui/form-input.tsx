"use client";

import clsx from "clsx";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import FormFieldError from "./form-field-error";

interface Props {
  label: string;
  id: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  placeholder?: string;
}

export default function FormInput({
  label,
  id,
  type = "text",
  register,
  error,
  className,
  placeholder,
}: Props) {
  return (
    <label className={clsx("block", className)}>
      <span className="text-[0.875rem] font-semibold text-neutral-500">
        {label}
      </span>
      <input
        id={id}
        type={type}
        className={clsx("input mt-2", {
          "input-error": error,
        })}
        {...register}
        placeholder={placeholder}
        aria-invalid={!!error}
      />
      <FormFieldError error={error} />
    </label>
  );
}
