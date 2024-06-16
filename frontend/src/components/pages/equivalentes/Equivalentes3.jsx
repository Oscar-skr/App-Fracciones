import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
import { aumentarContador, decrementarContador } from "../../../redux/actions/contadorActions";
import Contador from '../contador/Contador';
import './Equivalentes3.css';

const Equivalentes3 = () => {
    const [playSoundOk] = useSound(audioOk);
    const [playSoundWrong] = useSound(audioWrong);
    const [fracciones, setFracciones] = useState([]);
    const [opciones, setOpciones] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para indicar si está cargando
    const [correcto, setCorrecto] = useState(null); // Añadir estado para manejar la respuesta correcta o incorrecta

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarNumerosFraccion = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://fractionsapp-3.onrender.com/graficos/equivalentes?cantidad=4');
            const data = await response.json();
            setFracciones(data);
            setOpciones(shuffleArray(data.filter(f => f.id !== 1)));
            setLoading(false);
            setCorrecto(null); // Restablecer el estado de respuesta
            console.log(data);
        } catch (error) {
            console.error('Error al generar la fracción:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        generarNumerosFraccion();
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleSonido = () => {
        dispatch(toggleSound());
    };

    const handleClick = (correcto) => {
        if (correcto) {
            if (sonido) {
                dispatch(aumentarContador());
                playSoundOk();  // Reproduce el sonido correcto
            }
            setCorrecto(true);
            setTimeout(() => {
                generarNumerosFraccion();
            }, 1000);
        } else {
            if (sonido) {
                dispatch(decrementarContador());
                playSoundWrong();  // Reproduce el sonido incorrecto
            }
            setCorrecto(false);
            setTimeout(() => {
                setCorrecto(null);
            }, 1000);
        }
    };

    const fraccionObjetivo = fracciones.find(f => f.id === 1);

    return (
        <div className='div-renderizador'>
                  <div className="divContador">
                        <Contador correcto={correcto} />
                    </div>
            {loading ? (
                <div className='loading-container'><p>Cargando...</p></div>
            ) : (
                <>
                    <h2>Amplificación</h2>
                    <h3>Elegí la fracción equivalente</h3>
                    <h3>a</h3>
                    <div className="fraccion-equivalente">
                        <p>{fraccionObjetivo.numerador}</p>
                        <p className="fraccion-span"></p>
                        <p>{fraccionObjetivo.denominador}</p>
                    </div>
                    <div className="div2">
                        {opciones.map((fraccion, index) => (
                            <div className='contenedorEquivalentes' key={index} onClick={() => handleClick(fraccion.id === 4)}>
                                <div className='fraccion-equivalente'>
                                    <p>{fraccion.numerador}</p>
                                    <p className="fraccion-span"></p>
                                    <p>{fraccion.denominador}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button onClick={handleSonido} className='boton-app'>{sonido ? 'Sonido on' : 'Sonido off'}</button>
                        <button onClick={generarNumerosFraccion} className='boton-app'>Generar otra</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Equivalentes3;
