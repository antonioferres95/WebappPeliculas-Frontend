import { Genero } from "../../models/genero.model";
import { urlGeneros } from "../../utils/Endpoints";
import ListadoEntidad from "../../utils/ListadoEntidad"

export default function ListadoGeneros() {

  return (
    <div className="container">
      <ListadoEntidad<Genero> url={urlGeneros} urlCrear="generos/crear" 
        titulo="Géneros" nombreEntidad="Género"
      >
        {(generos, botones) => 
          <>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {generos?.map((genero) => 
                <tr key={genero.id}>
                  <td>
                    {botones(`generos/editar/${genero.id}`, genero.id)}
                  </td>
                  <td>
                    {genero.nombre}
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