import { useFormikContext } from "formik";
import { Coordenadas } from "../models/coordenadas.model";
import Mapa from "./Mapa";

export default function MapaForm(props: mapaFormProps){
    /*Este componente usa el componente mapa, y agrega la interacción con un formulario*/

    const {values} = useFormikContext<any>();

    function actualizarCampos(coord: Coordenadas){
        //Esta func actualiza los campos del form

        values[props.campoLat] = coord.latitud;
        values[props.campoLong] = coord.longitud;
    }

    return(
        <Mapa coordenadas={props.coordenadas} manejarClickMapa={actualizarCampos}/>
    )
}

interface mapaFormProps{
    coordenadas: Coordenadas;
    campoLat: string;
    campoLong: string;
}

MapaForm.defaultProps = {
    coordenadas: {latitud: 0, longitud: 0}
}