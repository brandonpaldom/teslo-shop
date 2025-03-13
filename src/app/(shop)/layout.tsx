import { auth } from "@/auth";
import { AdminBanner, Footer, Navbar, Sidebar } from "@/components";

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <div className="grid min-h-screen grid-rows-[auto_auto_1fr_auto]">
      <Navbar />
      {session?.user.role === "admin" && <AdminBanner />}
      <Sidebar />
      <main className="px-6 py-12 xl:px-12">{children}</main>
      <Footer />
    </div>
  );
}
