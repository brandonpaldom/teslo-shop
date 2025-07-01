import type { InputHTMLAttributes } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import FormFieldError from '../form-field-error';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  register?: UseFormRegisterReturn;
  error?: FieldError | { type?: string; message?: string };
}

export default function FileInput({
  label,
  id,
  type = 'file',
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
    <label className="flex flex-col gap-2" htmlFor={id}>
      <span className="font-semibold text-[0.875rem] text-neutral-500">
        {label}
      </span>
      <input
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
        {...register}
        className={`block w-full text-neutral-500 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:font-semibold file:text-[0.875rem] file:text-white hover:file:bg-primary-dark ${className}`}
        {...props}
      />
      <FormFieldError error={error} />
    </label>
  );
}
