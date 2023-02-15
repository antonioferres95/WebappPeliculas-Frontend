import { StringSchema } from "yup";

//Agregamos al schema de yup esta nueva función
declare module 'yup'{
    class StringSchema{
        primeraLetraMayus(): this;
    }
}