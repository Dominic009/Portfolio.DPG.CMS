"use client";

import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import AdminHeader from "@/components/Nav";
import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import { useSessionObserver } from "@/hooks/useSessionObserver";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SessionProvider>
      <InnerAdminLayout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        {children}
      </InnerAdminLayout>
    </SessionProvider>
  );
}

function InnerAdminLayout({
  sidebarOpen,
  setSidebarOpen,
  children,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const { session, status } = useSessionObserver(() => {});

  // if (status === "loading") {
  //   return <Loader fullScreen />;
  // }

  return (
    <div className="flex min-h-screen text-gray-100">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main
        className={`flex-1 flex flex-col transition-all duration-300 bg-gradient-to-br from-gray-950 to-[#011f27]

 ${sidebarOpen ? "ml-64" : "ml-16"}`}
      >
        {status === "loading" ? (
          <div className="">
            <Loader fullScreen />
          </div>
        ) : (
          <>
            {" "}
            <header>
              <AdminHeader />
            </header>
            <section className="flex-1 overflow-auto px-6">{children}</section>
            <Toaster />
          </>
        )}
      </main>
    </div>
  );
}
