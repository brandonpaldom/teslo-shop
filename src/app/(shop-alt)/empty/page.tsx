import { Title } from "@/components";
import Link from "next/link";

export default function EmptyCartPage() {
  return (
    <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-6 p-6 lg:max-w-[1024px]">
      <Title title="Cart" />
      <div className="flex flex-col items-center gap-6 md:max-w-[768px] md:items-start">
        <h2>Your cart is empty.</h2>
        <div className="flex w-[320px] flex-col gap-4 md:w-fit md:flex-row">
          <Link href="/" className="btn-lg btn-primary md:w-[320px]">
            Continue Shopping
          </Link>
          <Link href="/auth/login" className="btn-lg btn-outline md:w-[320px]">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
