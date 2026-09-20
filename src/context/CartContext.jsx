import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    // Recupera el carrito para conservarlo después de recargar la página.
    const [items, setItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("carrito") || "[]");
        } catch {
            return [];
        }
    });

    // Sincroniza cada cambio con el almacenamiento del navegador.
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(items));
    }, [items]);

    function agregarAlCarrito(producto) {
        // Si ya existe, aumenta la cantidad en lugar de duplicar la línea.
        setItems((actuales) => {
            const existente = actuales.find((item) => item.id === producto.id);
            if (existente) {
                return actuales.map((item) => item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item);
            }
            return [...actuales, { ...producto, cantidad: 1 }];
        });
        toast.success(`${producto.name} se agregó al carrito`);
    }

    function cambiarCantidad(id, cantidad) {
        // Una unidad es el mínimo; la eliminación se hace con la papelera.
        setItems((actuales) => actuales
            .map((item) => item.id === id
                ? { ...item, cantidad: Math.max(1, cantidad) }
                : item));
    }

    function eliminarDelCarrito(id) {
        setItems((actuales) => actuales.filter((item) => item.id !== id));
    }

    function vaciarCarrito() {
        setItems([]);
    }

    const valor = useMemo(() => ({
        items,
        totalItems: items.reduce((total, item) => total + item.cantidad, 0),
        totalPrecio: items.reduce((total, item) => total + item.precio * item.cantidad, 0),
        agregarAlCarrito,
        cambiarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
    }), [items]);

    return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
    return context;
}
