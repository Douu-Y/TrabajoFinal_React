import { useState } from 'react';
import './login.css';
import { useAuth } from '../../context/AuthContext';

function Login({ onClose }) {
// Estado local de los campos del formulario.
const [usuario, setUsuario] = useState('');
const [contrasena, setContrasena] = useState('');
const { iniciarSesion } = useAuth();

function manejarSubmit(e) {
e.preventDefault();
if (!usuario.trim() || !contrasena.trim()) return;
iniciarSesion(usuario);
onClose();
}

return (
<div className="login">
    <div className="login-caja">
        <button className="login-cerrar" onClick={onClose}>✕</button>
            <h2>Iniciar sesión</h2>
            
        <form onSubmit={manejarSubmit}>
            <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e. target.value)} />

            <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) =>   setContrasena(e.target.value)} />

            <button type="submit" className="boton">Entrar</button>
        </form>
    </div>
</div>
);
}

export default Login;