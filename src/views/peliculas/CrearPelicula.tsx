import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Genero } from "../../models/genero.model";
import { PeliculaCreacion, peliculasPostGetDTO } from "../../models/pelicula.model";
import Cargando from "../../utils/Cargando";
import { urlPeliculas } from "../../utils/Endpoints";
import { convertirPeliculaToFormData } from "../../utils/FormDataUtils";
import MostrarErrores from "../../utils/MostrarErrores";
import FormPeliculas from "./FormPeliculas";

export default function CrearPelicula() {

  const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState<Genero[]>([]);
  const [cargado, setCargado] = useState(false);
  const history = useHistory();
  const [errores, setErrores] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`${urlPeliculas}/postget`)
    .then((response:AxiosResponse<peliculasPostGetDTO>) => {
      setGenerosNoSeleccionados(response.data.generos);
      setCargado(true);
    })
  }, [])

  async function crear(pelicula:PeliculaCreacion) {
    try{
      const formData = convertirPeliculaToFormData(pelicula);
      await axios({
        method: 'post',
        url: urlPeliculas,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      }).then((response: AxiosResponse<number>) => {
        history.push(`/pelicula/${response.data}`);
      })
    }
    catch(error){
      setErrores(error.response.data);
    }
  }

  return (
    <div className="container">
      <h2>Crear pelicula</h2>
      <MostrarErrores errores={errores}/>
      {cargado ? 
        <FormPeliculas 
        buttonText="Crear"
        initValues={{titulo:"", enCines: false, trailer: ""}} 
        onSubmit={async values => { crear(values); history.push("/"); }}
        generosNoSeleccionados={generosNoSeleccionados} 
        generosSeleccionados={[]}
        actoresSeleccionados={[]}
        //Como se esta creando la pelicula, se ponen todos los generos como no seleccionados
        />
      : <Cargando/>}
    </div>
  );
}
