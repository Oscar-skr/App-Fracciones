import './Contador.css';
import { useSelector } from 'react-redux';


const Contador = () => {

    const contador = useSelector(state => state.contador.contador);
    return (
        <div>
            <div className='contenedorContador'>
                <p>{contador}</p>
            </div>
        </div>
    )
}

export default Contador;