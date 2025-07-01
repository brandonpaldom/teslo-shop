import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex h-[7.5rem] items-center justify-center px-4 sm:h-14">
      <p className="text-neutral-500 text-xs">
        &copy; 2025 Teslo • Created by{' '}
        <Link
          className="font-semibold"
          href="https://brandonpalmeros.dev/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Brandon Palmeros
        </Link>
      </p>
    </footer>
  );
}
