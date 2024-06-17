import React from 'react';
import { useMediaQuery } from 'react-responsive';
import RadicacionDefault from '../../../assets/RadicacionDefault.svg';
import RadicacionMobile1 from '../../../assets/RadicacionMobile1.svg';
import './Radicacion1.css';

const Radicacion1 = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 650px)' });

    return (
        <div className='radicacion-container'>
            {!isMobile && (
                <picture className="desktop-picture">
                    <img src={RadicacionDefault} alt="Radicación" className="imagen-radicacion" />
                </picture>
            )}
            {isMobile && (
                <div className="mobile-picture">
                    <img src={RadicacionMobile1} alt="Radicación 1" className="imagen-radicacion" />
                </div>
            )}
        </div>
    );
}

export default Radicacion1;
