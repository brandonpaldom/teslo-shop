import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import FormFieldError from "../form-field-error";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  register?: UseFormRegisterReturn;
  error?: FieldError | { type?: string; message?: string };
}

export default function FileInput({
  label,
  id,
  type = "file",
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
        className={`block w-full text-sm text-neutral-500 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-[0.875rem] file:font-semibold file:text-white hover:file:bg-primary-dark ${className}`}
        {...props}
      />
      <FormFieldError error={error} />
    </label>
  );
}
