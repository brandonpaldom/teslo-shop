'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { authenticate, registerUser } from '@/actions/auth';
import { type RegisterData, registerSchema } from '@/schemas';
import Button from '../ui/button';
import Input from '../ui/form/input';
import FormErrorMessage from '../ui/form-error-message';

export default function RegisterForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    setErrorMessage('');
    try {
      const { name, email, password } = data;
      const response = await registerUser(name, email, password);

      if (!response.ok) {
        setErrorMessage(response.message);
        return;
      }

      await authenticate(email, password);
      router.replace('/');
    } catch (_error) {
      setErrorMessage('Something went wrong.');
    }
  };

  return (
    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        error={errors.name}
        id="name"
        label="Name"
        register={register('name')}
      />
      <Input
        error={errors.email}
        id="email"
        label="Email"
        register={register('email')}
        type="email"
      />
      <Input
        error={errors.password}
        id="password"
        label="Password"
        register={register('password')}
        type="password"
      />
      <Input
        error={errors.confirmPassword}
        id="confirmPassword"
        label="Confirm Password"
        register={register('confirmPassword')}
        type="password"
      />
      <p className="text-[0.75rem] text-neutral-500">
        By creating an account you agree to our{' '}
        <span className="underline">Terms of Service</span> and{' '}
        <span className="underline">Privacy Policy</span>.
      </p>
      <FormErrorMessage message={errorMessage} />
      <Button disabled={isSubmitting} size="lg" variant="primary">
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
}
