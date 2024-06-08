"use client";
import React, { useState } from "react";
import { User, verifyRut } from "../../ModelosDatos/User";
import { obtenerUser, actualizarUser, obtenerUserRut } from "../../Connection/SupabaseClient";
import styles from "./upd-user.module.css"


export default function UpdateUserForm() {
  const [user, setUser] = useState<User>({
    rut: null,
    dv: "",
    correo: "",
    password: "",
    nombre: "",
    apellido: "",
    rol: "",
    telefono: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {data, error} = await actualizarUser(user);
    try{
        if(data === null){
            setModalMessage("usuario Modificado");
            setShowModal(true);
            setUser({
                rut: null,
                dv: "",
                correo: "",
                password: "",
                nombre: "",
                apellido: "",
                rol: "",
                telefono: null,
            });
        };
    }catch(error){
        setModalMessage("No fue posible encontrar al usuario");
        setShowModal(true);
    };
    
    
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  async function buscarDatos(rut: number){
    const {data, error} = await obtenerUser(rut);
    try{
        if(data){
            console.log(data[0]);
            setUser({
                rut: data[0].rut,
                dv: data[0].dv,
                correo: data[0].correo,
                password: data[0].password,
                nombre: data[0].nombre,
                apellido: data[0].apellido,
                rol: data[0].rol,
                telefono: data[0].telefono,
              });
        };
    }catch(error){
        setModalMessage("Usuario no encontrado");
        setShowModal(true);
    };
    
    
  };


  return (
    <div className={styles.container}>
      <div className="bg rounded-lg shadow-md p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Modificar Usuario</h2>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="rut" className="block font-medium mb-2">
              RUT*
            </label> 
            <input
              type="number"
              id="rut"
              name="rut"
              value={user.rut || ""} // Usa un string vacío como valor de respaldo
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
              required
            />
            <button type="button"
                    className={styles.button}
                    onClick={() =>buscarDatos(user.rut || 1)}>
                Buscar
            </button>
          </div>
          <div>
            <label htmlFor="dv" className="block font-medium mb-2">
              DV*
            </label>
            <input
              type="text"
              id="dv"
              name="dv"
              value={user.dv}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
              required
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="correo" className="block font-medium mb-2">
              Correo Electrónico*
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={user.correo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="nombre" className="block font-medium mb-2">
              Nombre*
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={user.nombre}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="apellido" className="block font-medium mb-2">
              Apellido*
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={user.apellido}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
              required
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="rol" className="block font-medium mb-2">
              Rol*
            </label>
            <select
              id="rol"
              name="rol"
              value={user.rol}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="Administrativo">Administrativo</option>
              <option value="Alumno Ayudante">Alumno Ayudante</option>
            </select>
          </div>
          <div>
            <label htmlFor="telefono" className="block font-medium mb-2">
              Teléfono*
            </label>
            <input
              type="number"
              id="telefono"
              name="telefono"
              value={user.telefono || ""} // Use empty string as fallback value
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-black"
              required
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Modificar Usuario
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
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
            <p className="mb-4">{modalMessage}</p>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
