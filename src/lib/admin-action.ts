"use server";

import { headers } from "next/headers";
import { refresh } from "next/cache";
import { APIError } from "better-auth/api";
import { auth } from "@/lib/auth";
import { requireAdmin } from "@/lib/session";

const ROLES = ["admin", "staff"] as const;
type Role = (typeof ROLES)[number];

export type CreateUserState = {
  error: string | null;
  success: string | null;
};

export async function createUser(
  _prevState: CreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "");

  if (!name || !email || !password) {
    return { error: "Nama, email, dan password wajib diisi", success: null };
  }
  if (password.length < 8) {
    return { error: "Password minimal 8 karakter", success: null };
  }
  if (!ROLES.includes(role as Role)) {
    return { error: "Role tidak valid", success: null };
  }

  try {
    await auth.api.createUser({
      body: { name, email, password, role: role as Role },
      headers: await headers(),
    });
  } catch (error) {
    if (error instanceof APIError) {
      return { error: error.message, success: null };
    }
    throw error;
  }

  refresh();
  return { error: null, success: `Akun ${email} berhasil dibuat` };
}
