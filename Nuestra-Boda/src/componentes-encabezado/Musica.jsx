
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Music2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Disc3,
  Heart,
} from "lucide-react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  cancion: "/musica.mp3",
  volumen: 0.45,
  titulo: "Una melodía para nuestro amor",
  descripcion:
    "Hemos elegido una canción especial para acompañarte durante esta invitación.",
  etiqueta: "NUESTRA BODA",
};

const COLORES = {
  lila: "#8B709A",
  lilaOscuro: "#634B73",
  lilaClaro: "#E9DDF0",
  blanco: "#FFFFFF",
  dorado: "#C8AA78",
  negro: "#211A25",
};

// ==========================================
// COMPONENTE MÚSICA
// ==========================================

const Musica = () => {
  const audioRef = useRef(null);

  const [mostrarVentana, setMostrarVentana] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = CONFIG.volumen;
    }

    return () => {
      if (audio) audio.pause();
    };
  }, []);

  const iniciarMusica = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setReproduciendo(true);
      setMostrarVentana(false);
    } catch (error) {
      console.warn("No se pudo reproducir la música:", error);
      setReproduciendo(false);
      setMostrarVentana(false);
    }
  };

  const continuarSinMusica = () => {
    audioRef.current?.pause();
    setReproduciendo(false);
    setMostrarVentana(false);
  };

  const alternarMusica = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setReproduciendo(false);
    } else {
      try {
        await audio.play();
        setReproduciendo(true);
      } catch (error) {
        console.warn("No se pudo reproducir la música:", error);
        setReproduciendo(false);
      }
    }
  };

  return (
    <>
      {/* AUDIO */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        onPlay={() => setReproduciendo(true)}
        onPause={() => setReproduciendo(false)}
      >
        <source src={CONFIG.cancion} type="audio/mpeg" />
      </audio>

      {/* VENTANA INICIAL */}
      <AnimatePresence>
        {mostrarVentana && (
          <motion.div
            key="modal-musica"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="
              fixed inset-0 z-[9999]
              flex items-center justify-center
              overflow-y-auto
              bg-black/75
              px-4 py-5
            "
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="titulo-musica"
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative my-auto
                w-full max-w-[430px]
                overflow-hidden
                rounded-[22px]
                border border-[#BFA6C9]
                bg-[#8B709A]
                text-center
                shadow-2xl
              "
            >
              {/* LÍNEAS DORADAS DECORATIVAS */}
              <div
                className="
                  pointer-events-none
                  absolute inset-[9px]
                  rounded-[16px]
                  border border-[#C8AA78]/65
                "
              />

              {/* VINILO DECORATIVO */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute -right-16 -top-20
                  h-48 w-48
                  sm:h-56 sm:w-56
                "
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
                    relative h-full w-full
                    rounded-full
                    border-[5px] border-[#252027]
                    bg-[#171419]
                    shadow-xl
                  "
                  style={{
                    background:
                      "repeating-radial-gradient(circle, #171419 0px, #171419 5px, #343039 6px, #171419 8px)",
                  }}
                >
                  <div
                    className="
                      absolute left-1/2 top-1/2
                      flex h-16 w-16
                      -translate-x-1/2 -translate-y-1/2
                      items-center justify-center
                      rounded-full
                      border-2 border-[#C8AA78]
                      bg-[#A98AB8]
                    "
                  >
                    <Heart
                      size={17}
                      strokeWidth={1.5}
                      className="text-white"
                    />
                  </div>
                </motion.div>
              </div>

              {/* CONTENIDO */}
              <div className="relative z-10 px-6 pb-9 pt-20 sm:px-10 sm:pb-11 sm:pt-24">

                {/* ETIQUETA */}
                <div className="mb-5 flex items-center justify-center gap-3">
                  <span className="h-px w-7 bg-[#C8AA78]" />

                  <p className="text-[10px] font-medium tracking-[0.32em] text-white">
                    {CONFIG.etiqueta}
                  </p>

                  <span className="h-px w-7 bg-[#C8AA78]" />
                </div>

                {/* TÍTULO */}
                <h2
                  id="titulo-musica"
                  className="
                    font-playfair
                    text-[43px]
                    font-normal
                    leading-none
                    text-white
                    sm:text-[52px]
                  "
                >
                  Música
                </h2>

                <div className="mx-auto my-6 h-px w-16 bg-[#C8AA78]" />

                {/* DESCRIPCIÓN */}
                <p
                  className="
                    mx-auto max-w-[280px]
                    text-[11px]
                    font-medium
                    uppercase
                    leading-[2]
                    tracking-[0.16em]
                    text-white
                  "
                >
                  {CONFIG.descripcion}
                </p>

                {/* TARJETA DE REPRODUCTOR */}
                <div
                  className="
                    relative mt-9
                    rounded-[24px]
                    border border-[#E8DDEC]
                    bg-[#FFFFFF]
                    p-5
                    text-left
                    shadow-[0_12px_28px_rgba(40,22,50,0.16)]
                  "
                >
                  <div className="flex items-center gap-4">

                    {/* PORTADA MUSICAL */}
                    <div
                      className="
                        flex h-[68px] w-[68px]
                        shrink-0 items-center justify-center
                        rounded-[12px]
                        bg-[#E9DDF0]
                      "
                    >
                      <Disc3
                        size={35}
                        strokeWidth={1.1}
                        className="text-[#765587]"
                      />
                    </div>

                    {/* INFORMACIÓN */}
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#8B709A]">
                        CANCIÓN ESPECIAL
                      </p>

                      <p className="mt-1 font-playfair text-[18px] leading-snug text-[#211A25]">
                        Nuestra canción
                      </p>

                      <p className="mt-1 text-[11px] text-[#796B80]">
                        Un momento para recordar
                      </p>
                    </div>

                    <Heart
                      size={20}
                      strokeWidth={1.4}
                      className="shrink-0 text-[#765587]"
                    />
                  </div>

                  {/* BARRA DECORATIVA */}
                  <div className="mt-6 flex items-center gap-3">
                    <span className="h-[3px] w-2/5 rounded-full bg-[#8B709A]" />
                    <span className="h-[3px] flex-1 rounded-full bg-[#E9DDF0]" />
                  </div>

                  {/* INDICACIÓN */}
                  <div className="mt-5 flex items-center justify-center gap-2">
                    <Music2
                      size={15}
                      className="text-[#8B709A]"
                    />

                    <span className="text-[11px] tracking-wide text-[#765587]">
                      ¿Deseas escuchar nuestra canción?
                    </span>
                  </div>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="mt-7 flex flex-col gap-3">

                  <motion.button
                    type="button"
                    onClick={iniciarMusica}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                      flex min-h-[55px] w-full
                      items-center justify-center gap-3
                      rounded-full
                      bg-white px-5 py-4
                      text-[13px] font-semibold
                      text-[#634B73]
                      transition-colors
                      hover:bg-[#F2EAF5]
                    "
                  >
                    <Play
                      size={17}
                      fill="currentColor"
                    />
                    Sí, escuchar música
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={continuarSinMusica}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      flex min-h-[53px] w-full
                      items-center justify-center gap-3
                      rounded-full
                      border border-white/70
                      bg-transparent px-5 py-4
                      text-[13px] font-medium
                      text-white
                      transition-colors
                      hover:bg-white/10
                    "
                  >
                    <VolumeX size={17} />
                    Continuar sin música
                  </motion.button>
                </div>

                {/* PIE DECORATIVO */}
                <div className="mt-8 flex items-center justify-center gap-3">
                  <span className="h-px w-9 bg-[#C8AA78]" />
                  <Heart
                    size={13}
                    strokeWidth={1.4}
                    className="text-[#E8D5B5]"
                  />
                  <span className="h-px w-9 bg-[#C8AA78]" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTÓN FLOTANTE */}
      {!mostrarVentana && (
        <motion.button
          type="button"
          onClick={alternarMusica}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          whileTap={{ scale: 0.9 }}
          aria-label={
            reproduciendo
              ? "Pausar música"
              : "Reproducir música"
          }
          title={
            reproduciendo
              ? "Pausar música"
              : "Reproducir música"
          }
          className="
            fixed bottom-6 right-5 z-[9998]
            flex h-14 w-14
            items-center justify-center
            rounded-full
            border-2 border-[#C8AA78]
            bg-[#765587]
            text-white
            shadow-[0_8px_24px_rgba(42,23,52,0.3)]
            transition-colors
            hover:bg-[#634B73]
            sm:bottom-8 sm:right-8
          "
        >
          {reproduciendo ? (
            <Volume2 size={24} strokeWidth={1.6} />
          ) : (
            <VolumeX size={24} strokeWidth={1.6} />
          )}
        </motion.button>
      )}
    </>
  );
};

export default Musica;
