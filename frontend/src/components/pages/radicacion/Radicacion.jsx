import { useState } from "react";
import Radicacion1 from "./Radicacion1";
import Radicacion2 from "./Radicacion2";
import './Radicacion.css';


const Radicacion = () => {

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
                return <Radicacion1 />;
            case 2:
                return <Radicacion2 />;
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

export default Radicacion;