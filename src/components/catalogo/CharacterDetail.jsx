import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import "./CharacterDetail.css";

function formatearPrecio(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    });
}

function resumirDescripcion(descripcion = "") {
    // Limita el texto para que el detalle sea facil de leer.
    const texto = descripcion.replace(/\s+/g, " ").trim();
    if (!texto) return "Sin descripción disponible";
    return texto.length > 180 ? `${texto.slice(0, 177).trim()}...` : texto;
}

function CharacterDetail({ personaje, onClose, onAdd }) {
    const [cantidad, setCantidad] = useState(1);

    return (
        <div className="detalle-modal" role="dialog" aria-modal="true" aria-labelledby="detalle-titulo">
            <div className="detalle-caja theme-surface">
                <button className="detalle-cerrar" type="button" onClick={onClose} aria-label="Cerrar detalle">
                    <X size={20} />
                </button>
                <img className="detalle-imagen" src={personaje.image} alt={personaje.name} />
                <div className="detalle-contenido">
                    <p className="theme-muted text-sm">Carta de Yu-Gi-Oh!</p>
                    <h2 id="detalle-titulo" className="text-2xl font-bold">{personaje.name}</h2>
                    <p className="theme-muted mt-3">
                        Conoce todos los detalles y estadísticas de esta carta de Yu-Gi-Oh!.
                    </p>
                    <dl className="detalle-datos theme-muted mt-5">
                        <div><dt>Tipo</dt><dd>{personaje.type || "No especificado"}</dd></div>
                        <div><dt>Atributo</dt><dd>{personaje.attribute || "No especificado"}</dd></div>
                        <div><dt>Arquetipo</dt><dd>{personaje.race || "No especificado"}</dd></div>
                        <div><dt>Ataque / Defensa</dt><dd>{personaje.atk ?? "-"} / {personaje.def ?? "-"}</dd></div>
                        <div className="detalle-descripcion"><dt>Descripción</dt><dd>{resumirDescripcion(personaje.desc)}</dd></div>
                    </dl>
                    <div className="detalle-pie">
                        <strong>{formatearPrecio(personaje.precio)}</strong>
                        <div className="detalle-compra">
                            <div className="detalle-cantidad" aria-label="Cantidad de cartas">
                                <button type="button" onClick={() => setCantidad((actual) => Math.max(1, actual - 1))} aria-label="Reducir cantidad">-</button>
                                <strong>{cantidad}</strong>
                                <button type="button" onClick={() => setCantidad((actual) => actual + 1)} aria-label="Aumentar cantidad">+</button>
                            </div>
                            <button className="theme-accent rounded-xl px-4 py-3 font-bold" type="button" onClick={() => onAdd(cantidad)}>
                                <ShoppingCart size={18} />
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharacterDetail;
