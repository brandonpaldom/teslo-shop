import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex h-[7.5rem] items-center justify-center px-4 sm:h-14">
      <p className="text-xs text-neutral-500">
        &copy; 2025 Teslo • Created by{" "}
        <Link
          href="https://brandonpalmeros.dev/"
          className="font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Brandon Palmeros
        </Link>
      </p>
    </footer>
  );
}
