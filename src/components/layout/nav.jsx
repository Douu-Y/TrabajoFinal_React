import { Link } from "react-router-dom";
import './nav.css';

function Barra() {
    return (
        <nav className="menu">
            <ul className="opciones">
                {/* Enlaces principales de la aplicacion. */}
                <li>
                    <Link to="/" className="boton">
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link to="/Escenario" className="boton">
                        Diviértete
                    </Link>
                </li>
                <li>
                    <Link to="/catalogo" className="boton">
                        Catalogo
                    </Link>
                </li>
                <li>
                    <Link to="/contacto" className="boton">
                        Contactame
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Barra