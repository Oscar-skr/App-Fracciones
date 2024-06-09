import React, { useState, useEffect } from "react";
import './Graficos1.css';
import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from "../../../redux/actions/soundActions";

const Graficos1 = () => {
  const [numerador, setNumerador] = useState(null);
  const [denominador, setDenominador] = useState(null);
  const [divs, setDivs] = useState([]);
  const [inputNumerador, setInputNumerador] = useState("");
  const [inputDenominador, setInputDenominador] = useState("");
  const [playSoundOk] = useSound(audioOk);
  const [playSoundWrong] = useSound(audioWrong);

  const dispatch = useDispatch();
  const sonido = useSelector(state => state.sound.sonido);

  const generarNumerosFraccion = async () => {
    try {
      const response = await fetch('http://localhost:3001/graficos/generarFraccion?cantidad=1');
      const data = await response.json();
      setNumerador(data.numerador);
      setDenominador(data.denominador);
      
    } catch (error) {
      console.error('Error al generar la fracción:', error);
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
      setInputNumerador("");
      setInputDenominador("");
      generarNumerosFraccion();
    } else {
      if (sonido) playSoundWrong();
      setInputNumerador("");
      setInputDenominador("");
    }
  }

  const handleSonido = () => {
    dispatch(toggleSound());
  }

  return (
    <div className="div-renderizador">
      <h3>Introducí el numerador y el denominador:</h3>
      <div className="graficoFraccion">{divs}</div>
      <span></span>
      <div className="introducir-datos">
        <div className="fraccion">
          <input type="text" inputMode="numeric" name="inputNumeradorName" className='inputFraccion' autoComplete="off" value={inputNumerador} onChange={handleOnChange} placeholder="Numerador"/>
          <span className="fraccion-span"></span>
          <input type="text" inputMode="numeric" name="inputDenominadorName" autoComplete="off" value={inputDenominador} onChange={handleOnChange} placeholder="Denominador"/>
        </div>
        <button onClick={chequearDatos} className="boton-app">Chequear</button>
        <button onClick={handleSonido} className="boton-app">{sonido ? 'Sonido on' : 'Sonido off'}</button>
        <button onClick={generarNumerosFraccion} className="boton-app">Generar otra</button>
      </div>
    </div>
  );
};

export default Graficos1;
