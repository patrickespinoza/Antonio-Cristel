
import React, { useState } from "react";
import {
  Copy,
  Check,
  Link2,
  Ticket,
  MessageCircle,
  Heart,
  ExternalLink,
} from "lucide-react";

// ==========================================
// CONFIGURACIÓN - WEDLY
// ==========================================

const CONFIG = {
  novios: "Antonio & Cristel",
  imagen: "/portada.jpg",
  rutaInvitacion: "/",
};

// ==========================================
// COLORES
// ==========================================

const palette = {
  ink: "#211A25",
  inkSoft: "#514956",
  paperLight: "#FBF9FC",
  lilac: "#765587",
  lilacDark: "#60436F",
  gold: "#C8AA78",
  warmGray: "#777168",
  line: "#DED1E4",
};

// ==========================================
// CODIFICAR NÚMERO DE PASES
// COMPATIBLE CON confirmacion.jsx
// ==========================================

const crearId = (numeroPases) => {
  // Únicamente guardamos los pases.
  // No se incluye ningún nombre.
  const datos = {
    pases: Number(numeroPases),
  };

  const textoOriginal = JSON.stringify(datos);

  const textoInvertido = textoOriginal
    .split("")
    .reverse()
    .join("");

  const bytes = new TextEncoder().encode(
    textoInvertido
  );

  let binario = "";

  bytes.forEach((byte) => {
    binario += String.fromCharCode(byte);
  });

  return btoa(binario)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

// ==========================================
// GENERADOR
// ==========================================

export default function Generador() {
  const [pases, setPases] = useState("1");

  const [link, setLink] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [linkCopiado, setLinkCopiado] =
    useState(false);

  const [mensajeCopiado, setMensajeCopiado] =
    useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // LIMPIAR RESULTADOS
  // ==========================================

  const limpiarResultado = () => {
    setLink("");
    setMensaje("");
    setLinkCopiado(false);
    setMensajeCopiado(false);
    setError("");
  };

  // ==========================================
  // GENERAR ENLACE
  // ==========================================

  const generarLink = () => {
    const numeroPases = Number(pases);

    if (
      !Number.isSafeInteger(numeroPases) ||
      numeroPases < 1 ||
      numeroPases > 100
    ) {
      setError(
        "Ingresa una cantidad válida de pases entre 1 y 100."
      );
      return;
    }

    setError("");

    // Codificar solamente los pases.
    const id = crearId(numeroPases);

    // Enlace hacia la invitación principal.
    const url = new URL(
      CONFIG.rutaInvitacion,
      window.location.origin
    );

    url.searchParams.set("id", id);

    const enlaceGenerado = url.toString();

    setLink(enlaceGenerado);

    const textoPases =
      numeroPases === 1
        ? "1 pase"
        : `${numeroPases} pases`;

    // Mensaje sin nombre del invitado.
    const mensajeWhatsApp = [
      "✨ *INVITACIÓN ESPECIAL* ✨",
      "",
      "Con mucha alegría queremos compartir contigo nuestra invitación de boda. 🤍",
      "",
      "Hemos reservado especialmente para ti:",
      `🎟️ *${textoPases}*`,
      "",
      "Puedes consultar todos los detalles de nuestra celebración en el siguiente enlace:",
      "",
      enlaceGenerado,
      "",
      "Será un gusto compartir este momento tan especial contigo.",
      "",
      `${CONFIG.novios} 🤍`,
    ].join("\n");

    setMensaje(mensajeWhatsApp);

    setLinkCopiado(false);
    setMensajeCopiado(false);
  };

  // ==========================================
  // COPIAR LINK O MENSAJE
  // ==========================================

  const copiarTexto = async (texto, tipo) => {
    try {
      await navigator.clipboard.writeText(texto);

      setError("");

      if (tipo === "link") {
        setLinkCopiado(true);
      } else {
        setMensajeCopiado(true);
      }
    } catch (err) {
      console.error("Error al copiar:", err);

      setError(
        "No se pudo copiar automáticamente. Selecciona el texto y cópialo manualmente."
      );
    }
  };

  // ==========================================
  // INTERFAZ
  // ==========================================

  return (
    <main
      className="
        min-h-screen w-full
        bg-[#FBF9FC]
        px-4 py-10
        sm:px-6 sm:py-14
        lg:px-10
      "
      style={{ color: palette.ink }}
    >
      {/* ENCABEZADO */}
      <header className="mx-auto mb-12 max-w-6xl text-center">
        <p
          className="
            text-[11px] font-semibold
            uppercase tracking-[0.3em]
          "
          style={{ color: palette.lilac }}
        >
          {CONFIG.novios}
        </p>

        <h1
          className="
            mt-5 font-playfair
            text-4xl font-normal
            leading-tight
            sm:text-5xl lg:text-6xl
          "
        >
          Generador de invitaciones
        </h1>

        <div
          className="mx-auto mt-6 h-px w-20"
          style={{ backgroundColor: palette.gold }}
        />

        <p
          className="
            mx-auto mt-6 max-w-xl
            text-sm leading-relaxed
            sm:text-base
          "
          style={{ color: palette.warmGray }}
        >
          Asigna los pases reservados y genera
          un enlace personalizado para compartir
          la invitación.
        </p>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <div
        className="
          mx-auto grid max-w-6xl
          grid-cols-1 gap-10
          lg:grid-cols-[0.95fr_1.05fr]
          lg:gap-14
        "
      >
        {/* PANEL GENERADOR */}
        <section
          className="
            order-2 h-fit rounded-[22px]
            border bg-white p-6
            shadow-[0_15px_45px_rgba(50,30,60,0.06)]
            sm:p-9 lg:order-1
          "
          style={{ borderColor: palette.line }}
        >
          <p
            className="
              text-[10px] font-semibold
              uppercase tracking-[0.25em]
            "
            style={{ color: palette.lilac }}
          >
            Invitaciones digitales
          </p>

          <h2 className="mt-3 font-playfair text-3xl">
            Crear invitación
          </h2>

          <div
            className="mt-5 h-px w-14"
            style={{ backgroundColor: palette.gold }}
          />

          {/* ÚNICO CAMPO: NÚMERO DE PASES */}
          <div className="mt-9">
            <label
              htmlFor="numeroPases"
              className="
                mb-3 flex items-center gap-2
                text-[11px] font-semibold
                uppercase tracking-[0.15em]
              "
              style={{ color: palette.inkSoft }}
            >
              <Ticket size={18} />
              Número de pases
            </label>

            <input
              id="numeroPases"
              type="number"
              min="1"
              max="100"
              step="1"
              inputMode="numeric"
              value={pases}
              onChange={(e) => {
                setPases(e.target.value);
                limpiarResultado();
              }}
              className="
                w-full rounded-xl
                border border-[#DED1E4]
                bg-white px-5 py-4
                text-[18px] text-[#211A25]
                outline-none transition-colors
                focus:border-[#765587]
              "
            />

            <p
              className="mt-3 text-xs leading-relaxed"
              style={{ color: palette.warmGray }}
            >
              Esta cantidad aparecerá automáticamente
              en la confirmación de asistencia.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <p
              role="alert"
              className="
                mt-6 rounded-lg bg-red-50
                px-4 py-3 text-sm text-red-700
              "
            >
              {error}
            </p>
          )}

          {/* GENERAR */}
          <button
            type="button"
            onClick={generarLink}
            className="
              mt-8 flex w-full items-center
              justify-center gap-3 rounded-xl
              bg-[#765587] px-6 py-4
              text-[13px] font-semibold
              tracking-wide text-white
              transition-all
              hover:bg-[#60436F]
              active:scale-[0.99]
            "
          >
            <Link2 size={19} />
            Generar invitación
          </button>

          {/* LINK GENERADO */}
          {link && (
            <div
              className="mt-9 border-t pt-8"
              style={{ borderColor: palette.line }}
            >
              <div className="flex items-center gap-2">
                <Check
                  size={18}
                  className="text-[#765587]"
                />

                <h3 className="font-playfair text-xl">
                  Invitación generada
                </h3>
              </div>

              <p
                className="
                  mb-3 mt-5 text-[11px]
                  font-semibold uppercase
                  tracking-[0.2em]
                "
                style={{ color: palette.lilac }}
              >
                Enlace de invitación
              </p>

              <div
                className="
                  break-all rounded-xl
                  border border-[#DED1E4]
                  bg-[#F6F1F8] p-4
                  text-xs leading-relaxed
                  text-[#514956]
                "
              >
                {link}
              </div>

              <button
                type="button"
                onClick={() => copiarTexto(link, "link")}
                className="
                  mt-4 flex w-full items-center
                  justify-center gap-2 rounded-xl
                  border border-[#765587]
                  px-5 py-3.5 text-sm
                  text-[#765587] transition-colors
                  hover:bg-[#F6F1F8]
                "
              >
                {linkCopiado ? (
                  <>
                    <Check size={17} />
                    Link copiado
                  </>
                ) : (
                  <>
                    <Copy size={17} />
                    Copiar link
                  </>
                )}
              </button>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-3 flex w-full items-center
                  justify-center gap-2
                  text-sm text-[#765587]
                  hover:underline
                "
              >
                <ExternalLink size={16} />
                Ver invitación
              </a>
            </div>
          )}

          {/* MENSAJE WHATSAPP */}
          {link && (
            <div
              className="mt-9 border-t pt-8"
              style={{ borderColor: palette.line }}
            >
              <div className="flex items-center gap-2">
                <MessageCircle
                  size={20}
                  className="text-[#765587]"
                />

                <h3 className="font-playfair text-xl">
                  Mensaje para WhatsApp
                </h3>
              </div>

              <p
                className="
                  mt-3 text-xs leading-relaxed
                "
                style={{ color: palette.warmGray }}
              >
                Puedes editar el mensaje antes
                de copiarlo y enviarlo.
              </p>

              <textarea
                value={mensaje}
                onChange={(e) =>
                  setMensaje(e.target.value)
                }
                rows={12}
                className="
                  mt-5 w-full resize-y
                  rounded-xl border
                  border-[#DED1E4]
                  bg-white p-5
                  text-[14px] leading-relaxed
                  text-[#211A25] outline-none
                  focus:border-[#765587]
                "
              />

              <button
                type="button"
                onClick={() =>
                  copiarTexto(mensaje, "mensaje")
                }
                className="
                  mt-4 flex w-full items-center
                  justify-center gap-2 rounded-xl
                  bg-[#60436F] px-6 py-4
                  text-[13px] font-semibold
                  text-white transition-colors
                  hover:bg-[#4E365A]
                "
              >
                {mensajeCopiado ? (
                  <>
                    <Check size={18} />
                    Mensaje copiado
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copiar mensaje para WhatsApp
                  </>
                )}
              </button>
            </div>
          )}
        </section>

        {/* PORTADA Y VISTA PREVIA */}
        <section
          className="
            order-1 flex flex-col
            items-center lg:order-2
          "
        >
          <div className="mb-6 text-center">
            <p
              className="
                text-[10px] font-semibold
                uppercase tracking-[0.25em]
                text-[#765587]
              "
            >
              NUESTRA BODA
            </p>

            <h2
              className="
                mt-3 font-playfair
                text-[28px] text-[#211A25]
              "
            >
              {CONFIG.novios}
            </h2>
          </div>

          {/* PORTADA */}
          <div
            className="
              w-full max-w-[430px]
              overflow-hidden rounded-[18px]
              border border-[#DED1E4]
              bg-white p-2
              shadow-[0_20px_55px_rgba(50,30,60,0.10)]
              sm:p-3
            "
          >
            <img
              src={CONFIG.imagen}
              alt={`Portada de la boda de ${CONFIG.novios}`}
              className="
                block h-auto w-full object-contain
              "
            />
          </div>

          {/* VISTA PREVIA WHATSAPP */}
          {link && (
            <div className="mt-10 w-full max-w-[430px]">
              <p
                className="
                  mb-4 text-center text-[10px]
                  font-semibold uppercase
                  tracking-[0.2em]
                  text-[#765587]
                "
              >
                VISTA PREVIA DEL MENSAJE
              </p>

              <div
                className="
                  rounded-[18px] bg-[#EFEAE2]
                  p-4 shadow-sm
                "
              >
                <div
                  className="
                    ml-auto max-w-[95%]
                    rounded-xl rounded-tr-sm
                    bg-[#D9FDD3] px-4 py-4
                  "
                >
                  <p
                    className="
                      whitespace-pre-wrap
                      break-words text-[13px]
                      leading-[1.7] text-[#1D2733]
                    "
                  >
                    {mensaje}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ORNAMENTO */}
          <div className="mt-10 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C8AA78]" />

            <Heart
              size={17}
              strokeWidth={1.3}
              className="text-[#765587]"
            />

            <span className="h-px w-10 bg-[#C8AA78]" />
          </div>
        </section>
      </div>
    </main>
  );
}
