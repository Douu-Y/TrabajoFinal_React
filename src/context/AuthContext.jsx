import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // Recupera la sesión guardada al abrir la aplicación.
    const [usuario, setUsuario] = useState(() => localStorage.getItem("usuarioActivo"));

    function iniciarSesion(nombre) {
        // Guarda el nombre para mantener la sesión entre recargas.
        const nombreLimpio = nombre.trim();
        localStorage.setItem("usuarioActivo", nombreLimpio);
        setUsuario(nombreLimpio);
    }

    function cerrarSesion() {
        // Elimina la sesión activa y actualiza el header.
        localStorage.removeItem("usuarioActivo");
        setUsuario(null);
    }

    const valor = useMemo(() => ({
        // Expone el usuario y las acciones a toda la aplicación.
        usuario,
        autenticado: Boolean(usuario),
        iniciarSesion,
        cerrarSesion,
    }), [usuario]);

    return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
}
