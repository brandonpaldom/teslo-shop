import clsx from "clsx";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import FormFieldError from "../form-field-error";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}

export default function Select({
  label,
  id,
  value,
  onChange,
  required = false,
  error,
  register,
  className,
  children,
  ...props
}: Props) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="text-[0.875rem] font-semibold text-neutral-500">
        {label}
      </span>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        {...register}
        className={clsx("input", { "input-error": error }, className)}
        {...props}
      >
        {children}
      </select>
      <FormFieldError error={error} />
    </label>
  );
}
