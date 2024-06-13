import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
import './SumasIgualDenominador2.css';

const SumasIgualDenominador2 = () => {
    const [playSoundOk] = useSound(audioOk);
    const [playSoundWrong] = useSound(audioWrong);
    const [fracciones, setFracciones] = useState([]);
    const [resultado, setResultado] = useState(null);
    const [inputNumerador, setInputNumerador] = useState('');
    const [inputDenominador, setInputDenominador] = useState('');
    const [operaciones, setOperaciones] = useState('');

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarNumerosFraccion = async () => {
        try {
            const response = await fetch(`https://fractionsapp-3.onrender.com/fracciones`);
            const data = await response.json();
            const fraccionesData = data.filter(item => item.numerador !== undefined && item.denominador !== undefined);
            const resultadoData = data.find(item => item.resultado !== undefined)?.resultado;
            const fraccionesOperaciones = data.filter(item => item.operacion !== undefined);
            setFracciones(fraccionesData);
            setResultado(resultadoData);
            setOperaciones(fraccionesOperaciones)
            console.log(data);
        } catch (error) {
            console.error('Error al generar la fracción:', error);
        }
    };

    useEffect(() => {
        generarNumerosFraccion();
    }, []);

    if (fracciones.length === 0 || !resultado) {
        return <div className='loading-container'><p>Cargando...</p></div>;
    }

    const handleSonido = () => {
        dispatch(toggleSound());
    };

    const handleClick = () => {
        const correcto = parseInt(inputNumerador) === resultado.numerador && parseInt(inputDenominador) === resultado.denominador;
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

    return (
        <div >
            <div className='div-renderizador'>
            <h2>Resolvé la siguiente operación:</h2>
            <div className="operacionsid div1 div2">
                {fracciones.map((fraccion, index) => (
                    <div className="contenedorOperaciones" key={index}>
                        <div className="fraccion-sid">
                            <p>{fraccion.numerador}</p>
                            <p className="fraccion-span"></p>
                            <p>{fraccion.denominador}</p>
                        </div>
                        {index < fracciones.length - 1 && (
                            <span className='fraccion-signo'>
                                {operaciones[index]?.operacion === "suma" ? " + " : " - "}
                            </span>
                        )}
                    </div>
                ))}
                <div className="resultado">
                    <div>
                        <p>=</p>
                    </div>
                    
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
            <div className='contenedor-Botones'>
                <button onClick={handleSonido} className='boton-app'>{sonido ? 'Sonido on' : 'Sonido off'}</button>
                <button onClick={handleClick} className='boton-app'>Chequear</button>
                <button onClick={generarNumerosFraccion} className='boton-app'>Generar otra</button>
            </div>
            </div>
        </div>
    );
};

export default SumasIgualDenominador2;
