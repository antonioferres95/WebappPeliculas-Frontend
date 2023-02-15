//Modelos
import { ReactElement } from "react";
import Cargando from "./Cargando";

export default function ListadoGenerico(props:listadoGenericoProps){

    /*Este es un listado generico que prentende reutilizarse para
    culaquier cosa, funciona:
        Si no vienen las elementos, muestro un carganding que venga en props
            o uno por defecto
        Si vienen los elementos pero esta vacio, muestro un cartel que venga
            en props o uno por defecto
        Si vienen los elementos, muestro la vista del componente padre que invoco este componente
    */

    if(((!props.array) && (props.array !== undefined))){
        if(props.cargandoUI)
        {
            return(props.cargandoUI)
        }
        else{
            return(<Cargando/>)
        }
    }
    else if (props.array == undefined)
    {
        return(<div>No hay elementos para mostrar</div>)
    }
    else if(props.array.length === 0){
        if(props.arrayVacioUI)
        {
            return(props.arrayVacioUI)
        }
        else{
            return(<div>No hay elementos para mostrar</div>)
        }
    }
    else{
        return(props.children)
    }
}

interface listadoGenericoProps{
    array: any
    children: ReactElement
    cargandoUI?: ReactElement
    arrayVacioUI?: ReactElement
}