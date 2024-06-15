import Graficos1 from './Graficos1';
import Graficos2 from './Graficos2';
import RepasoGraficos from './RepasoGraficos';
import { useState } from 'react';
import './Graficos.css';

const Graficos = () => {

    const [contador, setContador] = useState(2)
   
    const incrementarContador = () => {
        setContador(contador === 3 ? 1 : contador + 1)
    }

    const decrementarContador = () => {
        setContador(contador === 1 ? 3 : contador - 1)
    }

    const mostrarComponente = () => {

        switch (contador){
            case 1:
                return <RepasoGraficos />;
            case 2:
                return <Graficos1 />;
            case 3:
                return <Graficos2/>;
            default:
                return null;
        }
    }


    return(
        <div className='graficos-css'>
             <div className='divContenedorBotonIzquierdo'><button onClick={decrementarContador} className='buttonleft'>{"<"}</button></div>
             <div className='contenedorComponente'>
                <span></span>
                {mostrarComponente()}
            </div>
            <div className='divContenedorBotonDerecho'><button onClick={incrementarContador} className='buttonright'>{">"}</button></div>
        </div>
    )
}

export default Graficos;