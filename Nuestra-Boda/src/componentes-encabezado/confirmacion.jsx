
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Users,
  MessageCircle,
  Check,
  X,
  Send,
} from "lucide-react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  novios: "Antonio & Cristel",

  novia: {
    nombre: "Cristel",
    // Verificar: este número tiene 9 dígitos
    // antes del prefijo de México.
    telefono: "52983348830",
  },

  novio: {
    nombre: "Antonio",
    telefono: "529341026463",
  },

  // ========================================
  // FLORES DECORATIVAS
  // ========================================

  flores: {
    imagen: "/flores.png",
    mostrar: true,

    anchoMovil: "135px",
    anchoTablet: "210px",
    anchoEscritorio: "300px",

    opacidad: 0.85,

    lateralMovil: "-10px",
    lateralEscritorio: "-25px",

    superiorMovil: "-15px",
    superiorEscritorio: "-25px",

    inferiorMovil: "-10px",
    inferiorEscritorio: "-20px",

    // Ajusta estos ángulos si la orientación
    // original de tu PNG es diferente.
    rotacionSuperiorDerecha: "0deg",
    rotacionInferiorIzquierda: "180deg",
    rotacionInferiorDerecha: "90deg",
  },
};

// ==========================================
// DECODIFICACIÓN INTEGRADA
// NO NECESITA ARCHIVOS UTILS
// ==========================================

const leerInvitacion = () => {
  try {
    const parametros = new URLSearchParams(
      window.location.search
    );

    const id = parametros.get("id");

    if (!id || id.length > 4096) {
      return null;
    }

    const base64 = id
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const relleno = "=".repeat(
      (4 - (base64.length % 4)) % 4
    );

    const binario = atob(base64 + relleno);

    const bytes = Uint8Array.from(
      binario,
      (caracter) => caracter.charCodeAt(0)
    );

    const textoInvertido = new TextDecoder(
      "utf-8",
      { fatal: true }
    ).decode(bytes);

    const textoOriginal = textoInvertido
      .split("")
      .reverse()
      .join("");

    const datos = JSON.parse(textoOriginal);

    const pases = Number(datos.pases);

    if (
      !Number.isSafeInteger(pases) ||
      pases < 1 ||
      pases > 100
    ) {
      return null;
    }

    return { pases };
  } catch (error) {
    console.error(
      "Error al decodificar la invitación:",
      error
    );

    return null;
  }
};

// ==========================================
// ANIMACIONES
// ==========================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
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
// FLORES EN TRES ESQUINAS
// ==========================================

const FloresDecorativas = () => {
  if (!CONFIG.flores.mostrar) {
    return null;
  }

  return (
    <>
      <style>
        {`
          .wedly-confirmacion-flor {
            position: absolute;
            width: ${CONFIG.flores.anchoMovil};
            height: auto;
            opacity: ${CONFIG.flores.opacidad};
            pointer-events: none;
            user-select: none;
            display: block;
          }

          .wedly-confirmacion-flor-superior {
            top: ${CONFIG.flores.superiorMovil};
            right: ${CONFIG.flores.lateralMovil};
            transform: rotate(
              ${CONFIG.flores.rotacionSuperiorDerecha}
            );
          }

          .wedly-confirmacion-flor-inferior-izquierda {
            bottom: ${CONFIG.flores.inferiorMovil};
            left: ${CONFIG.flores.lateralMovil};
            transform: rotate(
              ${CONFIG.flores.rotacionInferiorIzquierda}
            );
          }

          .wedly-confirmacion-flor-inferior-derecha {
            bottom: ${CONFIG.flores.inferiorMovil};
            right: ${CONFIG.flores.lateralMovil};
            transform: rotate(
              ${CONFIG.flores.rotacionInferiorDerecha}
            );
          }

          @media (min-width: 640px) {
            .wedly-confirmacion-flor {
              width: ${CONFIG.flores.anchoTablet};
            }
          }

          @media (min-width: 1024px) {
            .wedly-confirmacion-flor {
              width: ${CONFIG.flores.anchoEscritorio};
            }

            .wedly-confirmacion-flor-superior {
              top: ${CONFIG.flores.superiorEscritorio};
              right: ${CONFIG.flores.lateralEscritorio};
            }

            .wedly-confirmacion-flor-inferior-izquierda {
              bottom: ${CONFIG.flores.inferiorEscritorio};
              left: ${CONFIG.flores.lateralEscritorio};
            }

            .wedly-confirmacion-flor-inferior-derecha {
              bottom: ${CONFIG.flores.inferiorEscritorio};
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
        {/* SUPERIOR DERECHA */}
        <img
          src={CONFIG.flores.imagen}
          alt=""
          draggable="false"
          className="
            wedly-confirmacion-flor
            wedly-confirmacion-flor-superior
          "
        />

        {/* INFERIOR IZQUIERDA */}
        <img
          src={CONFIG.flores.imagen}
          alt=""
          draggable="false"
          className="
            wedly-confirmacion-flor
            wedly-confirmacion-flor-inferior-izquierda
          "
        />

        {/* INFERIOR DERECHA */}
        <img
          src={CONFIG.flores.imagen}
          alt=""
          draggable="false"
          className="
            wedly-confirmacion-flor
            wedly-confirmacion-flor-inferior-derecha
          "
        />
      </div>
    </>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function ConfirmacionAsistencia() {
  const [invitacion] = useState(leerInvitacion);

  const [asistencia, setAsistencia] = useState("");
  const [pasesConfirmados, setPasesConfirmados] =
    useState("");

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const pasesAsignados = invitacion?.pases ?? 0;

  // ========================================
  // ENVIAR CONFIRMACIÓN POR WHATSAPP
  // ========================================

  const enviarConfirmacion = (destinatario) => {
    if (!invitacion) {
      setError(
        "No encontramos los pases asignados a esta invitación."
      );
      return;
    }

    if (!asistencia) {
      setError(
        "Por favor selecciona si asistirás."
      );
      return;
    }

    if (
      asistencia === "Sí asistiré" &&
      !pasesConfirmados
    ) {
      setError(
        "Selecciona cuántos pases deseas confirmar."
      );
      return;
    }

    const cantidad =
      asistencia === "Sí asistiré"
        ? Number(pasesConfirmados)
        : 0;

    if (
      asistencia === "Sí asistiré" &&
      (
        !Number.isSafeInteger(cantidad) ||
        cantidad < 1 ||
        cantidad > pasesAsignados
      )
    ) {
      setError(
        "La cantidad seleccionada no es válida."
      );
      return;
    }

    setError("");

    const textoWhatsApp = [
      "💍 *CONFIRMACIÓN DE ASISTENCIA*",
      "",
      `💜 *Boda de ${CONFIG.novios}*`,
      "",
      `💌 *Asistencia:* ${asistencia}`,
      `🎟️ *Pases asignados:* ${pasesAsignados}`,
      `👥 *Pases confirmados:* ${cantidad}`,
      "",
      "💬 *Mensaje para los novios:*",
      mensaje.trim() || "Sin mensaje adicional",
    ].join("\n");

    const urlWhatsApp =
      `https://wa.me/${destinatario.telefono}` +
      `?text=${encodeURIComponent(textoWhatsApp)}`;

    window.open(
      urlWhatsApp,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      id="confirmacion"
      className="
        relative w-full
        overflow-hidden
        bg-[#FAEEDD]
        px-5
        pt-24 pb-32
        sm:px-8
        sm:pt-28 sm:pb-40
        lg:pt-36 lg:pb-44
      "
    >
      {/* ======================================
          FLORES EN TRES ESQUINAS
      ====================================== */}

      <FloresDecorativas />

      {/* ======================================
          CONTENIDO
      ====================================== */}

      <div
        className="
          relative z-10
          mx-auto w-full
          max-w-[650px]
        "
      >
        {/* ENCABEZADO */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center"
        >
          <p
            className="
              text-[11px]
              font-semibold uppercase
              tracking-[0.25em]
              text-[#765587]
            "
          >
            NOS ENCANTARÍA CONTAR CONTIGO
          </p>

          <h2
            className="
              mt-5
              font-playfair
              text-[42px]
              font-normal
              leading-tight
              text-[#211A25]
              sm:text-[58px]
            "
          >
            Confirma tu
            <span
              className="
                block italic
                text-[#765587]
              "
            >
              Asistencia
            </span>
          </h2>

          {/* ORNAMENTO */}
          <div
            className="
              mt-7 flex
              items-center justify-center
              gap-3
            "
          >
            <span className="h-px w-12 bg-[#C8AA78]" />

            <Heart
              size={17}
              strokeWidth={1.3}
              className="text-[#8B709A]"
            />

            <span className="h-px w-12 bg-[#C8AA78]" />
          </div>

          <p
            className="
              mx-auto mt-7
              max-w-[430px]
              text-[15px]
              leading-[1.9]
              text-[#6F6573]
              sm:text-[17px]
            "
          >
            Tu presencia hará este día aún más especial.
            Confírmanos si podremos contar contigo
            para celebrar nuestro amor.
          </p>
        </motion.div>

        {/* ======================================
            PASES ASIGNADOS
        ====================================== */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            relative mt-12
            overflow-hidden
            rounded-[22px]
            border border-[#DED1E4]
            bg-[#F6F1F8]
            px-6 py-10
            text-center
            sm:px-10
          "
        >
          <Users
            size={28}
            strokeWidth={1.3}
            className="mx-auto text-[#765587]"
          />

          <p
            className="
              mt-4
              text-[11px]
              font-semibold uppercase
              tracking-[0.2em]
              text-[#765587]
            "
          >
            Pases reservados para ti
          </p>

          {invitacion ? (
            <>
              <p
                className="
                  mt-5
                  font-playfair
                  text-[75px]
                  leading-none
                  text-[#211A25]
                "
              >
                {pasesAsignados}
              </p>

              <p className="mt-3 text-sm text-[#765587]">
                {pasesAsignados === 1
                  ? "Pase asignado"
                  : "Pases asignados"}
              </p>
            </>
          ) : (
            <p
              className="
                mt-6
                text-sm leading-relaxed
                text-[#765587]
              "
            >
              No encontramos los pases asignados.
              Por favor abre el enlace personalizado
              que recibiste por WhatsApp.
            </p>
          )}
        </motion.div>

        {/* ======================================
            FORMULARIO
        ====================================== */}

        {invitacion && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12"
          >
            <h3
              className="
                text-center
                font-playfair
                text-[27px]
                text-[#211A25]
              "
            >
              ¿Nos acompañarás?
            </h3>

            {/* OPCIONES DE ASISTENCIA */}
            <div
              className="
                mt-7 grid
                grid-cols-2 gap-3
                sm:gap-5
              "
            >
              <button
                type="button"
                onClick={() => {
                  setAsistencia("Sí asistiré");
                  setError("");
                }}
                aria-pressed={
                  asistencia === "Sí asistiré"
                }
                className={`
                  flex items-center
                  justify-center gap-2
                  rounded-xl border
                  px-3 py-4
                  text-[13px]
                  transition-all
                  sm:text-[15px]
                  ${
                    asistencia === "Sí asistiré"
                      ? "border-[#765587] bg-[#765587] text-white"
                      : "border-[#DED1E4] bg-white text-[#514956] hover:border-[#765587]"
                  }
                `}
              >
                <Check size={18} />
                Sí asistiré
              </button>

              <button
                type="button"
                onClick={() => {
                  setAsistencia("No asistiré");
                  setPasesConfirmados("");
                  setError("");
                }}
                aria-pressed={
                  asistencia === "No asistiré"
                }
                className={`
                  flex items-center
                  justify-center gap-2
                  rounded-xl border
                  px-3 py-4
                  text-[13px]
                  transition-all
                  sm:text-[15px]
                  ${
                    asistencia === "No asistiré"
                      ? "border-[#765587] bg-[#765587] text-white"
                      : "border-[#DED1E4] bg-white text-[#514956] hover:border-[#765587]"
                  }
                `}
              >
                <X size={18} />
                No asistiré
              </button>
            </div>

            {/* ==================================
                PASES A CONFIRMAR
            ================================== */}

            {asistencia === "Sí asistiré" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <label
                  htmlFor="pasesConfirmados"
                  className="
                    mb-3 block
                    text-center
                    text-sm text-[#514956]
                  "
                >
                  ¿Cuántos pases confirmarás?
                </label>

                <select
                  id="pasesConfirmados"
                  value={pasesConfirmados}
                  onChange={(e) => {
                    setPasesConfirmados(
                      e.target.value
                    );
                    setError("");
                  }}
                  className="
                    w-full rounded-xl
                    border border-[#DED1E4]
                    bg-[#F9F6FA]
                    px-5 py-4
                    text-[#211A25]
                    outline-none
                    focus:border-[#765587]
                  "
                >
                  <option value="">
                    Selecciona la cantidad
                  </option>

                  {Array.from(
                    { length: pasesAsignados },
                    (_, index) => index + 1
                  ).map((cantidad) => (
                    <option
                      key={cantidad}
                      value={cantidad}
                    >
                      {cantidad}{" "}
                      {cantidad === 1
                        ? "pase"
                        : "pases"}
                    </option>
                  ))}
                </select>

                <p
                  className="
                    mt-3 text-center
                    text-xs text-[#765587]
                  "
                >
                  Tienes un máximo de{" "}
                  {pasesAsignados}{" "}
                  {pasesAsignados === 1
                    ? "pase disponible"
                    : "pases disponibles"}.
                </p>
              </motion.div>
            )}

            {/* ==================================
                MENSAJE OPCIONAL
            ================================== */}

            <div className="mt-8">
              <label
                htmlFor="mensajeNovios"
                className="
                  mb-3 block
                  text-center
                  text-sm text-[#514956]
                "
              >
                Mensaje para los novios (opcional)
              </label>

              <textarea
                id="mensajeNovios"
                rows={3}
                value={mensaje}
                onChange={(e) =>
                  setMensaje(e.target.value)
                }
                placeholder="Escribe unas palabras especiales..."
                className="
                  w-full resize-none
                  rounded-xl
                  border border-[#DED1E4]
                  bg-[#F9F6FA]
                  px-5 py-4
                  text-[14px]
                  text-[#211A25]
                  placeholder:text-[#A49AA8]
                  outline-none
                  focus:border-[#765587]
                "
              />
            </div>

            {/* MENSAJE DE ERROR */}
            {error && (
              <p
                role="alert"
                className="
                  mt-5 text-center
                  text-sm text-red-600
                "
              >
                {error}
              </p>
            )}

            {/* ==================================
                BOTONES WHATSAPP
            ================================== */}

            <div className="mt-10">
              <p
                className="
                  mb-6 text-center
                  font-playfair
                  text-[23px]
                  text-[#211A25]
                "
              >
                Envía tu confirmación a
              </p>

              <div
                className="
                  grid grid-cols-1
                  gap-4
                  sm:grid-cols-2
                "
              >
                {/* WHATSAPP CRISTEL */}
                <button
                  type="button"
                  onClick={() =>
                    enviarConfirmacion(CONFIG.novia)
                  }
                  className="
                    flex items-center
                    justify-center gap-3
                    rounded-xl
                    bg-[#765587]
                    px-5 py-4
                    text-white
                    transition-all
                    hover:bg-[#60436F]
                  "
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp de Cristel</span>
                  <Send size={15} />
                </button>

                {/* WHATSAPP ANTONIO */}
                <button
                  type="button"
                  onClick={() =>
                    enviarConfirmacion(CONFIG.novio)
                  }
                  className="
                    flex items-center
                    justify-center gap-3
                    rounded-xl
                    border border-[#765587]
                    bg-white
                    px-5 py-4
                    text-[#765587]
                    transition-all
                    hover:bg-[#F4EFF6]
                  "
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp de Antonio</span>
                  <Send size={15} />
                </button>
              </div>

              <p
                className="
                  mt-6 text-center
                  text-xs leading-relaxed
                  text-[#8B8190]
                "
              >
                Se abrirá WhatsApp con tu mensaje
                preparado. Solo tendrás que enviarlo.
              </p>
            </div>
          </motion.div>
        )}

        {/* ======================================
            ORNAMENTO FINAL
        ====================================== */}

        <div
          className="
            mt-16 flex
            items-center justify-center
            gap-3
          "
        >
          <span className="h-px w-10 bg-[#C8AA78]" />

          <Heart
            size={18}
            strokeWidth={1.2}
            className="text-[#8B709A]"
          />

          <span className="h-px w-10 bg-[#C8AA78]" />
        </div>
      </div>
    </section>
  );
}
