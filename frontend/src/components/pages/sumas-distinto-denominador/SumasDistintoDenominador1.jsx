import './SumasDistintoDenominador1.css';
import SumasDistintoDenominadorDefault from '../../../assets/SumaDistintoDenominadorDefault.svg';
import SumasDistintoDenominadorMobile from '../../../assets/SumaDistintoDenominadorMobile.svg';


const SumasDistintoDenominador1 = () => {
    return (
        <div>
            <picture>
                <source srcSet={SumasDistintoDenominadorMobile} media="(max-width: 600px)" />
                <img src={SumasDistintoDenominadorDefault} alt="Sumas Distinto Denominador" className="imagen-sumas-distinto" />
            </picture>
        </div>
    );
}

export default SumasDistintoDenominador1;
