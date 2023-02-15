import { useEffect, useState } from "react";
import ListadoPeliculas from "./views/peliculas/ListadoPeliculas";
import { LandingPageDTO } from "./models/pelicula.model";
import axios, { AxiosResponse } from "axios";
import { urlPeliculas } from "./utils/Endpoints";
import AlertaContext from "./utils/AlertaContext";


export default function Home() {

  const [peliculas, setPeliculas] = useState<LandingPageDTO>({});

  useEffect(() => {
    cargarDatos();
  }, []);

  function cargarDatos(){
    axios.get(urlPeliculas)
      .then((response: AxiosResponse<LandingPageDTO>) => {
        setPeliculas(response.data);
      })
  }

  return (
    <div>
      <AlertaContext.Provider value={() => cargarDatos()}>
        <h3>Peliculas en cartelera</h3>
        <ListadoPeliculas peliculas={peliculas.enCines} />

        <h3>Peliculas por estrenar</h3>
        <ListadoPeliculas peliculas={peliculas.porEstrenar} />
      </AlertaContext.Provider>
    </div>
  );
}
