import MultiplicacionesDefault from '../../../assets/MultiplicacionDefault.svg';
import MultiplicacionesMobile1 from '../../../assets/MultiplicacionMobile1.svg';
import MultiplicacionesMobile2 from '../../../assets/MultiplicacionMobile2.svg';
import MultiplicacionesMobile3 from '../../../assets/MultiplicacionMobile3.svg';
import './Multiplicacion1.css';

const Multiplicacion1 = () => {
    return (
        <div className='multiplicacion-container'>
            <picture className="desktop-picture">
                <img src={MultiplicacionesDefault} alt="Multiplicaciones" className="imagen-multiplicaciones" />
            </picture>
            <div className="mobile-picture">
                <img src={MultiplicacionesMobile1} alt="Multiplicaciones 1" className="imagen-multiplicaciones" />
                <img src={MultiplicacionesMobile2} alt="Multiplicaciones 2" className="imagen-multiplicaciones" />
                <img src={MultiplicacionesMobile3} alt="Multiplicaciones 3" className="imagen-multiplicaciones" />
            </div>
        </div>
    );
}

export default Multiplicacion1;
