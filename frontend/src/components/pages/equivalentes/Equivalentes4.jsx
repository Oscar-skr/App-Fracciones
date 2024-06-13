import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
import './Equivalentes4.css';

const Equivalentes4 = () => {
    const [playSoundOk] = useSound(audioOk);
    const [playSoundWrong] = useSound(audioWrong);
    const [fracciones, setFracciones] = useState([]);
    const [opciones, setOpciones] = useState([]);

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    // Función para generar números de fracción
    const generarNumerosFraccion = async () => {
        try {
            const response = await fetch('http://localhost:3001/graficos/generarFraccion?cantidad=4');
            const data = await response.json();
            setFracciones(data);
            console.log('Fracciones generadas:', data);
            const opcionesBarajadas = shuffleArray(data.filter(f => f.id !== 4));
            setOpciones(opcionesBarajadas);
            console.log('Opciones barajadas:', opcionesBarajadas);
        } catch (error) {
            console.error('Error al generar la fracción:', error);
        }
    };

    useEffect(() => {
        generarNumerosFraccion();
    }, []);

    // Fracción objetivo es siempre la fracción con id = 4
    const fraccionObjetivo = fracciones.find(f => f.id === 4);

    // Función para barajar las opciones
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
                playSoundOk();  // Reproduce el sonido correcto
            }
            generarNumerosFraccion();
        } else {
            if (sonido) {
                playSoundWrong();  // Reproduce el sonido incorrecto
            }
        }
    };

    return (
        <div className='div-renderizador'>
            <h2>Simplificación</h2>
            <h3>Elegí la fracción equivalente</h3>
            <h3>a</h3>
            {fraccionObjetivo && (
                <div className="fraccion-equivalente">
                    <p>{fraccionObjetivo.numerador}</p>
                    <p className="fraccion-span"></p>
                    <p>{fraccionObjetivo.denominador}</p>
                </div>
            )}
            <div className="div2">
                {opciones.map((fraccion, index) => (
                    <div className='contenedorEquivalentes' key={index}  onClick={() => handleClick(fraccion.id === 1)}>
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
        </div>
    );
};

export default Equivalentes4;
