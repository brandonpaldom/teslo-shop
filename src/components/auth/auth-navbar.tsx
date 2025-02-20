import Image from "next/image";
import Link from "next/link";

export default function AuthNavbar() {
  return (
    <nav className="sticky top-0 z-10 flex h-14 items-center justify-between bg-white px-4">
      <Link href="/" className="mr-8">
        <Image src="/teslo-logo.svg" alt="Teslo logo" width={99} height={10} />
      </Link>
      <Link href="/" className="btn btn-ghost">
        Shop
      </Link>
    </nav>
  );
}
