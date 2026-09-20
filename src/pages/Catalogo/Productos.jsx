import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCharacters } from "../../hooks/useCharacter";
import CharacterCard from "../../components/catalogo/CharacterCard";
import { useCart } from "../../context/CartContext";

function Productos() {
  const [pagina, setPagina] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const { personajes, cargando, error, totalPaginas } = useCharacters(12, pagina, busqueda);
  const { totalItems } = useCart();

  function cambiarPagina(nuevaPagina) {
    // Mantiene la pagina dentro de los limites de la consulta actual.
    setPagina(Math.min(Math.max(nuevaPagina, 1), totalPaginas));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function buscar(event) {
    // Nueva búsqueda: vuelve a la primera página.
    event.preventDefault();
    setPagina(1);
    setBusqueda(textoBusqueda.trim());
  }

  return (
    <section className="theme-page min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="catalogo-encabezado">
          <h2 className="text-3xl font-bold">Catálogo</h2>
          <p className="theme-muted mt-2">
            Cartas de Yu-Gi-Oh! disponibles en la tienda
          </p>
        </div>

        <form className="catalogo-busqueda theme-surface mt-6" onSubmit={buscar}>
          <input
            id="buscar-carta"
            type="search"
            value={textoBusqueda}
            onChange={(event) => {
              const texto = event.target.value;
              setTextoBusqueda(texto);
              if (!texto) {
                // Al borrar el campo se restaura el catálogo completo.
                setBusqueda("");
                setPagina(1);
              }
            }}
            placeholder="Nombre, tipo, atributo o arquetipo"
          />
          <button type="submit" title="Buscar cartas" aria-label="Buscar cartas">
            <Search size={18} />
          </button>
        </form>

        {cargando && <p className="theme-muted mt-10 text-center">Cargando catálogo...</p>}
        {error && <p className="mt-10 text-center text-rose-500">{error}</p>}

        {!cargando && !error && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                  gap-6">
            {personajes.map((personaje) => (
              <CharacterCard key={personaje.id} personaje={personaje} />
            ))}
          </div>
        )}

        {!cargando && !error && (
          <nav className="catalogo-paginacion mt-10 flex items-center justify-center gap-2" aria-label="Paginación del catálogo">
            <button
              type="button"
              onClick={() => cambiarPagina(pagina - 1)}
              disabled={pagina === 1}
              className="theme-surface theme-border inline-flex h-10 w-10 items-center justify-center rounded-lg border disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Página anterior"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="catalogo-paginas">
              {/* Muestra hasta cinco números cercanos a la página actual. */}
              {Array.from({ length: Math.min(totalPaginas, 5) }, (_, indice) => {
                const primeraPagina = Math.min(Math.max(pagina - 2, 1), Math.max(totalPaginas - 4, 1));
                const numero = primeraPagina + indice;
                return (
                  <button
                    key={numero}
                    type="button"
                    className={`theme-surface theme-border catalogo-numero ${numero === pagina ? "activo" : ""}`}
                    onClick={() => cambiarPagina(numero)}
                  >
                    {numero}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => cambiarPagina(pagina + 1)}
              disabled={pagina === totalPaginas}
              className="theme-surface theme-border inline-flex h-10 w-10 items-center justify-center rounded-lg border disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Página siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </nav>
        )}
      </div>

      <Link className="carrito-flotante" to="/carrito" aria-label={`Abrir carrito con ${totalItems} productos`}>
        <ShoppingCart size={22} />
        <span className="carrito-contador">{totalItems}</span>
      </Link>
    </section>
  );
}

export default Productos;
