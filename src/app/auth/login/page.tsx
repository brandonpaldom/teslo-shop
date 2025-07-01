import Link from 'next/link';
import { Divider, LoginForm, Title } from '@/components';

export default function LoginPage() {
  return (
    <div className="mx-auto grid max-w-[400px] grid-cols-1 gap-6 p-6">
      <Title title="Login" />
      <LoginForm />
      <Link className="text-center text-[0.875rem] underline" href="#">
        Forgot password?
      </Link>
      <Divider />
      <Link className="btn-lg btn-secondary" href="/auth/register">
        Create Account
      </Link>
    </div>
  );
}
