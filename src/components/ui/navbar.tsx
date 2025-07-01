'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';
import { useShallow } from 'zustand/shallow';
import { useCartStore, useUIStore } from '@/stores';
import Button from './button';

export default function Navbar() {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const { totalItems } = useCartStore(
    useShallow((state) => state.getSummary())
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
        <Link className="mr-8" href="/">
          <Image
            alt="Teslo logo"
            height={10}
            src="/teslo-logo.svg"
            width={99}
          />
        </Link>
        <span className="mr-4 text-sm">|</span>
        <Link className="btn btn-ghost" href="/">
          Shop
        </Link>
      </div>
      <div className="hidden items-center sm:flex">
        <Link className="btn btn-ghost" href="/category/men">
          Men
        </Link>
        <Link className="btn btn-ghost" href="/category/women">
          Women
        </Link>
        <Link className="btn btn-ghost" href="/category/kids">
          Kids
        </Link>
      </div>
      <div className="flex items-center">
        <button className="mr-4 hidden xl:flex" type="button">
          <IoSearchOutline className="h-6 w-6" />
        </button>
        <div className="relative mr-2">
          <Link className="flex" href="/cart">
            <IoCartOutline className="h-6 w-6" />
            {isClient && totalItems > 0 && (
              <span className="-right-1 -top-1 absolute flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[0.75rem] text-white leading-none">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
        <Button onClick={handleSidebar} variant="ghost">
          Menu
        </Button>
      </div>
    </nav>
  );
}
