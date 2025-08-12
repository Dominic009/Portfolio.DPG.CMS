"use client";
import PreviousPage from "@/components/ui/PreviousPage";
import React, { useState } from "react";
import axios from "axios";

interface TechStackItem {
  name: string;
  icon: string;
}

const AddProject = () => {
  const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const [title, setTitle] = useState("");
  const [projectFor, setProjectFor] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [techStack, setTechStack] = useState<TechStackItem[]>([]);
  const [techName, setTechName] = useState("");
  const [techIcon, setTechIcon] = useState("");
  const [projectType, setProjectType] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  // Upload image to imgbb
  //   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (!file) return;

  //     setLoading(true);

  //     const formData = new FormData();
  //     formData.append("image", file);

  //     try {
  //       const res = await fetch(
  //         `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );
  //       const data = await res.json();
  //       if (data.success) {
  //         setImageUrl(data.data.url);
  //       } else {
  //         alert("Image upload failed");
  //       }
  //     } catch (error) {
  //       console.error("Upload error:", error);
  //       alert("Image upload error");
  //     }
  //     setLoading(false);
  //   };
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data object (example)
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

    console.log("Submitting project data:", projectData);

    // TODO: Call your API here
  };
  return (
    <div>
      <div className="flex items-center gap-5">
        <PreviousPage />
        Add new project here
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 py-12">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Project For */}
        <div>
          <label
            htmlFor="projectFor"
            className="block text-gray-700 font-medium mb-1"
          >
            Project For
          </label>
          <input
            id="projectFor"
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={projectFor}
            onChange={(e) => setProjectFor(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Project Image
          </label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {loading && (
            <div className="w-full bg-gray-200 rounded mt-2 h-4 overflow-hidden">
              <div
                className="bg-amber-500 h-4 transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="mt-4 w-full object-contain rounded"
            />
          )}
          <p className="mt-2 text-center">{uploadProgress}%</p>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Tech Stack
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Tech Name (e.g. React)"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={techName}
              onChange={(e) => setTechName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Icon (e.g. skill-icons:react-dark)"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={techIcon}
              onChange={(e) => setTechIcon(e.target.value)}
            />
            <button
              type="button"
              onClick={addTech}
              className="bg-amber-500 text-white px-4 rounded-md hover:bg-amber-600 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm cursor-pointer"
                onClick={() => removeTech(i)}
                title="Click to remove"
              >
                <span>{tech.name}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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

        {/* Project Type */}
        <div>
          <label
            htmlFor="projectType"
            className="block text-gray-700 font-medium mb-1"
          >
            Project Type
          </label>
          <select
            id="projectType"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
            className="block text-gray-700 font-medium mb-1"
          >
            Live Link
          </label>
          <input
            id="liveLink"
            type="url"
            placeholder="https://example.com"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Features
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add feature"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
            />
            <button
              type="button"
              onClick={addFeature}
              className="bg-amber-500 text-white px-4 rounded-md hover:bg-amber-600 transition"
            >
              Add
            </button>
          </div>
          <ul className="list-disc list-inside text-gray-700">
            {features.map((f, i) => (
              <li
                key={i}
                className="flex justify-between items-center cursor-pointer hover:text-amber-600"
                onClick={() => removeFeature(i)}
                title="Click to remove"
              >
                {f}
                <span className="text-red-500 font-bold ml-2">×</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 text-white font-semibold py-3 rounded-md hover:bg-amber-600 transition"
        >
          {loading ? "Uploading..." : "Create Project"}
        </button>
      </form>
    </div>
  );
};

export default AddProject;
