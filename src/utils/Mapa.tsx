import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { useState } from "react";
import { Coordenadas } from "../models/coordenadas.model";

/*Con lo siguiente (hasta antes de la funcion Mapa), le demos estilos al icono que se muestra
al seleccionar un punto en el mapa*/
let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16, 37]
});
L.Marker.prototype.options.icon = defaultIcon;

export default function Mapa(props: mapaProps){
    /*Este componente solo muestra el mapa. La interacción con un formulario se hace
    en el componente MapaForm*/

    const [coordenadas, setCoordenadas] = useState<Coordenadas>(props.coordenadas);

    return(
         //Con center digo donde se centrara el mapa apenas aparezca
        <MapContainer center={[-31.53761522674969, -68.55489061929111]}
         zoom={14} style={{height: '500px'}}>
            <TileLayer attribution="React webapp" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <ClickMapa setPunto={coor => {setCoordenadas(coor); props.manejarClickMapa(coordenadas)}}/>
            <Marker position={[coordenadas.latitud, coordenadas.longitud]}/>    
        </MapContainer>
    )
}

interface mapaProps{
    coordenadas:Coordenadas;
    manejarClickMapa(coordenadas:Coordenadas): void; //Para interactuar con el form en MapaForm
}

function ClickMapa(props: clickMapaProps){
    /*Este componente no muestra ninguna vista, es solamente para implemenar la 
    funcionalidad de mostrar el marcador en el mapa cuando se hace click*/
    useMapEvent('click', e => {props.setPunto({latitud: e.latlng.lat, longitud: e.latlng.lng})})
    return null;
}

interface clickMapaProps{
    setPunto(coordenadas:Coordenadas): void;
}
