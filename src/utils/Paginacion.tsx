import { useEffect, useState } from "react";

export default function Paginacion(props: paginacionProps){

    const [listadoLinks, setListadoLinks] = useState<modeloLink[]>([]);

    useEffect(() => {

        const links:modeloLink[] = [];

        //Logica pagina anterior:

        const paginaAnteriorHabilitada = props.paginaActual !== 1; //Si no estamos en la pag 1
        const paginaAnterior = props.paginaActual -1;

        links.push({
            texto: 'Anterior',
            habilitado: paginaAnteriorHabilitada, 
            pagina: paginaAnterior,
            activo: false
        });

        for (let i=1; i<=props.cantidadTotalPaginas; i++){
            if((i >= props.paginaActual - props.radio) && (i<=props.paginaActual + props.radio)){
                //Si estoy dentro del radio, muestro el numero de la pagina en la barra de navegacion
                links.push({
                    texto: `${i}`, 
                    activo: props.paginaActual === i, //Muestra como activo solamente la pag actual
                    habilitado: true,
                    pagina: i
                });
            }
        }

        //Logica pagina siguiente:

        const paginaSiguienteHabilitada = (props.paginaActual !== props.cantidadTotalPaginas) && (props.cantidadTotalPaginas > 0); 
        //Si no estamos en la ultima pag y si hay más paginas para mostrar
        const paginaSiguiente = props.paginaActual +1;

        links.push({
            texto: 'Siguiente',
            habilitado: paginaSiguienteHabilitada, 
            pagina: paginaSiguiente,
            activo: false
        });

        setListadoLinks(links);
    }, [props.paginaActual, props.cantidadTotalPaginas, props.radio]) 
    /*El useEffect se ejecuta si cambia la pagina actual (lo mas habitual), la cant total de pags
    o el radio */
                                                                      
    function obtenerClaseCSS(link:modeloLink){
        //Cada pagina de la barra de nav de paginas se mostrara segun su estado
        if(link.activo){
            return "active pointer";
        }

        if(!link.habilitado){
            //Esto es para los botones anterior y siguiente
            return "disabled";
        }

        return "pointer";
    }

    function seleccionarPagina(link:modeloLink){
        if(link.pagina === props.paginaActual){
            return; 
        }

        if(!link.habilitado){
            //Esto es para los botones anterior y siguiente
            return;
        }

        props.onChange(link.pagina);
    }

    return(
        <nav>
            <ul className="pagination justify-content-center">
                {listadoLinks.map((link) =>
                    <li 
                        key={link.texto}
                        onClick={() => seleccionarPagina(link)}
                        className={`page-item cursor ${obtenerClaseCSS(link)}`}
                    >
                        <span className="page-link">{link.texto}</span>
                    </li>
                )}
            </ul>
        </nav>
    )
}

interface modeloLink{
    //Esto es para la barra de navegacion de paginas
    pagina:number;
    habilitado:boolean;
    texto:string;
    activo:boolean; //Si es la pagina actual o no
}

interface paginacionProps{
    paginaActual:number;
    cantidadTotalPaginas:number;
    radio:number; //Cantidad de paginas que se muestran en la barra de navegacion de paginas
    onChange(pagina:number):void; //Para pasar de una pag a otra
}

Paginacion.defaultProps={
    radio:2
}