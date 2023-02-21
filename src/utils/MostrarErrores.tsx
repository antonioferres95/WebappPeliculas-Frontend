export default function MostrarErrores(props: mostrarErroresProps){
    
    return(
        <div>
            {props.errores ? 
                <ul style={{color: 'red'}}>
                    {props.errores.map((error, indice) => 
                        <li key={indice}>{error}</li>
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