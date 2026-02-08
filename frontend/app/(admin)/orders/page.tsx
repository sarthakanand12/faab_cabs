import { getAdminSession } from "@/lib/auth";
import OrdersPageClient from "./page-client";

export default async function OrdersPage() {
  const session = await getAdminSession();
  
  if (!session) {
    return null;
  }

  return <OrdersPageClient session={session} />;
}