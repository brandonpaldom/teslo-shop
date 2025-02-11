import clsx from "clsx";

interface Props {
  className?: string;
}

export default function Divider({ className }: Props) {
  return <hr className={clsx("border-gray-200", className)} />;
}
