import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Layout from './components/layout/layout.jsx';
import Inicio from "./pages/Inicio/Inicio.jsx";
import Escenario from './pages/escenario/Escenario.jsx';
import Catalogo from "./pages/Catalogo/Productos.jsx";
import Contacto from "./pages/Contacto/Contacto.jsx";
import Perfil from './components/auth/perfil.jsx';
import Carrito from './pages/Carrito/Carrito.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    // Estos proveedores comparten tema y carrito entre todas las rutas.
    <ThemeProvider>
    <CartProvider>
    <AuthProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
              <Route
                path="/"
                element={<Inicio />}
              />
              <Route
                path="/Escenario"
                element={<Escenario />}
              />
              <Route
                path="/catalogo"
                element={<Catalogo />}
              />
              <Route
                path="/contacto"
                element={<Contacto />}
              />
                <Route
                  path="/perfil"
                  element={<Perfil />}
                />
                <Route
                  path="/carrito"
                  element={<Carrito />}
                />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </BrowserRouter>
    </AuthProvider>
    </CartProvider>
    </ThemeProvider>
  )
}

export default App