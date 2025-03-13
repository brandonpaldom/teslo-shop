import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  register?: UseFormRegisterReturn;
}

export default function Checkbox({
  label,
  id,
  type = "checkbox",
  value,
  onChange,
  required = false,
  register,
  className,
  ...props
}: Props) {
  return (
    <label htmlFor={id} className="flex items-center gap-2">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        {...register}
        className={clsx("checkbox", className)}
        {...props}
      />
      <span className="text-[0.875rem] font-semibold text-neutral-500">
        {label}
      </span>
    </label>
  );
}
