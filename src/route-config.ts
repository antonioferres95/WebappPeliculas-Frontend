import Home from "./Home";
import CrearActor from "./views/actores/CrearActor";
import EditarActor from "./views/actores/EditarActor";
import ListadoActores from "./views/actores/ListadoActores";
import CrearGenero from "./views/generos/CrearGenero";
import EditarGenero from "./views/generos/EditarGenero";
import ListadoGeneros from "./views/generos/ListadoGeneros";
import CrearPelicula from "./views/peliculas/CrearPelicula";
import EditarPelicula from "./views/peliculas/EditarPelicula";
import FiltrarPeliculas from "./views/peliculas/FiltrarPeliculas";
import Page404 from "./utils/Page404";
import DetallePelicula from "./views/peliculas/DetallePelicula";

const rutas = [
    {path: '/generos/crear', componente: CrearGenero},
    {path: '/generos/editar/:id(\\d+)', componente: EditarGenero}, 
    //Con el "(\\d+)" indico que es un numero
    {path: '/generos', componente: ListadoGeneros, exact: true},
    /*El exact sirve para que otras rutas que comiencen con el "/" (podria 
    ser otra cosa) no matcheen aqui*/

    {path: '/actores/crear', componente: CrearActor},
    {path: '/actores/editar/:id(\\d+)', componente: EditarActor},
    {path: '/actores', componente: ListadoActores, exact: true},

    {path: '/pelicula/:id(\\d+)', componente: DetallePelicula},
    {path: '/peliculas/crear', componente: CrearPelicula},
    {path: '/peliculas/editar/:id(\\d+)', componente: EditarPelicula},
    {path: '/peliculas/filtrar', componente: FiltrarPeliculas},

    {path: '/', componente: Home, exact: true},
    {path: '*', componente: Page404},
    //Con este ultimo path hacen match todas las rutas que no existen
    //Siempre va al ultimo, pues la busqueda es secuencial en el array

];

export default rutas;