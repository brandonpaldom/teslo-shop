import { Divider, LoginForm, Title } from "@/components";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto grid max-w-[400px] grid-cols-1 gap-6 p-6">
      <Title title="Login" />
      <LoginForm />
      <Link href="#" className="text-center text-[0.875rem] underline">
        Forgot password?
      </Link>
      <Divider />
      <Link href="/auth/register" className="btn-lg btn-secondary">
        Create Account
      </Link>
    </div>
  );
}
