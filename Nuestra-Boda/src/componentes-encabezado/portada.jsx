
import React from "react";

export default function Portada() {
  return (
    <section
      className="
        relative
        w-full
        h-[100svh]
        min-h-[600px]
        overflow-hidden
        bg-white
      "
    >
      {/* IMAGEN ORIGINAL SIN FILTROS */}
      <img
        src="/portada.png"
        alt="Portada de la boda de Antonio y Cristel"
        className="
          absolute inset-0
          h-full w-full
          object-cover
        "
      />

      {/* CONTENIDO */}
      <div
        className="
          relative z-10
          flex h-full w-full
          flex-col
          items-center
          justify-between
          px-5
          pt-12
          pb-12
          text-center
          sm:pt-16
          sm:pb-16
          md:pt-20
          md:pb-20
        "
      >
        {/* TÍTULO SUPERIOR */}
        <div className="w-full">
          <p
            className="
              font-playfair
              text-[26px]
              font-normal
              tracking-[0.08em]
              text-white
              sm:text-[34px]
              md:text-[42px]
            "
          >
            Nuestra Boda
          </p>
        </div>

        {/* NOMBRES Y FECHA INFERIORES */}
        <div
          className="
            flex w-full
            flex-col
            items-center
            gap-4
          "
        >
          {/* NOMBRES */}
          <h1
            className="
              font-playfair
              text-[43px]
              font-normal
              leading-[1.1]
              tracking-[-0.025em]
              text-white
              sm:text-[58px]
              md:text-[76px]
              lg:text-[90px]
            "
          >
            Antonio
            <span
              className="
                mx-3
                font-playfair
                italic
                font-normal
                sm:mx-5
              "
            >
              &
            </span>
            Cristel
          </h1>

          {/* LÍNEA ELEGANTE */}
          <div
            className="
              h-px
              w-20
              bg-white
              sm:w-28
            "
          />

          {/* FECHA */}
          <p
            className="
              text-[12px]
              font-light
              uppercase
              tracking-[0.24em]
              text-white
              sm:text-[15px]
              md:text-[17px]
            "
          >
            26 DE DICIEMBRE DE 2026
          </p>
        </div>
      </div>
    </section>
  );
}
