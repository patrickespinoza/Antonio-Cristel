import React from "react";
import Celebracion from "./componentes-encabezado/ubicacion";
import Vestimenta from "./componentes-encabezado/vestimenta";
import Intinerario2 from "./componentes-encabezado/itinerario2";
import Novios from "./componentes-encabezado/novios";
import ConfirmacionAsistencia from "./componentes-encabezado/confirmacion";
import Musica from "./componentes-encabezado/Musica";
import CuentaRegresiva from "./componentes-encabezado/CuentaRegresiva";
import FinalBoda from "./componentes-encabezado/ImagenFinal";


export default function PaginaPrincipal() {

  return (
    <div>

      <Musica/>

      <CuentaRegresiva/>

      <Novios />

      <Celebracion/>

      <Vestimenta />

      <Intinerario2/>

      <ConfirmacionAsistencia/>

      <FinalBoda/>
    </div>
  );
}