"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("dominic@admin.com");
  const [password, setPassword] = useState("dominic123");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) router.push("/admin/dashboard");
    else alert("Invalid credentials");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <motion.form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Welcome Back
        </h2>
        <p className="mb-6 text-center text-gray-500">
          Please log in to your account
        </p>

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="rounded-lg border border-gray-300 px-4 py-3 text-gray-700 shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
        />

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="rounded-lg border border-gray-300 px-4 py-3 text-gray-700 shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="mt-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg hover:from-purple-600 hover:to-pink-600 cursor-pointer"
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
}
