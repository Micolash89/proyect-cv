import Home from "@/components/Home";
import { getUserId } from "@/database/database";

export type User ={
    id:number;
    nombre:string;
    apellido:string;
    telefono:string;
    email:string;
    domicilio:string;
    fechaNacimiento:string;
    ciudad:string;
    provincia:string;
    linkedin?:string;
}

export default async function page({ params }: { params: { id: string } }) {

    const user: any = await getUserId(parseInt(params.id));

    if ( !user) {
        return (
            <>
              <h2>Usuario: {params.id} no existe</h2>
            </>
          );
    }

  return (
    <>
      <Home user={user} />
    </>
  );
}
