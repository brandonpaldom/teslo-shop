import { auth } from "@/auth";
import { AdminBanner, Footer, Navbar, Sidebar } from "@/components";
import clsx from "clsx";

export default async function ShopAltLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const isAdmin = session?.user.role === "admin";

  return (
    <div
      className={clsx("grid min-h-screen", {
        "grid-rows-[auto_auto_1fr_auto]": isAdmin,
        "grid-rows-[auto_1fr_auto]": !isAdmin,
      })}
    >
      <Navbar />
      {isAdmin && <AdminBanner />}
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
