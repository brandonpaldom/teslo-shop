"use client";

import { useActionState, useEffect } from "react";
import Button from "../ui/button";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import FormErrorMessage from "../ui/form-error-message";

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(login, undefined);

  useEffect(() => {
    if (state === "Success") {
      router.replace("/");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="grid grid-cols-1 gap-6">
      <label className="block">
        <span className="text-[0.875rem] font-semibold text-neutral-500">
          Email
        </span>
        <input type="text" name="email" className="input mt-2" />
      </label>
      <label className="block">
        <span className="text-[0.875rem] font-semibold text-neutral-500">
          Password
        </span>
        <input type="password" name="password" className="input mt-2" />
      </label>
      <FormErrorMessage message={state} />
      <Button variant="primary" size="lg" disabled={isPending}>
        Login
      </Button>
    </form>
  );
}
