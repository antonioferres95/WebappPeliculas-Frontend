import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ActorCreacion } from "../../models/actor.model";
import { urlActores } from "../../utils/Endpoints";
import { convertirActorToFormData } from "../../utils/FormDataUtils";
import MostrarErrores from "../../utils/MostrarErrores";
import FormActores from "./FormActores";

export default function CrearActor() {

  const history = useHistory();
  const [errores, setErrores] = useState<string[]>([]);
  
  async function crear(actor:ActorCreacion){
    /*A la creación del actor se le da un tratamiento especial por el archivo foto (se envia 
    FormData en lugar de Actor, y axios cambia)*/
    try{
      const formData = convertirActorToFormData(actor);
      await axios({
        method: 'post',
        url: urlActores,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      });
      history.push('/actores');
    }
    catch (error){
      setErrores(error.response.data);
    }
  }
  
  return (
    <div className="container">
      <h2>Crear actor</h2>
      <FormActores 
        buttonText="Crear"
        initValues={{nombre:"",biografia:""}} 
        onSubmit={async values => { await crear(values); }}
      />
      <MostrarErrores errores={errores}/>
    </div>
  );
}
