import { useHistory, useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import { Genero } from "../../models/genero.model";
import { FiltroPeliculas, Pelicula } from "../../models/pelicula.model";
import InputCheckBox from "../../utils/InputCheckbox";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlGeneros, urlPeliculas } from "../../utils/Endpoints";
import ListadoPeliculas from "./ListadoPeliculas";
import Paginacion from "../../utils/Paginacion";

export default function FiltrarPeliculas() {

  const history = useHistory();
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const query = new URLSearchParams(useLocation().search);

  const initValues: FiltroPeliculas = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
    pagina: 1,
    recordsPorPagina: 2
  }

  useEffect(() => {
    axios.get(`${urlGeneros}/todos`)
      .then((response:AxiosResponse<Genero[]>) => {
          setGeneros(response.data);
      })
  }, [])

  useEffect(() => {

    if(query.get('titulo')){
      initValues.titulo=query.get('titulo')!;
    }
    if(query.get('generoId')){
      initValues.generoId=parseInt(query.get('generoId')!);
    }
    if(query.get('proximosEstrenos')){
      initValues.proximosEstrenos= true;
    }
    if(query.get('enCines')){
      initValues.enCines=true;
    }
    if(query.get('pagina')){
      initValues.pagina=parseInt(query.get('pagina')!);
    }

    buscarPeliculas(initValues);
  }, [])

  function buscarPeliculas(values:FiltroPeliculas){
    modificarURL(values);
    axios.get(`${urlPeliculas}/filtrar`, {params: values})
      .then((response:AxiosResponse<Pelicula[]>) => {
        const totalRegistros = parseInt(response.headers['cantidadtotalregistros']);
        setTotalPaginas(Math.ceil(totalRegistros/initValues.recordsPorPagina))
        setPeliculas(response.data);
      })
  }

  function modificarURL(values:FiltroPeliculas){
    const queryStrings:string[] = [];
    if(values.titulo){
      queryStrings.push(`titulo=${values.titulo}`);
    }
    if(values.generoId !== 0){
      queryStrings.push(`generoId=${values.generoId}`);
    }
    if(values.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${values.proximosEstrenos}`);
    }
    if(values.enCines){
      queryStrings.push(`enCines=${values.enCines}`);
    }

    queryStrings.push(`pagina=${values.pagina}`);

    history.push(`/peliculas/filtrar?${queryStrings.join('&')}`);

  }

  return (
    <div>
      <h2>Filtrar peliculas</h2>

      <Formik 
        initialValues={initValues} 
        onSubmit={values => {
          values.pagina = 1;
          buscarPeliculas(values);
          }}
      >

        {(formikProps) => (
          <>
            <Form>
              <div className="form">
                <div className="form-group mb-3">
                  <label htmlFor="titulo">Titulo</label>
                  <input type="text" className="form-control" placeholder="Avengers" 
                    {...formikProps.getFieldProps('titulo')}/>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="genero">Genero</label>
                  <select className="form-control" {...formikProps.getFieldProps('generoId')}>
                    <option value="0">Seleccione un genero</option>
                    {generos.map(genero => 
                      <option key={genero.id} value={genero.id}>
                        {genero.nombre}
                      </option>
                    )}
                  </select>
                </div>

                <InputCheckBox name="proximosEstrenos" label="Proximos estrenos"/> 

                <InputCheckBox name="enCines" label="En cines"/> 

                <button type="submit" className="btn btn-success">
                  Filtrar
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => history.push("/")}>
                  Cancelar
                </button>
                <button type="reset" className="btn btn-outline-danger" onClick={() => buscarPeliculas(initValues)}>
                  Limpiar formulario
                </button>
              </div>
            </Form>
            <ListadoPeliculas peliculas={peliculas} />

            <Paginacion 
              cantidadTotalPaginas={totalPaginas} 
              paginaActual={formikProps.values.pagina} 
              onChange={(nuevaPagina) => {
                formikProps.values.pagina=nuevaPagina;
                buscarPeliculas(formikProps.values);
              }} 
              //nuevaPagina viene del onChange del componente Paginacion (cuando clickea el usuario)
            />
          </>
        )}

      </Formik>
    </div>
  );
}