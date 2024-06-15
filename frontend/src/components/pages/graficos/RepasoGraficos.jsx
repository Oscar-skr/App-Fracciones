import imageDefault from '../../../assets/Graficos1default.svg';
import imageMobile from '../../../assets/Graficos1mobile.svg';
import './RepasoGraficos.css';

const RepasoGraficos = () => {
    return (
        <div className="container-repaso">
            <picture>
                <source srcSet={imageMobile} media="(max-width: 768px)" />
                <img src={imageDefault} alt="Numerador y denominador" className="imagen-repaso" />
            </picture>
        </div>
    )
}

export default RepasoGraficos;
