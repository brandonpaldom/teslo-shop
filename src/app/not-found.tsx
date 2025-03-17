import { EmptyState, Footer, Navbar, Sidebar } from "@/components";

export default function NotFound() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Navbar />
      <Sidebar />
      <main className="flex-1 px-6 py-12 xl:px-12">
        <EmptyState
          title="Page not found"
          message="The page you are looking for does not exist."
        />
      </main>
      <Footer />
    </div>
  );
}
