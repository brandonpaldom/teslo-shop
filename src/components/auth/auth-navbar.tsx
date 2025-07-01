import Image from 'next/image';
import Link from 'next/link';

export default function AuthNavbar() {
  return (
    <nav className="sticky top-0 z-10 flex h-14 items-center justify-between bg-white px-4">
      <Link className="mr-8" href="/">
        <Image alt="Teslo logo" height={10} src="/teslo-logo.svg" width={99} />
      </Link>
      <Link className="btn btn-ghost" href="/">
        Shop
      </Link>
    </nav>
  );
}
