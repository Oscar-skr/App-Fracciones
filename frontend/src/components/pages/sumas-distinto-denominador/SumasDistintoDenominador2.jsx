import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
import './SumasDistintoDenominador2.css';

const SumasDistintoDenominador2 = () => {
    const [playSoundOk] = useSound(audioOk);
    const [playSoundWrong] = useSound(audioWrong);
    const [fracciones, setFracciones] = useState([]);
    const [resultado, setResultado] = useState(null);
    const [inputNumerador, setInputNumerador] = useState('');
    const [inputDenominador, setInputDenominador] = useState('');
    const [operaciones, setOperaciones] = useState([]);
    const [equivalentes, setEquivalentes] = useState([]);
    const [mostrarPistas, setMostrarPistas] = useState(false);

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarNumerosFraccion = async () => {
        try {
            const response = await fetch(`http://localhost:3001/fracciones/fdd`);
            const data = await response.json();
            setFracciones(data.fraccionesOriginales);
            setResultado(data.resultadoDecimal);
            setOperaciones(data.operaciones);
            setEquivalentes(data.fraccionesEquivalentes);
            console.log(data);
        } catch (error) {
            console.error('Error al generar la fracción:', error);
        }
    };

    useEffect(() => {
        generarNumerosFraccion();
    }, []);

    if (fracciones.length === 0 || resultado === null) {
        return <div>Cargando...</div>;
    }

    const handleSonido = () => {
        dispatch(toggleSound());
    };

    const handleClick = () => {
        const correcto = parseFloat(inputNumerador) / parseFloat(inputDenominador) === parseFloat(resultado);
        if (correcto) {
            if (sonido) {
                playSoundOk();
            }
            generarNumerosFraccion();
            setInputNumerador('');
            setInputDenominador('');
        } else {
            if (sonido) {
                playSoundWrong();
            }
        }
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
            <div className='div-renderizador'>
               <h2>Resolvé la siguiente operación:</h2>
               <div className="operacion div1 div2">
                    {fracciones.map((fraccion, index) => (
                        <div className="contenedorOperaciones" key={index}>
                            <div className="fraccion">
                                <p>{fraccion.numerador}</p>
                                <p className="fraccion-span"></p>
                                <p>{fraccion.denominador}</p>
                            </div>
                            {index < fracciones.length - 1 && (
                                <span className='fraccion-signo'>
                                    {operaciones[index] === "suma" ? " + " : " - "}
                                </span>
                            )}
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
                                <div className="fraccion-pistas">
                                    <p>{equivalente.numerador}</p>
                                    <p className="fraccion-span"></p>
                                    <p>{equivalente.denominador}</p>
                                    </div>
                                    <div>{i < fila.length - 1 && <span className="fraccion-signo">=</span>}</div>
                                
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className='contenedor-Botones'>
                    <button onClick={handleSonido} className='boton-app'>{sonido ? 'Sonido on' : 'Sonido off'}</button>
                    <button onClick={handleClick} className='boton-app'>Chequear</button>
                    <button onClick={generarNumerosFraccion} className='boton-app'>Generar otra</button>
                    <button onClick={handlePistasClick} className='boton-app'>Pistas</button>
                </div>
            </div>
        </div>
    );
};

export default SumasDistintoDenominador2;
