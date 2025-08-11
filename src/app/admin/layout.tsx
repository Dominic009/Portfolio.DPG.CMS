"use client";

import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import AdminHeader from "@/components/Nav";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <SessionProvider>
      <div className="flex min-h-screen text-gray-100">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main
          className={`flex-1 flex flex-col transition-all duration-300 bg-gray-800 ${
            sidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          <header>
            <AdminHeader />
          </header>
          <section className="flex-1 overflow-auto px-6">
            {children}
          </section>
        </main>
      </div>
    </SessionProvider>
  );
}
