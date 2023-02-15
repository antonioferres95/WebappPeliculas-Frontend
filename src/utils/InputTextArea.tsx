import { ErrorMessage, Field } from "formik";

export default function InputTextArea(props: inputTextProps) {
  /* Este textarea se generaliza para ser reutilizado
  en todos los forms de la app */
  /* Se usa Field de formik en lugar de input para que funcione
  todo lo hecho con formik, como las validaciones (al fin y al cabo
  se convierte en un input)*/

  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label> <br />
      <Field name={props.name} as="textarea" placeholder={props.placeholder} 
        className="form-control" rows={5} />
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
