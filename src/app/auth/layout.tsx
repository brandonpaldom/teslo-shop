import { AuthNavbar, Footer } from "@/components";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <AuthNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
