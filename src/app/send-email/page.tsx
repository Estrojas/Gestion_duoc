"use client";
import { useState } from "react";
import { User } from "../ModelosDatos/User";
import { obtenerUser } from "../Connection/SupabaseClient";
import { json } from "stream/consumers";
import { POST } from "../api/send/route";

export default function send_email() {
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
  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  async function buscarDatos(rut: number) {
    const { data, error } = await obtenerUser(rut);
    try {
      if (data) {
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
      }
    } catch (error) {
      setModalMessage("Usuario no encontrado");
      setShowModal(true);
    }
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form>
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
            className="w-full border border-gray-300 rounded-md py-2 px-3"
            required
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => buscarDatos(user.rut || 1)}
          >
            Buscar
          </button>
        </div>
      </form>
      <div>
        <button
          onClick={async () => {
            const res = await fetch("api/send", { method: "POST" });
            const data = await res.json();
            console.log(data);
          }}
        >
          Enviar Email
        </button>
      </div>
    </div>
  );
}
