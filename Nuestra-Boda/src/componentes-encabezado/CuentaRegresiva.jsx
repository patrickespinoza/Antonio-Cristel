
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Heart } from "lucide-react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  fecha: "2026-12-26T00:00:00-06:00",
  nombres: "Antonio & Cristel",
  titulo: "Falta poco",
  subtitulo: "PARA NUESTRO GRAN DÍA",
  fechaTexto: "26 DE DICIEMBRE DE 2026",

  // ========================================
  // CONFIGURACIÓN DE FLORES
  // ========================================

  flores: {
    imagen: "/flores.png",

    // Activar o desactivar flores
    mostrar: true,

    // Opacidad de las flores
    opacidad: 0.85,

    // Tamaños responsivos
    anchoMovil: "145px",
    anchoTablet: "220px",
    anchoEscritorio: "310px",

    // Distancia respecto a las esquinas
    desplazamientoMovil: "-15px",
    desplazamientoEscritorio: "-25px",
  },
};

// ==========================================
// CALCULAR TIEMPO RESTANTE
// ==========================================

const calcularTiempo = () => {
  const diferencia =
    new Date(CONFIG.fecha).getTime() - Date.now();

  if (diferencia <= 0) {
    return {
      dias: 0,
      horas: 0,
      minutos: 0,
      segundos: 0,
      terminado: true,
    };
  }

  return {
    dias: Math.floor(diferencia / 86400000),
    horas: Math.floor((diferencia / 3600000) % 24),
    minutos: Math.floor((diferencia / 60000) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
    terminado: false,
  };
};

// ==========================================
// TARJETA DE TIEMPO
// ==========================================

const TarjetaTiempo = ({
  valor,
  etiqueta,
  indice,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: indice * 0.12,
      }}
      className={`
        relative flex min-w-0
        flex-col items-center justify-center
        rounded-[16px]
        px-1 py-5
        sm:py-7
        ${
          indice === 0
            ? "bg-[#80658F] text-white"
            : "bg-[#F0E7F3] text-[#211A25]"
        }
      `}
    >
      {/* NÚMERO */}
      <span
        className="
          font-playfair
          text-[37px]
          font-normal
          leading-none
          tabular-nums
          sm:text-[50px]
          md:text-[65px]
        "
      >
        {String(valor).padStart(2, "0")}
      </span>

      {/* LÍNEA */}
      <div
        className={`
          my-3 h-px w-7
          ${
            indice === 0
              ? "bg-white/70"
              : "bg-[#BDA4C9]"
          }
        `}
      />

      {/* ETIQUETA */}
      <span
        className="
          text-[9px]
          font-medium
          uppercase
          tracking-[0.08em]
          sm:text-[11px]
        "
      >
        {etiqueta}
      </span>
    </motion.div>
  );
};

// ==========================================
// DECORACIÓN FLORAL
// ==========================================

const FloresEsquinas = () => {
  if (!CONFIG.flores.mostrar) {
    return null;
  }

  const esquinas = [
    {
      nombre: "superior-izquierda",
      posicion: "top-0 left-0",
      rotacion: "rotate-240",
    },
    {
      nombre: "superior-derecha",
      posicion: "top-0 right-0",
      rotacion: "rotate-0",
    },
    {
      nombre: "inferior-izquierda",
      posicion: "bottom-0 left-0",
      rotacion: "rotate-180",
    },
    {
      nombre: "inferior-derecha",
      posicion: "bottom-0 right-0",
      rotacion: "rotate-90",
    },
  ];

  return (
    <>
      <style>
        {`
          .wedly-flor-esquina {
            position: absolute;
            width: ${CONFIG.flores.anchoMovil};
            height: auto;
            pointer-events: none;
            user-select: none;
            opacity: ${CONFIG.flores.opacidad};
          }

          .wedly-flor-esquina img {
            display: block;
            width: 100%;
            height: auto;
          }

          @media (min-width: 640px) {
            .wedly-flor-esquina {
              width: ${CONFIG.flores.anchoTablet};
            }
          }

          @media (min-width: 1024px) {
            .wedly-flor-esquina {
              width: ${CONFIG.flores.anchoEscritorio};
            }
          }
        `}
      </style>

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          z-0 overflow-hidden
        "
      >
        {esquinas.map((esquina) => (
          <div
            key={esquina.nombre}
            className={`
              wedly-flor-esquina
              ${esquina.posicion}
            `}
          >
            <img
              src={CONFIG.flores.imagen}
              alt=""
              draggable="false"
              className={esquina.rotacion}
            />
          </div>
        ))}
      </div>
    </>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function CuentaRegresiva() {
  const [tiempo, setTiempo] = useState(calcularTiempo);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempo(calcularTiempo());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const unidades = [
    {
      etiqueta: "DÍAS",
      valor: tiempo.dias,
    },
    {
      etiqueta: "HORAS",
      valor: tiempo.horas,
    },
    {
      etiqueta: "MINUTOS",
      valor: tiempo.minutos,
    },
    {
      etiqueta: "SEGUNDOS",
      valor: tiempo.segundos,
    },
  ];

  return (
    <section
      id="cuenta-regresiva"
      className="
        relative w-full
        overflow-hidden
        bg-white
        px-5
        py-24
        sm:py-28
        md:py-36
      "
    >
      {/* ======================================
          FLORES EN LAS CUATRO ESQUINAS
      ====================================== */}

      <FloresEsquinas />

      {/* ======================================
          CONTENIDO PRINCIPAL
      ====================================== */}

      <div
        className="
          relative z-10
          mx-auto flex
          w-full max-w-[760px]
          flex-col items-center
          text-center
        "
      >
        {/* ======================================
            ICONO SUPERIOR
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            mb-8 flex
            h-[70px] w-[70px]
            items-center justify-center
            rounded-full
            border border-[#C8AA78]
            bg-white
          "
        >
          <CalendarDays
            size={31}
            strokeWidth={1.2}
            className="text-[#765587]"
          />
        </motion.div>

        {/* ======================================
            TÍTULO
        ====================================== */}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            font-playfair
            text-[49px]
            font-normal
            leading-tight
            text-[#211A25]
            sm:text-[65px]
            md:text-[80px]
          "
        >
          {CONFIG.titulo}
        </motion.h2>

        {/* ======================================
            SUBTÍTULO
        ====================================== */}

        <p
          className="
            mt-3
            text-[10px]
            font-medium
            uppercase
            tracking-[0.24em]
            text-[#5B4A63]
            sm:text-[13px]
          "
        >
          {CONFIG.subtitulo}
        </p>

        {/* ======================================
            ORNAMENTO
        ====================================== */}

        <div
          className="
            my-9 flex
            items-center gap-4
          "
        >
          <span className="h-px w-12 bg-[#C8AA78]" />

          <Heart
            size={16}
            strokeWidth={1.3}
            className="text-[#80658F]"
          />

          <span className="h-px w-12 bg-[#C8AA78]" />
        </div>

        {/* ======================================
            CONTADOR
        ====================================== */}

        {tiempo.terminado ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              w-full
              rounded-[20px]
              bg-[#F0E7F3]
              px-6 py-10
            "
          >
            <p
              className="
                font-playfair
                text-3xl
                text-[#634B73]
                sm:text-4xl
              "
            >
              ¡Llegó nuestro gran día!
            </p>
          </motion.div>
        ) : (
          <div
            className="
              grid w-full
              grid-cols-4
              gap-2
              sm:gap-4
            "
            role="timer"
            aria-label="Tiempo restante para la boda"
          >
            {unidades.map((unidad, indice) => (
              <TarjetaTiempo
                key={unidad.etiqueta}
                indice={indice}
                valor={unidad.valor}
                etiqueta={unidad.etiqueta}
              />
            ))}
          </div>
        )}

        {/* ======================================
            MENSAJE INFERIOR
        ====================================== */}

        <p
          className="
            mt-8
            max-w-[320px]
            font-playfair
            text-[17px]
            italic
            leading-relaxed
            text-[#80658F]
            sm:text-[20px]
          "
        >
          Cada segundo nos acerca
          <br />
          a nuestro para siempre.
        </p>

        {/* ======================================
            DIVISOR INFERIOR
        ====================================== */}

        <div
          className="
            mt-10 flex
            items-center gap-3
          "
        >
          <span className="h-px w-8 bg-[#C8AA78]" />

          <span
            className="
              h-[5px] w-[5px]
              rotate-45
              bg-[#C8AA78]
            "
          />

          <span className="h-px w-8 bg-[#C8AA78]" />
        </div>
      </div>
    </section>
  );
}
