import './Home.css';
import Circle from '../../../assets/Circle.png';

const Home = () => {
    return (
        <div className="home-container">
            <div className="circle-container">
                <img src={Circle} alt="Bienvenidos a Mundo Fracciones" className="circle-image" />
                <div className="text-container">
                    <h1 className="text-bienvenidos">Bienvenidos a</h1>
                    <h2 className="text-mundo">Mundo</h2>
                    <h2 className="text-fracciones">Fracciones</h2>
                </div>
            </div>
        </div>
    )
}

export default Home;
