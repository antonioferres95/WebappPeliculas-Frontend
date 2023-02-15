import { useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";

export default function InputImage(props: inputImageProps) {
  /* Este -input type="file"- se generaliza para ser reutilizado
  en todos los forms de la app */

  const imgStyle = {width: '400px'};

  const [imagenBase64, setImagenBase64] = useState("");
  const [imagenURL, setImagenURL] = useState(props.imagenURL);
  const {values} = useFormikContext<any>();

  const convertirBase64 = (file: File) => {
    //Esta funcion es para pasar la imagen a base 64 y luego almacenarla en la bd
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    })
  }  

  const ManejarOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files){
        const file = e.currentTarget.files[0]; //Seleccionamos el archivo
        convertirBase64(file)
            .then((value:string) => setImagenBase64(value))
            .catch(error => console.error(error))
        values[props.name] = file; //Actualizamos el form
        setImagenURL(''); /*Con esto, si se esta mostrando una imagen por su URL, y el usuario
        sube su propia imagen, entonces quitamos la imagen URL que se estaba mostrando*/
    }
  }

  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label> <br />
      <input type="file" accept=".jpg, .jpeg, .png" style={{marginTop: "10px"}}
       onChange={ManejarOnChange}/>

       {/*Si viene la imagen en base 64, la muestra aca*/}
       {imagenBase64 ? 
       <div style={{marginTop: "15px"}}>
            <img src={imagenBase64} alt="Fotografia" style={imgStyle} />  
       </div> 
       : null }

       {/*Si viene la URL de la imagen, la muestra aca*/}
       {imagenURL ? 
       <div style={{marginTop: "15px"}}>
            <img src={imagenURL} alt="Fotografia" style={imgStyle} />  
       </div> 
       : null }
    </div>
  );
}

interface inputImageProps {
    name:string;
    label:string;
    imagenURL?:string;
}