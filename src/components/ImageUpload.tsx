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
              
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40"  className="text-gray-500" height="40" fill="currentColor"><path d="M3 4.99509C3 3.89323 3.89262 3 4.99509 3H19.0049C20.1068 3 21 3.89262 21 4.99509V19.0049C21 20.1068 20.1074 21 19.0049 21H4.99509C3.89323 21 3 20.1074 3 19.0049V4.99509ZM5 5V19H19V5H5ZM7.97216 18.1808C7.35347 17.9129 6.76719 17.5843 6.22083 17.2024C7.46773 15.2753 9.63602 14 12.1022 14C14.5015 14 16.6189 15.2071 17.8801 17.0472C17.3438 17.4436 16.7664 17.7877 16.1555 18.0718C15.2472 16.8166 13.77 16 12.1022 16C10.3865 16 8.87271 16.8641 7.97216 18.1808ZM12 13C10.067 13 8.5 11.433 8.5 9.5C8.5 7.567 10.067 6 12 6C13.933 6 15.5 7.567 15.5 9.5C15.5 11.433 13.933 13 12 13ZM12 11C12.8284 11 13.5 10.3284 13.5 9.5C13.5 8.67157 12.8284 8 12 8C11.1716 8 10.5 8.67157 10.5 9.5C10.5 10.3284 11.1716 11 12 11Z"></path></svg>
              <span className="text-sm text-gray-500">
                Subir foto
              </span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
