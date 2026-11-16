"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "@/lib/auth-action";

const initialState: SignInState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="rounded border px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Password</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="rounded border px-3 py-2"
        />
      </label>

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-2xl bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
