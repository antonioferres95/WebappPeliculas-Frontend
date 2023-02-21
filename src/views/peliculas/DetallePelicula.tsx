import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Swal from "sweetalert2";
import { Pelicula } from "../../models/pelicula.model";
import Cargando from "../../utils/Cargando";
import { urlPeliculas, urlRatings } from "../../utils/Endpoints";
import Rating from "../../utils/Rating";

export default function DetallePelicula(){
    
    const {id}:any = useParams();
    const [pelicula, setPelicula] = useState<Pelicula>();

    useEffect(() => {
        axios.get(`${urlPeliculas}/${id}`)
            .then((response:AxiosResponse<Pelicula>) => {
                response.data.fechaLanzamiento = new Date(response.data.fechaLanzamiento);
                setPelicula(response.data);
            })
    }, [id])
    
    function generarURLYoutubeEmbebido(url:any):string{
        //Esta funcion extra el ID de un video de youtube (es lo que esta despues del v=)

        if(!url){
            return '';
        }

        var video_id = url.split('v=')[1];
        var posicionAmpersand = video_id.indexOf('&');
        if (posicionAmpersand !== -1){
            video_id = video_id.substring(0, posicionAmpersand);
        }

        return `https://www.youtube.com/embed/${video_id}`;
    }

    async function onVote(voto:number){
        await axios.post(urlRatings, {puntuacion: voto, peliculaId: id})
        Swal.fire({icon: "success", title: "Voto registrado"})
    }

    return(
        pelicula ? 
            <div style={{display: 'flex'}}>
                <div>
                    <h2>{pelicula.titulo} ({pelicula.fechaLanzamiento.getFullYear()})</h2>

                    {pelicula.generos?.map((genero) => 
                        <Link 
                            key={genero.id} 
                            style={{marginRight: '5px'}} 
                            className="btn btn-primary btn-sm rounded-pill"
                            to={`/peliculas/filtrar?generoId=${genero.id}`} 
                        >
                            {genero.nombre}
                        </Link>
                    )}

                    | {pelicula.fechaLanzamiento.toDateString()}
                    | Tu voto: <Rating 
                        maximoValor={5} 
                        valorSeleccionado={pelicula.votoUsuario!} 
                        onChange={onVote}
                        />
                    | Voto promedio: {pelicula.promedioVoto}
                    <div style={{display: 'flex', marginTop: '1rem'}}>
                        <span style={{display: 'inline-block', marginRight: '1rem'}}>
                            <img src={pelicula.poster} style={{width: '225px', height: '315px'}} alt="Poster Pelicula" />
                        </span>
                        {pelicula.trailer ? 
                            <div>
                                <iframe 
                                    title="YouTube-Trailer"
                                    width="560"
                                    height="315"
                                    src={generarURLYoutubeEmbebido(pelicula.trailer)}
                                    frameBorder={0}
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen  
                                >
                                </iframe>
                            </div>
                        : null}
                    </div>

                    {pelicula.resumen ?
                        <div style={{marginTop: '1rem'}}>
                            <h3>Resumen</h3>
                            <div>
                                <p>{pelicula.resumen}</p>
                            </div>
                        </div>
                    : null}

                    {(pelicula.actores && pelicula.actores.length > 0) ?
                        <div style={{marginTop: '1rem'}}>
                            <h3>Actores</h3>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                {pelicula.actores?.map((actor) => 
                                    <div key={actor.id} style={{marginBottom: '2px'}}>
                                        <img src={actor.foto} alt="Foto Actor" style={{width: '50px', verticalAlign: 'middle'}}/>
                                        <span style={{display: 'inline-block', width: '200px', marginLeft: '1rem'}}>
                                            {actor.nombre}
                                        </span>
                                        <span style={{display: 'inline-block', width: '45px'}}>
                                            como
                                        </span>
                                        <span>
                                            {actor.personaje}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    : null}
                </div>
            </div>
        : <Cargando/>
    )
}