"use client";
import { useState, useEffect } from "react";
import { User } from "../../../ModelosDatos/User";
import { obtenerProspectoForEmail } from "../../../Connection/SupabaseClient";
import styles from "../send-email.module.css";


interface Params {
  id: string;
}

export default function send_email({params} : {params: Params}) {
  const {id} = params;

  useEffect(() => {
    buscarDatos(parseInt(id));
  }, []);
  
  const [user, setUser] = useState<User>({
    rut: parseInt(id),
    dv: "",
    correo: "",
    password: "",
    nombre: "",
    apellido: "",
    rol: "",
    telefono: null,
  });

  const [email, setEmail] = useState({
    asunto: "",
    mensaje: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  async function buscarDatos(rut: number) {
    const { data, error } = await obtenerProspectoForEmail(rut);
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

  const handleEmail = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> 
  ) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Enviar Email</h1>
      <form action = "">
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
            className={styles.input}
            required
          />
          <button
            type="button"
            className={styles.searchButton}
            onClick={() => buscarDatos(user.rut || 1)}
          >
            Buscar
          </button>
          <label htmlFor="Correo" className="block font-medium mb-2">
            Correo
          </label>
          <input
            id="Correo"
            name="correo"
            value={user.correo}
            onChange={handleChange}
            className={styles.asunto}
            required
            type="email"
          />
          <label htmlFor="Asunto" className="block font-medium mb-2">
            Asunto
          </label>
          <input
            id="Asunto"
            name="asunto"
            value={email.asunto || ""} // Usa un string vacío como valor de respaldo
            onChange={handleEmail}
            className={styles.asunto}
            required
          />
          <label htmlFor="Mensaje" className="block font-medium mb-2">
            Mensaje
          </label>
          <textarea
            id="Mensaje"
            name="mensaje"
            value={email.mensaje || ""} // Usa un string vacío como valor de respaldo
            onChange={handleEmail}
            className={styles.textarea}
            placeholder="Escriba su mensaje aquí..."
            required
          ></textarea>
        </div>
      </form>
      <div>
        <button className={styles.enviar}
          onClick={async () => {
            console.log("Enviando Email");
            
            const data = {
              firstName: user.nombre,
              mensaje: email.mensaje,
              asunto: email.asunto,
              correo: user.correo,
            }
            
            const res = await fetch("/api/send", { method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            }); 
          }}
        >
          Enviar Email
        </button>
      </div>
    </div>
  );
}
