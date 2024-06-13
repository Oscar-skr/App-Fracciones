import React from 'react';
import SumaIgualDenominadorDefault from '../../../assets/SumaIgualDenominadorDefault.svg';
import SumaIgualDenominadorMobile from '../../../assets/SumaIgualDenominadorMobile.svg';
import './SumasIgualDenominador1.css';

const SumasIgualDenominador1 = () => {
    return (
        <div>

            <picture>
                <source srcSet={SumaIgualDenominadorMobile} media="(max-width: 650px)" />
                <img src={SumaIgualDenominadorDefault} alt="Sumas Igual Denominador" className="imagen-sumas" />
            </picture>
        </div>
    );
}

export default SumasIgualDenominador1;
