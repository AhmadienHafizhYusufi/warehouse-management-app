import { Suspense } from "react";
import { getCurrentUser } from "@/lib/session";
import { signOut } from "@/lib/auth-action";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Dashboard</h1>
      <Suspense fallback={<p className="text-gray-500">Memuat data user...</p>}>
        <UserInfo />
      </Suspense>
    </main>
  );
}

async function UserInfo() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-3">
      <p>
        Halo, <strong>{user.name}</strong> ({user.email})
      </p>
      <p>
        Role:{" "}
        <span className="rounded bg-gray-100 px-2 py-1 text-sm">
          {user.role}
        </span>
      </p>
      {user.role === "admin" && (
        <Link href="/admin/users" className="text-blue-600 underline">
          Kelola user
        </Link>
      )}
      <form action={signOut}>
        <button type="submit" className="rounded border px-4 py-2">
          Logout
        </button>
      </form>
    </div>
  );
}
