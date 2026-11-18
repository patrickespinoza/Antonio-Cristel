
import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock3,
  Church,
  Wine,
  ArrowUpRight,
  CalendarDays,
  Navigation,
} from "lucide-react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  fecha: {
    dia: "SÁBADO",
    numero: "26",
    mes: "DICIEMBRE",
    anio: "2026",
  },

  ceremonia: {
    tipo: "01 / CEREMONIA RELIGIOSA",
    titulo: "Ceremonia Religiosa",
    hora: "6:00 PM",
    lugar: "Iglesia Lucero de la Mañana",
    ubicacion:
      "https://maps.app.goo.gl/P4k9V2qhg3ZKnJKw6",
    icono: Church,
  },

  recepcion: {
    tipo: "02 / CELEBRACIÓN",
    titulo: "Recepción",
    hora: "7:00 PM",
    lugar: "Palapa Los Laureles",
    ubicacion:
      "https://maps.app.goo.gl/4VFTiSo9HVRfpXgq6",
    icono: Wine,
  },
};

// ==========================================
// ANIMACIONES
// ==========================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ==========================================
// TARJETA DE EVENTO
// ==========================================

const TarjetaEvento = ({
  tipo,
  titulo,
  hora,
  lugar,
  ubicacion,
  icono: Icono,
  destacada = false,
}) => {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -4 }}
      className="
        relative flex h-full
        w-full flex-col
        overflow-hidden
        rounded-[20px]
        border border-[#E6DCE9]
        bg-white
        shadow-[0_12px_35px_rgba(45,25,55,0.12)]
      "
    >
      {/* FRANJA SUPERIOR */}
      <div
        className={`
          flex min-h-[160px]
          flex-col items-center
          justify-center
          px-6 py-8
          ${
            destacada
              ? "bg-[#E9DDF0]"
              : "bg-[#F5F0F7]"
          }
        `}
      >
        {/* ÍCONO */}
        <div
          className="
            mb-4 flex
            h-[65px] w-[65px]
            items-center justify-center
            rounded-full
            border border-[#BDA5C7]
            bg-white
          "
        >
          <Icono
            size={32}
            strokeWidth={1.2}
            className="text-[#765587]"
          />
        </div>

        {/* ETIQUETA */}
        <p
          className="
            text-center text-[10px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#765587]
          "
        >
          {tipo}
        </p>
      </div>

      {/* CONTENIDO */}
      <div
        className="
          flex flex-1
          flex-col items-center
          px-6 pb-9 pt-8
          text-center
          sm:px-9
        "
      >
        {/* TÍTULO */}
        <h3
          className="
            font-playfair
            text-[29px]
            font-normal
            leading-tight
            text-[#211A25]
            sm:text-[34px]
          "
        >
          {titulo}
        </h3>

        {/* DIVISOR */}
        <div className="my-7 flex items-center gap-3">
          <span className="h-px w-10 bg-[#C8AA78]" />
          <span className="h-[5px] w-[5px] rotate-45 bg-[#C8AA78]" />
          <span className="h-px w-10 bg-[#C8AA78]" />
        </div>

        {/* HORA */}
        <div className="flex flex-col items-center">
          <div className="mb-3 flex items-center gap-2">
            <Clock3
              size={17}
              strokeWidth={1.4}
              className="text-[#765587]"
            />

            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-[#765587]
              "
            >
              HORA DEL EVENTO
            </span>
          </div>

          <p
            className="
              font-playfair
              text-[33px]
              font-normal
              text-[#211A25]
            "
          >
            {hora}
          </p>
        </div>

        {/* LUGAR */}
        <div
          className="
            mt-8 flex
            w-full flex-col
            items-center
          "
        >
          <MapPin
            size={21}
            strokeWidth={1.4}
            className="mb-3 text-[#765587]"
          />

          <span
            className="
              mb-3
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-[#765587]
            "
          >
            LUGAR
          </span>

          <p
            className="
              max-w-[280px]
              font-playfair
              text-[23px]
              leading-snug
              text-[#211A25]
              sm:text-[26px]
            "
          >
            {lugar}
          </p>
        </div>

        {/* BOTÓN GOOGLE MAPS */}
        <motion.a
          href={ubicacion}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
            group mt-auto
            flex min-h-[54px]
            w-full items-center
            justify-center gap-3
            rounded-full
            bg-[#765587]
            px-5 py-4
            text-[13px]
            font-medium
            text-white
            transition-colors
            hover:bg-[#634B73]
            pt-4
          "
          style={{ marginTop: "36px" }}
        >
          <Navigation
            size={17}
            strokeWidth={1.7}
          />

          Ver ubicación

        </motion.a>
      </div>
    </motion.article>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Celebracion() {
  return (
    <section
      id="ubicacion"
      className="
        relative w-full
        overflow-hidden
        bg-[#8B709A]
        px-5 py-20
        sm:px-8 sm:py-28
        md:py-32
      "
    >
      {/* LÍNEAS DECORATIVAS SUPERIORES */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-0
          h-14 w-px
          -translate-x-1/2
          bg-[#D7BD91]
        "
      />

      <div
        className="
          relative z-10
          mx-auto w-full
          max-w-6xl
        "
      >
        {/* ENCABEZADO */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            mb-14 flex
            flex-col items-center
            text-center
            sm:mb-16
          "
        >
          {/* ETIQUETA */}
          <p
            className="
              mb-5
              text-[11px]
              font-medium
              uppercase
              tracking-[0.32em]
              text-white
            "
          >
            NUESTRA CELEBRACIÓN
          </p>

          {/* TÍTULO */}
          <h2
            className="
              font-playfair
              text-[43px]
              font-normal
              leading-tight
              text-white
              sm:text-[58px]
              md:text-[72px]
            "
          >
            Dónde será
            <span
              className="
                ml-3
                font-playfair
                italic
                text-[#E7D5B5]
              "
            >
              nuestro día
            </span>
          </h2>

          {/* FECHA EDITORIAL */}
          <div
            className="
              mt-12 flex
              items-center
              justify-center
              gap-5
              sm:gap-8
            "
          >
            {/* DÍA DE LA SEMANA */}
            <div
              className="
                flex min-w-[65px]
                flex-col items-center
                gap-2
              "
            >
              <span className="h-px w-full bg-[#D7BD91]" />

              <p
                className="
                  text-[10px]
                  font-semibold
                  tracking-[0.14em]
                  text-white
                  sm:text-[12px]
                "
              >
                {CONFIG.fecha.dia}
              </p>

              <span className="h-px w-full bg-[#D7BD91]" />
            </div>

            {/* NÚMERO */}
            <p
              className="
                font-playfair
                text-[100px]
                leading-none
                text-white
                sm:text-[130px]
                md:text-[155px]
              "
            >
              {CONFIG.fecha.numero}
            </p>

            {/* MES Y AÑO */}
            <div
              className="
                flex min-w-[85px]
                flex-col items-center
                gap-2
              "
            >
              <span className="h-px w-full bg-[#D7BD91]" />

              <p
                className="
                  text-[10px]
                  font-semibold
                  tracking-[0.1em]
                  text-white
                  sm:text-[12px]
                "
              >
                {CONFIG.fecha.mes}
              </p>

              <p
                className="
                  font-playfair
                  text-[20px]
                  text-white
                  sm:text-[24px]
                "
              >
                {CONFIG.fecha.anio}
              </p>

              <span className="h-px w-full bg-[#D7BD91]" />
            </div>
          </div>
        </motion.div>

        {/* TARJETAS */}
        <div
          className="
            grid grid-cols-1
            items-stretch
            gap-7
            lg:grid-cols-2
            lg:gap-8
          "
        >
          <TarjetaEvento
            {...CONFIG.ceremonia}
            destacada
          />

          <TarjetaEvento
            {...CONFIG.recepcion}
          />
        </div>

        {/* MENSAJE FINAL */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            mt-14 flex
            flex-col items-center
            gap-5
            text-center
          "
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#D7BD91]" />
            <CalendarDays
              size={18}
              strokeWidth={1.3}
              className="text-[#E7D5B5]"
            />
            <span className="h-px w-10 bg-[#D7BD91]" />
          </div>

          <p
            className="
              max-w-[500px]
              font-playfair
              text-[20px]
              italic
              leading-relaxed
              text-white
              sm:text-[24px]
            "
          >
            Cada momento será más especial
            con tu presencia.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
