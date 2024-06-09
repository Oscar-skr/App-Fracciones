import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
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

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarMultiplicaciones = async () => {
        try {
            const response = await fetch(`http://localhost:3001/operaciones?tipo=multiplicacion`);
            const data = await response.json();
            setFracciones(data.fracciones);
            setResultado(data.resultado);
            console.log(data);
        } catch (error) {
            console.error('Error al generar las fracciones:', error);
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
        }
    };

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

    const handleCheck = () => {
        const numInput = parseFloat(inputNumerador);
        const denInput = parseFloat(inputDenominador);
        const correcto = numInput / denInput === resultado.decimal;
        
        if (correcto) {
            if (sonido) {
                playSoundOk();
            }
            generarMultiplicaciones();
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
                <h2>Multiplica las siguientes fracciones:</h2>
                <div className="operacion div1 div2">
                    {fracciones.map((fraccion, index) => (
                        <div className="contenedorOperaciones" key={index}>
                            <div>
                                <div 
                                    className={`fraccion ${selectedNum?.index === index ? highlightClass : ''}`} 
                                    onClick={() => handleFraccionClick('numerador', fraccion, index)}
                                    style={selectedNum?.index === index && selectedNum.value === fraccion.numerador ? { backgroundColor: 'lightblue' } : {}}
                                >
                                    <p>{fraccion.numerador}</p>
                                    <p className="fraccion-span"></p>
                                </div>
                                <div 
                                    className={`fraccion ${selectedDen?.index === index ? highlightClass : ''}`} 
                                    onClick={() => handleFraccionClick('denominador', fraccion, index)}
                                    style={selectedDen?.index === index && selectedDen.value === fraccion.denominador ? { backgroundColor: 'lightblue' } : {}}
                                >
                                    <p>{fraccion.denominador}</p>
                                </div>
                            </div>
                            <div>
                                {index < fracciones.length - 1 && (
                                    <span className='fraccion-signo'>×</span>
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
                {divisoresVisibles && (
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
                    <button onClick={generarMultiplicaciones} className='boton-app'>Generar otra</button>
                </div>
            </div>
        </div>
    );
};

export default Multiplicacion2;
