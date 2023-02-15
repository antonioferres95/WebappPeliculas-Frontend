import { Link } from "react-router-dom";
import { Actor } from "../../models/actor.model";
import { urlActores } from "../../utils/Endpoints";
import ListadoEntidad from "../../utils/ListadoEntidad";

export default function ListadoActores() {
  return (
    <div className="container">
      <ListadoEntidad<Actor> url={urlActores} urlCrear="actores/crear" 
        titulo="Actores" nombreEntidad="Actor"
      >
        {(actores, botones) => 
          <>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Biografia</th>
              </tr>
            </thead>
            <tbody>
              {actores?.map((actor) => 
                <tr key={actor.id}>
                  <td>
                    {botones(`actores/editar/${actor.id}`, actor.id)}
                  </td>
                  <td>
                    {actor.nombre}
                  </td>
                  <td>
                    {actor.biografia}
                  </td>
                </tr>
              )}
            </tbody>
          </>
        }
      </ListadoEntidad>
    </div>
  );
}
