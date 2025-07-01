import clsx from 'clsx';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import FormFieldError from '../form-field-error';

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
    <label className="flex flex-col gap-2" htmlFor={id}>
      <span className="font-semibold text-[0.875rem] text-neutral-500">
        {label}
      </span>
      <select
        id={id}
        onChange={onChange}
        required={required}
        value={value}
        {...register}
        className={clsx('input', { 'input-error': error }, className)}
        {...props}
      >
        {children}
      </select>
      <FormFieldError error={error} />
    </label>
  );
}
