import * as Yup from 'yup'

export default function validacionesCustom(){
    //Cada validacion que se agregue implica un nuevo Yup.addMethod
    //Notar que la función debe devolver true o false

    Yup.addMethod(Yup.string, 'primeraLetraMayus', function(){
        return this.test('primeraLetraMayus', 'La primera letra debe ser mayúscula', function (valor){
            //Aqui va la validación en si
            //En valor esta lo que ingreso el usuario en el campo
            if (valor && valor.length > 0){
                const primeraLetra = valor.substring(0,1);
                return primeraLetra === primeraLetra.toUpperCase();
                //Si la primer letra es mayus, retorna true, sino false
            } else return true;
        })
    })
}