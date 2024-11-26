"use client";

import { useState, useRef, DragEvent, useEffect } from "react";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (value: File | null) => void;
  onRemove: () => void;
  value: File | null;
  previewUrl: string | null;
}

export default function ImageUpload({
  onChange,
  onRemove,
  value,
  previewUrl,
}: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  }

  function handleDragOver(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }

  function handleDragLeave(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }

  async function handleDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const file = e.dataTransfer?.files[0];
    if (file) {
      onChange(file);
    }
  }

  return (
    <div className=" w-full">
      <div className="flex items-center justify-left gap-4">
        {previewUrl && (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="absolute z-10 top-2 right-2">
              <button
                type="button"
                onClick={onRemove}
                className="p-1 bg-red-500 rounded-full hover:bg-red-600 transition"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M2 4H14M5 4V3C5 2.44772 5.44772 2 6 2H10C10.5523 2 11 2.44772 11 3V4M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4H12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Imagen de perfil"
              src={previewUrl}
            />
          </div>
        )}

        {!previewUrl && (
          <div className="w-full flex flex-col items-center ">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="imageUpload"
              name="file"
            />
            <label
              htmlFor="imageUpload"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                cursor-pointer
                p-4 border-2 w-[200px] h-[200px]
                ${
                  isDragOver
                    ? "border-blue-500"
                    : "border-dashed border-gray-300"
                }
                flex flex-col justify-center items-center gap-2
                hover:border-gray-400 transition rounded-lg mr-auto
              `}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500"
              >
                <path
                  d="M21 12V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H14M21 12L17 8M21 12L17 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-gray-500">
                Subir foto de perfil
              </span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
