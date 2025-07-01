import { getAllUser } from '@/actions/user';
import { Title, UsersTable } from '@/components';
import type { User } from '@/interfaces';

export default async function AdminUsersPage() {
  const { data } = await getAllUser();

  const users = data as User[];

  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title title="All Users" />
      <UsersTable users={users} />
    </div>
  );
}
