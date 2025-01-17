import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
import { aumentarContador, decrementarContador } from '../../../redux/actions/contadorActions';
import Contador from '../contador/Contador';
import './Multiplicacion2.css';

const Multiplicacion2 = () => {
    const [playSoundOk] = useSound(audioOk);
    const [playSoundWrong] = useSound(audioWrong);
    const [fracciones, setFracciones] = useState([]);
    const [resultado, setResultado] = useState(null);
    const [inputNumerador, setInputNumerador] = useState('');
    const [inputDenominador, setInputDenominador] = useState('');
    const [selectedNum, setSelectedNum] = useState(null);
    const [selectedDen, setSelectedDen] = useState(null);
    const [divisoresVisibles, setDivisoresVisibles] = useState(false);
    const [highlightClass, setHighlightClass] = useState('');
    const [correctClass, setCorrectClass] = useState('');
    const [incorrectClass, setIncorrectClass] = useState('');
    const [loading, setLoading] = useState(true);
    const [correcto, setCorrecto] = useState(null); // Añadir estado para manejar la respuesta correcta o incorrecta

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarMultiplicaciones = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://fractionsapp-3.onrender.com/operaciones?tipo=multiplicacion`);
            const data = await response.json();
            setFracciones(data.fracciones);
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
        generarMultiplicaciones();
    }, []);

    const handleSonido = () => {
        dispatch(toggleSound());
    };

    const handleFraccionClick = (numOrDen, fraccion, index) => {
        if (numOrDen === 'numerador') {
            setSelectedNum({ value: fraccion.numerador, index });
        } else {
            setSelectedDen({ value: fraccion.denominador, index });
        }

        if (selectedNum && selectedDen) {
            setDivisoresVisibles(true);
        } else {
            setDivisoresVisibles(false);
        }
    };

    useEffect(() => {
        if (selectedNum && selectedDen) {
            setDivisoresVisibles(true);
        }
    }, [selectedNum, selectedDen]);

    const handleSimplificar = (divisor) => {
        const isSimplifiable = selectedNum && selectedDen &&
            (selectedNum.value % divisor === 0 && selectedDen.value % divisor === 0);

        if (isSimplifiable) {
            const nuevasFracciones = [...fracciones];
            nuevasFracciones[selectedNum.index].numerador /= divisor;
            nuevasFracciones[selectedDen.index].denominador /= divisor;
            setFracciones(nuevasFracciones);
            setSelectedNum(null);
            setSelectedDen(null);
            setDivisoresVisibles(false);
            setCorrectClass('seleccionada-correcta');
            setTimeout(() => setCorrectClass(''), 100); // Duración del color verde
        } else {
            setIncorrectClass('seleccionada-incorrecta');
            setTimeout(() => {
                setSelectedNum(null);
                setSelectedDen(null);
                setDivisoresVisibles(false);
                setIncorrectClass('');
            }, 100); // Duración del color rojo
        }
    };

    const handleCheck = () => {
        const numInput = parseFloat(inputNumerador);
        const denInput = parseFloat(inputDenominador);
        const correcto = numInput / denInput === resultado.decimal;

        if (correcto) {
            if (sonido) {
                playSoundOk();
                dispatch(aumentarContador());
                setCorrecto(true); // Establecer correcto a true
            }
            setInputNumerador('');
            setInputDenominador('');
            setTimeout(() => setCorrecto(null), 1000); // Restablecer el estado después de 1 segundo
            generarMultiplicaciones();
        } else {
            if (sonido) {
                playSoundWrong();
                dispatch(decrementarContador());
                setCorrecto(false); // Establecer correcto a false
            }
            setInputNumerador('');
            setInputDenominador('');
            setTimeout(() => setCorrecto(null), 1000); // Restablecer el estado después de 1 segundo
        }
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
                        <h2>Multiplica las siguientes fracciones:</h2>
                        <div className="operacionsid">
                            {fracciones.map((fraccion, index) => (
                                <React.Fragment key={index}>
                                    <div className="contenedorOperaciones">
                                        <div className="fraccion">
                                            <div 
                                                className={`numerador ${selectedNum?.index === index ? highlightClass : ''} ${selectedNum?.index === index ? correctClass : ''} ${selectedNum?.index === index ? incorrectClass : ''}`} 
                                                onClick={() => handleFraccionClick('numerador', fraccion, index)}
                                                style={selectedNum?.index === index && selectedNum.value === fraccion.numerador ? { backgroundColor: 'lightblue' } : {}}
                                            >
                                                <p>{fraccion.numerador}</p>
                                            </div>
                                            <p className="fraccion-span"></p>
                                            <div 
                                                className={`denominador ${selectedDen?.index === index ? highlightClass : ''} ${selectedDen?.index === index ? correctClass : ''} ${selectedDen?.index === index ? incorrectClass : ''}`} 
                                                onClick={() => handleFraccionClick('denominador', fraccion, index)}
                                                style={selectedDen?.index === index && selectedDen.value === fraccion.denominador ? { backgroundColor: 'lightblue' } : {}}
                                            >
                                                <p>{fraccion.denominador}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {index < fracciones.length - 1 ? (
                                        <div className='fraccion-signo'>
                                            ×
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
                        {divisoresVisibles && (
                            <div className='menu-simplificar-horizontal'>
                                {[...Array(20).keys()].map(i => (
                                    <div key={i + 1} onClick={() => handleSimplificar(i + 1)}>
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className='divContenedorBotones'>
                            <button onClick={handleSonido} className='boton-app'>{sonido ? 'Sonido on' : 'Sonido off'}</button>
                            <button onClick={handleCheck} className='boton-app'>Chequear</button>
                            <button onClick={generarMultiplicaciones} className='boton-app'>Generar otra</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Multiplicacion2;
