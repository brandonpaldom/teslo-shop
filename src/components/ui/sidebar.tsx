"use client";

import { useUIStore } from "@/stores";
import clsx from "clsx";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import Button from "./button";
import Divider from "./divider";

export default function Sidebar() {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);

  const closeSidebar = () => {
    useUIStore.setState({ isSidebarOpen: false });
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 h-dvh w-full bg-black/30 backdrop-blur-sm"
          onClick={closeSidebar}
        ></div>
      )}
      <aside
        className={clsx(
          "fixed right-0 top-0 z-20 h-full w-[320px] transform bg-white px-6 shadow-lg transition-transform duration-300 ease-in-out sm:w-[400px]",
          {
            "translate-x-0": isSidebarOpen,
            "translate-x-full": !isSidebarOpen,
          },
        )}
      >
        <div className="flex h-14 items-center justify-end">
          <IoCloseOutline
            className="h-6 w-6 cursor-pointer"
            onClick={closeSidebar}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative">
            <IoSearchOutline className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
            <input
              type="search"
              placeholder="Search"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <Link
            href="/profile"
            className="btn btn-ghost justify-start"
            onClick={closeSidebar}
          >
            Profile
          </Link>
          <Link
            href="#"
            className="btn btn-ghost justify-start"
            onClick={closeSidebar}
          >
            Orders
          </Link>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={closeSidebar}
          >
            Logout
          </Button>
          <Divider />
          <Link
            href="#"
            className="btn btn-ghost justify-start"
            onClick={closeSidebar}
          >
            Products
          </Link>
          <Link
            href="#"
            className="btn btn-ghost justify-start"
            onClick={closeSidebar}
          >
            Orders
          </Link>
          <Link
            href="#"
            className="btn btn-ghost justify-start"
            onClick={closeSidebar}
          >
            Users
          </Link>
        </div>
      </aside>
    </>
  );
}
