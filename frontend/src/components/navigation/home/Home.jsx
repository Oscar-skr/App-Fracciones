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

    // Función para generar los divs
    const createDivs = (numDivs) => {
        let divs = [];
        for (let i = 0; i < numDivs; i++) {
            divs.push(<div key={i} className="div-num home-div-num"></div>);
        }
        return divs;
    };

    return (
        <div className="home-container">
            <h1 className="header">Bienvenidos a Academia de Fracciones</h1>
            <p className="description">Descubre el fascinante mundo de las fracciones con nuestras guías interactivas y ejemplos prácticos. ¡Aprender fracciones nunca fue tan fácil y divertido!</p>
            <div className="animation-container">
                <div className="graficoFraccion">
                    {createDivs(10)} {/* Puedes cambiar el número 10 por cualquier número de divs que necesites */}
                </div>
            </div>
            <div className="sections-container">
                <div className="section">
                    <h3>Gráficos de Fracciones</h3>
                    <p>Visualiza fracciones de manera gráfica para una mejor comprensión.</p>
                </div>
                <div className="section">
                    <h3>Sumar Fracciones</h3>
                    <p>Descubre cómo sumar fracciones con el mismo denominador y con denominadores diferentes.</p>
                </div>
                <div className="section">
                    <h3>Restar Fracciones</h3>
                    <p>Aprende a restar fracciones de manera sencilla y práctica con nuestros ejemplos interactivos.</p>
                </div>
                <div className="section">
                    <h3>Multiplicar Fracciones</h3>
                    <p>Conoce las reglas para multiplicar fracciones y resuelve problemas fácilmente.</p>
                </div>
                <div className="section">
                    <h3>Dividir Fracciones</h3>
                    <p>Aprende a dividir fracciones y a simplificar tus respuestas.</p>
                </div>
                <div className="section">
                    <h3>Potencias y Raíces</h3>
                    <p>Explora cómo trabajar con potencias y raíces en fracciones.</p>
                </div>
            </div>
            <p className="more-info">Visita las diferentes pestañas para explorar más sobre fracciones y cómo funcionan en diversos contextos matemáticos.</p>
        </div>
    );
};

export default Home;
