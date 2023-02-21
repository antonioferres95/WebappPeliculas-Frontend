import { ReactElement, useContext, useEffect, useState } from "react"
import AutenticacionContext from "./AutenticacionContext";

export default function Autorizado(props: autorizadosProps){

    const [estaAutorizado, setEstaAutorizado] = useState(false);
    const {claims} = useContext(AutenticacionContext);

    useEffect(() => {
        if(props.role){
            const indice = claims.findIndex(claim => (
                claim.nombre === "role" && claim.valor === props.role
            ));
            setEstaAutorizado(indice>-1);
        } else {
            //Suponemos que un usuario autorizado siempre tendra al menos un claim
            setEstaAutorizado(claims.length > 0); 
        }
    }, [claims, props.role])

    return(
        <>
            {estaAutorizado ? props.autorizado : props.noAutorizado}
        </>
    )
}

interface autorizadosProps{
    autorizado:ReactElement;
    noAutorizado?:ReactElement;
    role?:string;
}