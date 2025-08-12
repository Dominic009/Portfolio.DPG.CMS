/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminHeader() {
  const { data: session } = useSession();
  const [loggingOut, setLoggingOut] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut({ callbackUrl: "/" });
  };

  const isLogin = pathname === "/";
  const userImage =
    session?.user?.image ||
    "https://ui-avatars.com/api/?name=User&background=1F2937&color=fff";

  if (isLogin) return null;

  return (
    <header className="flex items-center justify-end py-4 px-6 relative">
      {/* User Avatar + Hover Menu */}
      <div className="relative group">
        {/* Avatar */}
        <img
          src={userImage}
          alt="User avatar"
          className="w-10 h-10 rounded-full border border-gray-700 shadow-md cursor-pointer object-cover"
        />

        {/* Dropdown */}
        {/* Dropdown */}
        <div
          className="
    absolute right-0 top-full w-40
    bg-gray-900 border border-gray-700 rounded-lg shadow-lg
    opacity-0 scale-95 pointer-events-none
    group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
    transform transition-all duration-200 ease-out z-50
  "
        >
          <div className="px-4 py-2 border-b border-gray-700">
            <p className="text-sm font-medium text-gray-200 truncate">
              {session?.user?.name || "User"}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {session?.user?.email || ""}
            </p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full text-center px-4 py-2 text-sm text-red-400 hover:bg-gray-800 rounded-b-lg transition-colors cursor-pointer"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </header>
  );
}
