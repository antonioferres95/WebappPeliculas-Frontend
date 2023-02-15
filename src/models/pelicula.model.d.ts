import { DateSchema } from "yup"
import { ActorPelicula } from "./actor.model"
import { Genero } from "./genero.model"

export interface Pelicula{
    id:number
    titulo:string
    poster:string //Es una URL
    enCines:boolean;
    trailer:string;
    resumen?:string;
    fechaLanzamiento:Date;
    actores:ActorPelicula[];
    generos:Genero[];
}

export interface LandingPageDTO{
    enCines?: Pelicula[]
    porEstrenar?: Pelicula[]
}

export interface FiltroPeliculas{
    titulo: string;
    generoId: number;
    proximosEstrenos: boolean;
    enCines: boolean;
    pagina:number;
    recordsPorPagina:number;

}

export interface PeliculaCreacion{
    titulo:string;
    enCines:boolean;
    trailer:string;
    resumen?:string;
    fechaLanzamiento?:Date;
    poster?:File;
    posterURL?:string;
    generosIds?:number[];
    actores?:ActorPelicula[];
}

export interface peliculasPostGetDTO{
    generos:Genero[];
}

export interface PeliculasPutGetDTO{
    pelicula:Pelicula;
    generosSeleccionados:Genero[];
    generosNoSeleccionados:Genero[];
    actores:ActorPelicula[];
}