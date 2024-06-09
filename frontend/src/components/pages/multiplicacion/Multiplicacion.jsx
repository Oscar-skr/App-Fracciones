import { useState } from "react";
import Multiplicacion1 from "./Multiplicacion1";
import Multiplicacion2 from "./Multiplicacion2";
import './Multiplicacion.css';


const Multiplicacion = () => {

    const [contador, setContador] = useState(2)
   
    const incrementarContador = () => {
        setContador(contador === 2 ? 1 : contador + 1)
    }

    const decrementarContador = () => {
        setContador(contador === 1 ? 2 : contador - 1)
    }

    const mostrarComponente = () => {

        switch (contador){
            case 1:
                return <Multiplicacion1 />;
            case 2:
                return <Multiplicacion2 />;
            default:
                return null;
        }
    }




    return(
        <div className='graficos-css'>
             <div className='divContenedorBotonIzquierdo'><button onClick={decrementarContador} className='buttonleft'>{"<"}</button></div>
             <div>
                <span></span>
                {mostrarComponente()}
            </div>
            <div className='divContenedorBotonDerecho'><button onClick={incrementarContador} className='buttonright'>{">"}</button></div>
        </div>
    )
}

export default Multiplicacion;