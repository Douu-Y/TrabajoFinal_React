import ContactoForm from "./contactoForm";

function Contacto() {
return (
    <main className="theme-page min-h-screen">
    {/* Encabezado y formulario de contacto. */}
    <section className="contacto-hero theme-accent">
        <div className="max-w-3xl mx-auto px-6 py-5 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Contáctame
        </h1>
        <p className="theme-on-accent">
            ¿Tienes alguna pregunta, sugerencia o deseas comunicarte conmigo?
            Completa el siguiente formulario y recibiré tu mensaje directamente
            en mi correo electrónico.
        </p>
        </div>
    </section>

    <section className="contacto-form-section max-w-3xl mx-auto px-6 py-16">
        <div className="theme-surface theme-border rounded-2xl border shadow-lg p-8 md:p-10">
        <div className="mb-8 border-b theme-border pb-6">
            <h2 className="text-2xl font-bold">Envíame un mensaje</h2>
            <p className="theme-muted mt-2">
                Completa todos los campos para poder responderte.
            </p>
        </div>
        <ContactoForm />
        </div>
    </section>

    <footer className="contacto-footer theme-muted-surface">
        <div className="footer-layout max-w-3xl mx-auto">
            <div className="footer-brand">
                <p className="footer-title">React705</p>
                <p className="footer-subtitle">Aprendiendo desarrollo web moderno</p>
            </div>
            <div className="footer-links">
                <span>Contacto</span>
                <span>Soporte</span>
                <span>Aprendizaje</span>
            </div>
        </div>
    </footer>
    </main>
);
}

export default Contacto;