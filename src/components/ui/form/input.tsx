import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import FormFieldError from "../form-field-error";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}

export default function Input({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error,
  register,
  className,
  ...props
}: Props) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="text-[0.875rem] font-semibold text-neutral-500">
        {label}
      </span>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        {...register}
        className={clsx("input", { "input-error": error }, className)}
        {...props}
      />
      <FormFieldError error={error} />
    </label>
  );
}
