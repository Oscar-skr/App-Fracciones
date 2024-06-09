import { useState } from "react";
import Equivalentes1 from './Equivalentes1';
import Equivalentes2 from './Equivalentes2';
import Equivalentes3 from './Equivalentes3';
import Equivalentes4 from './Equivalentes4';
import Equivalentes5 from './Equivalentes5';
import './Equivalentes.css';


const Equivalentes = () => {

    const [contador, setContador] = useState(2)
   
    const incrementarContador = () => {
        setContador(contador === 5 ? 1 : contador + 1)
    }

    const decrementarContador = () => {
        setContador(contador === 1 ? 5 : contador - 1)
    }

    const mostrarComponente = () => {

        switch (contador){
            case 1:
                return <Equivalentes1 />;
            case 2:
                return <Equivalentes2 />;
            case 3:
                return <Equivalentes3 />;
            case 4:
                return <Equivalentes4 />;
            case 5:
                return <Equivalentes5 />;
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

export default Equivalentes;