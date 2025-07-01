'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateUserProfile } from '@/actions/profile';
import Button from '@/components/ui/button';
import Input from '@/components/ui/form/input';
import FormErrorMessage from '@/components/ui/form-error-message';

const profileSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileInfoProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string | null;
  };
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await updateUserProfile(formData);

      if (result.success) {
        router.refresh();
      } else {
        setErrorMessage(result.message || 'Failed to update profile');
      }
    } catch (_error) {
      setErrorMessage('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-medium text-lg text-neutral-900">
        Personal Information
      </h2>

      <form action={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input
            id="name"
            label="Full Name"
            {...register('name')}
            error={errors.name}
          />
          <Input
            id="email"
            label="Email Address"
            type="email"
            {...register('email')}
            error={errors.email}
          />

          <div className="sm:col-span-2">
            <p className="text-neutral-500 text-sm">
              Account Type:{' '}
              <span className="font-medium capitalize">{user.role}</span>
            </p>
          </div>
        </div>

        {errorMessage && <FormErrorMessage message={errorMessage} />}

        <div className="flex justify-end">
          <Button disabled={isSubmitting} type="submit" variant="primary">
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
