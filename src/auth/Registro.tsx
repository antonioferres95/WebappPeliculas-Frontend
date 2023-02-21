import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { urlCuentas } from "../utils/Endpoints";
import MostrarErrores from "../utils/MostrarErrores";
import AutenticacionContext from "./AutenticacionContext";
import { credencialesUsuario, respuestaAutenticacion } from "./auth.model";
import FormularioAuth from "./FormularioAuth";
import { guardarTokenLocalStorage, obtenerClaims } from "./manejadorJWT";


export default function Registro(){

    const {actualizar} = useContext(AutenticacionContext);
    const [errores, setErrores] = useState<string[]>([]);
    const history = useHistory();

    async function registrar(credenciales:credencialesUsuario) {
    
        try{
            const response = await axios
                .post<respuestaAutenticacion>(`${urlCuentas}/crear`, credenciales);
            guardarTokenLocalStorage(response.data);
            actualizar(obtenerClaims());
            history.push("/");
            console.log(response.data);
        } catch(error){
            setErrores(error.response.data);
        }
    }

    return(
        <>
            <h3>Registro</h3>
            <MostrarErrores errores={errores}/>
            <FormularioAuth 
                modelo={{email: '', password: ''}}
                onSubmit={async (values) => {
                    await registrar(values)
                }}
            />
        </>
    )
}
