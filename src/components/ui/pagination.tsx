"use client";

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export default function Pagination({ totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const paginationNumbers = generatePaginationNumbers(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string): string => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "..." || +pageNumber <= 0 || +pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    params.set("page", String(pageNumber));

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex gap-2">
      <Link
        href={createPageURL(currentPage - 1)}
        className={clsx(
          "flex h-8 w-8 items-center justify-center rounded transition-colors duration-300 hover:bg-neutral-100",
          currentPage === 1 && "pointer-events-none opacity-50",
        )}
      >
        <IoChevronBackOutline />
      </Link>
      {paginationNumbers.map((number, index) => (
        <Link
          key={`${number}-${index}`}
          href={createPageURL(number)}
          className={clsx(
            "flex h-8 w-8 items-center justify-center rounded transition-colors duration-300 hover:bg-neutral-100",
            number === currentPage && "bg-neutral-100",
            number === "..." && "pointer-events-none opacity-50",
          )}
        >
          {number}
        </Link>
      ))}
      <Link
        href={createPageURL(currentPage + 1)}
        className={clsx(
          "flex h-8 w-8 items-center justify-center rounded transition-colors duration-300 hover:bg-neutral-100",
          currentPage === totalPages && "pointer-events-none opacity-50",
        )}
      >
        <IoChevronForwardOutline />
      </Link>
    </div>
  );
}
