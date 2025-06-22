"use client";

import { updateUserProfile } from "@/actions/profile";
import Button from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import FormErrorMessage from "@/components/ui/form-error-message";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
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
        setErrorMessage(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setErrorMessage("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg">
      <h2 className="text-lg font-medium text-neutral-900 mb-4">Personal Information</h2>
      
      <form action={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Input
            label="Full Name"
            id="name"
            {...register("name")}
            error={errors.name}
          />
          <Input
            label="Email Address"
            id="email"
            type="email"
            {...register("email")}
            error={errors.email}
          />
          
          <div className="sm:col-span-2">
            <p className="text-sm text-neutral-500">
              Account Type: <span className="font-medium capitalize">{user.role}</span>
            </p>
          </div>
        </div>
        
        {errorMessage && <FormErrorMessage message={errorMessage} />}
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}