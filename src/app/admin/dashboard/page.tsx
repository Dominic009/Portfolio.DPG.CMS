// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminHeader from "@/component/Nav";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/admin");
  console.log(session);

  return (
    <div>
      <AdminHeader />
      Welcome to Admin Dashboard, {session.user?.name}!
    </div>
  );
}
