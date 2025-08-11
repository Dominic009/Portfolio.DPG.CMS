// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminHeader from "@/component/Nav";
import { authOptions } from "../../../../lib/auth";
// import { AuroraTextEffect } from "@/components/lightswind/AuroraEffect";
import { TypingText } from "@/components/lightswind/TypingText";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/admin");
  console.log(session);

  return (
    <section className="min-h-screen ">
      <AdminHeader />
      <div className="flex items-center justify-center h-[90vh]">
        {/* <h1 className="text-5xl font-bold">Welcome to Admin Dashboard, {session.user?.name}!</h1> */}
        {/* <AuroraTextEffect
          text={`Welcome to Admin Dashboard, ${session.user?.name}!`}
        /> */}
        <TypingText>
          <h1 className="text-5xl font-bold">
            Welcome to Admin Dashboard, {session.user?.name}!
          </h1>
        </TypingText>
      </div>
    </section>
  );
}
