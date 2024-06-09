import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
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

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarDivisiones = async () => {
        try {
            const response = await fetch(`http://localhost:3001/operaciones?tipo=division`);
            const data = await response.json();
            setFracciones(data.fracciones);
            setResultado(data.resultado);
            setIsInverted(false);
            console.log(data);
        } catch (error) {
            console.error('Error al generar las fracciones:', error);
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
        setIsInverted(!isInverted); // Cambiar el estado de isInverted
    };

    const handleCheck = () => {
        const numInput = parseFloat(inputNumerador);
        const denInput = parseFloat(inputDenominador);
        const correcto = (numInput / denInput) === resultado.decimal;

        if (correcto) {
            if (sonido) {
                playSoundOk();
            }
            generarDivisiones();
            setInputNumerador('');
            setInputDenominador('');
        } else {
            if (sonido) {
                playSoundWrong();
            }
        }
    };

    return (
        <div>
            <div className='div-renderizador'>
                <h2>Divide las siguientes fracciones:</h2>
                <div className="operacion div1 div2">
                    {fracciones.map((fraccion, index) => (
                        <div className="contenedorOperaciones" key={index}>
                            <div>
                                <div 
                                    className={`fraccion ${selectedNum?.index === index && selectedNum.type === 'numerador' ? highlightClass : ''}`} 
                                    onClick={() => handleFraccionClick('numerador', fraccion, index)}
                                    style={selectedNum?.index === index && selectedNum.value === fraccion.numerador ? { backgroundColor: 'lightblue' } : {}}
                                >
                                    <p>{fraccion.numerador}</p>
                                    <p className="fraccion-span"></p>
                                </div>
                                <div 
                                    className={`fraccion ${selectedDen?.index === index && selectedDen.type === 'denominador' ? highlightClass : ''}`} 
                                    onClick={() => handleFraccionClick('denominador', fraccion, index)}
                                    style={selectedDen?.index === index && selectedDen.value === fraccion.denominador ? { backgroundColor: 'lightblue' } : {}}
                                >
                                    <p>{fraccion.denominador}</p>
                                </div>
                            </div>
                            <div>
                                {index < fracciones.length - 1 && (
                                    <span className='fraccion-signo' onClick={handleInvertir}>
                                        {isInverted ? '×' : '÷'}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="resultado">
                        <p>=</p>
                        <div className="introducir-datos">
                            <div className="fraccion">
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
                <div className='contenedor-Botones'>
                    <button onClick={handleSonido} className='boton-app'>{sonido ? 'Sonido on' : 'Sonido off'}</button>
                    <button onClick={handleCheck} className='boton-app'>Chequear</button>
                    <button onClick={generarDivisiones} className='boton-app'>Generar otra</button>
                </div>
            </div>
        </div>
    );
};

export default Division2;
