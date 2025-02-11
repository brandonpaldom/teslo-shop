import { Button, Divider, Title } from "@/components";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="mx-auto grid max-w-[400px] grid-cols-1 gap-6 p-6">
      <Title title="Create Account" />
      <div className="grid grid-cols-1 gap-6">
        <label className="block">
          <span className="text-[0.875rem] font-semibold text-neutral-500">
            Full Name
          </span>
          <input type="text" className="mt-2" />
        </label>
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
      <p className="text-[0.75rem] text-neutral-500">
        By creating an account, you agree to the{" "}
        <span className="underline">Terms of Service</span> and{" "}
        <span className="underline">Privacy Policy</span>.
      </p>
      <Button variant="primary" size="lg">
        Create Account
      </Button>
      <Divider />
      <Link href="/auth/login" className="btn-lg btn-secondary">
        Login
      </Link>
    </div>
  );
}
