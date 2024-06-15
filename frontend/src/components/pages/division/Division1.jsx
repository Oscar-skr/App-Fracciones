import React from 'react';
import { useMediaQuery } from 'react-responsive';
import DivisionDefault from '../../../assets/DivisionDefault.svg';
import DivisionMobile1 from '../../../assets/DivisionesMobile1.svg';
import DivisionMobile2 from '../../../assets/DivisionesMobile2.svg';
//import './Division1.css';

const Division1 = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 650px)' });

    return (
        <div className='division-container'>
            {!isMobile && (
                <picture className="desktop-picture">
                    <img src={DivisionDefault} alt="División" className="imagen-division" />
                </picture>
            )}
            {isMobile && (
                <div className="mobile-picture">
                    <img src={DivisionMobile1} alt="División 1" className="imagen-division" />
                    <img src={DivisionMobile2} alt="División 2" className="imagen-division" />
                </div>
            )}
        </div>
    );
}

export default Division1;
