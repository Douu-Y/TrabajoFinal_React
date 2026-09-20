import { useState, useEffect } from "react";

const RANGO_PRECIO = { min: 35, max: 180 };
const BASE_URL = "https://db.ygoprodeck.com/api/v7";
// Se usa para calcular el paginador de la API de cartas.
const TOTAL_CARTAS = 13419; // total aproximado de cartas en la base de datos

function precioAleatorio() {
    return Math.floor(Math.random() * (RANGO_PRECIO.max - RANGO_PRECIO.min + 1)) + RANGO_PRECIO.min;
}

export function useCharacters(limit = 12, page = 1, busqueda = "") {
    const [personajes, setPersonajes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [totalPaginas, setTotalPaginas] = useState(1);

    useEffect(() => {
        let activo = true;

        async function cargarCartas() {
            try {
                setCargando(true);
                setError(null);

                // La API trabaja con desplazamiento, no con numero de pagina.
                const offset = (page - 1) * limit;
                const parametros = new URLSearchParams({
                    num: String(limit),
                    offset: String(offset),
                });
                if (busqueda) parametros.set("fname", busqueda);
                const respuesta = await fetch(`${BASE_URL}/cardinfo.php?${parametros}`);
                if (!respuesta.ok) throw new Error("No se pudo conectar con la API de Yu-Gi-Oh");

                const json = await respuesta.json();
                const cartasDisponibles = json.data || [];

                // Se conservan solo los datos necesarios para las tarjetas.
                const listaConDetalles = cartasDisponibles.map((carta) => ({
                    id: carta.id,
                    name: carta.name,
                    type: carta.type,
                    attribute: carta.attribute,
                    race: carta.race,
                    atk: carta.atk,
                    def: carta.def,
                    desc: carta.desc,
                    episodio: carta.type,
                    image: carta.card_images?.[0]?.image_url,
                    precio: precioAleatorio(),
                }));

                if (activo) {
                    setPersonajes(listaConDetalles);
                    const totalCartas = json.meta?.total_rows || TOTAL_CARTAS;
                    setTotalPaginas(Math.max(1, Math.ceil(totalCartas / limit)));
                }
            } catch (err) {
                if (activo) setError(err.message);
            } finally {
                if (activo) setCargando(false);
            }
        }

        cargarCartas();
        return () => { activo = false; };
    }, [limit, page, busqueda]);

    return { personajes, cargando, error, totalPaginas };
}