import { Divider, RegisterForm, Title } from "@/components";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="mx-auto grid max-w-[400px] grid-cols-1 gap-6 p-6">
      <Title title="Create Account" />
      <RegisterForm />
      <Divider />
      <Link href="/auth/login" className="btn-lg btn-secondary">
        Login
      </Link>
    </div>
  );
}
