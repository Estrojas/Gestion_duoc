"use client";
import React, { useState } from "react";
import { User, verifyRut } from "../../../ModelosDatos/User";
import { ingresarUser, signup, obtenerUser } from "../../../Connection/SupabaseClient";
import styles from "./registrar-user.module.css";
import Link from "next/link";


export default function CreateUserForm() {
  const [user, setUser] = useState<User>({
    rut: null,
    dv: "",
    correo: "",
    password: "",
    nombre: "",
    apellido: "",
    rol: "Ayudante",
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
    //Verificación si el usuario ya existe en la base de datos
    if (user.rut !== null) {
      const data = await obtenerUser(user.rut);
      if (data) {
        setModalMessage("El usuario ya existe. Por favor, verifique el RUT ingresado.");
        setShowModal(true);
        return;
      }
      /*if(data && data.length > 0){
        setModalMessage("El usuario ya existe. Por favor, verifique el RUT ingresado.");
        setShowModal(true);
        return;
      } */
    }
    //Verificacion de rut valido
    if (!verifyRut(user)) {
      setModalMessage("RUT inválido. Por favor, verifique el RUT ingresado.");
      setShowModal(true);
      return;
    } else { //rut valido verificado, se procede a agregar al usuario a la base de datos
      try {
        //19773662-3
        const { data, error } = await signup(user);
        if (false) {
          console.log(error);
          setModalMessage(
            "Error al crear el usuario. Por favor, inténtelo de nuevo."
          );
          setShowModal(true);
        } else {
          const { data, error } = await ingresarUser(user);
          setModalMessage("Usuario creado exitosamente.");
          setShowModal(true);
          setUser({
            rut: null,
            dv: "",
            correo: "",
            password: "",
            nombre: "",
            apellido: "",
            rol: "Ayudante",
            telefono: null,
          });
        }
      } catch (error) {
        console.error("Error creating user:", error);
        setModalMessage(
          "Error al crear el usuario. Por favor, inténtelo de nuevo."
        );
        setShowModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  return (
    <div className="">
      <div className={styles.container}>
        <h2 className="text-xl font-bold">Nuevo Usuario</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">{/*"grid grid-cols-2 gap-4"*/} 
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
          <div className="col-span-2">
            <label htmlFor="password" className="block font-medium mb-2">
              Contraseña*
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
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
              <option value="Alumno Ayudante">Ayudante</option>
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
              className={styles.button}
            >
              Crear Usuario
            </button>
            <Link href= "/dashboard/users">
            <button
              type="button"
              className={styles.buttonCancel}
            >
              Cancelar
            </button>
            </Link>
          </div>
        </form>
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.contenido}>
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

