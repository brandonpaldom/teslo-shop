import clsx from "clsx";
import { FieldError } from "react-hook-form";

interface Props {
  error?: FieldError;
  className?: string;
}

export default function FormFieldError({ error, className }: Props) {
  if (!error?.message) return null;

  return (
    <p className={clsx("mt-2 text-[0.75rem] text-red-500", className)}>
      {error.message}
    </p>
  );
}
