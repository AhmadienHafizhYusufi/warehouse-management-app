import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export async function getCurrentUser(): Promise<CurrentUser> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { id, name, email, role } = session.user;
  return { id, name, email, role: role ?? "staff" };
}

export async function requireAdmin(): Promise<CurrentUser> {
  const user = await getCurrentUser();

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return user;
}
