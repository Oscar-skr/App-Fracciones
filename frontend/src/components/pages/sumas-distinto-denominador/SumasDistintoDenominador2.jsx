import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
import { aumentarContador, decrementarContador } from "../../../redux/actions/contadorActions";
import Contador from '../contador/Contador';
import './SumasDistintoDenominador2.css';

const SumasDistintoDenominador2 = () => {
    const [playSoundOk] = useSound(audioOk);
    const [playSoundWrong] = useSound(audioWrong);
    const [fracciones, setFracciones] = useState([]);
    const [resultado, setResultado] = useState(null);
    const [inputNumerador, setInputNumerador] = useState('');
    const [inputDenominador, setInputDenominador] = useState('');
    const [signos, setSignos] = useState([]);
    const [equivalentes, setEquivalentes] = useState([]);
    const [mostrarPistas, setMostrarPistas] = useState(false);
    const [loading, setLoading] = useState(true);
    const [correcto, setCorrecto] = useState(null);

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarNumerosFraccion = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://fractionsapp-3.onrender.com/fracciones/fdd`);
            const data = await response.json();
            setFracciones(data.fraccionesOriginales);
            setResultado(data.resultadoDecimal);
            setSignos(data.operaciones.map(item => item.operacion));
            setEquivalentes(data.fraccionesEquivalentes);
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

    const handleSonido = () => {
        dispatch(toggleSound());
    };

    const handleClick = () => {
        const esCorrecto = parseFloat(inputNumerador) / parseFloat(inputDenominador) === parseFloat(resultado);
        if (esCorrecto) {
            if (sonido) {
                playSoundOk();
                dispatch(aumentarContador());
            }
            setCorrecto(true);
            setTimeout(() => {
                generarNumerosFraccion();
            }, 1000);
        } else {
            if (sonido) {
                playSoundWrong();
                dispatch(decrementarContador());
            }
            setCorrecto(false);
            setTimeout(() => {
                setCorrecto(null);
            }, 1000);
        }
        setInputNumerador('');
        setInputDenominador('');
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'inputNumeradorName') {
            setInputNumerador(value);
        } else if (name === 'inputDenominadorName') {
            setInputDenominador(value);
        }
    };

    const handlePistasClick = () => {
        setMostrarPistas(prevMostrarPistas => !prevMostrarPistas);
    };

    const handleFraccionClick = (indexFraccion, fraccionEquivalente) => {
        const nuevasFracciones = [...fracciones];
        nuevasFracciones[indexFraccion] = fraccionEquivalente;
        setFracciones(nuevasFracciones);
    };

    return (
        <div>
            <div className='div-renderizador-operaciones'>
                <Contador correcto={correcto} />
                {loading ? (
                    <div className='loading-container'><p>Cargando...</p></div>
                ) : (
                    <>
                        <h2>Resolvé la siguiente operación:</h2>
                        <div className="operacionsid">
                            {fracciones.map((fraccion, index) => (
                                <React.Fragment key={index}>
                                    <div className="contenedorOperaciones">
                                        <div className="fraccion">
                                            <p>{fraccion.numerador}</p>
                                            <p className="fraccion-span"></p>
                                            <p>{fraccion.denominador}</p>
                                        </div>
                                    </div>
                                    {index < fracciones.length - 1 ? (
                                        <div className='fraccion-signo'>
                                            {signos[index] === "suma" ? " + " : " - "}
                                        </div>
                                    ) : (
                                        <div className='fraccion-signo'>
                                            =
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
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
                                            onChange={handleOnChange} 
                                            placeholder="Numerador"
                                        />
                                        <span className="fraccion-span"></span>
                                        <input 
                                            type="text" 
                                            inputMode="numeric" 
                                            name="inputDenominadorName" 
                                            autoComplete="off" 
                                            value={inputDenominador} 
                                            onChange={handleOnChange} 
                                            placeholder="Denominador"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='contenedor-pistas fraccion'>
                            {mostrarPistas && equivalentes.map((fila, indexFraccion) => (
                                <div key={indexFraccion} className='contenedorOperaciones'>
                                    {fila.map((equivalente, i) => (
                                        <div className='contenedorOperacionesOrder' key={i} onClick={() => handleFraccionClick(indexFraccion, equivalente)}>
                                            <div className="fracciong">
                                                <p className='parrafoFraccion'>{equivalente.numerador}</p>
                                                <p className="fraccion-span"></p>
                                                <p className='parrafoFraccion'>{equivalente.denominador}</p>
                                            </div>
                                            <div>{i < fila.length - 1 && <span className="fraccion-signo-dd">=</span>}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className='divContenedorBotones'>
                            <button onClick={handleSonido} className='boton-app'>{sonido ? 'Sonido on' : 'Sonido off'}</button>
                            <button onClick={handleClick} className='boton-app'>Chequear</button>
                            <button onClick={generarNumerosFraccion} className='boton-app'>Generar otra</button>
                            <button onClick={handlePistasClick} className='boton-app'>Pistas</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SumasDistintoDenominador2;
