import clsx from "clsx";

interface Props {
  message?: string;
  className?: string;
}

export default function FormErrorMessage({ message, className }: Props) {
  if (!message) return null;

  return (
    <p className={clsx("text-[0.875rem] text-red-500", className)}>{message}</p>
  );
}
