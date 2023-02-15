import { useFormikContext, ErrorMessage } from "formik";

export default function InputFecha(props: inputFechaProps){
    /* Este -input type="date"- se generaliza para ser reutilizado
    en todos los forms de la app */

    const {values, validateForm, touched, errors} = useFormikContext<any>();

    return(
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <input type="date" className="form-control" name={props.name} 
                onChange={e => {
                    const fecha = new Date(e.currentTarget.value + 'T00:00:00')
                    values[props.name] = fecha //Actualizamos el form
                    validateForm();
                }}
            />

            {/*Lo siguiente es: si ocurre un error, lo muestra, sino no muestra nada (null)*/}
            {touched[props.name] && errors[props.name] ? 
            <ErrorMessage name={props.name}>
                {(mensaje) => <div className="text-danger">{mensaje}</div>}
            </ErrorMessage>
            : null}
        </div>
    )
}

interface inputFechaProps{
    name:string;
    label:string;
}