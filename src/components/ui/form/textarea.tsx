import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import FormFieldError from "../form-field-error";

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}

export default function TextArea({
  label,
  id,
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
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        {...register}
        className={clsx(
          "input mt-2 h-[100px] resize-none",
          { "input-error": error },
          className,
        )}
        {...props}
      />
      <FormFieldError error={error} />
    </label>
  );
}
