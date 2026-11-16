"use client";

import { useActionState } from "react";
import { createUser, type CreateUserState } from "@/lib/admin-action";

const initialState: CreateUserState = { error: null, success: null };

export function CreateUserForm() {
  const [state, formAction, pending] = useActionState(createUser, initialState);

  return (
    <form
      action={formAction}
      className="mb-8 flex max-w-md flex-col gap-3 rounded-lg border p-4"
    >
      <h2 className="font-semibold">Tambah user baru</h2>

      <input
        name="name"
        placeholder="Nama"
        required
        className="rounded border px-3 py-2"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="rounded border px-3 py-2"
      />
      <input
        name="password"
        type="password"
        placeholder="Password (minimal 8 karakter)"
        required
        minLength={8}
        autoComplete="new-password"
        className="rounded border px-3 py-2"
      />
      <select
        name="role"
        defaultValue="staff"
        className="rounded border px-3 py-2"
      >
        <option value="staff">Staf</option>
        <option value="admin">Admin</option>
      </select>

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="text-sm text-green-700">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Menyimpan..." : "Buat akun"}
      </button>
    </form>
  );
}
