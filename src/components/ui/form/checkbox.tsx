import clsx from 'clsx';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  register?: UseFormRegisterReturn;
}

export default function Checkbox({
  label,
  id,
  type = 'checkbox',
  value,
  onChange,
  required = false,
  register,
  className,
  ...props
}: Props) {
  return (
    <label className="flex items-center gap-2" htmlFor={id}>
      <input
        id={id}
        onChange={onChange}
        required={required}
        type={type}
        value={value}
        {...register}
        className={clsx('checkbox', className)}
        {...props}
      />
      <span className="font-semibold text-[0.875rem] text-neutral-500">
        {label}
      </span>
    </label>
  );
}
