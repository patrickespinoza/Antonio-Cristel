
import React from "react";
import { motion } from "framer-motion";
import {
  Church,
  Wine,
  Heart,
  UtensilsCrossed,
  Mic2,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const eventos = [
  {
    titulo: "Boda Religiosa",
    hora: "6:00 PM",
    descripcion: "Ceremonia religiosa",
    icono: Church,
  },
  {
    titulo: "Recepción",
    hora: "7:00 PM",
    descripcion: "Palapa Los Laureles",
    icono: Wine,
  },
  {
    titulo: "Presentación de los Novios",
    hora: "8:00 PM",
    descripcion: "Bienvenida a los recién casados",
    icono: Heart,
  },
  {
    titulo: "Cena",
    hora: "8:30 PM",
    descripcion: "Compartamos una cena especial",
    icono: UtensilsCrossed,
  },
  {
    titulo: "Palabras y Discursos",
    hora: "9:00 PM",
    descripcion: "Mensajes para los novios",
    icono: Mic2,
  },
];

// ==========================================
// ANIMACIONES
// ==========================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ==========================================
// EVENTO DE LA LÍNEA DE TIEMPO
// ==========================================

const EventoItinerario = ({ evento, index }) => {
  const Icono = evento.icono;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1 }}
      className="
        relative grid
        grid-cols-[65px_1fr]
        gap-5
        pb-12
        last:pb-0
        sm:grid-cols-[90px_1fr]
        sm:gap-8
      "
    >
      {/* COLUMNA DEL ÍCONO */}
      <div
        className="
          relative z-10
          flex flex-col
          items-center
        "
      >
        {/* CÍRCULO */}
        <div
          className="
            flex h-[62px] w-[62px]
            items-center justify-center
            rounded-full
            border border-[#D7C5DE]
            bg-[#F4EFF6]
            sm:h-[76px] sm:w-[76px]
          "
        >
          <Icono
            size={27}
            strokeWidth={1.3}
            className="text-[#765587]"
          />
        </div>
      </div>

      {/* INFORMACIÓN */}
      <div
        className="
          flex flex-col
          items-start
          pt-1
          text-left
          sm:pt-2
        "
      >
        {/* HORA */}
        <p
          className="
            mb-2
            text-[12px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-[#765587]
            sm:text-[13px]
          "
        >
          {evento.hora}
        </p>

        {/* TÍTULO */}
        <h3
          className="
            font-playfair
            text-[25px]
            font-normal
            leading-tight
            text-[#211A25]
            sm:text-[31px]
          "
        >
          {evento.titulo}
        </h3>

        {/* DESCRIPCIÓN */}
        <p
          className="
            mt-3
            text-[13px]
            leading-relaxed
            text-[#6F6573]
            sm:text-[15px]
          "
        >
          {evento.descripcion}
        </p>

        {/* LÍNEA DECORATIVA */}
        <div
          className="
            mt-5
            h-px w-16
            bg-[#C8AA78]
          "
        />
      </div>
    </motion.div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Itinerario2() {
  return (
    <section
      id="itinerario"
      className="
        relative w-full
        overflow-hidden
        bg-[#FAEEDD]
        px-5 py-20
        sm:px-8 sm:py-28
        lg:py-32
      "
    >
      <div
        className="
          relative z-10
          mx-auto w-full
          max-w-[850px]
        "
      >
        {/* ENCABEZADO */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            mb-16
            flex flex-col
            items-center
            text-center
            sm:mb-20
          "
        >
          {/* ETIQUETA */}
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#765587]
            "
          >
            NUESTRO DÍA
          </p>

          {/* TÍTULO */}
          <h2
            className="
              mt-5
              font-playfair
              text-[48px]
              font-normal
              text-[#211A25]
              sm:text-[65px]
              md:text-[75px]
            "
          >
            Itinerario
          </h2>

          {/* DIVISOR */}
          <div
            className="
              mt-6
              flex items-center
              gap-3
            "
          >
            <span className="h-px w-12 bg-[#C8AA78]" />
            <span className="h-[6px] w-[6px] rotate-45 bg-[#8B709A]" />
            <span className="h-px w-12 bg-[#C8AA78]" />
          </div>

          {/* TEXTO */}
          <p
            className="
              mt-7
              max-w-[400px]
              font-playfair
              text-[20px]
              italic
              leading-relaxed
              text-[#765587]
              sm:text-[24px]
            "
          >
            Cada momento de este día
            será parte de nuestra historia.
          </p>
        </motion.div>

        {/* LÍNEA DE TIEMPO */}
        <div
          className="
            relative
            mx-auto
            w-full
            max-w-[650px]
          "
        >
          {/* LÍNEA VERTICAL */}
          <div
            aria-hidden="true"
            className="
              absolute
              left-[31px] top-8
              bottom-8
              w-px
              bg-[#D7C5DE]
              sm:left-[37px]
            "
          />

          {/* EVENTOS */}
          <div className="relative z-10">
            {eventos.map((evento, index) => (
              <EventoItinerario
                key={evento.titulo}
                evento={evento}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* MENSAJE FINAL */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            mt-16
            flex flex-col
            items-center
            text-center
          "
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-[#C8AA78]" />

            <Heart
              size={18}
              strokeWidth={1.2}
              className="text-[#8B709A]"
            />

            <span className="h-px w-12 bg-[#C8AA78]" />
          </div>

          <p
            className="
              mt-6
              font-playfair
              text-[20px]
              italic
              text-[#765587]
              sm:text-[23px]
            "
          >
            Gracias por ser parte de nuestro día.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
