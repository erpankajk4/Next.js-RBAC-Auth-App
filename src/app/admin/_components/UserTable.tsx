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
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Email</th>
          <th className="p-2 text-left">Role</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-t">
            <td className="p-2">{user.name}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.role}</td>
            <td className="p-2">
              <button
                onClick={() => handleRoleChange(user.id, user.role)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                disabled={isPending}
              >
                Make {user.role === "ADMIN" ? "USER" : "ADMIN"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
