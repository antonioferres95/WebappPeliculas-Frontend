import { Actor, ActorCreacion } from "../../models/actor.model";
import EditarEntidad from "../../utils/EditarEntidad";
import { urlActores } from "../../utils/Endpoints";
import { convertirActorToFormData } from "../../utils/FormDataUtils";
import FormActores from "./FormActores"

export default function EditarActor() {

  const transformar = (actor:Actor) => {
    return {
      nombre: actor.nombre,
      fotoURL: actor.foto,
      biografia: actor.biografia,
      fechaNacimiento: actor.fechaNacimiento
    }
  }

  return (
    <div>
      <EditarEntidad<ActorCreacion, Actor> url={urlActores} urlListado="/actores" 
        nombreEntidad="Actores" transformarFormData={convertirActorToFormData}
        transformar={transformar}
      >
        {(entidad, editar) => 
          <FormActores
            buttonText="Editar"
            initValues={entidad} 
            onSubmit={async values => { await editar(values) }}
          />
        }
      </EditarEntidad>
    </div>
  );
}
