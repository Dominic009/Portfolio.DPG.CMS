"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TypingText } from "@/components/lightswind/TypingText";
import { useSessionObserver } from "@/hooks/useSessionObserver"; // your custom hook
import { getAllProjects } from "@/app/api/admin/adminApi";
import Loader from "@/components/Loader/Loader";

export default function Dashboard() {
  const router = useRouter();
  const { session, status } = useSessionObserver((session) => {
    if (!session && status !== "loading") {
      router.push("/admin"); // redirect if not signed in
    }
  });

  // const stats = [
  //   {
  //     title: "Total Projects",
  //     value: 12,
  //     change: "+2 this month",
  //     color: "bg-gradient-to-r from-emerald-500 to-green-400",
  //   },
  //   {
  //     title: "Active Clients",
  //     value: 5,
  //     change: "+1 this week",
  //     color: "bg-gradient-to-r from-indigo-500 to-blue-400",
  //   },
  //   {
  //     title: "Revenue",
  //     value: "$12,450",
  //     change: "+8% from last month",
  //     color: "bg-gradient-to-r from-amber-500 to-yellow-400",
  //   },
  //   {
  //     title: "Pending Tasks",
  //     value: 9,
  //     change: "3 overdue",
  //     color: "bg-gradient-to-r from-rose-500 to-red-400",
  //   },
  // ];

  const [isProjects, setIsProjects] = useState([]);

  useEffect(() => {
    getAllProjects()
      .then((res) => setIsProjects(res.data.length))
      .catch((err) => console.log(err));
  }, []);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <section className="p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <TypingText>
          <h1 className="text-5xl font-bold">
            Welcome to Admin Dashboard, {session?.user?.name}!
          </h1>
        </TypingText>
        <p className="text-gray-500">
          Here’s what’s happening with your projects today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          className={`rounded-xl shadow-lg p-5 text-white transform transition duration-300 hover:scale-[1.03] bg-gradient-to-r from-emerald-500 to-green-400 animate__animated animate__fadeInUp`}
        >
          <h2 className="text-sm opacity-80">Total Projects</h2>
          <p className="text-3xl font-bold">{isProjects}</p>
          <span className="text-sm opacity-90">12 this month</span>
        </div>
      </div>

      {/* Future Section for Charts / Tables */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div
          className="p-6 rounded-xl min-h-[300px] flex items-center justify-center text-gray-400
               bg-[#1a1d24] 
            
               border border-gray-800 animate__animated animate__fadeInUp"
        >
          📊 Project Performance Chart (Coming Soon)
        </div>

        <div
          className="p-6 rounded-xl min-h-[300px] flex items-center justify-center text-gray-400
               bg-[#1a1d24] 
           
               border border-gray-800 animate__animated animate__fadeInUp"
        >
          📅 Recent Activities (Coming Soon)
        </div>
      </div>
    </section>
  );
}
