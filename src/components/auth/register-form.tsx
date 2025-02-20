"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/button";
import { authenticate, registerUser } from "@/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterData, registerSchema } from "@/schemas";
import FormErrorMessage from "../ui/form-error-message";
import FormInput from "../ui/form-input";

export default function RegisterForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    setErrorMessage("");
    try {
      const { name, email, password } = data;
      const response = await registerUser(name, email, password);

      if (!response.ok) {
        setErrorMessage(response.message);
        return;
      }

      await authenticate(email, password);
      router.replace("/");
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
      <FormInput
        label="Name"
        id="name"
        register={register("name")}
        error={errors.name}
      />
      <FormInput
        label="Email"
        id="email"
        type="email"
        register={register("email")}
        error={errors.email}
      />
      <FormInput
        label="Password"
        id="password"
        type="password"
        register={register("password")}
        error={errors.password}
      />
      <FormInput
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        register={register("confirmPassword")}
        error={errors.confirmPassword}
      />
      <p className="text-[0.75rem] text-neutral-500">
        By creating an account you agree to our{" "}
        <span className="underline">Terms of Service</span> and{" "}
        <span className="underline">Privacy Policy</span>.
      </p>
      <FormErrorMessage message={errorMessage} />
      <Button variant="primary" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
