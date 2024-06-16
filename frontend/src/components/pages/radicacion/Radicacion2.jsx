import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
import { aumentarContador, decrementarContador } from '../../../redux/actions/contadorActions';
import Contador from '../contador/Contador';
import './Radicacion2.css';

const Radicacion2 = () => {
    const [playSoundOk] = useSound(audioOk);
    const [playSoundWrong] = useSound(audioWrong);
    const [fraccion, setFraccion] = useState(null);
    const [indice, setIndice] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [inputNumerador, setInputNumerador] = useState('');
    const [inputDenominador, setInputDenominador] = useState('');
    const [loading, setLoading] = useState(true);
    const [correcto, setCorrecto] = useState(null); // Añadir estado para manejar la respuesta correcta o incorrecta

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarRadicacion = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://fractionsapp-3.onrender.com/potenciacion/radicacion`);
            const data = await response.json();
            setFraccion(data.fraccion);
            setIndice(data.indice);
            setResultado(data.resultado);
            setCorrecto(null); // Restablecer el estado de respuesta
            setLoading(false);
            console.log(data);
        } catch (error) {
            console.error('Error al generar las fracciones:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        generarRadicacion();
    }, []);

    const handleSonido = () => {
        dispatch(toggleSound());
    };

    const handleCheck = () => {
        const numInput = parseFloat(inputNumerador);
        const denInput = parseFloat(inputDenominador);
        const esCorrecto = (numInput / denInput) === resultado.decimal;

        if (esCorrecto) {
            if (sonido) {
                playSoundOk();
                dispatch(aumentarContador());
                setCorrecto(true);
                setTimeout(() => {
                    setCorrecto(null);
                    generarRadicacion();
                }, 1000); // Restablecer el estado después de 1 segundo y generar nuevas fracciones
            }
        } else {
            if (sonido) {
                playSoundWrong();
                dispatch(decrementarContador());
                setCorrecto(false);
                setTimeout(() => {
                    setCorrecto(null);
                }, 1000); // Restablecer el estado después de 1 segundo
            }
        }
        setInputNumerador('');
        setInputDenominador('');
    };

    return (
        <div>
            <div className='div-renderizador-operaciones'>
                <Contador correcto={correcto} />
                {loading ? (
                    <div className='loading-container'><p>Cargando...</p></div>
                ) : (
                    <>
                        <h2>Radicación de Fracciones:</h2>
                        <div className="operacionsid">
                            <div className="radical-container">
                                <div className="indice-container">
                                    <div className="indice-radicacion">{indice}</div>
                                    <div className="empty-space"></div>
                                </div>
                                <div className="radical-symbol">√</div>
                                <div className="radicando">
                                    <div className="fraccion">
                                        <p>{fraccion.numerador}</p>
                                        <p className="fraccion-span"></p>
                                        <p>{fraccion.denominador}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='fraccion-signo'><p>=</p></div>
                            <div className="resultado">
                                <div className="introducir-datos">
                                    <div className="fracciong">
                                        <input 
                                            type="text" 
                                            inputMode="numeric" 
                                            name="inputNumeradorName" 
                                            className='inputFraccion' 
                                            autoComplete="off" 
                                            value={inputNumerador}
                                            onChange={(e) => setInputNumerador(e.target.value)}
                                            placeholder="Numerador"
                                        />
                                        <span className="fraccion-span"></span>
                                        <input 
                                            type="text" 
                                            inputMode="numeric" 
                                            name="inputDenominadorName" 
                                            autoComplete="off" 
                                            value={inputDenominador}
                                            onChange={(e) => setInputDenominador(e.target.value)}
                                            placeholder="Denominador"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='divContenedorBotones'>
                            <button onClick={handleSonido} className='boton-app'>{sonido ? 'Sonido on' : 'Sonido off'}</button>
                            <button onClick={handleCheck} className='boton-app'>Chequear</button>
                            <button onClick={generarRadicacion} className='boton-app'>Generar otra</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Radicacion2;
