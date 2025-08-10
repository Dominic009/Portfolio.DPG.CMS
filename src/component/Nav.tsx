"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function AdminHeader() {
  const { data: session, status } = useSession();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut({ callbackUrl: "/admin" });
  };

  if (status === "loading") return <p>Checking auth...</p>;

  return (
    <div className="bg-gray-800 flex items-center justify-end">
      {/* <p>Welcome, {session?.user?.name}</p> */}
      <button onClick={handleLogout} disabled={loggingOut}>
        {loggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
