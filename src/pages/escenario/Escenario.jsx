import Camello from "../../components/Escenario/Camello.jsx";
import BotonDerecha from "../../components/Escenario/BotonDerecha.jsx";
import BotonIzquierda from "../../components/Escenario/BotonIzquierda.jsx";
import BotonReset from "../../components/Escenario/BotonReset.jsx";
import "./Escenario.css";

import { useState, useEffect } from "react";

const RECORRIDO_MAXIMO = 300;
const LIMITE_MIN = -RECORRIDO_MAXIMO;
const LIMITE_MAX = RECORRIDO_MAXIMO;

function Escenario() {
const [posicion, setPosicion] = useState(0);
const [direccion, setDireccion] = useState("izquierda");

function moverDerecha() {
    setPosicion((prev) => Math.min(prev + 5, LIMITE_MAX));
    setDireccion("derecha");
}

function moverIzquierda() {
    setPosicion((prev) => Math.max(prev - 5, LIMITE_MIN));
    setDireccion("izquierda");
}

function reset() {
    setPosicion(0);
    setDireccion("izquierda");
}

useEffect(() => {
    function manejarTecla(evento) {
    if (evento.key === "ArrowRight") {
        moverDerecha();
    } else if (evento.key === "ArrowLeft") {
        moverIzquierda();
    } else if (evento.key === "r" || evento.key === "R") {
        reset();
    }
    }

    window.addEventListener("keydown", manejarTecla);
    return () => window.removeEventListener("keydown", manejarTecla);
}, []);

function obtenerMensaje() {
    if (posicion === LIMITE_MAX) {
    return "¡Llegaste al límite derecho!";
    }
    if(posicion === 0){
        return "Punto Inicial";
    }
    if (posicion === LIMITE_MIN) {
    return "¡Llegaste al límite izquierdo!";
    }
    return `Posición: ${posicion}px`;
}

return (
    <div className="pagina">
    <div className="escenario">
        <div className="sol"></div>
        <div className="piramide"></div>
        <div className="piramide piramide-chica"></div>
        <div className="contenedor-camello">
            <Camello posicion={posicion} direccion={direccion} />
        </div>
    </div>

    <p className={`posicion-texto ${posicion === LIMITE_MIN || posicion === LIMITE_MAX ? "limite" : ""}`}>
        {obtenerMensaje()}
    </p>

    <div className="controles">
        <BotonIzquierda mover={moverIzquierda} />
        <BotonReset reset={reset} />
        <BotonDerecha mover={moverDerecha} />
    </div>
    </div>
);
}

export default Escenario;