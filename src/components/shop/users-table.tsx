'use client';

import { updateUserRole } from '@/actions/user';
import type { User } from '@/interfaces';
import EmptyState from '../ui/empty-state';

interface Props {
  users: User[];
}

export default function UsersTable({ users }: Props) {
  if (!users || users.length === 0) {
    return (
      <EmptyState
        message="There are no users to display."
        title="No Users Found"
      />
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-max text-left text-[0.875rem] text-neutral-500">
        <thead className="bg-neutral-50 text-neutral-700">
          <tr>
            <th className="px-6 py-3">User ID</th>
            <th className="px-6 py-3">Full Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="border-b bg-white hover:bg-neutral-50" key={user.id}>
              <td className="px-6 py-4 font-medium text-neutral-900">
                {user.id}
              </td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                <select
                  className="input w-32"
                  onChange={(e) =>
                    updateUserRole(user.id, e.target.value as 'admin' | 'user')
                  }
                  value={user.role}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
