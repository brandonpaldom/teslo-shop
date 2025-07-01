'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { login } from '@/actions/auth';
import Button from '../ui/button';
import Input from '../ui/form/input';
import FormErrorMessage from '../ui/form-error-message';

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(login, undefined);

  useEffect(() => {
    if (state === 'Success') {
      router.replace('/');
    }
  }, [state, router]);

  return (
    <form action={formAction} className="grid grid-cols-1 gap-6">
      <Input id="email" label="Email" name="email" type="email" />
      <Input id="password" label="Password" name="password" type="password" />
      <FormErrorMessage message={state} />
      <Button disabled={isPending} size="lg" variant="primary">
        Login
      </Button>
    </form>
  );
}
