"use client";
import { ProjectProps } from "@/app/admin/projects/page";
import React, { useState } from "react";
import {
  MdOutlineOpenInNew,
  MdEditSquare,
  MdRemoveCircle,
} from "react-icons/md";
import ConfirmModal from "./ConfirmationModal";
import Link from "next/link";

interface ProjectItemProps {
  projects: ProjectProps[];
  handleProject: (id: string | number) => void;
  removeProject: (id: string | number) => void;
}

const ProjectTable = ({
  projects,
  handleProject,
  removeProject,
}: ProjectItemProps) => {
  const [showModal, setShowModal] = useState(false);
  // const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
    null
  );

  const handleDeleteClick = (project: ProjectProps) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedProject) {
      removeProject(selectedProject.id);
    }
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead className="bg-teal-700 text-gray-300 uppercase text-sm">
          <tr>
            <th className="py-3 px-5 text-left w-5">SL</th>
            <th className="py-3 px-5 text-center">Preview</th>
            <th className="py-3 px-5 text-left">Title</th>
            <th className="py-3 px-5 text-left">Client</th>
            <th className="py-3 px-5 text-left">Type</th>
            <th className="py-3 px-5 text-center">Live Link</th>
            <th className="py-3 px-5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-10 text-gray-500">
                No projects found.
              </td>
            </tr>
          )}
          {projects.map((project, idx) => (
            <tr
              key={project.id}
              className="border-b border-gray-700 hover:bg-gray-900 transition-colors duration-300 text-sm"
            >
              <td className="py-4 px-5 w-5">{idx + 1}</td>
              <td className="py-4 px-5 w-48 h-32">
                <img
                  src={project.image}
                  alt="Project image"
                  className="rounded-md"
                />
              </td>
              <td className="py-4 px-5">{project.title}</td>
              <td className="py-4 px-5">{project.projectFor}</td>
              <td className="py-4 px-5">{project.projectType}</td>
              <td className="py-4 px-5 break-all text-center">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline flex items-center justify-center gap-2"
                >
                  <MdOutlineOpenInNew />
                  Visit
                </a>
              </td>
              <td className="py-4 px-5 text-center space-x-3">
                <Link href={`/admin/projects/edit/${project.id}`}>
                  <button
                    // onClick={() => handleProject(project.id)}
                    title="Edit"
                    className="px-3 py-2 rounded-md text-indigo-400 hover:brightness-110 transition cursor-pointer hover:scale-105 hover:bg-indigo-700 hover:text-white"
                  >
                    <MdEditSquare size={20} />
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteClick(project)}
                  title="Delete"
                  className="px-3 py-2 rounded-md text-red-500 hover:brightness-110 transition cursor-pointer hover:scale-105 hover:bg-indigo-700 hover:text-white"
                >
                  <MdRemoveCircle size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation modal */}
      <ConfirmModal
        isOpen={showModal}
        message={
          <>
            Are you sure you want to delete{" "}
            <span className="font-bold text-teal-400 text-lg">
              {selectedProject?.title}
            </span>{" "}
            ?
          </>
        }
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default ProjectTable;
