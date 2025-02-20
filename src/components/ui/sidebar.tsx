import { auth } from "@/auth";
import SidebarClient from "./sidebar-client";

export default async function Sidebar() {
  const session = await auth();
  const isLogged = !!session?.user;
  const isAdmin = session?.user?.role === "admin";

  return <SidebarClient isLogged={isLogged} isAdmin={isAdmin} />;
}
