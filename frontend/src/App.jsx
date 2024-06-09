import React from 'react';
import { Routes, Route } from "react-router-dom"
import NavBar from './components/navigation/navBar/NavBar'
import Footer from './components/navigation/footer/Footer';
import Home from './components/navigation/home/Home';
import Graficos from './components/pages/graficos/Graficos';
import Division from './components/pages/division/Division';
import Ecuaciones from './components/pages/ecuaciones/Ecuaciones';
import EjerciciosCombinados from './components/pages/ejercicios-combinados/EjerciciosCombinados';
import Equivalentes from './components/pages/equivalentes/Equivalentes';
import Multiplicacion from './components/pages/multiplicacion/Multiplicacion';
import Potenciacion from './components/pages/potenciacion/Potenciacion';
import Radicacion from './components/pages/radicacion/Radicacion';
import SumasDistintoDenominador from './components/pages/sumas-distinto-denominador/SumasDistintoDenominador';
import SumasIgualDenominador from './components/pages/sumas-igual-denominador/SumasIgualDenominador';



const App = () => {
  return (
    <div className="app">
        <div className='divNavBar'><NavBar /></div>
        <div className='contenedorcomponentes'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/division" element={<Division />} />
          <Route path="/ecuaciones" element={<Ecuaciones />} /> 
          <Route path="/ejercicios-combinados" element={<EjerciciosCombinados />} /> 
          <Route path="/equivalentes" element={<Equivalentes />} /> 
          <Route path="/multiplicacion" element={<Multiplicacion />} /> 
          <Route path="/potenciacion" element={<Potenciacion />} /> 
          <Route path="/radicacion" element={<Radicacion />} /> 
          <Route path="/sumas-distinto-denominador" element={<SumasDistintoDenominador />} /> 
          <Route path="/sumas-igual-denominador" element={<SumasIgualDenominador />} />
          <Route path='/graficos' element={<Graficos />} />       
        </Routes>
        </div>
        <Footer />
      </div>
  );
};

export default App;


