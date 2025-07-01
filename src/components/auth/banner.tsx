export default function AdminBanner() {
  return (
    <div className="flex h-8 items-center justify-center border border-neutral-200 bg-neutral-100 px-4">
      <p className="font-medium text-[0.75rem] text-neutral-900">
        You are currently logged in as an admin.
      </p>
    </div>
  );
}
