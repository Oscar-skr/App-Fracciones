import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
import { aumentarContador, decrementarContador } from "../../../redux/actions/contadorActions";
import Contador from '../contador/Contador';
import './SumasIgualDenominador2.css';

const SumasIgualDenominador2 = () => {
    const [playSoundOk] = useSound(audioOk);
    const [playSoundWrong] = useSound(audioWrong);
    const [fracciones, setFracciones] = useState([]);
    const [resultado, setResultado] = useState(null);
    const [inputNumerador, setInputNumerador] = useState('');
    const [inputDenominador, setInputDenominador] = useState('');
    const [signos, setSignos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [correcto, setCorrecto] = useState(null); // Añadir estado para manejar la respuesta correcta o incorrecta

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarNumerosFraccion = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://fractionsapp-3.onrender.com/fracciones`);
            const data = await response.json();
            const fraccionesData = data.filter(item => item.numerador !== undefined && item.denominador !== undefined);
            const resultadoData = data.find(item => item.resultado !== undefined)?.resultado;
            const signosData = data.filter(item => item.operacion !== undefined).map(item => item.operacion);
            setFracciones(fraccionesData);
            setResultado(resultadoData);
            setSignos(signosData);
            setLoading(false);
            console.log(data);
            setCorrecto(null); // Restablecer el estado de respuesta
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
        const esCorrecto = parseInt(inputNumerador) === resultado.numerador && parseInt(inputDenominador) === resultado.denominador;
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

    return (
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
                    <div className='contenedor-Botones'>
                        <button onClick={handleSonido} className='boton-app'>{sonido ? 'Sonido on' : 'Sonido off'}</button>
                        <button onClick={handleClick} className='boton-app'>Chequear</button>
                        <button onClick={generarNumerosFraccion} className='boton-app'>Generar otra</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SumasIgualDenominador2;