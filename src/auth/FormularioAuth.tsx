import { Form, Formik } from "formik";
import { credencialesUsuario } from "./auth.model";
import * as Yup from 'yup';
import InputText from "../utils/InputText";
import { useHistory } from "react-router-dom";

export default function FormularioAuth(props: formularioAuthProps){

    const history = useHistory();

    return(
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                email: Yup.string()
                    .required("Este campo es requerido")
                    .email("Debe colocar un email valido"),
                password: Yup.string()
                .required("Este campo es requerido")
            })}
        >
            {formikProps => (
                <Form>
                    <InputText name="email" label="Email" placeholder="ejemplo@mymail.com"/>
                    <InputText name="password" label="Password" type="password"/>
                    <br />
                    <button type="submit" className="btn btn-primary" disabled={formikProps.isSubmitting} style={{marginRight: "10px"}}>
                        Enviar
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => history.push("/home")}>
                        Cancelar
                    </button>
                </Form>
            )}  
        </Formik>
    )
}

interface formularioAuthProps{
    modelo:credencialesUsuario;
    onSubmit(values:credencialesUsuario):void;
}