import { Genero, GeneroCreacion } from "../../models/genero.model";
import EditarEntidad from "../../utils/EditarEntidad";
import { urlGeneros } from "../../utils/Endpoints";
import FormGeneros from "./FormGeneros";

export default function EditarGenero() {

  return (
    <div>
      <EditarEntidad<GeneroCreacion, Genero> url={urlGeneros} urlListado="/generos" nombreEntidad="Géneros">
        {(entidad, editar) => 
          <FormGeneros 
            buttonText="Editar"
            initValues={entidad} 
            onSubmit={async values => { await editar(values) }}
          />
        }
      </EditarEntidad>
    </div>
  );
}
