
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

// ==========================================
// COMPONENTES DE LA INVITACIÓN
// ==========================================

import Portada from "./componentes-encabezado/portada";
import PaginaPrincipal from "./PaginaPrincipal";

// ==========================================
// PÁGINA DEL GENERADOR
// ==========================================

import Generador from "./pages/Generador";

// ==========================================
// CONTROL DE RUTAS
// ==========================================

const rutaActual = window.location.pathname
  .replace(/\/+$/, "") || "/";

const esGenerador = rutaActual === "/generador";

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

function App() {
  if (esGenerador) {
    return <Generador />;
  }

  return (
    <main>
      <Portada />
      <PaginaPrincipal />
    </main>
  );
}

// ==========================================
// RENDERIZADO
// ==========================================

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
