import axios from "axios";
import Swal from "sweetalert2";
import confirmar from "../utils/Confirmar";
import { urlCuentas } from "../utils/Endpoints";
import ListadoEntidad from "../utils/ListadoEntidad";
import { usuarioDTO } from "./auth.model";

export  default function ListadoUsuarios(){

    async function hacerAdmin(id:string){
        await editarAdmin(`${urlCuentas}/hacerAdmin`, id);
    }

    async function removerAdmin(id:string){
        await editarAdmin(`${urlCuentas}/removerAdmin`, id);
    }

    async function editarAdmin(url:string, id:string){
        await axios.post(
            url, 
            JSON.stringify(id),
            {
                headers: {'Content-Type': 'application/json'}
            }
        );

        Swal.fire({
            title: 'Exito',
            text: 'Operación realizada con éxito',
            icon: 'success'
        });
    }

    return(
        <ListadoEntidad<usuarioDTO>
            url={`${urlCuentas}/listadoUsuarios`}
            titulo="Usuarios"
        >
            {usuarios => 
                <>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios?.map((usuario) =>
                            <tr key={usuario.id}>
                                <td>
                                    <button 
                                        className="btn btn-success" 
                                        onClick={() => 
                                            confirmar(
                                                () => hacerAdmin(usuario.id),
                                                `¿Desea hacer admin a ${usuario.email}?`,
                                                'Confirmar'
                                            )
                                        }
                                    >
                                        Hacer Admin
                                    </button>
                                    <button
                                        className="btn btn-danger" 
                                        onClick={() => 
                                            confirmar(
                                                () => removerAdmin(usuario.id),
                                                `¿Desea quitar el admin a ${usuario.email}?`,
                                                'Confirmar'
                                            )
                                        }
                                    >
                                        Remover Admin
                                    </button>
                                </td>
                                <td>
                                    {usuario.email}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </>
            }
        </ListadoEntidad>

    )
}