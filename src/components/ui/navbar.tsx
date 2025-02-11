"use client";

import { useCartStore, useUIStore } from "@/stores";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import Button from "./button";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function Navbar() {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const { totalItems } = useCartStore(
    useShallow((state) => state.getSummary()),
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSidebar = () => {
    useUIStore.setState({ isSidebarOpen: !isSidebarOpen });
  };

  return (
    <nav className="sticky top-0 z-10 flex h-14 items-center justify-between bg-white px-4">
      <div className="flex items-center">
        <Link href="/" className="mr-8">
          <Image
            src="/teslo-logo.svg"
            alt="Teslo logo"
            width={99}
            height={10}
          />
        </Link>
        <span className="mr-4 text-sm">|</span>
        <Link href="/" className="btn btn-ghost">
          Shop
        </Link>
      </div>
      <div className="hidden items-center sm:flex">
        <Link href="/category/men" className="btn btn-ghost">
          Men
        </Link>
        <Link href="/category/women" className="btn btn-ghost">
          Women
        </Link>
        <Link href="/category/kids" className="btn btn-ghost">
          Kids
        </Link>
      </div>
      <div className="flex items-center">
        <Link href="/search" className="mr-4 hidden xl:flex">
          <IoSearchOutline className="h-6 w-6" />
        </Link>
        <div className="relative mr-2">
          <Link href="/cart" className="flex">
            <IoCartOutline className="h-6 w-6" />
            {isClient && totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[0.75rem] leading-none text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
        <Button variant="ghost" onClick={handleSidebar}>
          Menu
        </Button>
      </div>
    </nav>
  );
}
