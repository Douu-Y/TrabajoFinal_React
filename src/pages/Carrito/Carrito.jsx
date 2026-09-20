import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import "./Carrito.css";

function formatearPrecio(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    });
}

const IVA = 0.19;

function Carrito() {
    const {
        items,
        totalItems,
        totalPrecio,
        cambiarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
    } = useCart();
    const [confirmandoPedido, setConfirmandoPedido] = useState(false);
    const impuesto = totalPrecio * IVA;
    const totalPagar = totalPrecio + impuesto;

    function comprar() {
        // El diálogo confirma antes de vaciar el carrito y enviar el pedido.
        if (!items.length) {
            toast.error("Agrega productos antes de enviar el pedido");
            return;
        }
        vaciarCarrito();
        toast.success("El pedido se envió correctamente");
        setConfirmandoPedido(false);
    }

    return (
        <main className="theme-page min-h-screen px-6 py-12">
            <section className="carrito-contenido max-w-4xl mx-auto">
                <div className="carrito-encabezado theme-accent rounded-2xl p-8">
                    <ShoppingBag size={32} />
                    <div>
                        <h1 className="text-3xl font-bold">Tu carrito</h1>
                        <p className="theme-on-accent">{totalItems} producto(s) seleccionado(s)</p>
                    </div>
                </div>

                <Link className="carrito-volver theme-surface" to="/catalogo">
                    <ArrowLeft size={18} />
                    Volver al catálogo
                </Link>

                {!items.length ? (
                    <div className="theme-surface carrito-vacio rounded-2xl p-10 text-center">
                        <ShoppingBag className="mx-auto mb-4" size={42} />
                        <h2 className="text-xl font-bold">Tu carrito está vacío</h2>
                        <p className="theme-muted mt-2">Agrega cartas desde el catálogo para continuar.</p>
                    </div>
                ) : (
                    <>
                        <div className="mt-6 space-y-4">
                            {items.map((item) => (
                                <article className="theme-surface carrito-item rounded-2xl p-4" key={item.id}>
                                    <img src={item.image} alt={item.name} />
                                    <div className="min-w-0 flex-1">
                                        <h2 className="font-bold">{item.name}</h2>
                                        <p className="theme-muted">Tipo: {item.episodio || item.type || "Carta"}</p>
                                        <p className="theme-muted">Precio unitario: {formatearPrecio(item.precio)}</p>
                                    </div>
                                    <div className="carrito-cantidad">
                                        <button
                                            type="button"
                                            onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                                            disabled={item.cantidad <= 1}
                                            aria-label="Reducir cantidad"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <strong>{item.cantidad}</strong>
                                        <button type="button" onClick={() => cambiarCantidad(item.id, item.cantidad + 1)} aria-label="Aumentar cantidad">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <strong>Subtotal: {formatearPrecio(item.precio * item.cantidad)}</strong>
                                    <button className="carrito-eliminar" type="button" onClick={() => eliminarDelCarrito(item.id)} aria-label={`Eliminar ${item.name}`}>
                                        <Trash2 size={18} />
                                    </button>
                                </article>
                            ))}
                        </div>

                        <div className="theme-surface carrito-resumen rounded-2xl mt-6 p-6">
                            <div className="carrito-totales">
                                <p><span>Total productos</span><strong>{formatearPrecio(totalPrecio)}</strong></p>
                                <p><span>IVA (19%)</span><strong>{formatearPrecio(impuesto)}</strong></p>
                                <p className="carrito-total-final"><span>Total a pagar</span><strong>{formatearPrecio(totalPagar)}</strong></p>
                            </div>
                            <button className="theme-accent mt-5 w-full rounded-xl px-6 py-3 font-bold" type="button" onClick={() => setConfirmandoPedido(true)}>
                                Enviar pedido
                            </button>
                        </div>
                    </>
                )}
            </section>
            {confirmandoPedido && (
                <ConfirmDialog
                    title="Enviar pedido"
                    message="¿Deseas confirmar y enviar este pedido?"
                    onCancel={() => setConfirmandoPedido(false)}
                    onConfirm={comprar}
                />
            )}
        </main>
    );
}

export default Carrito;
