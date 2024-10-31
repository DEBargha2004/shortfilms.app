import { initPocketbase } from "@/lib/pocketbase-server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pb = await initPocketbase();
  const headersList = headers();

  if (!pb.authStore.model?.id) {
    redirect;
  }

  return <>{children}</>;
}
