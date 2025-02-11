import { Button, Divider, Title } from "@/components";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto grid max-w-[400px] grid-cols-1 gap-6 p-6">
      <Title title="Login" />
      <div className="grid grid-cols-1 gap-6">
        <label className="block">
          <span className="text-[0.875rem] font-semibold text-neutral-500">
            Email
          </span>
          <input type="text" className="mt-2" />
        </label>
        <label className="block">
          <span className="text-[0.875rem] font-semibold text-neutral-500">
            Password
          </span>
          <input type="password" className="mt-2" />
        </label>
      </div>
      <Button variant="primary" size="lg">
        Login
      </Button>
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
