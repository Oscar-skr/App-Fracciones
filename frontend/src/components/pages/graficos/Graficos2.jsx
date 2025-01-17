import React, { useState, useEffect } from "react";
import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useDispatch, useSelector } from "react-redux";
import { toggleSound } from '../../../redux/actions/soundActions';
import { aumentarContador, decrementarContador } from '../../../redux/actions/contadorActions';
import Contador from '../contador/Contador';
import './Graficos2.css';

const Graficos2 = () => {
    const [playSoundOk] = useSound(audioOk);
    const [playSoundWrong] = useSound(audioWrong);
    const [fracciones, setFracciones] = useState([]);
    const [divs, setDivs] = useState([]);
    const [variable1, setVariable1] = useState(null);
    const [variable2, setVariable2] = useState(null);
    const [variable3, setVariable3] = useState(null);
    const [loading, setLoading] = useState(true);
    const [correcto, setCorrecto] = useState(null); // Añadir estado para manejar la respuesta correcta o incorrecta

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarNumerosFraccion = async () => {
        try {
            setLoading(true); // Iniciar carga
            const response = await fetch('https://fractionsapp-3.onrender.com/graficos/generarFraccion?cantidad=3');
            const data = await response.json();
            setFracciones(data);
            setCorrecto(null); // Restablecer el estado de respuesta
            setLoading(false); // Terminar carga
        } catch (error) {
            console.error('Error al generar la fracción:', error);
            setLoading(false); // Terminar carga incluso si hay un error
        }
    };

    useEffect(() => {
        generarNumerosFraccion();
    }, []);

    useEffect(() => {
        let guardar = fracciones.map((fraccion) => {
            let nuevosDivs = [];
            let { numerador, denominador } = fraccion;
            for (let i = 0; i < denominador; i++) {
                nuevosDivs.push(
                    <div key={i} className={i < numerador ? "div-num" : "div-vacio"}></div>
                );
            }
            return nuevosDivs;
        });
        setDivs(guardar);
    }, [fracciones]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const asignarAleatorio = () => {
        const numerosAleatorios = shuffleArray([0, 1, 2]);
        setVariable1(numerosAleatorios[0]);
        setVariable2(numerosAleatorios[1]);
        setVariable3(numerosAleatorios[2]);
    };

    useEffect(() => {
        if (fracciones.length > 0) {
            asignarAleatorio();
        }
    }, [fracciones]);

    const DivClickeable = (props) => {
        const handleClick = () => {
            if (props.correcto) {
                if (sonido) {
                    dispatch(aumentarContador());
                    playSoundOk();
                }
                setCorrecto(true);
                setTimeout(() => {
                    generarNumerosFraccion();
                }, 1000);
            } else {
                if (sonido) {
                    dispatch(decrementarContador());
                    playSoundWrong();
                }
                setCorrecto(false);
                setTimeout(() => {
                    setCorrecto(null);
                }, 1000);
            }
        };

        return (
            <div className='graficoFraccion' onClick={handleClick}>
                {props.children}
            </div>
        );
    };

    const handleSonido = () => {
        dispatch(toggleSound());
    };

    return (
        <div className='div-renderizador'>
                  <div className="divContador">
                        <Contador correcto={correcto} />
                    </div>
            {loading ? (
                <div className="loading-container">
                    <p>Cargando...</p>
                </div>
            ) : (
                <>
                    <h3>Elegí el gráfico que representa a</h3>
                    <div className="fraccion">
                        <p>{fracciones[0].numerador}</p>
                        <p className="fraccion-span"></p>
                        <p>{fracciones[0].denominador}</p>
                    </div>
                    <div className="div1">
                        <DivClickeable className='graficoFraccion' correcto={fracciones[variable1] === fracciones[0]}>
                            {divs[variable1]}
                        </DivClickeable>

                        <DivClickeable correcto={fracciones[variable2] === fracciones[0]}>
                            {divs[variable2]}
                        </DivClickeable>

                        <DivClickeable correcto={fracciones[variable3] === fracciones[0]}>
                            {divs[variable3]}
                        </DivClickeable>
                    </div>
                    <div className="divContenedorBotones">
                        <button onClick={handleSonido} className='boton-app'>{sonido ? 'Sonido on' : 'Sonido off'}</button>
                        <button onClick={generarNumerosFraccion} className='boton-app'>Generar otra</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Graficos2;
