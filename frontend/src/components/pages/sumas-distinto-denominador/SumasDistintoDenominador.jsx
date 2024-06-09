import { useState } from "react";
import SumasDistintoDenominador1 from "./SumasDistintoDenominador1";
import SumasDistintoDenominador2 from "./SumasDistintoDenominador2";
import './SumasDistintoDenominador.css';


const SumasDistintoDenominador = () => {

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
                return <SumasDistintoDenominador1 />;
            case 2:
                return <SumasDistintoDenominador2 />;
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

export default SumasDistintoDenominador;