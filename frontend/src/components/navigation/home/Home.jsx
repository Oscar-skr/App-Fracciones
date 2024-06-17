import './Home.css';
import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        // Ocultar el desplazamiento vertical
        document.body.style.overflowY = 'hidden';
        return () => {
            // Restaurar el desplazamiento vertical cuando el componente se desmonta
            document.body.style.overflowY = 'auto';
        };
    }, []);

    return (
        <div className="home-container">
            <h3 className="text-center">Nada por aquí...</h3>
        </div>
    );
};

export default Home;
