import { Field } from "formik";

export default function InputCheckBox(props: inputCheckBoxProps) {
  /* Este -input type="checkbox"- se generaliza para ser reutilizado
  en todos los forms de la app */
  /* Se usa Field de formik en lugar de input para que funcione todo lo hecho con formik,
  como las validaciones (al fin y al cabose convierte en un input)*/
  
  return (
    <div className="form-control mb-3">
      <Field type="checkbox" name={props.name} className="form-check-input"/>
      <label htmlFor={props.name}>{props.label}</label>
    </div>
  );
}

interface inputCheckBoxProps {
  name: string;
  label: string;
}
