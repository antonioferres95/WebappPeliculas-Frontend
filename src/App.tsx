import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import rutas from "./route-config";
import validacionesCustom from "./validaciones";
import Menu from "./utils/Menu";
import { useEffect, useState } from "react";
import { claim } from "./auth/auth.model";
import AutenticacionContext from "./auth/AutenticacionContext";
import { obtenerClaims } from "./auth/manejadorJWT";
import { configurarInterceptor } from "./utils/Interceptores";

/* Todo lo que vaya en esta parte antes de la func App, se ejecutará
apenas inicie la app */

validacionesCustom();//Validaciones de forms de yup
configurarInterceptor();

function App() {

  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(obtenerClaims());
  }, [])

  function actualizar(claims:claim[]){
    setClaims(claims);
  }

  function esAdmin(){
    return claims.findIndex((claim) => 
      claim.nombre === "role" && claim.valor === "admin"
    ) > -1;
  }

  return (
    <>
      <BrowserRouter>
        <AutenticacionContext.Provider value={{claims, actualizar}}>
          <div className="container">
            <Menu />
            <Switch>
              {rutas.map((ruta) => (
                <Route 
                  path={ruta.path} 
                  exact={ruta.exact} 
                  key={ruta.path} 
                >
                  {ruta.esAdmin && !esAdmin() ?
                    <>
                      No tienes el permiso necesario para acceder a este componente.
                    </>
                  : <ruta.componente/>}
                </Route> 

              ))}
            </Switch>
          </div>
        </AutenticacionContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
