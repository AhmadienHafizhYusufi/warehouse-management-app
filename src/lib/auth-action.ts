"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth";
import { auth } from "@/lib/auth";

export type SignInState = { error: string | null };

export async function signIn(
  _prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi" };
  }

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });
  } catch (error) {
    if (error instanceof APIError) {
      return { error: "Email atau password salah" };
    }
    throw error;
  }

  redirect("/dashboard");
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
}
