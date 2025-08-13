/* eslint-disable @next/next/no-img-element */
import React from "react";
import { GrPowerCycle } from "react-icons/gr";

interface ImageUploadProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  uploadProgress: number;
  imageUrl: string | null;
  onRemoveImage?: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  handleImageUpload,
  loading = false,
  uploadProgress,
  imageUrl,
  onRemoveImage,
}) => {
  return (
    <div className="w-full h-full">
      <label className="block text-gray-200 font-medium mb-1">
        Project Image
      </label>

      <div className="border-2 border-dashed border-gray-400 hover:border-indigo-500 transition-colors flex flex-col items-center justify-center rounded-md px-3 py-2 cursor-pointer relative h-full">
        {/* Hidden File Input */}
        {!imageUrl && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        )}

        {/* Upload Icon */}
        {!loading && !imageUrl && (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-300 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="text-gray-400 text-sm">
              Click or drag to upload image
            </p>
            <p className="text-gray-500 text-xs">Select from local files</p>
          </>
        )}

        {/* Progress Bar */}
        {loading && (
          <div className="w-full bg-gray-200 rounded mt-2 h-4 overflow-hidden">
            <div
              className="bg-teal-500 h-4 transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {/* Uploaded Image Preview */}
        <div className="">
          {imageUrl && !loading && (
            <>
              <img
                src={imageUrl}
                alt="Uploaded"
                className="absolute inset-0 w-full h-full object-contain rounded-md p-2"
              />

              {/* Overlay Buttons */}
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                <button
                  onClick={onRemoveImage}
                  className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-red-600"
                >
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
                </button>
                <label className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 cursor-pointer">
                  <GrPowerCycle />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </>
          )}
        </div>
      </div>

      {loading && (
        <p className="mt-2 text-center text-gray-300">{uploadProgress}%</p>
      )}
    </div>
  );
};

export default ImageUpload;
