import { ReactElement } from "react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListadoGenerico from "./ListadoGenerico";
import Paginacion from "./Paginacion";
import confirmar from "./Confirmar";

export default function ListadoEntidad<T>(props: listadoEntidadProps<T>){

    const [entidades, setEntidades] = useState<T[]>();
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [recordsPorPagina, setRecordsPorPagina] = useState(5);
    const [pagina, setPagina] = useState(1);

    //Siempre que se cargue este componente, traera los generos de la api
    useEffect(() => {
        cargarDatos();
    }, [pagina, recordsPorPagina]); //El useEffect se actualiza cuando cambia la pagina y recordsPorPag
    
    async function cargarDatos() {
        axios.get(props.url, {params: {pagina, recordsPorPagina}})
        .then((response: AxiosResponse<T[]>) => { 
            const totalRegistros = parseInt(response.headers['cantidadtotalregistros']);
            setTotalPaginas(Math.ceil(totalRegistros/recordsPorPagina))
            setEntidades(response.data);
        })
    }
    async function borrar (id:number){
        try{
        await axios.delete(`${props.url}/${id}`);
        cargarDatos(); //Actualizo la vista
        }
        catch(error){
        console.log(error.response.data);
        }
    }

    const botones = (urlEditar:string, id:number) => 
    <div>
        <Link className="btn btn-success" to={urlEditar}> Editar </Link> 
        <a className="btn btn-danger" onClick={() => confirmar(() => borrar(id))}>
            Borrar
        </a>
    </div>

    return(
        <div>
            <h2>{props.titulo}</h2>
            <Link className="btn btn-primary" to={props.urlCrear}>Crear {props.nombreEntidad}</Link>

            <div className="form-group" style={{width: '150px'}}>
                <label>Registros por página:</label>
                <select className="form-grupo" defaultValue={5} onChange={(e) => {
                    setPagina(1);
                    setRecordsPorPagina(parseInt(e.currentTarget.value));
                }}>
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                </select>
            </div>

            <Paginacion cantidadTotalPaginas={totalPaginas} 
                paginaActual={pagina} onChange={(nuevaPagina) => setPagina(nuevaPagina)} 
                //nuevaPagina viene del onChange del componente Paginacion (cuando clickea el usuario)
            />
            <ListadoGenerico array={entidades}>
                <table className="table table-striped">
                    {props.children(entidades!, botones)}
                </table>
            </ListadoGenerico>
        </div>
    )
}

interface listadoEntidadProps<T>{
    url:string;
    urlCrear:string;
    titulo:string;
    nombreEntidad:string;
    children(entidades:T[], botones:(urlEditar:string, id:number) => ReactElement):ReactElement;
}