import React from 'react'
import { TypeIAData } from './PreviewCV'
import { toast } from 'sonner';
import { generatorProfileAI } from '@/lib/actions';

export default function IARegister({cvData, updateIAData, title}:{cvData:any, updateIAData:any, title:string}) {

    const handleProfile = async (e:FormData) => {

        const newPost = generatorProfileAI.bind(null,cvData.experience)

        const postPromise = newPost(e); // Tu promesa original

        toast.promise(postPromise, {
          loading: "Loading...",
          success: (dato: any) => {
            console.log(dato);
            updateIAData({profile:dato.data.message});
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
