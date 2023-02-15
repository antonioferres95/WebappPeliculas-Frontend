import { ActorCreacion } from "../models/actor.model";
import { PeliculaCreacion } from "../models/pelicula.model";

function formatearFecha(date:Date){
    date = new Date(date);
    const formato = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [{value: month},, {value: day},, {value: year}] = formato.formatToParts(date);

    return `${year}-${month}-${day}`;
}

export function convertirActorToFormData(actor:ActorCreacion):FormData{
    //Esta funcion se encarga de pasar un tipo de dato ActorCreacion a FormData

    const formData = new FormData();

    formData.append('nombre', actor.nombre);
    formData.append('biografia', actor.biografia);
    if(actor.fechaNacimiento){
        formData.append('fechaNacimiento', formatearFecha(actor.fechaNacimiento));
    }
    if(actor.foto){
        formData.append('foto', actor.foto);
    }

    return formData;
}

export function convertirPeliculaToFormData(pelicula:PeliculaCreacion):FormData{
    //Esta funcion se encarga de pasar un tipo de dato PeliculaCreacion a FormData

    const formData = new FormData();

    formData.append('titulo', pelicula.titulo);

    if(pelicula.resumen){
        formData.append('resumen', pelicula.resumen)
    }

    formData.append('trailer', pelicula.trailer);
    formData.append('enCines', String(pelicula.enCines));

    if(pelicula.fechaLanzamiento){
        formData.append('fechaLanzamiento', formatearFecha(pelicula.fechaLanzamiento));
    }

    if(pelicula.poster){
        formData.append('poster', pelicula.poster);
    }

    formData.append('generosIds', JSON.stringify(pelicula.generosIds))
    formData.append('actores', JSON.stringify(pelicula.actores))

    return formData;
}