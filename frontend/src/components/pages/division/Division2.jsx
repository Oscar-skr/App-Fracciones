import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
import { aumentarContador, decrementarContador } from "../../../redux/actions/contadorActions";
import Contador from '../contador/Contador';
import './Division2.css';

const Division2 = () => {
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
    const [isInverted, setIsInverted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [correcto, setCorrecto] = useState(null); // Añadir estado para manejar la respuesta correcta o incorrecta

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarDivisiones = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://fractionsapp-3.onrender.com/operaciones?tipo=division`);
            const data = await response.json();
            setFracciones(data.fracciones);
            setResultado(data.resultado);
            setIsInverted(false);
            setCorrecto(null); // Restablecer el estado de respuesta
            setLoading(false);
            console.log(data);
        } catch (error) {
            console.error('Error al generar las fracciones:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        generarDivisiones();
    }, []);

    const handleSonido = () => {
        dispatch(toggleSound());
    };

    const handleFraccionClick = (numOrDen, fraccion, index) => {
        if (isInverted) {
            if (numOrDen === 'numerador') {
                setSelectedNum({ value: fraccion.numerador, index, type: 'numerador' });
            } else {
                setSelectedDen({ value: fraccion.denominador, index, type: 'denominador' });
            }

            if (
                (selectedNum && selectedDen && selectedNum.index === selectedDen.index) || // Dentro de la misma fracción
                (selectedNum && selectedDen && selectedNum.index !== selectedDen.index && selectedNum.type === 'numerador' && selectedDen.type === 'denominador') || // Numerador de una fracción y denominador de otra fracción
                (selectedNum && selectedDen && selectedNum.index !== selectedDen.index && selectedNum.type === 'denominador' && selectedDen.type === 'numerador') // Denominador de una fracción y numerador de otra fracción
            ) {
                setDivisoresVisibles(true);
            }
        }
    };

    const handleSimplificar = (divisor) => {
        const isSimplifiable = selectedNum && selectedDen &&
            (selectedNum.value % divisor === 0 && selectedDen.value % divisor === 0);

        if (isSimplifiable) {
            const nuevasFracciones = [...fracciones];

            if (selectedNum.index === selectedDen.index) {
                nuevasFracciones[selectedNum.index].numerador /= divisor;
                nuevasFracciones[selectedDen.index].denominador /= divisor;
            } else if (selectedNum.type === 'numerador' && selectedDen.type === 'denominador') {
                nuevasFracciones[selectedNum.index].numerador /= divisor;
                nuevasFracciones[selectedDen.index].denominador /= divisor;
            } else if (selectedNum.type === 'denominador' && selectedDen.type === 'numerador') {
                nuevasFracciones[selectedNum.index].denominador /= divisor;
                nuevasFracciones[selectedDen.index].numerador /= divisor;
            }

            setFracciones(nuevasFracciones);
            setSelectedNum(null);
            setSelectedDen(null);
            setDivisoresVisibles(false);
            setHighlightClass('seleccionada-correcta');
            setTimeout(() => setHighlightClass(''), 1000);
        } else {
            setHighlightClass('seleccionada-incorrecta');
            setTimeout(() => {
                setSelectedNum(null);
                setSelectedDen(null);
                setDivisoresVisibles(false);
                setHighlightClass('');
            }, 1000);
        }
    };

    const handleInvertir = () => {
        const invertida = {
            numerador: fracciones[1].denominador,
            denominador: fracciones[1].numerador
        };
        const nuevasFracciones = [fracciones[0], invertida];
        setFracciones(nuevasFracciones);
        setIsInverted(!isInverted);
    };

    useEffect(() => {
        if (selectedNum && selectedDen) {
            setDivisoresVisibles(true);
        }
    }, [selectedNum, selectedDen]);

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
                    generarDivisiones();
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
                        <h2>Divide las siguientes fracciones:</h2>
                        <div className="operacionsid">
                            {fracciones.map((fraccion, index) => (
                                <React.Fragment key={index}>
                                    <div className="contenedorOperaciones">
                                        <div className="fraccion">
                                            <div 
                                                className={`numerador ${selectedNum?.index === index && selectedNum.type === 'numerador' ? highlightClass : ''}`} 
                                                onClick={() => handleFraccionClick('numerador', fraccion, index)}
                                                style={selectedNum?.index === index && selectedNum.value === fraccion.numerador ? { backgroundColor: 'lightblue' } : {}}
                                            >
                                                <p>{fraccion.numerador}</p>
                                            </div>
                                            <p className="fraccion-span"></p>
                                            <div 
                                                className={`denominador ${selectedDen?.index === index && selectedDen.type === 'denominador' ? highlightClass : ''}`} 
                                                onClick={() => handleFraccionClick('denominador', fraccion, index)}
                                                style={selectedDen?.index === index && selectedDen.value === fraccion.denominador ? { backgroundColor: 'lightblue' } : {}}
                                            >
                                                <p>{fraccion.denominador}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {index < fracciones.length - 1 ? (
                                        <div className='fraccion-signo' onClick={handleInvertir}>
                                            {isInverted ? '×' : '÷'}
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
                        {isInverted && divisoresVisibles && (
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
                            <button onClick={generarDivisiones} className='boton-app'>Generar otra</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Division2;
