import clsx from 'clsx';
import { auth } from '@/auth';
import { AdminBanner, Footer, Navbar, Sidebar } from '@/components';

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const isAdmin = session?.user.role === 'admin';

  return (
    <div
      className={clsx('grid min-h-screen', {
        'grid-rows-[auto_auto_1fr_auto]': isAdmin,
        'grid-rows-[auto_1fr_auto]': !isAdmin,
      })}
    >
      <Navbar />
      {isAdmin && <AdminBanner />}
      <Sidebar />
      <main className="flex-1 px-6 py-12 xl:px-12">{children}</main>
      <Footer />
    </div>
  );
}
