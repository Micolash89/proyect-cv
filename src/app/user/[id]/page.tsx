import Home from "@/components/Home";
import { getUserId } from "@/database/database";


export type EstudioDataBase={
  id: number;
  carrera: string;
  estado: string;
  tipo: string;
  institucion: string;
  ubicacion: string;
  fechaIngreso: string;
  fechaEgreso: string;
}

export type ExperienciaDataBase={
  id: number;
  puesto: string;
  nombre: string;
  ubicacion: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
}

export type IdiomaDataBase={
  id: number;
  idioma: string;
  nivel: string;
}

export type CursoDataBase={
  id: number;
  nombre: string;
  institucion: string;
  fechaInicio: string;
}

export type InformacionAdicionalDataBase={
  id: number;
  licencia: string;
  movilidad: string;
  incorporacion: string;
  disponibilidad: string;
  office: string;
}

export type UserDataBase ={
    id:number;
    nombre:string;
    apellido:string;
    telefono:string;
    email:string;
    dni:string;
    fechaNacimiento:Date;
    ciudad:string;
    provincia:string;
    linkedin:string;
    estudios:   EstudioDataBase[];
    experiencias: ExperienciaDataBase[];
    idiomas: IdiomaDataBase[];
    cursos: CursoDataBase[];
    informacionAdicional: InformacionAdicionalDataBase[];
    orientadoCV: string;
}

export default async function page({ params }: { params: { id: string } }) {

    const user: any = await getUserId(parseInt(params.id));

  console.log(user);

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
