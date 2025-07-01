'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import { logout } from '@/actions/auth';
import { useUIStore } from '@/stores';
import Button from './button';
import Divider from './divider';

interface Props {
  isLogged: boolean;
  isAdmin: boolean;
}

export default function SidebarClient({ isLogged, isAdmin }: Props) {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);

  const closeSidebar = () => {
    useUIStore.setState({ isSidebarOpen: false });
  };

  const handleLogout = () => {
    closeSidebar();
    logout();
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 h-dvh w-full bg-black/30 backdrop-blur-sm"
          onClick={closeSidebar}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              closeSidebar();
            }
          }}
          role="button"
          tabIndex={0}
        />
      )}
      <aside
        className={clsx(
          'fixed top-0 right-0 z-20 h-full w-[320px] transform bg-white px-6 shadow-lg transition-transform duration-300 ease-in-out sm:w-[400px]',
          {
            'translate-x-0': isSidebarOpen,
            'translate-x-full': !isSidebarOpen,
          }
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
            <IoSearchOutline className="-translate-y-1/2 absolute top-1/2 right-3 h-5 w-5 transform" />
            <input className="input" placeholder="Search" type="search" />
          </div>
          {isLogged && (
            <>
              <Link
                className="btn btn-ghost justify-start"
                href="/profile"
                onClick={closeSidebar}
              >
                Profile
              </Link>
              <Link
                className="btn btn-ghost justify-start"
                href="/orders"
                onClick={closeSidebar}
              >
                My Orders
              </Link>
            </>
          )}
          {isLogged ? (
            <Button
              className="justify-start"
              onClick={handleLogout}
              variant="ghost"
            >
              Logout
            </Button>
          ) : (
            <Link
              className="btn btn-ghost justify-start"
              href="/auth/login"
              onClick={closeSidebar}
            >
              Login
            </Link>
          )}
          {isLogged && isAdmin && <Divider />}
          {isAdmin && (
            <>
              <p className="btn justify-start font-semibold text-sm">Admin</p>
              <Link
                className="btn btn-ghost justify-start"
                href="/admin/products"
                onClick={closeSidebar}
              >
                Manage Products
              </Link>
              <Link
                className="btn btn-ghost justify-start"
                href="/admin/orders"
                onClick={closeSidebar}
              >
                Manage Orders
              </Link>
              <Link
                className="btn btn-ghost justify-start"
                href="/admin/users"
                onClick={closeSidebar}
              >
                Manage Users
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
