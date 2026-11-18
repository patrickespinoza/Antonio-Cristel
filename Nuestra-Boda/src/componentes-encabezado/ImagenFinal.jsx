
import React from "react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  imagen: "/final.jpg",

  inicialNovio: "A",
  inicialNovia: "C",

  // ========================================
  // POSICIÓN DE LA FOTOGRAFÍA
  // ========================================

  imagenPosicion: {
    movil: "50% 50%",
    tablet: "50% 50%",
    escritorio: "50% 25%",
  },

  // ========================================
  // POSICIÓN DE LAS INICIALES
  // ========================================

  inicialesPosicion: {
    // Distancia desde abajo
    bottomMovil: "9%",
    bottomEscritorio: "10%",

    // Ajustes adicionales
    moverX: "0px",
    moverY: "0px",
  },

  // ========================================
  // ESTILO
  // ========================================

  colorTexto: "#FFFFFF",

  sombraTexto:
    "0 3px 18px rgba(0,0,0,0.85), 0 1px 5px rgba(0,0,0,0.7)",

  // Sombra únicamente en la parte inferior
  sombraInferior: {
    activa: true,
    intensidad: 0.48,
    altura: "35%",
  },
};

// ==========================================
// COMPONENTE FINAL
// ==========================================

export default function FinalBoda() {
  return (
    <section
      id="final-boda"
      className="
        relative
        h-[100svh]
        min-h-[600px]
        w-full
        overflow-hidden
        bg-[#211A25]
      "
    >
      {/* POSICIONES RESPONSIVAS */}
      <style>
        {`
          .wedly-final-imagen {
            object-position:
              ${CONFIG.imagenPosicion.movil};
          }

          .wedly-final-iniciales {
            bottom:
              ${CONFIG.inicialesPosicion.bottomMovil};
          }

          @media (min-width: 640px) {
            .wedly-final-imagen {
              object-position:
                ${CONFIG.imagenPosicion.tablet};
            }
          }

          @media (min-width: 1024px) {
            .wedly-final-imagen {
              object-position:
                ${CONFIG.imagenPosicion.escritorio};
            }

            .wedly-final-iniciales {
              bottom:
                ${CONFIG.inicialesPosicion.bottomEscritorio};
            }
          }
        `}
      </style>

      {/* ======================================
          FOTOGRAFÍA
      ====================================== */}

      <img
        src={CONFIG.imagen}
        alt="Antonio y Cristel"
        className="
          wedly-final-imagen
          absolute inset-0
          h-full w-full
          object-cover
        "
      />

      {/* ======================================
          SOMBRA INFERIOR SUAVE
      ====================================== */}

      {CONFIG.sombraInferior.activa && (
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute bottom-0 left-0
            z-[1] w-full
          "
          style={{
            height: CONFIG.sombraInferior.altura,
            background: `linear-gradient(
              to top,
              rgba(0,0,0,${CONFIG.sombraInferior.intensidad}),
              transparent
            )`,
          }}
        />
      )}

      {/* ======================================
          INICIALES A & C
      ====================================== */}

      <div
        className="
          wedly-final-iniciales
          absolute left-0 z-10
          flex w-full
          items-center justify-center
          px-5
          text-center
        "
        style={{
          transform: `translate(
            ${CONFIG.inicialesPosicion.moverX},
            ${CONFIG.inicialesPosicion.moverY}
          )`,
        }}
      >
        <h2
          className="
            flex items-center
            justify-center
            gap-3
            font-playfair
            text-[clamp(65px,13vw,135px)]
            font-normal
            leading-none
            tracking-[-0.04em]
            sm:gap-6
          "
          style={{
            color: CONFIG.colorTexto,
            textShadow: CONFIG.sombraTexto,
          }}
        >
          <span>{CONFIG.inicialNovio}</span>

          <span
            className="
              font-normal italic
              text-[0.65em]
            "
          >
            &
          </span>

          <span>{CONFIG.inicialNovia}</span>
        </h2>
      </div>
    </section>
  );
}
