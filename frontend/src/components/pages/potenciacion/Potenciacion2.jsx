import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
import { aumentarContador, decrementarContador } from '../../../redux/actions/contadorActions';
import Contador from '../contador/Contador';
import './Potenciacion2.css';

const Potenciacion2 = () => {
    const [playSoundOk] = useSound(audioOk);
    const [playSoundWrong] = useSound(audioWrong);
    const [fraccion, setFraccion] = useState(null);
    const [exponente, setExponente] = useState(null);
    const [tipo, setTipo] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [inputNumerador, setInputNumerador] = useState('');
    const [inputDenominador, setInputDenominador] = useState('');
    const [loading, setLoading] = useState(true);
    const [correcto, setCorrecto] = useState(null); // Añadir estado para manejar la respuesta correcta o incorrecta

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarPotenciacion = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://fractionsapp-3.onrender.com/potenciacion/potenciacion`);
            const data = await response.json();
            setFraccion(data.fraccion);
            setExponente(data.exponente);
            setTipo(data.tipo);
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
        generarPotenciacion();
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
                    generarPotenciacion();
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

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) { // Solo permitir números naturales
            if (name === 'inputNumeradorName') {
                setInputNumerador(value);
            } else if (name === 'inputDenominadorName') {
                setInputDenominador(value);
            }
        } else {
            if (name === 'inputNumeradorName') {
                setInputNumerador('');
            } else if (name === 'inputDenominadorName') {
                setInputDenominador('');
            }
        }
    };

    return (
        <div>
            <div className='div-renderizador-operaciones'>
                <div className="divContador">
                    <Contador correcto={correcto} />
                </div>
                {loading ? (
                    <div className='loading-container'><p>Cargando...</p></div>
                ) : (
                    <>
                        <h2>Potenciación de Fracciones:</h2>
                        <div className="operacionsid">
                            {tipo === 0 ? (
                                <div className='parentesis'>
                                    <div className="parentezco">(</div>
                                    <div className="fraccion">
                                        <p>{fraccion.numerador}</p>
                                        <p className="fraccion-span"></p>
                                        <p>{fraccion.denominador}</p>
                                    </div>
                                    <div className="parentezco">)</div>
                                    <div className="exponente">{exponente}</div>
                                </div>
                            ) : (
                                <>
                                    <div className="fraccion">
                                        <div className="numerador-con-exponente">
                                            <p>{fraccion.numerador}</p>
                                            <sup className="exponente-pequeno">{exponente}</sup>
                                        </div>
                                        <p className="fraccion-span"></p>
                                        <p>{fraccion.denominador}</p>
                                    </div>
                                </>
                            )}
                            <div><p className='fraccion-signo'>=</p></div>
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
                        <div className='divContenedorBotones'>
                            <button onClick={handleSonido} className='boton-app'>{sonido ? 'Sonido on' : 'Sonido off'}</button>
                            <button onClick={handleCheck} className='boton-app'>Chequear</button>
                            <button onClick={generarPotenciacion} className='boton-app'>Generar otra</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Potenciacion2;
