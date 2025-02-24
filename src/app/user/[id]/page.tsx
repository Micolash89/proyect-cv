import Home from "@/components/Home";
import UserNotFound from "@/components/user/[id]/NotRegisteredUser";
import { changeStateUser, getUserId } from "@/database/database";

export type EstudioDataBase = {
  id: number;
  carrera: string;
  estado: string;
  tipo: string;
  institucion: string;
  ubicacion: string;
  fechaIngreso: string;
  mesIngreso: string;
  fechaEgreso: string;
  mesEgreso: string;
};

export type ExperienciaDataBase = {
  id: number;
  puesto: string;
  nombre: string;
  ubicacion: string;
  fechaInicio: string;
  mesInicio: string;
  fechaFin: string;
  mesFin: string;
  descripcion: string;
};

export type IdiomaDataBase = {
  id: number;
  idioma: string;
  nivel: string;
};

export type CursoDataBase = {
  id: number;
  nombre: string;
  institucion: string;
  fechaInicio: string;
  mesInicio: string;
};

export type InformacionAdicionalDataBase = {
  id: number;
  licencia: string;
  movilidad: string;
  incorporacion: string;
  disponibilidad: string;
  office: string;
};

export type cvTemplate = {
  id: number;
  color: string;
  template: number;
};

export type UserDataBase = {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: string;
  fechaNacimiento: Date;
  ciudad: string;
  provincia: string;
  linkedin: string;
  imagenPerfil: string;
  estudios: EstudioDataBase[];
  experiencias: ExperienciaDataBase[];
  idiomas: IdiomaDataBase[];
  cursos: CursoDataBase[];
  informacionAdicional: InformacionAdicionalDataBase[];
  orientacionCV: string;
  cvTemplate: cvTemplate;
};

export default async function page({ params }: { params: { id: string } }) {
  const user: any = await getUserId(parseInt(params.id));

  if (!user) {
    return <UserNotFound />;
  }

  if (user?.visto === false) {
    changeStateUser(user.id);
  }

  return (
    <>
      <Home user={user} />
    </>
  );
}
