import { useState } from "react";
import Potenciacion1 from "./Potenciacion1";
import Potenciacion2 from "./Potenciacion2";
import './Potenciacion.css';


const Potenciacion = () => {

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
                return <Potenciacion1 />;
            case 2:
                return <Potenciacion2 />;
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

export default Potenciacion;