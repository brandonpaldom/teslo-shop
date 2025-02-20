"use client";

import clsx from "clsx";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import FormFieldError from "./form-field-error";

interface Props {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}

export default function FormSelect({
  label,
  id,
  register,
  error,
  className,
  options,
  defaultValue = "",
}: Props) {
  return (
    <label className={clsx("block", className)}>
      <span className="text-[0.875rem] font-semibold text-neutral-500">
        {label}
      </span>
      <select
        id={id}
        className={clsx("input mt-2", {
          "input-error": error,
        })}
        {...register}
        defaultValue={defaultValue}
        aria-invalid={!!error}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FormFieldError error={error} />
    </label>
  );
}
