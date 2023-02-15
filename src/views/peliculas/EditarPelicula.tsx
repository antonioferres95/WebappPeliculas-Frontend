import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PeliculaCreacion, PeliculasPutGetDTO } from "../../models/pelicula.model";
import Cargando from "../../utils/Cargando";
import { urlPeliculas } from "../../utils/Endpoints";
import { convertirPeliculaToFormData } from "../../utils/FormDataUtils";
import MostrarErrores from "../../utils/MostrarErrores";
import FormPeliculas from "./FormPeliculas";

export default function EditarPelicula() {

  const [pelicula, setPelicula] = useState<PeliculaCreacion>();
  const [peliculaPutGet, setPeliculaPutGet] = useState<PeliculasPutGetDTO>();
  const [errores, setErrores] = useState<string[]>([]);
  const {id}:any = useParams();
  const history = useHistory();

  useEffect(() => {
    axios.get(`${urlPeliculas}/PutGet/${id}`)
      .then((response:AxiosResponse<PeliculasPutGetDTO>) => {
        const modelo:PeliculaCreacion = {
          titulo: response.data.pelicula.titulo,
          enCines: response.data.pelicula.enCines,
          trailer: response.data.pelicula.trailer,
          posterURL: response.data.pelicula.poster,
          resumen: response.data.pelicula.resumen,
          fechaLanzamiento: new Date (response.data.pelicula.fechaLanzamiento)
        };
        setPelicula(modelo);
        setPeliculaPutGet(response.data);
      })
  }, [id])

  async function editar(peliculaEditar:PeliculaCreacion) {
    try{
      const formData = convertirPeliculaToFormData(peliculaEditar);
      await axios({
        method: 'put',
        url: `${urlPeliculas}/${id}`,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      });
      history.push(`/pelicula/${id}`);
    }
    catch(error){
      setErrores(error.response.data);
    }
  }
  
  return (
    <div className="container">
      <h2>Editar pelicula</h2>
      <MostrarErrores errores={errores}/>
      {(pelicula && peliculaPutGet) ? 
        <FormPeliculas 
          buttonText="Editar"
          initValues={pelicula}
          onSubmit={async values => { await editar(values) }}
          generosSeleccionados={peliculaPutGet.generosSeleccionados}
          generosNoSeleccionados={peliculaPutGet.generosNoSeleccionados}
          actoresSeleccionados={peliculaPutGet.actores}
        />
      : <Cargando/>}
    </div>
  );
}
