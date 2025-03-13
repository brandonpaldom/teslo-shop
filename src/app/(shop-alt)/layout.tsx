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
      <main>{children}</main>
      <Footer />
    </div>
  );
}
