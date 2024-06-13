import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
import './Equivalentes5.css';

const Equivalente5 = () => {
    const [playSoundOk] = useSound(audioOk);
    const [playSoundWrong] = useSound(audioWrong);
    const [fracciones, setFracciones] = useState([]);
    const [opciones, setOpciones] = useState([]);
    const [tipoEjercicio, setTipoEjercicio] = useState('');

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarNumerosFraccion = useCallback(async () => {
        const tipo = Math.random() < 0.5 ? 'equivalentes' : 'generarFraccion';
        setTipoEjercicio(tipo);

        try {
            const response = await fetch(`https://fractionsapp-3.onrender.com/graficos/${tipo}?cantidad=4`);
            const data = await response.json();
            setFracciones(data);
            const opcionesBarajadas = shuffleArray(data.filter(f => (tipo === 'equivalentes' ? f.id !== 1 : f.id !== 4)));
            setOpciones(opcionesBarajadas);
        } catch (error) {
            console.error('Error al generar la fracción:', error);
        }
    }, []);

    useEffect(() => {
        generarNumerosFraccion();
    }, [generarNumerosFraccion]);

    // Fracción objetivo es siempre la fracción con id = 1 para 'equivalentes' y id = 4 para 'generarFraccion'
    const fraccionObjetivo = fracciones.find(f => (tipoEjercicio === 'equivalentes' ? f.id === 1 : f.id === 4));

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
                playSoundOk();
            }
            generarNumerosFraccion();
        } else {
            if (sonido) {
                playSoundWrong();
            }
        }
    };

    return (
        <div className='div-renderizador'>
            <h2> </h2>
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
                    <div className='contenedorEquivalentes' key={index} onClick={() => handleClick(tipoEjercicio === 'equivalentes' ? fraccion.id === 1 : fraccion.id === 4)}>
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

export default Equivalente5;
