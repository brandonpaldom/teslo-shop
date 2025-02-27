import { auth } from "@/auth";
import { Title } from "@/components";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title title="Profile" />
      <pre className="rounded-lg bg-neutral-800 p-6 text-[0.875rem] text-white">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
