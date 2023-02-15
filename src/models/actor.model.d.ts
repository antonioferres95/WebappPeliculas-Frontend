import { number } from "yup";
import { Coordenadas } from "./coordenadas.model";

export interface Actor{
    id:number;
    nombre:string;
    biografia:string;
    fechaNacimiento?:Date;
    foto?:string;
}

export interface ActorCreacion{
    nombre:string;
    biografia:string;
    fechaNacimiento?:Date;
    foto?:File;
    fotoURL?:string;
    latDomicilio?:number;
    longDomicilio?:number;
}

export interface ActorPelicula{
    id:number;
    nombre:string;
    personaje:string;
    foto?:string;
}