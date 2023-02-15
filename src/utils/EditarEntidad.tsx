import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import MostrarErrores from "./MostrarErrores";

export default function EditarEntidad<TCreacion, TLectura>(props: editarEntidadProps<TCreacion,TLectura>){

    const { id }: any = useParams();
    const [entidad, setEntidad] = useState<TCreacion>();
    const [errores, setErrores] = useState<string[]>([]);
    const history = useHistory();

    useEffect(() => {
        axios.get(`${props.url}/${id}`)
          .then((response:AxiosResponse<TLectura>) => {
            setEntidad(props.transformar(response.data));
          })
      }, [])
    
      async function editar(entidadEditar:TCreacion){
        try{
          if(props.transformarFormData){
            const formData = props.transformarFormData(entidadEditar);
            await axios({
              method: 'put',
              url: `${props.url}/${id}`,
              data: formData,
              headers: {'Content-Type': 'multipart/form-data'}
            });
          }else{
            await axios.put(`${props.url}/${id}`, entidadEditar);
          }
          history.push(props.urlListado);
        }
        catch(error){
          setErrores(error.response.data)
        }
      }

    return(
        <div>
            <h2>Editar {props.nombreEntidad}</h2>
            <MostrarErrores errores={errores}/>
            {entidad ? props.children(entidad, editar) : <img src="https://tradinglatam.com/wp-content/uploads/2019/04/loading-gif-png-4.gif" alt="Cargando" />}
        </div>
    )
}

interface editarEntidadProps<TCreacion,TLectura>{
    url:string;
    urlListado:string;
    nombreEntidad:string;
    children(entidad:TCreacion, editar:(entidad:TCreacion) => void): ReactElement;
    transformar(entidad:TLectura):TCreacion;
    transformarFormData?(entidad:TCreacion):FormData;
}

EditarEntidad.defaultProps = {
    transformar:(entidad:any) => entidad
}