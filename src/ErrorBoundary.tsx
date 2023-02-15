import React, {ReactElement} from "react";

export default class ErrorBoundary extends React.Component<errorBoundaryProps, errorBoundaryState>{
    /* En el <>, la primer interface se refiere a los props, 
    y la segunda al estado */

    constructor(props:errorBoundaryProps){
        super(props)
        this.state= {hayError: false, mensaje: ''} 
        /*Cuando haya error, esto se pone en true y cargamos un mensaje*/    
    }

    componentDidCatch(mensajeError: Error, errorInfo: React.ErrorInfo){
        //Este método es opcional
        console.log(mensajeError)
        console.log(errorInfo) //Información sobre el error ocurrido
    }

    static getDerivedStateFromError(error: any){
        //Esta función se encarga de cambiar el estado en caso de haber error
        return {hayError: true, mensaje: error}
    }

    render(){
        //Esta funcion es la que se encarga de determinar que se mostrará en la vista
        if (this.state.hayError){
            //Si hay error
            if (this.props.errorUI){ 
                /*Si en los props se envía una vista para mostrarse en caso de ocurrior un error,
                se muestra dicha vista*/
                return this.props.errorUI
            }
            else {
                return <h3>{this.state.mensaje}</h3>
                //Si no viene una vista en los props, simplemente mostramos el mensaje del error
            }
        }
        return this.props.children;
        //Si no hay error, muestro la vista que debería mostrarse
    }

}

interface errorBoundaryState{
    hayError:boolean
    mensaje:string
}

interface errorBoundaryProps{
    errorUI?: ReactElement //Opcionalmente puede venir
    children?: React.ReactNode //Opcionalmente puede venir
}