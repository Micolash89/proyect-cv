"use client";
import React from "react";
import { toast } from "sonner";
import {
  generatorItemsWorkAI,
  generatorProfileAI,
  generatorSkillsAI,
} from "@/lib/actions";

interface IARegisterProps {
  cvData: any;
  updateIAData: any;
  title: string;
  tipo: number;
  iaData: string;
}

export default function IARegister({
  cvData,
  updateIAData,
  title,
  tipo,
  iaData,
}: IARegisterProps) {
  const nameTipo = React.useMemo(() => {
    switch (tipo) {
      case 1:
        return "profile";
      case 2:
        return "descriptionWork";
      case 3:
        return "skills";
      default:
        return "";
    }
  }, [tipo]);

  const getIcon = () => {
    switch (tipo) {
      case 1:
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      case 2:
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      case 3:
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleProfile = async (e: FormData) => {
    let newPost;

    switch (tipo) {
      case 1:
        newPost = generatorProfileAI
          .bind(null, cvData.experience)
          .bind(null, cvData.education)
          .bind(null, cvData.idiomas)
          .bind(null, cvData.cursos)
          .bind(null, cvData.orientadoCV);
        break;
      case 2:
        newPost = generatorItemsWorkAI.bind(null, cvData.experience);
        break;
      case 3:
        newPost = generatorSkillsAI
          .bind(null, cvData.experience)
          .bind(null, cvData.education)
          .bind(null, cvData.idiomas)
          .bind(null, cvData.cursos)
          .bind(null, cvData.orientadoCV);
        break;
      default:
        toast.error("tipo no válido");
        return;
    }

    const postPromise = newPost(e);

    toast.promise(postPromise, {
      loading: "Generando contenido con IA...",
      success: (dato: any) => {
        updateIAData(dato.data);
        return `${dato.message}`;
      },
      error: (error) => {
        return `${error.message}`;
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateIAData({ [name]: value });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden transition-all duration-200">
        <div className="border-b dark:border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between ">
              <form
                action={handleProfile}
                className="flex w-full items-center justify-start"
              >
                <button
                  type="submit"
                  className="group flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
                  text-white font-medium rounded-lg transition-all duration-200 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 capitalize"
                >
                  <div className="h-7 w-7 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-white rounded-lg">
                    {getIcon()}
                  </div>
                  <span>{title}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="relative">
            <textarea
              className="w-full min-h-[200px] p-4 bg-gray-50 dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700 rounded-lg
                text-gray-900 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-400
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200 resize-y"
              placeholder="El contenido generado por la IA aparecerá aquí..."
              name={nameTipo}
              value={iaData}
              onChange={handleChange}
              style={{ minHeight: "200px" }}
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <span>Editable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
