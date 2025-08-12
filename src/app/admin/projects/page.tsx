"use client";

import { useEffect, useState } from "react";
import {
  createProject,
  deleteProjectById,
  getAllProjects,
  getProjectById,
} from "@/app/api/admin/adminApi";
import Loader from "@/components/Loader/Loader";
import SectionHeading from "@/components/ui/SectionHeading";
import { MdAddCircle } from "react-icons/md";
import ProjectTable from "@/components/ProjectTable";
import toast from "react-hot-toast";
import Link from "next/link";

export interface ProjectProps {
  id: string | number;
  title: string;
  projectFor: string;
  description: string;
  projectType: string;
  liveLink: string;
  image: string;
  // add other fields as needed
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(true);

  // Load projects
  useEffect(() => {
    getAllProjects()
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Handlers
  const handleProject = async (id: string | number) => {
    getProjectById(id).then((res) => console.log(res));
  };

  const addProject = async (data: object) => {
    try {
      const res = await createProject(data);
      console.log(res.data);
      // Refresh projects list
      setLoading(true);
      const updated = await getAllProjects();
      setProjects(updated.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeProject = (id: string | number) => {
    try {
      deleteProjectById(id).then(
        (res) => res.status === 200 && toast.success(res.data.message)
      );
      const updatedList = projects.filter((project) => project.id !== id);
      setProjects(updatedList);
    } catch (error) {
      toast.error(`Something went wring ${error}`);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <section className="min-h-screen pb-10">
      <SectionHeading whiteHeading="Projects" bgHeading="Projects" />

      <div className="flex justify-end">
        <Link href={"/admin/projects/add_project"}>
          <button className="mb-6 px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-lg hover:scale-[1.05] transition-transform duration-300 flex items-center justify-center gap-2 cursor-pointer">
            <MdAddCircle size={20} />
            Add Project
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-700 bg-[#1a1d24]">
        <ProjectTable
          projects={projects}
          handleProject={handleProject}
          removeProject={removeProject}
        />
      </div>
    </section>
  );
}
