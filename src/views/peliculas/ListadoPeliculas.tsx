//Modelos
import { Pelicula } from "../../models/pelicula.model";

//Componentes
import PeliculaIndividual from "./PeliculaIndividual";

//CSS
import css from './ListadoPeliculas.module.css'
import ListadoGenerico from "../../utils/ListadoGenerico";

export default function ListadoPeliculas(props:listadoPeliculasProps){

    return(
        <ListadoGenerico array={props.peliculas}>
            <div className={css.div}>
                {props.peliculas?.map( peli => <PeliculaIndividual pelicula={peli} key={peli.id}/> )}
            </div>
        </ListadoGenerico>
    )
}

interface listadoPeliculasProps{
    peliculas?: Pelicula[]
}