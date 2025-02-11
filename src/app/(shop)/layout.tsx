import { Footer, Navbar, Sidebar } from "@/components";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Navbar />
      <Sidebar />
      <main className="px-6 py-12 xl:px-12">{children}</main>
      <Footer />
    </div>
  );
}
