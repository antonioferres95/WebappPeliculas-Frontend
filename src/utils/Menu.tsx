import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AutenticacionContext from "../auth/AutenticacionContext";
import Autorizado from "../auth/Autorizado";
import { logout } from "../auth/manejadorJWT";
import'./Menu.css'

export default function Menu() {

  const {actualizar, claims} = useContext(AutenticacionContext);

  function obtenerEmailUsuario():string{
    return claims.filter((x) => x.nombre === "email")[0]?.valor;
  }

  return (
      <header className="headernav">

        <div className="upperRow">
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

        <nav className="navbar navbar-expand-lg" style={{justifyContent: "space-between"}}>
          <ul className="navbar-nav">
            <li>
              <NavLink to="/" className="nav-item nav-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/peliculas/filtrar" className="nav-item nav-link">
                Filtrar peliculas
              </NavLink>
            </li>
            <Autorizado
              role="admin"
              autorizado={
                <>
                  <li>
                    <NavLink to="/peliculas/crear" className="nav-item nav-link">
                      Crear pelicula
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
                    <NavLink to="/usuarios" className="nav-item nav-link">
                      Usuarios
                    </NavLink>
                  </li>
                </>
              }
            />
          </ul>
          <div style={{display: "flex"}}>
              <Autorizado
                autorizado={
                  <>
                    <span style={{alignSelf: "center", marginRight: "10px"}}>
                      Hola, {obtenerEmailUsuario()}
                    </span>
                    <button 
                      className="btn btn-outline-danger"
                      style={{marginRight: "10px"}}
                      onClick={() => {
                        logout();
                        actualizar([]);
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </>
                }
                noAutorizado={
                  <>
                    <Link to="/registro" className="nav-link btn btn-link" style={{marginRight: "15px"}}>
                      Registro
                    </Link>
                    <Link to="/login" className="nav-link btn btn-link" style={{marginRight: "10px"}}>
                      Login
                    </Link>
                  </>
                }
              />
          </div>
        </nav>

      </header>
  );
}
