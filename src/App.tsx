import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import rutas from "./route-config";
import validacionesCustom from "./validaciones";
import Menu from "./utils/Menu";

/* Todo lo que vaya en esta parte antes de la func App, se ejecutará
apenas inicie la app */

validacionesCustom();//Validaciones de forms de yup

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Menu />
        <Switch>
          {rutas.map((ruta) => (
            <Route path={ruta.path} exact={ruta.exact} 
              key={ruta.path} component={ruta.componente}
            /> 
          ))}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
