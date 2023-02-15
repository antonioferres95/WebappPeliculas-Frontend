import { NavLink } from "react-router-dom";
import css from './Menu.module.css'

export default function Menu() {

  return (
      <header className={css.headernav}>

        <div className={css.upperRow}>
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png" width="80" height="80" className="d-inline-block align-top" alt="Logo React"/>
          </div>

          <div>
            <h1>Peliculas webapp</h1>
          </div>
          
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/1024px-.NET_Core_Logo.svg.png" width="80" height="80" className="d-inline-block align-top" alt="Logo React"/>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg" style={{justifyContent: "center"}}>
          <ul className="navbar-nav ml-auto">
            <li>
              <NavLink to="/" className="nav-item nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/peliculas/crear" className="nav-item nav-link">
                Crear pelicula
              </NavLink>
            </li>
            <li>
              <NavLink to="/peliculas/filtrar" className="nav-item nav-link">
                Filtrar peliculas
              </NavLink>
            </li>
            <li>
              <NavLink to="/generos" className="nav-item nav-link">
                Generos
              </NavLink>
            </li>
            <li>
              <NavLink to="/actores" className="nav-item nav-link">
                Actores
              </NavLink>
            </li>
            <li>
              <NavLink to="/cines" className="nav-item nav-link">
                Cines
              </NavLink>
            </li>
          </ul>
        </nav>

      </header>
  );
}
