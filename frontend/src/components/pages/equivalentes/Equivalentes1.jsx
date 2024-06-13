import EquivalentesDefault from '../../../assets/EquivalentesDefault.svg';
import EquivalentesMobile1 from '../../../assets/EquivalentesMobile1.svg';
import EquivalentesMobile2 from '../../../assets/EquivalentesMobile2.svg';
import EquivalentesMobile3 from '../../../assets/EquivalentesMobile3.svg';
import './Equivalentes1.css';

const Equivalentes1 = () => {
    return (
        <div className='div-renderizador-equivalentes'>
            <picture className="desktop-picture">
                <img src={EquivalentesDefault} alt="Equivalentes" className="imagen-equivalentes" />
            </picture>
            <div className='mobile-picture'>
                <img src={EquivalentesMobile1} alt="Equivalentes Mobile 1" className="imagen-equivalentes" />
                <img src={EquivalentesMobile2} alt="Equivalentes Mobile 2" className="imagen-equivalentes" />
                <img src={EquivalentesMobile3} alt="Equivalentes Mobile 3" className="imagen-equivalentes" />
            </div>
        </div>
    )
}

export default Equivalentes1;
