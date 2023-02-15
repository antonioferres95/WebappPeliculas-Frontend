import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { GeneroCreacion } from "../../models/genero.model";
import { urlGeneros } from "../../utils/Endpoints";
import MostrarErrores from "../../utils/MostrarErrores";
import FormGeneros from "./FormGeneros";

export default function CrearGenero() {

  const history = useHistory();
  const [errores, setErrores] = useState<string[]>([]);
  
  async function crear(genero:GeneroCreacion){
    try{
      await axios.post(urlGeneros, genero);
      history.push('/generos');
    }
    catch (error){
      console.error(error);
      setErrores(error.response.data);
    }
  }

  return (
    <div className="container">
      <h2>Crear genero</h2>
      <FormGeneros 
        buttonText="Crear"
        initValues={{nombre:""}} 
        onSubmit={async values => { await crear(values); }}
      />
      <MostrarErrores errores={errores}/>
    </div>
  );
}
