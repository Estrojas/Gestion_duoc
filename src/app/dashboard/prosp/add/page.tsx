//'use client';
import { useState } from "react";
import styles from "./addProsp.module.css";
import { Prospecto, verifyRutProspecto } from "@/app/ModelosDatos/Prospecto";
import { ingresarProspecto, obtenerProspecto } from "@/app/Connection/SupabaseClient";
import {ingresarProspectoAction } from "@/app/Connection/accion";

const addProsp = () => {
/*
    const [pro, setPro] = useState<Prospecto>({
        rut: null,
        dv: "",
        nombre: "",
        apellido: "",
        correo: "",
        telefono: null,
        estado: 'Pendiente',
        matriculador: null,
        aut_corr: false,
        aut_tel: false,
      });
    
      function handleChange(event: { target: { name: any; value: any; }; }) {
        setPro({
          ...pro,
          [event.target.name]: event.target.value
        });
      }
      const [showModal, setShowModal] = useState(false);
      const [modalMessage, setModalMessage] = useState("");
      const closeModal = () => {
        setShowModal(false);
        setModalMessage("");
      };
*/

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Agregar Prospecto</h1>

            <form action={ingresarProspectoAction}  className={styles.form}>
                <input type="number" placeholder="Rut" name='rut' /*value={pro.rut || ""} onChange={handleChange}*//>
                <input type="text" placeholder="Dv" name='dv' /*value={pro.dv} onChange={handleChange}*//>
                <input type="text" placeholder="Nombre" name='nombre' /*value={pro.nombre} onChange={handleChange}*/ />
                <input type="text" placeholder="Apellido" name='apellido' /*value={pro.apellido} onChange={handleChange}*//>
                <input type="email" placeholder="Correo" name='correo' /*value={pro.correo} onChange={handleChange}*//>
                <input type="number" placeholder="Telefono" name='telefono' /*value={pro.telefono || ""} onChange={handleChange}*//>
                <select name='estado' id="estado" /*onChange={handleChange}*/>
                    <option value="Pendiente">Elija un Estado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Matriculado">Matriculado</option>
                    <option value="No matriculado">No matriculado</option>
                </select>
                <div className={styles.containerCheck}>
                  <input type="checkbox" name="aut_tel" value="true"></input>
                  <label>Autorizo Contactarme por Telefono</label>
                  <input type="checkbox" name="aut_corr" value="true"></input>
                  <label>Autorizo Contactarme por Correo</label>
                </div>

                
                <button type="submit">Agregar</button>
                <button type="button"className={styles.buttonCancel}>
                    Cancelar
              </button>
            </form>
        </div>
    );
};

export default addProsp;