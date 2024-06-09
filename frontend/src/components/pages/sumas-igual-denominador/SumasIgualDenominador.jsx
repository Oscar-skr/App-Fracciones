import { useState } from "react";
import SumasIgualDenominador1 from "./SumasIgualDenominador1";
import SumasIgualDenominador2 from "./SumasIgualDenominador2";
import './SumasIgualDenominador.css';


const SumasIgualDenominador = () => {

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
                return <SumasIgualDenominador1 />;
            case 2:
                return <SumasIgualDenominador2 />;
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

export default SumasIgualDenominador;