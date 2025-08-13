"use client";
import ImageUpload from "@/components/ui/ImageUploader";
import PreviousPage from "@/components/ui/PreviousPage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { useParams } from "next/navigation";
import { getProjectById, updateProject } from "@/app/api/admin/adminApi";
import toast from "react-hot-toast";

interface TechStackItem {
  name: string;
  icon: string;
}

// interface EditProps {
//   project: string | number;
// }

const EditProject = () => {
  const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const { id } = useParams() as { id: string }; // dynamic route param

  const [title, setTitle] = useState("");
  const [projectFor, setProjectFor] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<null | string>("");
  const [techStack, setTechStack] = useState<TechStackItem[]>([]);
  const [techName, setTechName] = useState("");
  const [techIcon, setTechIcon] = useState("");
  const [projectType, setProjectType] = useState("");
  const [liveLink, setLiveLink] = useState("https://");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getProjectById(`${id}`);
        const project = res.data;

        setTitle(project.title);
        setProjectFor(project.projectFor);
        setDescription(project.description);
        setImageUrl(project.image);
        setTechStack(project.techStack || []);
        setProjectType(project.projectType);
        setLiveLink(project.liveLink);
        setFeatures(project.features || []);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    if (id) fetchProject();
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setUploadProgress(0); // you need to have this state for progress

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              progressEvent.total
                ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                : 0
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (res.data.success) {
        setImageUrl(res.data.data.url);
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image upload error");
    }
    setLoading(false);
  };

  // Add tech stack item
  const addTech = () => {
    if (techName.trim() && techIcon.trim()) {
      setTechStack([
        ...techStack,
        { name: techName.trim(), icon: techIcon.trim() },
      ]);
      setTechName("");
      setTechIcon("");
    }
  };

  // Remove tech stack item
  const removeTech = (index: number) => {
    setTechStack(techStack.filter((_, i) => i !== index));
  };

  // Add feature
  const addFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  // Remove feature
  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      title,
      projectFor,
      description,
      image: imageUrl,
      techStack,
      projectType,
      liveLink,
      features,
    };

    try {
      const res = await updateProject(id, projectData);
      if (res.status === 200) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data?.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Server error");
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    setUploadProgress(0);
  };

  return (
    <div>
      <div className="flex flex-col  gap-5">
        <PreviousPage />
        <div className="flex items-center gap-2">
          <h3 className="text-xl text-gray-300">Projects</h3>
          <TbArrowBadgeRightFilled size={25} className="text-indigo-500" />
          <h1 className="text-2xl font-semibold underline">Edit project</h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="*:space-y-10 py-12 mx-auto grid grid-cols-2 gap-12"
      >
        <div>
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-gray-200 font-medium mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Project For */}
          <div>
            <label
              htmlFor="projectFor"
              className="block text-gray-200 font-medium mb-1"
            >
              Project For
            </label>
            <input
              id="projectFor"
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={projectFor}
              onChange={(e) => setProjectFor(e.target.value)}
              required
            />
          </div>

          {/* Project Type */}
          <div>
            <label
              htmlFor="projectType"
              className="block text-gray-200 font-medium mb-1"
            >
              Project Type
            </label>
            <select
              id="projectType"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              <option>Full Stack</option>
              <option>Frontend</option>
              <option>Backend</option>
            </select>
          </div>

          {/* Live Link */}
          <div>
            <label
              htmlFor="liveLink"
              className="block text-gray-200 font-medium mb-1"
            >
              Live Link
            </label>
            <input
              id="liveLink"
              type="url"
              placeholder="https://example.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Tech Stack
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Tech Name (e.g. React)"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={techName}
                onChange={(e) => setTechName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Icon (e.g. skill-icons:react-dark)"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={techIcon}
                onChange={(e) => setTechIcon(e.target.value)}
              />
              <button
                type="button"
                onClick={addTech}
                className="bg-teal-500 text-white px-4 rounded-md hover:bg-teal-600 transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm cursor-pointer"
                  onClick={() => removeTech(i)}
                  title="Click to remove"
                >
                  <span>{tech.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="">
            <label className="block text-gray-200 font-medium mb-2">
              Features
            </label>
            <div className="flex gap-2 mb-2 relative">
              <input
                type="text"
                placeholder="Add feature"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
              />
              <button
                type="button"
                onClick={addFeature}
                className="bg-teal-500 text-white px-4 rounded-r-md hover:bg-teal-600 transition absolute right-0 bottom-0 top-0"
              >
                Add
              </button>
            </div>
            <ul className="list-disc list-inside flex gap-2 text-gray-200">
              {features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm cursor-pointer"
                  onClick={() => removeFeature(i)}
                  title="Click to remove"
                >
                  {f}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Image Upload */}
          <div className="w-full flex-1">
            <ImageUpload
              handleImageUpload={handleImageUpload}
              imageUrl={imageUrl}
              loading={loading}
              uploadProgress={uploadProgress}
              onRemoveImage={handleRemoveImage}
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block text-gray-200 font-medium mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 text-white font-semibold py-3 rounded-md hover:bg-teal-600 transition col-span-2"
        >
          {loading ? "Uploading..." : "Save changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProject;
