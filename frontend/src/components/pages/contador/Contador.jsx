import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Eye from '../../../assets/Eye.svg';
import { toggleVisibilidadContador } from '../../../redux/actions/contadorActions';
import './Contador.css';

const Contador = ({ correcto }) => {
    const dispatch = useDispatch();
    const contador = useSelector(state => state.contador.contador);
    const visible = useSelector(state => state.contador.visibilidad);
    const [effectClass, setEffectClass] = useState('');

    useEffect(() => {
        if (correcto !== null) {
            setEffectClass(correcto ? 'correcto' : 'incorrecto');
            const timer = setTimeout(() => setEffectClass(''), 500);
            return () => clearTimeout(timer);
        }
    }, [correcto]);

    const toggleVisibility = () => {
        dispatch(toggleVisibilidadContador());
    };

    return (
        <div onClick={toggleVisibility}>
            {visible ? (
                <div className={`flip-card ${effectClass}`}>
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <p>{contador}</p>
                        </div>
                        <div className="flip-card-back">
                            <p>{contador}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='contenedorContadorOculto'>
                    <img src={Eye} className='eyeContenedor' alt="Toggle visibility" />
                </div>
            )}
        </div>
    );
};

export default Contador;
