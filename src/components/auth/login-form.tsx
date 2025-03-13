"use client";

import { useActionState, useEffect } from "react";
import Button from "../ui/button";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import FormErrorMessage from "../ui/form-error-message";
import Input from "../ui/form/input";

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
      <Input label="Email" id="email" name="email" type="email" />
      <Input label="Password" id="password" name="password" type="password" />
      <FormErrorMessage message={state} />
      <Button variant="primary" size="lg" disabled={isPending}>
        Login
      </Button>
    </form>
  );
}
