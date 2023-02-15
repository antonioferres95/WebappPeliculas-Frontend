import axios, { AxiosResponse } from "axios";
import { ReactElement, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { ActorPelicula } from "../../models/actor.model";
import { urlActores } from "../../utils/Endpoints";

export default function TypeAheadActores(props: typeAheadActoresProps){

    const [estaCargando, setEstaCargando] = useState(false);
    const [opciones, setOpciones] = useState<ActorPelicula[]>([]);
    const actoresSeleccionados:ActorPelicula[] = []

    function manejarBusqueda(query:string){
        setEstaCargando(true);
        axios.get(`${urlActores}/buscarPorNombre/${query}`)
            .then((response: AxiosResponse<ActorPelicula[]>) => {
                setOpciones(response.data);
                setEstaCargando(false);
            })
    }

    return(
        <div>
            <label>Actores</label>
            <AsyncTypeahead 
                id="typeahead" 
                onChange={(actores) => {
                    if (props.actores.findIndex(x => x.id === actores[0].id) === -1){
                        /*Agrega el nuevo actor en caso de que no haya sido añadido, para eso
                        invoca una funcion del componente padre que viene en los props*/
                        actores[0].personaje = '';
                        props.addNuevoActor([...props.actores, actores[0]])
                    }}} 
                options={opciones} 
                labelKey={actor => actor.nombre}
                filterBy={() => true} 
                isLoading={estaCargando}
                onSearch={manejarBusqueda}
                placeholder="Leonardo Dicaprio"
                minLength={2} 
                flip={true} 
                selected={actoresSeleccionados}
                renderMenuItemChildren={actor => (
                    //Con renderMenuItemChildren customizamos la lista de sugerencias
                    <div>
                        <img src={actor.foto} alt="Foto actor" style={{
                            height: '64px', width: '64px', marginRight: '10px'}} 
                        />
                        <span>{actor.nombre}</span>
                    </div>
                    )}
            />
            <ul className="list-group" style={{marginTop: '10px'}}>
                {/*Lista que muestra los actores seleccionados*/}
                {props.actores.map((actor) => 
                    <li className="list-group-item list-group-item-action" key={actor.id}>
                        {props.actoresSeleccionadosUI(actor)}
                        <button className="btn btn-outline-danger" onClick={() => props.onRemove(actor)}>
                            Eliminar
                        </button>
                    </li>
                )}
            </ul>
        </div>
    )
}

interface typeAheadActoresProps{
    actores:ActorPelicula[];
    addNuevoActor(actores:ActorPelicula[]):void;
    actoresSeleccionadosUI(actor:ActorPelicula):ReactElement;
    onRemove(actor:ActorPelicula):void;
}