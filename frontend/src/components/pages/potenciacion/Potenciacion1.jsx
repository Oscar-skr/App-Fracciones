import React from 'react';
import { useMediaQuery } from 'react-responsive';
import PotenciacionDefault from '../../../assets/PotenciacionDefault.svg';
import PotenciacionMobile1 from '../../../assets/PotenciacionMobile1.svg';
import PotenciacionMobile2 from '../../../assets/PotenciacionMobile2.svg';
//import './Potenciacion1.css';

const Potenciacion1 = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 650px)' });

    return (
        <div className='potenciacion-container'>
            {!isMobile && (
                <picture className="desktop-picture">
                    <img src={PotenciacionDefault} alt="Potenciación" className="imagen-potenciacion" />
                </picture>
            )}
            {isMobile && (
                <div className="mobile-picture">
                    <img src={PotenciacionMobile1} alt="Potenciación 1" className="imagen-potenciacion" />
                    <img src={PotenciacionMobile2} alt="Potenciación 2" className="imagen-potenciacion" />
                </div>
            )}
        </div>
    );
}

export default Potenciacion1;
