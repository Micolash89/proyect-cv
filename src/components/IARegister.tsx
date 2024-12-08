import React from "react";
import { toast } from "sonner";
import {
  generatorItemsWorkAI,
  generatorProfileAI,
  generatorSkillsAI,
} from "@/lib/actions";

export default function IARegister({
  cvData,
  updateIAData,
  title,
  tipo,
  iaData,
}: {
  cvData: any;
  updateIAData: any;
  title: string;
  tipo: number;
  iaData: string;
}) {
  let nameTipo: string = "";

  switch (tipo) {
    case 1:
      nameTipo = "profile";
      break;
    case 2:
      nameTipo = "descriptionWork";
      break;
    case 3:
      nameTipo = "skills";
      break;
    default:
      toast.error("tipo no válido");
  }

  const handleProfile = async (e: FormData) => {
    let newPost;
    
    switch (tipo) {

      case 1:
        newPost = generatorProfileAI.bind(null, cvData.experience)
        .bind(null, cvData.education)
        .bind(null, cvData.idiomas)
        .bind(null, cvData.cursos)
        .bind(null, cvData.orientadoCV);
        break;

        case 2:
          newPost = generatorItemsWorkAI.bind(null, cvData.experience);
        break;

      case 3:
        newPost = generatorSkillsAI.bind(null, cvData.experience)
        .bind(null, cvData.education)
        .bind(null, cvData.idiomas)
        .bind(null, cvData.cursos)
        .bind(null, cvData.orientadoCV);
        break;
        
      default:
        toast.error("tipo no válido");
        return;
    }
    
    const postPromise = newPost(e); // Tu promesa original

    toast.promise(postPromise, {
      loading: "Loading...",
      success: (dato: any) => {
        console.log(dato);
        updateIAData(dato.data);
        return `${dato.message}`;
      },
      error: (error) => {
        return `${error.message}`;
      },
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    updateIAData({ [name]: value });
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto mb-8 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <form
        action={handleProfile}
        className="flex w-full items-center justify-center"
      >
        <button
          type="submit"
          className="capitalize flex gap-1 items-center p-4 rounded-md bg-blue-600 hover:bg-blue-800 text-white font-semibold mb-4 "
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M11.1244 1.09094H12.8753L12.9269 1.9453C13.2227 6.85075 17.1493 10.7773 22.0546 11.0732L22.909 11.1247V12.8757L22.0546 12.9272C17.1493 13.2231 13.2227 17.1498 12.9269 22.0551L12.8753 22.9095H11.1244L11.0728 22.0551C10.777 17.1498 6.85036 13.2231 1.94518 12.9272L1.09082 12.8757V11.1247L1.94518 11.0732C6.85036 10.7773 10.777 6.85075 11.0728 1.9453L11.1244 1.09094ZM11.9999 5.85023C10.83 8.61547 8.61512 10.8304 5.84996 12.0002C8.61512 13.1701 10.83 15.385 11.9999 18.1502C13.1697 15.385 15.3846 13.1701 18.1498 12.0002C15.3846 10.8304 13.1697 8.61547 11.9999 5.85023Z"></path></svg>
          <span>
          {title}
            </span> 
        </button>
      </form>

      <textarea
        className="w-full min-h-[200px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 "
        placeholder={"respuesta..."}
        cols={100}
        rows={5}
        name={nameTipo}
        value={iaData}
        onChange={handleChange}
      ></textarea>  
    </div>
    </>
  );
}
