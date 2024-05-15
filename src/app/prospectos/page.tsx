"use client";

import React, {useState} from "react";
import { Prospecto } from "../ModelosDatos/Prospecto";
import { obtenerProspectos } from "../Connection/SupabaseClient";


const GestionProspectos = async () => {
  const prospectos = [
    {
      nombre: "Juan Pérez",
      carrera: "Carrera: Ingeniería Informática",
      estado: "Admitido por Camila Méndez",
      detalles: "Interno. Matriculado",
      observaciones: "Alumno brillante",
    },
    {
      nombre: "Ramona Díaz",
      carrera: "Carrera: Diseño de vestuario",
      estado: "Admitida por Camila Méndez",
      detalles: "Estado: En espera",
      observaciones: "Ha ingresado el documento LIII. Por supervisar realizada",
    },
  ];
  const{data,error} = await obtenerProspectos();
  console.log(data);
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario a tu API o backend
  };




  return (
    <div className="flex flex-col h-screen">
      <div className="bg-orange-500 py-4 px-6 flex items-center">
        <h1 className="text-white font-bold text-xl">Gestión Prospectos</h1>
        <div className="ml-auto">
          <input
            type="text"
            placeholder="Buscar..."
            className="py-1 px-2 rounded-md"
          />
        </div>
      </div>
      <div className="flex-1 p-6">
        <img
          src="/img/Fondo-home.jpg" // Ruta de la imagen
          alt="Imagen de bienvenida"
          className="w-full h-64 object-cover mb-6"
        />
        <div className="bg-orange-500 p-4 rounded-md">
          <h2 className="text-xl font-bold mb-4">Nuevo Prospecto</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nombre" className="block font-medium mb-2">
                Nombre Completo*
              </label>
              <input
                type="text"
                id="nombre"
                //value={nombre}
                //onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="estado" className="block font-medium mb-2">
                Estado
              </label>
              <select
                id="estado"
                //value={estado}
                //onChange={(e) => setEstado(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3"
              >
                <option value="Pendiente">Pendiente</option>
                {/* Agrega más opciones según tus necesidades */}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-2">
                Email*
              </label>
              <input
                type="email"
                id="email"
                //value={email}
                //onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                required
              />
            </div>
            <div className="mb-4 flex">
              <div className="mr-4">
                <label htmlFor="telefono" className="block font-medium mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  //value={telefono}
                  //onChange={(e) => setTelefono(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                />
              </div>
              <div>
                <label htmlFor="direccion" className="block font-medium mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                 //value={direccion}
                  //onChange={(e) => setDireccion(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Añadir
              </button>
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
        <div className="bg-orange-500 p-4 rounded-md">
          <h2 className="text-white font-bold mb-4">Lista de Prospectos</h2>
          {prospectos.map((prospecto, index) => (
            <div key={index} className="bg-white p-4 rounded-md mb-4">
              <h3 className="font-bold">{prospecto.nombre}</h3>
              <p>{prospecto.carrera}</p>
              <p>{prospecto.estado}</p>
              <p>{prospecto.detalles}</p>
              <p>{prospecto.observaciones}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestionProspectos;
