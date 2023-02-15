export default function MostrarErrores(props: mostrarErroresProps){
    
    return(
        <div>
            {props.errores ? 
                <ul style={{color: 'red'}}>
                    {props.errores.map((error) => 
                        <li>{error}</li>
                    )}
                </ul>
            :null
            } 
        </div>
    )
}

interface mostrarErroresProps{
    errores?: string[];
}