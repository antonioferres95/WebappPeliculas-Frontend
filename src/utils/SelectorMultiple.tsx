import './SelectorMultiple.css'

export default function SelectorMultiple(props: selectorMultipleProps){
    /*Componente de selector multiple, para seleccionar varios valores. Se hace genérico
    porque se usuará en varias partes de la app*/
    
    function seleccionarUno(item: selectorMultipleModel){
        //Crea un nuevo array y agrega el item
        const seleccionados = [...props.seleccionados, item];
        //Crea un nuevo array y quita el item
        const noSeleccionados = props.noSeleccionados.filter(valor => valor !== item);
        //Aqui refleja el cambio en la vista (en el componente padre)
        props.onChange(seleccionados, noSeleccionados);
    }

    function deseleccionarUno(item: selectorMultipleModel){
        const seleccionados = props.seleccionados.filter(valor => valor !== item);
        const noSeleccionados = [...props.noSeleccionados, item];
        props.onChange(seleccionados, noSeleccionados);
    }

    function seleccionarTodos(){
        const seleccionados = [...props.seleccionados, ...props.noSeleccionados];
        const noSeleccionados: selectorMultipleModel[] = [];
        props.onChange(seleccionados, noSeleccionados);
    }

    function deseleccionarTodos(){
        const seleccionados: selectorMultipleModel[] = [];
        const noSeleccionados = [...props.seleccionados, ...props.noSeleccionados];
        props.onChange(seleccionados, noSeleccionados);
    }

    return(
        <div className="selector-multiple">
            {/*Primero, la lista con elementos sin seleccionar*/}
            <ul>
                {props.noSeleccionados.map(item =>
                    <li key={item.llave} onClick={()=>seleccionarUno(item)}>{item.valor}</li>
                )}
            </ul>

            <div className="selector-multiple-botones">
                <button type="button" onClick={()=>seleccionarTodos()}>{">>"}</button>
                <button type="button" onClick={()=>deseleccionarTodos()}>{"<<"}</button>
            </div>
            
            {/*Segundo, la lista con elementos seleccionados*/}
            <ul>
                {props.seleccionados.map(item =>
                    <li key={item.llave} onClick={()=>deseleccionarUno(item)}>{item.valor}</li>
                )}
            </ul>
        </div>
    )
}

interface selectorMultipleProps{
    seleccionados: selectorMultipleModel[];
    noSeleccionados: selectorMultipleModel[];
    onChange(seleccionados: selectorMultipleModel[], noSeleccionados: selectorMultipleModel[]): void;
}

export interface selectorMultipleModel{
    llave: number;
    valor: string;
}