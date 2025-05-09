"use client";

import { useTransition } from "react";
import { updateUserRole } from "../actions";

type User = {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "ADMIN";
};

export default function UserTable({ users }: { users: User[] }) {
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (id: string, currentRole: string) => {
    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    startTransition(() => {
      updateUserRole(id, newRole);
    });
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[600px] w-full border rounded-xl overflow-hidden text-sm sm:text-base">
        <thead>
          <tr className="bg-[#80e0ef] text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t bg-zinc-200">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">
                <button
                  onClick={() => handleRoleChange(user.id, user.role)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                  disabled={isPending}
                >
                  Make {user.role === "ADMIN" ? "USER" : "ADMIN"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
