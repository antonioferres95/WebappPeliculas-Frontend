import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Pelicula } from "../../models/pelicula.model";
import alertaContext from "../../utils/AlertaContext";
import confirmar from "../../utils/Confirmar";
import css from './PeliculaIndividual.module.css';
import { urlPeliculas } from "../../utils/Endpoints";

export default function PeliculaIndividual(props:peliculaIndividualProps){

    const urlPelicula = `/pelicula/${props.pelicula.id}`
    const alerta = useContext(alertaContext);

    function borrarPelicula(){
        axios.delete(`${urlPeliculas}/${props.pelicula.id}`)
            .then(() => {
                alerta(); //Esta alerta la atrapa el home 
            })
    }

    return(
        <div className={css.div}>
            <a href={urlPelicula}>
                <img src={props.pelicula.poster} alt="Imagen pelicula" />
            </a>
            <p>
                <a href={urlPelicula}>{props.pelicula.titulo}</a>
            </p>
            <div>
                <Link style={{marginRight: '1rem'}} className="btn btn-info" to={`/peliculas/editar/${props.pelicula.id}`}>
                    Editar
                </Link>
                <button className="btn btn-danger" onClick={() => confirmar(() => borrarPelicula())}>Borrar</button>
            </div>
        </div>
    )
}

interface peliculaIndividualProps{
    pelicula: Pelicula
}