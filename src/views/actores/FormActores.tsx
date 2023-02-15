import { useHistory } from "react-router-dom";
import { ActorCreacion } from "../../models/actor.model";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputText from "../../utils/InputText";
import InputFecha from "../../utils/InputFecha";
import InputImage from "../../utils/InputImage";
import InputTextArea from "../../utils/InputTextArea";
import MapaForm from "../../utils/MapaForm";
import { Coordenadas } from "../../models/coordenadas.model";


export default function FormActores(props: formActoresProps) {
  /* Este formulario se generaliza para ser reutilizado en la 
  creacion y edicion de actores, entre otros */

  function retornarCoordenadas(): Coordenadas | undefined{
    /*Esta func sirve para mostrar las coordenadas en el mapa cuando se edita un actor,
    en caso de que existan*/

    if(props.initValues.latDomicilio && props.initValues.longDomicilio){
      const coord: Coordenadas = {
        latitud: props.initValues.latDomicilio, 
        longitud: props.initValues.longDomicilio
      }
      return coord;
    } else {
      return undefined;
    }
  }

  function hola(){

  }

  const history = useHistory();
  return (

    <Formik
      initialValues={props.initValues} //Valor inicial de los campos del form
      onSubmit={props.onSubmit}
        
      /*Validaciones con yup*/
      validationSchema={Yup.object({
        nombre: Yup.string().required("Campo requerido"),
        biografia: Yup.string().required("Campo requerido")
      })}
    >
      <Form>

        <InputText name="nombre" label="Nombre" placeholder="Johnny Depp"/>

        <InputTextArea name="biografia" label="Biografía" placeholder="Un pirata de 1780."/>
        
        <InputFecha name="fechaNacimiento" label="Fecha nacimiento"/>

        <InputImage name="foto" label="Fotografía" imagenURL={props.initValues.fotoURL}/> <br />

        <span>Domicilio actual</span>
        <MapaForm campoLat="latDomicilio" campoLong="longDomicilio" 
        coordenadas={retornarCoordenadas()}/>

        <button type="submit" className="btn btn-success">
          {props.buttonText}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={() => history.push("/actores")}>
          Cancelar
        </button>

      </Form>
    </Formik>
  );
}

interface formActoresProps {
  buttonText: string;
  initValues: ActorCreacion;
  onSubmit(values: ActorCreacion): void;
}
