import hero from "../../assets/hero.png";
import reactLogo from "../../assets/react.svg";
import viteLogo from "../../assets/vite.svg";
import reactRouter from "../../assets/react-router.svg";
import tailwindcss from "../../assets/Tailwind_CSS_Logo.svg.webp";

function Inicio() {
const tecnologias = [
    {
    nombre: "React",
    descripcion: "Biblioteca para construir interfaces de usuario.",
    imagen: reactLogo,
    },
    {
    nombre: "Vite",
    descripcion: "Herramienta moderna para desarrollar aplicaciones frontend.",
    imagen: viteLogo,
    },
    {
    nombre: "Tailwind CSS",
    descripcion: "Framework CSS basado en clases de utilidad.",
    imagen: tailwindcss,
    },
    {
    nombre: "React Router",
    descripcion: "Librería para gestionar la navegación de la aplicación.",
    imagen: reactRouter,
    },
];
return (
    <main className="theme-page min-h-screen transition-colors">
        {/* Presentacion principal del proyecto. */}
        <section className="inicio-hero theme-accent">
        <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center">
            <img
            src={hero}
            alt="React705"
            className="w-40 h-40 object-contain mb-8"
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ¡Bienvenidos a React705!
            </h1>
            <p className="theme-on-accent max-w-3xl text-lg md:text-xl mb-8">
            Un espacio creado para aprender a desarrollar aplicaciones
            web modernas utilizando React y Vite.
            </p>
            <p className="theme-on-accent max-w-3xl mb-8">
            Durante este proyecto exploraremos componentes, navegación,
            consumo de APIs, estilos y diferentes herramientas del
            ecosistema de React.
            </p>
            <button
            className="
                theme-surface
                font-semibold
                px-8
                py-3
                rounded-lg
                transition
                duration-300
            "
            >
            Comenzar a aprender
            </button>
        </div>
        </div>
    </section>

    {/* Tecnologias usadas en el proyecto. */}
    <section className="inicio-seccion-tecnologias max-w-6xl px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Tecnologías utilizadas
        </h2>
        <p className="theme-muted text-center max-w-2xl mx-auto mb-12">
        Este proyecto integra diferentes tecnologías y librerías
        utilizadas actualmente en el desarrollo frontend.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tecnologias.map((tecnologia) => (
                <div
                    key={tecnologia.nombre}
                    className="
                    theme-surface
                    rounded-2xl
                    shadow-lg
                    p-6
                    text-center
                    "
                >  
                    <div className="h-24 flex items-center justify-center mb-5">
                        <img
                            src={tecnologia.imagen}
                            alt={tecnologia.nombre}
                        
                            className="max-h-16 max-w-full w-auto object-contain"
                        />
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                        {tecnologia.nombre}
                    </h3>
                    <p className="theme-muted text-sm">
                        {tecnologia.descripcion}
                    </p>
                </div>
            ))}
        </div>
    </section>
    {/* Temas que se practican en la aplicacion. */}
    <section className="inicio-seccion-aprendizaje theme-muted-surface">
        <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
            ¿Qué aprenderemos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="theme-surface p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">
                Componentes
            </h3>
            <p className="theme-muted">
                Aprenderemos a dividir nuestra aplicación en componentes
                reutilizables.
            </p>
            </div>
            <div className="theme-surface p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">
                Navegación
            </h3>
            <p className="theme-muted">
                Utilizaremos React Router para crear diferentes páginas
                dentro de nuestra aplicación.
            </p>
            </div>
            <div className="theme-surface p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">
                APIs
            </h3>
            <p className="theme-muted">
                Aprenderemos a consumir información desde servicios
                externos mediante APIs.
            </p>
            </div>
            <div className="theme-surface p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-2">
                Tailwind CSS
            </h3>
            <p className="theme-muted">
                Construiremos interfaces modernas utilizando clases
                de utilidad.
            </p>
            </div>
        </div>
        </div>
    </section>
    {/* FOOTER */}
    <footer className="inicio-footer theme-muted-surface">
        <div className="footer-layout max-w-6xl mx-auto">
            <div className="footer-brand">
                <p className="footer-title">React705</p>
                <p className="footer-subtitle">Aprendiendo desarrollo web moderno</p>
            </div>
            <div className="footer-links">
                <span>React</span>
                <span>Vite</span>
                <span>CSS</span>
            </div>
        </div>
    </footer>
    </main>
);
}
export default Inicio;
