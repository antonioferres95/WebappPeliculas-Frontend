import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AutenticacionContext from "../auth/AutenticacionContext";
import './Rating.css'

export default function Rating(props: ratingProps){

    const {claims} = useContext(AutenticacionContext);
    const [maximoValorArr, setMaximoValorArr] = useState<number[]>([]);
    const [valorSeleccionado, setValorSeleccionado] = useState(props.valorSeleccionado);

    useEffect(() => {
        setMaximoValorArr(Array(props.maximoValor).fill(0));
    }, [props.maximoValor])

    function manejarMouseOver(voto:number){
        setValorSeleccionado(voto);
    }

    function manejarClick(voto:number){
        if(claims.length === 0){
            Swal.fire({title: "Error", text: "Inicia sesión para poder votar", icon: "error"})
            return;
        }

        setValorSeleccionado(voto);
        props.onChange(voto);
    }

    return(
        <>
            {maximoValorArr.map((valor, indice) =>
                <FontAwesomeIcon 
                    icon="star" 
                    key={indice} 
                    className={`fa-lg pointer ${valorSeleccionado >= indice+1 ? 'checked' : null}`}
                    onMouseOver={() => manejarMouseOver(indice+1)}
                    onClick={() => manejarClick(indice+1)}
                />
            )}
        </>
    )
}

interface ratingProps{
    maximoValor:number;
    valorSeleccionado:number;
    onChange(voto:number):void;
}