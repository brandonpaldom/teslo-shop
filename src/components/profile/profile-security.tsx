"use client";

import { changePassword } from "@/actions/profile";
import Button from "@/components/ui/button";
import Input from "@/components/ui/form/input";
import FormErrorMessage from "@/components/ui/form-error-message";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
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
        setSuccessMessage("Password changed successfully");
        reset();
        router.refresh();
      } else {
        setErrorMessage(result.message || "Failed to change password");
      }
    } catch {
      setErrorMessage("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg">
      <h2 className="text-lg font-medium text-neutral-900 mb-4">Security Settings</h2>
      
      <form action={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <Input
            label="Current Password"
            id="currentPassword"
            type="password"
            {...register("currentPassword")}
            error={errors.currentPassword}
          />
          
          <Input
            label="New Password"
            id="newPassword"
            type="password"
            {...register("newPassword")}
            error={errors.newPassword}
          />
          
          <Input
            label="Confirm New Password"
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword}
          />
        </div>
        
        {errorMessage && <FormErrorMessage message={errorMessage} />}
        {successMessage && (
          <div className="p-4 rounded-md bg-green-50 text-green-700">
            {successMessage}
          </div>
        )}
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Changing Password..." : "Change Password"}
          </Button>
        </div>
      </form>
    </div>
  );
}