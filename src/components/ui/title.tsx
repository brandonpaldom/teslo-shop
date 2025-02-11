import clsx from "clsx";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function Title({ title, subtitle, className }: Props) {
  return (
    <div className={clsx("flex flex-col gap-10", className)}>
      <h1 className="text-[1.5rem] font-bold capitalize leading-tight">
        {title}
      </h1>
      {subtitle && (
        <h2 className="flex h-10 items-center text-[1.5rem] leading-tight">
          {subtitle}
        </h2>
      )}
    </div>
  );
}
