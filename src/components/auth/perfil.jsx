import './perfil.css';
import { useState } from 'react';
import imagen from '../../assets/11zon_cropped.png';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmDialog from '../ui/ConfirmDialog';

function Perfil() {
    const { usuario, autenticado, cerrarSesion } = useAuth();
    const navegar = useNavigate();
    const [confirmandoSalida, setConfirmandoSalida] = useState(false);

    function salir() {
        // Cierra la sesión y vuelve al inicio después de confirmar.
        cerrarSesion();
        toast.success("Sesión cerrada correctamente");
        navegar("/");
    }

    return (
        // Pagina independiente con la informacion del perfil.
        <main className="perfil-pagina theme-page">
            <section className="perfil-caja theme-surface theme-border" aria-labelledby="perfil-titulo">
                <img className="perfil-imagen" src={imagen} alt="Imagen de perfil" />
                <h2 id="perfil-titulo">{autenticado ? usuario : "Mi perfil"}</h2>
                <p className="perfil-descripcion">
                    Soy una persona curiosa y creativa que disfruta aprender,
                    experimentar con nuevas ideas y construir proyectos web con React.
                </p>
                {!autenticado && (
                    <p className="perfil-aviso">No hay una sesión iniciada.</p>
                )}
                {autenticado && !confirmandoSalida && (
                    <button className="theme-accent rounded-xl px-5 py-3 font-bold" type="button" onClick={() => setConfirmandoSalida(true)}>
                        Cerrar sesión
                    </button>
                )}
            </section>
            {autenticado && confirmandoSalida && (
                <ConfirmDialog
                    title="Cerrar sesión"
                    message="¿Deseas cerrar tu sesión?"
                    onCancel={() => setConfirmandoSalida(false)}
                    onConfirm={salir}
                />
            )}
        </main>
    );
}

export default Perfil;
