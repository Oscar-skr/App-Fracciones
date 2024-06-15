import React, { useState, useEffect } from "react";
import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from "../../../redux/actions/soundActions";
import { aumentarContador, decrementarContador } from "../../../redux/actions/contadorActions";
import Contador from '../contador/Contador';
import './Graficos1.css';

const Graficos1 = () => {
  const [numerador, setNumerador] = useState(null);
  const [denominador, setDenominador] = useState(null);
  const [divs, setDivs] = useState([]);
  const [inputNumerador, setInputNumerador] = useState("");
  const [inputDenominador, setInputDenominador] = useState("");
  const [loading, setLoading] = useState(true); // Estado para indicar si está cargando
  const [playSoundOk] = useSound(audioOk);
  const [playSoundWrong] = useSound(audioWrong);
  const [correcto, setCorrecto] = useState(null); // Nuevo estado para controlar el efecto visual

  const dispatch = useDispatch();
  const sonido = useSelector(state => state.sound.sonido);

  const generarNumerosFraccion = async () => {
    try {
      setLoading(true); // Iniciar carga
      const response = await fetch('https://fractionsapp-3.onrender.com/graficos/generarFraccion?cantidad=1');
      const data = await response.json();
      setNumerador(data.numerador);
      setDenominador(data.denominador);
      setLoading(false); // Terminar carga
    } catch (error) {
      console.error('Error al generar la fracción:', error);
      setLoading(false); // Terminar carga incluso si hay un error
    }
  };

  useEffect(() => {
    generarNumerosFraccion();
    return () => {
      // Limpiar los valores de numerador y denominador cuando el componente se desmonte
      setNumerador(null);
      setDenominador(null);
    };
  }, []);

  useEffect(() => {
    const nuevosDivs = [];
    for (let i = 0; i < denominador; i++) {
      if (numerador !== null && denominador !== null && i < numerador) {
        nuevosDivs.push(<div key={i} className="div-num"></div>);
      } else {
        nuevosDivs.push(<div key={i} className="div-vacio"></div>);
      }
    }
    setDivs(nuevosDivs);
  
  }, [numerador, denominador]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === "inputNumeradorName") setInputNumerador(value);
    else if (name === "inputDenominadorName") setInputDenominador(value);
  }

  const chequearDatos = () => {
    if (parseInt(inputNumerador) === numerador && parseInt(inputDenominador) === denominador) {
      if (sonido) playSoundOk();
      dispatch(aumentarContador())
      setCorrecto(true); // Actualizar el estado de correcto
      setInputNumerador("");
      setInputDenominador("");
      generarNumerosFraccion();
    } else {
      if (sonido) playSoundWrong();
      dispatch(decrementarContador())
      setCorrecto(false); // Actualizar el estado de incorrecto
      setInputNumerador("");
      setInputDenominador("");
    }
    setTimeout(() => setCorrecto(null), 500); // Resetear el estado de correcto después de 500ms
  }

  const handleSonido = () => {
    dispatch(toggleSound());
  }

  return (
    <div className="div-renderizador">
      <div className="divContador">
       <Contador correcto={correcto} />
       </div>
      {loading ? (
        <div className="loading-container">
          <p>Cargando...</p>
        </div>
      ) : (
        <>
         
          <h3>Introducí el numerador y el denominador:</h3>
          
          <div className="graficoFraccion">{divs}</div>
          
          <div className="introducir-datos">
            <div className="fracciong">
              <input type="text" inputMode="numeric" name="inputNumeradorName" className='inputFraccion' autoComplete="off" value={inputNumerador} onChange={handleOnChange} placeholder="Numerador"/>
              <span className="fraccion-span"></span>
              <input type="text" inputMode="numeric" name="inputDenominadorName" autoComplete="off" value={inputDenominador} onChange={handleOnChange} placeholder="Denominador"/>
            </div>
            <div className="divContenedorBotones">
            <button onClick={chequearDatos} className="boton-app">Chequear</button>
            <button onClick={handleSonido} className="boton-app">{sonido ? 'Sonido on' : 'Sonido off'}</button>
            <button onClick={generarNumerosFraccion} className="boton-app">Generar otra</button>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Graficos1;
