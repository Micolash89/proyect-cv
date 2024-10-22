import React from 'react'
import { TypeIAData } from './PreviewCV'
import { toast } from 'sonner';
import { generatorItemsWorkAI, generatorProfileAI, generatorSkillsAI } from '@/lib/actions';

export default function IARegister({cvData, updateIAData, title, tipo}:{cvData:any, updateIAData:any, title:string,tipo:number}) {

    const handleProfile = async (e:FormData) => {
      let newPost;

      switch(tipo){

        case 1:
          newPost = generatorProfileAI.bind(null,cvData.experience)
          break;
          case 2:
            newPost = generatorItemsWorkAI.bind(null,cvData.experience)
            break;
          case 3:
            newPost = generatorSkillsAI.bind(null,cvData.experience)
            break;
        
          default:
            toast.error("tipo no válido") ;
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
    }

  return (
    <> 
        <form action={handleProfile} className='flex  w-full items-center justify-center my-3'>
            <button type="submit" className='capitalize p-4 rounded-md bg-blue-600 hover:bg-blue-800 text-white font-semibold '>
                {title}
            </button>
        </form>
    </>
  )
}
