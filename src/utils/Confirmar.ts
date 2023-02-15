import swal from 'sweetalert2';

export default function confirmar(onConfirm:any, titulo:string = "¿Desea borrar este registro?", textoBoton:string = "Borrar"){
    swal.fire({
        title: titulo,
        confirmButtonText: textoBoton,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    }).then((result) => {
        if(result.isConfirmed){
            onConfirm();
        }
    })
}