import { Suspense } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { requireAdmin } from "@/lib/session";

export default function AdminUsersPage() {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Kelola User</h1>
      <Suspense
        fallback={<p className="text-gray-500">Memuat daftar user...</p>}
      >
        <UserList />
      </Suspense>
    </main>
  );
}

async function UserList() {
  await requireAdmin();

  const { users } = await auth.api.listUsers({
    query: { sortBy: "createdAt", sortDirection: "desc" },
    headers: await headers(),
  });

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b text-left">
          <th className="py-2">Nama</th>
          <th className="py-2">Email</th>
          <th className="py-2">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b">
            <td className="py-2">{user.name}</td>
            <td className="py-2">{user.email}</td>
            <td className="py-2">{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
