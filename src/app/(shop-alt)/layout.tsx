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
      <main>{children}</main>
      <Footer />
    </div>
  );
}
