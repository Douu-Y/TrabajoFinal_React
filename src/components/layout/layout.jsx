import Header from "./cabecera";
import Barra from "./nav";

function Layout({ children }) {
    return (
        <div className="layout-principal">
            {/* Header y navbar se mantienen visibles en todas las paginas. */}
            <Header/>
            <Barra/>
            <main>
                {children}
            </main>
        </div>
    );
}

export default Layout;