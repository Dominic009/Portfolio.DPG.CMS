import React, { ReactNode } from "react";
import { FaTrashCan } from "react-icons/fa6";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: ReactNode;
}

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this? This action cannot be undone.",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-lg w-full space-y-10">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaTrashCan size={20} />
            {title}
          </h2>
          <p className="mt-2 font-light text-gray-300 text-sm">{message}</p>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 transition cursor-pointer"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
