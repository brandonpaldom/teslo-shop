interface Props {
  title: string;
  message: string;
}

export default function EmptyState({ title = '', message = '' }: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h2 className="font-semibold text-[1.5rem]">{title}</h2>
      <p className="mt-2 text-neutral-500">{message}</p>
    </div>
  );
}
