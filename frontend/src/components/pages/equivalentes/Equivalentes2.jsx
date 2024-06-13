import useSound from 'use-sound';
import audioOk from '../../../assets/sonidos/ok.mp3';
import audioWrong from '../../../assets/sonidos/wrong.wav';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound } from '../../../redux/actions/soundActions';
import './Equivalentes2.css';

const Equivalentes2 = () => {
    const [playSoundOk] = useSound(audioOk);
    const [playSoundWrong] = useSound(audioWrong);
    const [fracciones, setFracciones] = useState([]);
    const [divs, setDivs] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    const dispatch = useDispatch();
    const sonido = useSelector(state => state.sound.sonido);

    const generarNumerosFraccion = async () => {
        try {
            const response = await fetch('https://fractionsapp-3.onrender.com/graficos/generarFraccion?cantidad=4');
            const data = await response.json();
            setFracciones(data);
            setSelectedIds([]);
            setDivs([]); // Limpiar los divs antes de generar nuevas fracciones
            console.log(data);
        } catch (error) {
            console.error('Error al generar la fracción:', error);
        }
    };

    useEffect(() => {
        generarNumerosFraccion();
    }, []);

    useEffect(() => {
        if (fracciones.length > 0) {
            let guardar = fracciones.map((fraccion) => {
                let nuevosDivs = [];
                let { numerador, denominador } = fraccion;
                for (let i = 0; i < denominador; i++) {
                    nuevosDivs.push(
                        <div key={i} className={i < numerador ? "div-num" : "div-vacio"}></div>
                    );
                }
                return nuevosDivs;
            });
            setDivs(guardar);
        }
    }, [fracciones]);

    const handleClick = (id) => {
        const newSelectedIds = selectedIds.includes(id)
            ? selectedIds.filter(selectedId => selectedId !== id)
            : [...selectedIds, id];
        setSelectedIds(newSelectedIds);

        if (newSelectedIds.length === 2) {
            if ((newSelectedIds.includes(1) && newSelectedIds.includes(4)) || 
                (newSelectedIds.includes(4) && newSelectedIds.includes(1))) {
                if (sonido) playSoundOk();  // Reproduce el sonido correcto
                setTimeout(() => {
                    generarNumerosFraccion();
                }, 1000);
            } else {
                if (sonido) playSoundWrong();  // Reproduce el sonido incorrecto
                setTimeout(() => {
                    setSelectedIds([]);
                }, 1000);
            }
        }
    };

    const handleSonido = () => {
        dispatch(toggleSound());
    };

    if (divs.length === 0) {
        return <div className='loading-container'><p>Cargando...</p></div>;
    }

    return (
        <div className='div-renderizador'>
            <h3>Elegí las dos fracciones equivalentes</h3>
            <div className="div1">
                {fracciones.map((fraccion, index) => (
                    <div 
                        key={fraccion.id} 
                        onClick={() => handleClick(fraccion.id)} 
                        className={`graficoFraccion ${selectedIds.includes(fraccion.id) ? 'selected' : ''}`}
                    >
                        {divs[index]}
                    </div>
                ))}
            </div>
            <div>
                <button onClick={handleSonido} className='boton-app'>{sonido ? 'Sonido on' : 'Sonido off'}</button>
                <button onClick={generarNumerosFraccion} className='boton-app'>Generar otra</button>
            </div>
        </div>
    );
};

export default Equivalentes2;
