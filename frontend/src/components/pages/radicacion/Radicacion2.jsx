import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
import './Radicacion2.css';

const Radicacion2 = () => {
    const [playSoundOk] = useSound(audioOk);
    const [playSoundWrong] = useSound(audioWrong);
    const [fraccion, setFraccion] = useState(null);
    const [indice, setIndice] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [inputNumerador, setInputNumerador] = useState('');
    const [inputDenominador, setInputDenominador] = useState('');

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarRadicacion = async () => {
        try {
            const response = await fetch(`https://fractionsapp-3.onrender.com/potenciacion/radicacion`);
            const data = await response.json();
            setFraccion(data.fraccion);
            setIndice(data.indice);
            setResultado(data.resultado);
            console.log(data);
        } catch (error) {
            console.error('Error al generar las fracciones:', error);
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
        const correcto = (numInput / denInput) === resultado.decimal;

        if (correcto) {
            if (sonido) {
                playSoundOk();
            }
            generarRadicacion();
            setInputNumerador('');
            setInputDenominador('');
        } else {
            if (sonido) {
                playSoundWrong();
            }
        }
    };

    if (!fraccion || resultado === null) {
        return <div className='loading-container'><p>Cargando...</p></div>;
    }

    return (
        <div>
            <div className='div-renderizador'>
                <h2>Radicación de Fracciones:</h2>
                <div className="operacion">
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
                <div className='contenedor-Botones'>
                    <button onClick={handleSonido} className='boton-app'>{sonido ? 'Sonido on' : 'Sonido off'}</button>
                    <button onClick={handleCheck} className='boton-app'>Chequear</button>
                    <button onClick={generarRadicacion} className='boton-app'>Generar otra</button>
                </div>
            </div>
        </div>
    );
};

export default Radicacion2;
