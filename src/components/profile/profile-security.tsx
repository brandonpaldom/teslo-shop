'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { changePassword } from '@/actions/profile';
import Button from '@/components/ui/button';
import Input from '@/components/ui/form/input';
import FormErrorMessage from '@/components/ui/form-error-message';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Current password is required'),
    newPassword: z
      .string()
      .min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ProfileSecurity() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const result = await changePassword(formData);

      if (result.success) {
        setSuccessMessage('Password changed successfully');
        reset();
        router.refresh();
      } else {
        setErrorMessage(result.message || 'Failed to change password');
      }
    } catch {
      setErrorMessage('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-medium text-lg text-neutral-900">
        Security Settings
      </h2>

      <form action={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <Input
            id="currentPassword"
            label="Current Password"
            type="password"
            {...register('currentPassword')}
            error={errors.currentPassword}
          />

          <Input
            id="newPassword"
            label="New Password"
            type="password"
            {...register('newPassword')}
            error={errors.newPassword}
          />

          <Input
            id="confirmPassword"
            label="Confirm New Password"
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword}
          />
        </div>

        {errorMessage && <FormErrorMessage message={errorMessage} />}
        {successMessage && (
          <div className="rounded-md bg-green-50 p-4 text-green-700">
            {successMessage}
          </div>
        )}

        <div className="flex justify-end">
          <Button disabled={isSubmitting} type="submit" variant="primary">
            {isSubmitting ? 'Changing Password...' : 'Change Password'}
          </Button>
        </div>
      </form>
    </div>
  );
}
