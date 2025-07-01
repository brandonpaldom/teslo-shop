import Link from 'next/link';
import { Divider, RegisterForm, Title } from '@/components';

export default function RegisterPage() {
  return (
    <div className="mx-auto grid max-w-[400px] grid-cols-1 gap-6 p-6">
      <Title title="Create Account" />
      <RegisterForm />
      <Divider />
      <Link className="btn-lg btn-secondary" href="/auth/login">
        Login
      </Link>
    </div>
  );
}
