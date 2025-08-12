"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";

const PreviousPage = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <FaArrowCircleLeft
        size={30}
        className="hover:text-indigo-600 cursor-pointer"
      />
    </button>
  );
};

export default PreviousPage;
