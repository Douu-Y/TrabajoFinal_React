import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import CharacterDetail from "./CharacterDetail";

function formatearPrecio(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",   //para mostrar el numero con moneda
        currency: "COP", // Peso colombiano
        maximumFractionDigits: 0,    // este es para decir que sin decimales
    });
}

export default function CharacterCard({ personaje }) {
const [mostrarDetalle, setMostrarDetalle] = useState(false);
const { agregarAlCarrito } = useCart();

function agregar() {
    agregarAlCarrito(personaje);
}

return (
    <>
        {/* La tarjeta abre el detalle; el boton interno detiene ese clic. */}
        <article className="catalogo-card theme-surface rounded-2xl overflow-hidden" onClick={() => setMostrarDetalle(true)}>
            <img src={personaje.image} alt={personaje.name} className="catalogo-card-imagen" />
            <div className="catalogo-card-capa" />
            <div className="catalogo-card-contenido p-4">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg leading-tight">{personaje.name}</h3>
                    <span className="text-xs shrink-0">#{personaje.id}</span>
                </div>

                <ul className="catalogo-card-datos mt-3 space-y-1 text-sm">
                    <li><span>Tipo:</span> {personaje.type || "Carta"}</li>
                    <li><span>Atributo:</span> {personaje.attribute || "No especificado"}</li>
                    <li><span>Arquetipo:</span> {personaje.race || "No especificado"}</li>
                    <li><span>ATK / DEF:</span> {personaje.atk ?? "-"} / {personaje.def ?? "-"}</li>
                </ul>

                <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="font-bold text-lg">{formatearPrecio(personaje.precio)}</span>
                    <button
                        type="button"
                        className="theme-action p-2 rounded-full"
                        title="Agregar al carrito"
                        onClick={(event) => {
                            event.stopPropagation();
                            agregar();
                        }}
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </article>
        {mostrarDetalle && (
            <CharacterDetail
                personaje={personaje}
                onClose={() => setMostrarDetalle(false)}
                onAdd={(cantidad) => {
                    for (let indice = 0; indice < cantidad; indice += 1) agregar();
                    setMostrarDetalle(false);
                }}
            />
        )}
    </>
);
}


