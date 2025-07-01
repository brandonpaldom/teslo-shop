import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import FormFieldError from '../form-field-error';

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
    <label className="flex flex-col gap-2" htmlFor={id}>
      <span className="font-semibold text-[0.875rem] text-neutral-500">
        {label}
      </span>
      <textarea
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        value={value}
        {...register}
        className={clsx(
          'input mt-2 h-[100px] resize-none',
          { 'input-error': error },
          className
        )}
        {...props}
      />
      <FormFieldError error={error} />
    </label>
  );
}
