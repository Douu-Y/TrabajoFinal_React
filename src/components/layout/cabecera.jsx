import { Link } from "react-router-dom";
import { useState } from 'react';
import { Sun, Moon, User } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import imagen from '../../assets/images (3).jpg';
import './cabecera.css';
import Login from '../auth/login';

function Cabecera() {
    const [mostrarLogin, setMostrarLogin] = useState(false);
    const { tema, cambiarTema } = useTheme();
    const { usuario, autenticado } = useAuth();

    return (
        <>
            <header>
                <Link to="/">
                                    <img src={imagen} alt="Perfil" className="imagenPerfil"/>
                </Link>
                
                <h1 className="cabecera">Carrera del Camello 🐫</h1>

                <div className="acciones-header">
                    {/* El tema se aplica globalmente desde ThemeContext. */}
                    <button
                        type="button"
                        onClick={cambiarTema}
                        title={tema === "claro" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
                        aria-label={tema === "claro" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
                        className="boton-tema"
                    >
                        {tema === "claro" ? <Moon size={18} /> : <Sun size={18} />}
                    </button>

                    {autenticado ? (
                        <Link className="boton boton-usuario" to="/perfil" title={`Perfil de ${usuario}`}>
                            <User size={18} />
                            <span>{usuario}</span>
                        </Link>
                    ) : (
                        <button className="boton" type="button" onClick={() => setMostrarLogin(true)}>
                            Login
                        </button>
                    )}
                </div>
            </header>

            {mostrarLogin && (
                <Login onClose={() => setMostrarLogin(false)} />
            )}

        </>
    )
}

export default Cabecera;