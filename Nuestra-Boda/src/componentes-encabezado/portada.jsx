
import React from "react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  imagen: "/portada.jpg",

  titulo: "Nuestra Boda",

  novio: "Antonio",
  novia: "Cristel",

  fecha: "26 DE DICIEMBRE DE 2026",

  // ========================================
  // POSICIÓN DE LA FOTOGRAFÍA
  // ========================================

  imagenPosicion: {
    // Encuadre para celulares
    movil: "52% 50%",

    // Encuadre para tablets
    tablet: "50% 50%",

    // Encuadre para computadoras
    escritorio: "50% 28%",
  },

  // ========================================
  // POSICIÓN DEL TÍTULO SUPERIOR
  // ========================================

  tituloPosicion: {
    // Distancia desde arriba
    topMovil: "8%",
    topEscritorio: "8%",

    // Movimiento horizontal
    // 0px = centrado
    moverX: "0px",

    // Movimiento vertical adicional
    moverY: "0px",
  },

  // ========================================
  // POSICIÓN DE NOMBRES Y FECHA
  // ========================================

  nombresPosicion: {
    // Distancia desde abajo
    bottomMovil: "7%",
    bottomEscritorio: "8%",

    // Movimiento horizontal
    moverX: "0px",

    // Movimiento vertical adicional
    moverY: "0px",
  },

  // ========================================
  // ESTILO DEL TEXTO
  // ========================================

  texto: {
    color: "#FFFFFF",

    // Sombras para mejorar legibilidad
    sombraTitulo:
      "0 2px 12px rgba(0,0,0,0.65), 0 1px 3px rgba(0,0,0,0.7)",

    sombraNombres:
      "0 3px 20px rgba(0,0,0,0.8), 0 2px 5px rgba(0,0,0,0.65)",

    sombraFecha:
      "0 2px 10px rgba(0,0,0,0.8)",
  },

  // ========================================
  // SOMBRA DETRÁS DEL TEXTO INFERIOR
  // ========================================

  degradadoInferior: {
    activo: true,

    // Intensidad de 0 a 1
    intensidad: 0.55,

    // Altura que ocupa desde abajo
    altura: "48%",
  },
};

// ==========================================
// COMPONENTE PORTADA
// ==========================================

export default function Portada() {
  return (
    <section
      id="inicio"
      className="
        relative
        h-[100svh]
        min-h-[600px]
        w-full
        overflow-hidden
        bg-[#211A25]
      "
    >
      {/* ======================================
          ESTILOS RESPONSIVOS
      ====================================== */}

      <style>
        {`
          .wedly-portada-imagen {
            object-position:
              ${CONFIG.imagenPosicion.movil};
          }

          .wedly-portada-titulo {
            top:
              ${CONFIG.tituloPosicion.topMovil};
          }

          .wedly-portada-nombres {
            bottom:
              ${CONFIG.nombresPosicion.bottomMovil};
          }

          @media (min-width: 640px) {
            .wedly-portada-imagen {
              object-position:
                ${CONFIG.imagenPosicion.tablet};
            }
          }

          @media (min-width: 1024px) {
            .wedly-portada-imagen {
              object-position:
                ${CONFIG.imagenPosicion.escritorio};
            }

            .wedly-portada-titulo {
              top:
                ${CONFIG.tituloPosicion.topEscritorio};
            }

            .wedly-portada-nombres {
              bottom:
                ${CONFIG.nombresPosicion.bottomEscritorio};
            }
          }
        `}
      </style>

      {/* ======================================
          FOTOGRAFÍA ORIGINAL
      ====================================== */}

      <img
        src={CONFIG.imagen}
        alt={`Fotografía de ${CONFIG.novio} y ${CONFIG.novia}`}
        className="
          wedly-portada-imagen
          absolute inset-0
          h-full w-full
          object-cover
        "
      />

      {/* ======================================
          SOMBRA INFERIOR SUTIL
          NO MODIFICA LA FOTO ORIGINAL
      ====================================== */}

      {CONFIG.degradadoInferior.activo && (
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute bottom-0 left-0
            z-[1] w-full
          "
          style={{
            height:
              CONFIG.degradadoInferior.altura,

            background: `
              linear-gradient(
                to top,
                rgba(
                  0, 0, 0,
                  ${CONFIG.degradadoInferior.intensidad}
                ) 0%,
                rgba(
                  0, 0, 0,
                  ${
                    CONFIG.degradadoInferior.intensidad *
                    0.45
                  }
                ) 45%,
                transparent 100%
              )
            `,
          }}
        />
      )}

      {/* ======================================
          TÍTULO SUPERIOR
      ====================================== */}

      <div
        className="
          wedly-portada-titulo
          absolute left-0
          z-10
          flex w-full
          justify-center
          px-5
          text-center
        "
        style={{
          transform: `
            translate(
              ${CONFIG.tituloPosicion.moverX},
              ${CONFIG.tituloPosicion.moverY}
            )
          `,
        }}
      >
        <p
          className="
            font-playfair
            text-[28px]
            font-normal
            tracking-[0.08em]
            sm:text-[36px]
            md:text-[44px]
          "
          style={{
            color: CONFIG.texto.color,
            textShadow:
              CONFIG.texto.sombraTitulo,
          }}
        >
          {CONFIG.titulo}
        </p>
      </div>

      {/* ======================================
          NOMBRES Y FECHA
      ====================================== */}

      <div
        className="
          wedly-portada-nombres
          absolute left-0
          z-10
          flex w-full
          flex-col
          items-center
          px-4
          text-center
          sm:px-6
        "
        style={{
          transform: `
            translate(
              ${CONFIG.nombresPosicion.moverX},
              ${CONFIG.nombresPosicion.moverY}
            )
          `,
        }}
      >
        {/* PEQUEÑO DETALLE SUPERIOR */}
        <p
          className="
            mb-5
            text-[10px]
            font-medium
            uppercase
            tracking-[0.35em]
            sm:text-[12px]
          "
          style={{
            color: CONFIG.texto.color,
            textShadow:
              CONFIG.texto.sombraFecha,
          }}
        >
          CELEBRAMOS NUESTRO AMOR
        </p>

        {/* ==================================
            NOMBRES
        ================================== */}

        <h1
          className="
            flex flex-wrap
            items-center
            justify-center
            gap-x-2
            font-playfair
            text-[clamp(36px,8vw,90px)]
            font-normal
            leading-[1.15]
            tracking-[-0.035em]
            sm:gap-x-4
          "
          style={{
            color: CONFIG.texto.color,
            textShadow:
              CONFIG.texto.sombraNombres,
          }}
        >
          <span>{CONFIG.novio}</span>

          <span
            className="
              font-playfair
              font-normal
              italic
            "
          >
            &
          </span>

          <span>{CONFIG.novia}</span>
        </h1>

        {/* ==================================
            LÍNEA DECORATIVA
        ================================== */}

        <div
          className="
            my-6
            h-px w-20
            sm:w-28
          "
          style={{
            backgroundColor:
              "rgba(255,255,255,0.9)",

            boxShadow:
              "0 1px 5px rgba(0,0,0,0.45)",
          }}
        />

        {/* ==================================
            FECHA
        ================================== */}

        <p
          className="
            text-[11px]
            font-medium
            uppercase
            tracking-[0.18em]
            sm:text-[14px]
            sm:tracking-[0.28em]
            md:text-[16px]
          "
          style={{
            color: CONFIG.texto.color,
            textShadow:
              CONFIG.texto.sombraFecha,
          }}
        >
          {CONFIG.fecha}
        </p>
      </div>
    </section>
  );
}
