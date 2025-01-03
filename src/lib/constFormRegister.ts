import { ArraySelectInput } from '@/lib/definitions';

export const idiomasSelect:ArraySelectInput[] = [
    {value:"", name:"Seleccione nivel"},
    {value:"BASICO", name:"Básico"},
    {value:"INTERMEDIO", name:"Intermedio"},
    {value:"AVANZADO", name:"Avanzado"},
    {value:"NATIVO", name:"Nativo"},
]

export const educacionEstadoSelect:ArraySelectInput[] = [
    {value:"", name:"Seleccione un estado"},
    {value:"COMPLETO", name:"Completo"},
    {value:"PROCESO", name:"En proceso"},
    {value:"INCOMPLETO", name:"Incompleto"},
]

export const educacionNivelSelect:ArraySelectInput[] = [
    {value:"", name:"Seleccione nivel"},
    {value:"UNIVERSIDAD", name:"Universidad"},
    {value:"SECUNDARIO", name:"Secundaria"},
    {value:"PRIMARIO", name:"Primaria"},
]