"use client";
import React, { useState } from 'react';
import { User } from '../ModelosDatos/User';
import { ingresarUser } from '../Connection/SupabaseClient';

export default function CreateUserForm() {
  const [user, setUser] = useState<User>({
    rut: 0,
    dv: '',
    correo: '',
    password: '',
    nombre: '',
    apellido: '',
    rol: '',
    telefono: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
        const { data, error } = await ingresarUser(user);
        if (error) {
            setModalMessage('Error al crear el usuario. Por favor, inténtelo de nuevo.');
        } else {
            setModalMessage('Usuario creado exitosamente.');
            setUser({
              rut: 0,
              dv: '',
              correo: '',
              password: '',
              nombre: '',
              apellido: '',
              rol: '',
              telefono: 0,
            });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        setModalMessage('Error al crear el usuario. Por favor, inténtelo de nuevo.');
        setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nuevo Usuario</h2>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
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
              value={user.rut}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
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
              className="w-full border border-gray-300 rounded-md py-2 px-3"
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
              className="w-full border border-gray-300 rounded-md py-2 px-3"
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
              className="w-full border border-gray-300 rounded-md py-2 px-3"
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
              className="w-full border border-gray-300 rounded-md py-2 px-3"
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
              className="w-full border border-gray-300 rounded-md py-2 px-3"
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
              className="w-full border border-gray-300 rounded-md py-2 px-3"
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
              value={user.telefono}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              required
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Crear Usuario
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