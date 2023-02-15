import { Form, Formik } from "formik";
import { PeliculaCreacion } from "../../models/pelicula.model";
import * as Yup from 'yup'
import InputText from "../../utils/InputText";
import InputCheckBox from "../../utils/InputCheckbox";
import InputFecha from "../../utils/InputFecha";
import InputImage from "../../utils/InputImage";
import { useHistory } from "react-router-dom";
import SelectorMultiple, { selectorMultipleModel } from "../../utils/SelectorMultiple";
import { Genero } from "../../models/genero.model";
import { useState } from "react";
import TypeAheadActores from "../actores/TypeAheadActores";
import { ActorPelicula } from "../../models/actor.model";
import InputTextArea from "../../utils/InputTextArea";

export default function FormPeliculas(props: formPeliculasProps){
    /* Este formulario se generaliza para ser reutilizado en la 
    creacion y edicion de peliculas, entre otros */

    const history = useHistory();

    function arrayToSelectMultModel(array: {id: number, nombre: string}[]): selectorMultipleModel[]{
        return array.map(value => {
            return {llave: value.id, valor: value.nombre}
        })
    }

    const [generosSeleccionados, setGenerosSeleccionados] = useState(arrayToSelectMultModel(props.generosSeleccionados));
    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState(arrayToSelectMultModel(props.generosNoSeleccionados));
    
    const [actoresSeleccionados, setActoresSeleccionados] = useState<ActorPelicula[]>(props.actoresSeleccionados);

    return(
        <Formik
            initialValues={props.initValues} //Valor inicial de los campos del form
            onSubmit={values => {
                values.generosIds = generosSeleccionados.map(value => value.llave);
                values.actores = actoresSeleccionados;
                props.onSubmit(values)
            }}

            /*Validaciones con yup*/
            validationSchema={Yup.object({
                titulo: Yup.string().required("Campo requerido").primeraLetraMayus(),
            })}
        >
            <Form>

                <InputText name="titulo" label="Título" placeholder="Piratas del Caribe"/> <br />

                <InputCheckBox name="enCines" label="En cines"/>

                <InputText name="trailer" label="Trailer" placeholder="youtube.com"/>

                <InputFecha name="fechaLanzamiento" label="Fecha de lanzamiento"/>

                <InputImage name="poster" label="Poster" imagenURL={props.initValues.posterURL}/>

                <InputTextArea name="resumen" label="Resumen" placeholder="Una película super cortita."/>

                <div className="form-group">
                    <label>Géneros</label>
                    <SelectorMultiple seleccionados={generosSeleccionados} noSeleccionados={generosNoSeleccionados}
                        onChange={(seleccionados, noSeleccionados) => {
                            //Aqui recibo los cambios en el selector y actualizo la vista
                            setGenerosSeleccionados(seleccionados);
                            setGenerosNoSeleccionados(noSeleccionados);
                        }}
                    />
                </div>

                <div className="form-group">
                    <TypeAheadActores actores={actoresSeleccionados} 
                        addNuevoActor={(actores) => {setActoresSeleccionados(actores);}}
                        onRemove={(actor) => {
                            const actores = actoresSeleccionados.filter((x) => x !== actor);
                            setActoresSeleccionados(actores);
                        }}
                        actoresSeleccionadosUI={(actor) => {
                            return(
                                <div>
                                    {actor.nombre} / <input type="text" placeholder="Personaje"
                                    value={actor.personaje} onChange={(e) => {
                                        const indice = actoresSeleccionados
                                            .findIndex(x => x.id === actor.id);
                                        const actores = [...actoresSeleccionados];
                                        actores[indice].personaje = e.currentTarget.value;
                                        setActoresSeleccionados(actores);       
                                    }} />
                                </div>
                            )
                        }}
                     />
                </div>

                <button type="submit" className="btn btn-success">
                    {props.buttonText}
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => history.push("/")}>
                    Cancelar
                </button>

            </Form>

        </Formik>
    )

}

interface formPeliculasProps{
    buttonText: string;
    initValues:PeliculaCreacion;
    onSubmit(values:PeliculaCreacion):void;
    generosSeleccionados:Genero[];
    generosNoSeleccionados:Genero[];
    actoresSeleccionados:ActorPelicula[];
}