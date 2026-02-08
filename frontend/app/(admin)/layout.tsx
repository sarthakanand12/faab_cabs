import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminHeader } from "./components/admin-header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin-auth");
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader session={session} />
      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  );
}