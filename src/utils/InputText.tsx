import { ErrorMessage, Field } from "formik";

export default function InputText(props: inputTextProps) {
  /* Este -input type="text"- se generaliza para ser reutilizado
  en todos los forms de la app */
  /* Se usa Field de formik en lugar de input para que funcione
  todo lo hecho con formik, como las validaciones (al fin y al cabo
  se convierte en un input)*/

  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <Field name={props.name} placeholder={props.placeholder} className="form-control" />
      <ErrorMessage name={props.name}>
        {(mensaje) => <div className="text-danger">{mensaje}</div>}
      </ErrorMessage>
    </div>
  );
}

interface inputTextProps {
  name: string;
  label: string;
  placeholder: string;
}
