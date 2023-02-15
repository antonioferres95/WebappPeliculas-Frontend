import { useHistory } from "react-router-dom";
import { GeneroCreacion } from "../../models/genero.model";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputText from "../../utils/InputText";

export default function FormGeneros(props: formGenerosProps) {
  /* Este formulario se generaliza para ser reutilizado en la 
  creacion y edicion de generos, entre otros */

  const history = useHistory();
  return (

    <Formik
      initialValues={props.initValues} //Valor inicial de los campos del form
      onSubmit={props.onSubmit}
        
      /*Validaciones con yup*/
      validationSchema={Yup.object({
        nombre: Yup.string().required("Campo requerido")
          .primeraLetraMayus().max(15, "La longitud maxima es de 15 caracteres")
      })}
    >
      <Form>

        <InputText name="nombre" label="Nombre" placeholder="Terror"/>

        <button type="submit" className="btn btn-success">
          {props.buttonText}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={() => history.push("/generos")}>
          Cancelar
        </button>
        <button type="reset" className="btn btn-outline-danger">
          Limpiar formulario
        </button>

      </Form>
    </Formik>
  );
}

interface formGenerosProps {
  buttonText: string;
  initValues: GeneroCreacion;
  onSubmit(values: GeneroCreacion): void;
}
