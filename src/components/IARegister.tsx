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
      <div className="w-full max-w-3xl mx-auto mb-8 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <form
        action={handleProfile}
        className="flex w-full items-center justify-center"
      >
        <button
          type="submit"
          className="capitalize p-4 rounded-md bg-blue-600 hover:bg-blue-800 text-white font-semibold mb-4"
        >
          {title}
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
