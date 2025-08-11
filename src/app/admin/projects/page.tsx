"use client";
import {
  createProject,
  getAllProjects,
  getProjectById,
} from "@/app/api/admin/adminApi";
import { useEffect, useState } from "react";

export default function AdminProjects() {
  const [isProjects, setIsProjects] = useState([]);

  useEffect(() => {
    getAllProjects()
      .then((res) => setIsProjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleProject = async (id: string | number) => {
    getProjectById(id).then((res) => console.log(res));
  };

  const addProject = async (data: object) => {
    createProject(data).then((res) => console.log(res.data))
  };
  return (
    <>
      <h1>This is Project page</h1>
      <button onClick={() => handleProject(2)}>Get Project</button>
      <button
        onClick={() =>
          addProject({
            title: "New Project Example 3",
            projectFor: "Client project",
            description: "This is a test project created via POST API.",
            image: "/Project/newproject.png",
            techStack: [
              { name: "React", icon: "skill-icons:react-dark" },
              { name: "Tailwind", icon: "skill-icons:tailwindcss-dark" },
            ],
            projectType: "Frontend",
            liveLink: "https://example.com/newproject",
            features: ["Responsive design", "Modern UI", "API integration"],
          })
        }
      >
        Add Project
      </button>
    </>
  );
}
