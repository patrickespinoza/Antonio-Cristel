
import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  novio: "Antonio",
  novia: "Cristel",

  padresNovio: [
    "Guadalupe Hernández Manzur",
    "Horacio Plancarte Cortez",
  ],

  padresNovia: [
    "Isabel Guerra náhuatt",
    "Abraham Montejo de la cruz",
  ],

  mensaje: "Con la bendición de nuestros padres",

  // ========================================
  // FLORES INFERIORES
  // ========================================

  flores: {
    imagen: "/flores.png",

    mostrar: true,

    // Tamaño según dispositivo
    anchoMovil: "145px",
    anchoTablet: "220px",
    anchoEscritorio: "310px",

    // Distancia desde los bordes
    // Los valores negativos las desplazan
    // parcialmente fuera de la sección.
    lateralMovil: "-10px",
    lateralEscritorio: "-5px",

    inferiorMovil: "-0px",
    inferiorEscritorio: "-15px",

    opacidad: 0.9,
  },
};

// ==========================================
// ANIMACIONES
// ==========================================

const aparecer = {
  oculto: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

// ==========================================
// FLORES DECORATIVAS INFERIORES
// ==========================================

const FloresInferiores = () => {
  if (!CONFIG.flores.mostrar) {
    return null;
  }

  return (
    <>
      <style>
        {`
          .wedly-padres-flor {
            position: absolute;
            bottom: ${CONFIG.flores.inferiorMovil};
            width: ${CONFIG.flores.anchoMovil};
            height: auto;
            opacity: ${CONFIG.flores.opacidad};
            pointer-events: none;
            user-select: none;
          }

          .wedly-padres-flor-izquierda {
            left: ${CONFIG.flores.lateralMovil};
            transform: rotate(180deg);
            transform-origin: center;
          }

          .wedly-padres-flor-derecha {
            right: ${CONFIG.flores.lateralMovil};
            transform: rotate(90deg);
            transform-origin: center;
          }

          @media (min-width: 640px) {
            .wedly-padres-flor {
              width: ${CONFIG.flores.anchoTablet};
            }
          }

          @media (min-width: 1024px) {
            .wedly-padres-flor {
              width: ${CONFIG.flores.anchoEscritorio};
              bottom: ${CONFIG.flores.inferiorEscritorio};
            }

            .wedly-padres-flor-izquierda {
              left: ${CONFIG.flores.lateralEscritorio};
            }

            .wedly-padres-flor-derecha {
              right: ${CONFIG.flores.lateralEscritorio};
            }
          }
        `}
      </style>

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          z-0
          overflow-hidden
        "
      >
        {/* FLOR INFERIOR IZQUIERDA */}
        <img
          src={CONFIG.flores.imagen}
          alt=""
          draggable="false"
          className="
            wedly-padres-flor
            wedly-padres-flor-izquierda
          "
        />

        {/* FLOR INFERIOR DERECHA */}
        <img
          src={CONFIG.flores.imagen}
          alt=""
          draggable="false"
          className="
            wedly-padres-flor
            wedly-padres-flor-derecha
          "
        />
      </div>
    </>
  );
};

// ==========================================
// BLOQUE DE PADRES
// ==========================================

const BloquePadres = ({
  titulo,
  nombres,
  delay = 0,
}) => {
  return (
    <motion.div
      variants={aparecer}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut",
      }}
      className="
        flex w-full
        flex-col items-center
        px-3 py-9
        text-center
        sm:px-7
      "
    >
      {/* ORNAMENTO SUPERIOR */}
      <div
        className="
          mb-7 flex
          items-center gap-3
        "
      >
        <span className="h-px w-9 bg-[#C8AA78]" />

        <span
          className="
            h-[5px] w-[5px]
            rotate-45
            bg-[#8B709A]
          "
        />

        <span className="h-px w-9 bg-[#C8AA78]" />
      </div>

      {/* TÍTULO */}
      <h3
        className="
          mb-8
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.22em]
          text-[#765587]
          sm:text-[13px]
        "
      >
        {titulo}
      </h3>

      {/* NOMBRES */}
      <div
        className="
          flex flex-col
          items-center gap-5
        "
      >
        {nombres.map((nombre, index) => (
          <React.Fragment key={index}>
            <p
              className="
                max-w-[320px]
                font-playfair
                text-[24px]
                font-normal
                leading-[1.4]
                text-[#211A25]
                sm:text-[28px]
                md:text-[30px]
              "
            >
              {nombre}
            </p>

            {index < nombres.length - 1 && (
              <span
                className="
                  font-playfair
                  text-[26px]
                  italic
                  text-[#8B709A]
                "
              >
                &
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Novios() {
  return (
    <section
      id="padres"
      className="
        relative w-full
        overflow-hidden
        bg-white
        px-5
        pt-20 pb-28
        sm:px-8
        sm:pt-28 sm:pb-36
        md:pt-32 md:pb-44
      "
    >
      {/* ======================================
          FLORES INFERIORES
      ====================================== */}

      <FloresInferiores />

      {/* ======================================
          LÍNEA DECORATIVA SUPERIOR
      ====================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-0
          h-16 w-px
          -translate-x-1/2
          bg-[#C8AA78]
        "
      />

      {/* ======================================
          CONTENIDO
      ====================================== */}

      <div
        className="
          relative z-10
          mx-auto flex
          w-full max-w-5xl
          flex-col items-center
          text-center
        "
      >
        {/* ETIQUETA SUPERIOR */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            mb-6
            text-[11px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-[#765587]
          "
        >
          NUESTRA BODA
        </motion.p>

        {/* ======================================
            NOMBRES DE LOS NOVIOS
        ====================================== */}

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: 0.1,
          }}
          className="
            font-playfair
            text-[43px]
            font-normal
            leading-tight
            text-[#211A25]
            sm:text-[62px]
            md:text-[80px]
          "
        >
          {CONFIG.novio}

          <span
            className="
              mx-3
              font-playfair
              italic
              text-[#8B709A]
              sm:mx-5
            "
          >
            &
          </span>

          {CONFIG.novia}
        </motion.h2>

        {/* ======================================
            DIVISOR
        ====================================== */}

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 100 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
          className="
            mt-9 h-px
            bg-[#C8AA78]
          "
        />

        {/* ======================================
            MENSAJE DE BENDICIÓN
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="
            mt-10
            flex flex-col
            items-center
            gap-5
          "
        >
          <Heart
            size={24}
            strokeWidth={1.2}
            className="text-[#8B709A]"
          />

          <p
            className="
              max-w-[460px]
              font-playfair
              text-[25px]
              italic
              leading-relaxed
              text-[#211A25]
              sm:text-[31px]
            "
          >
            {CONFIG.mensaje}
          </p>
        </motion.div>

        {/* ======================================
            SEPARADOR PRINCIPAL
        ====================================== */}

        <div
          className="
            mt-12 h-px
            w-full max-w-[760px]
            bg-[#E5D8EA]
            sm:mt-16
          "
        />

        {/* ======================================
            PADRES
        ====================================== */}

        <div
          className="
            mt-5 grid
            w-full max-w-[900px]
            grid-cols-1
            items-start
            gap-2
            md:grid-cols-2
            md:gap-0
          "
        >
          {/* PADRES DEL NOVIO */}
          <BloquePadres
            titulo="Padres del Novio"
            nombres={CONFIG.padresNovio}
            delay={0.2}
          />

          {/* PADRES DE LA NOVIA */}
          <div className="relative">
            {/* SEPARADOR VERTICAL */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute left-0 top-9
                hidden h-[75%] w-px
                bg-[#E5D8EA]
                md:block
              "
            />

            <BloquePadres
              titulo="Padres de la Novia"
              nombres={CONFIG.padresNovia}
              delay={0.35}
            />
          </div>
        </div>

        {/* ======================================
            ORNAMENTO FINAL
        ====================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className="
            mt-10
            flex items-center
            gap-4
            sm:mt-14
          "
        >
          <span className="h-px w-12 bg-[#C8AA78]" />

          <Heart
            size={17}
            strokeWidth={1.2}
            className="text-[#8B709A]"
          />

          <span className="h-px w-12 bg-[#C8AA78]" />
        </motion.div>
      </div>
    </section>
  );
}
