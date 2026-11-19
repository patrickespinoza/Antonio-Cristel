
import React from "react";
import { motion } from "framer-motion";

// ==========================================
// COMPONENTE VESTIMENTA - WEDLY
// ==========================================

export default function Vestimenta() {
  return (
    <section
      id="vestimenta"
      aria-label="Código de vestimenta"
      className="
        relative
        flex w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#FAEEDD]
        px-3 py-10
        sm:px-6 sm:py-16
        lg:px-10 lg:py-20
      "
    >
      {/* CONTENEDOR DE IMAGEN */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          mx-auto
          w-full
          max-w-[850px]
        "
      >
        {/* IMAGEN CUADRADA */}
        <img
          src="/dresscode.png"
          alt="Código de vestimenta formal. Colores reservados: azul para hombres; blanco, rojo y lila para mujeres."
          loading="lazy"
          decoding="async"
          width="1248"
          height="1248"
          className="
            block
            h-auto
            w-full
            object-contain
          "
        />
      </motion.div>
    </section>
  );
}
