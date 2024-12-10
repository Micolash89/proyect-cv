import React from "react";

export default function WrapperH2Section({ title }: { title: string }) {

    // array de objetos para los svg luego sacarlos por title o algo por el estilo
    

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize flex items-center gap-3">
    {title}
        <div className="h-8 w-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg">
          {/* <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg> */}
          svg
        </div>
      </h2>
    </div>
  );
}
