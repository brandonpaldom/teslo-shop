import Link from "next/link";

export default function NotFoundView() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="text-9xl">404</div>
      <h2 className="text-2xl font-semibold">Whoops! Sorry about that.</h2>
      <p className="text-sm text-neutral-500">
        Join Starman back at the{" "}
        <Link href="/" className="font-semibold">
          homepage
        </Link>{" "}
        or visit our FAQ Page for help.
      </p>
    </div>
  );
}
