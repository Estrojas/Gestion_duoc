"use client";
import { Prospecto } from "@/app/ModelosDatos/Prospecto";
import styles from "./SingleProspect.module.css";
import { useState } from "react";


const SingleProspect = () => {

    const [prospecto, setUser] = useState<Prospecto>({
        rut: 19048645,
        dv: "1",
        nombre: "Esteban",
        apellido: "Rojas",
        correo: "est.rojaso@duocuc.cl",
        telefono: 988211436,
        estado: 'Pendiente',
        matriculador: 19048645,
        aut_corr: true,
        aut_tel: false,
      });

    return(
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <h2 className={styles.titulo}>Información Prospecto</h2>
                <h2 className={styles.infoProspecto}>{prospecto.rut}-{prospecto.dv}</h2>
                <h2 className={styles.infoProspecto}>{prospecto.nombre} {prospecto.apellido}</h2>
            </div>
            <div className={styles.formContainer}>
                <form action="" className={styles.form}>
                    <label> Nombre Prospecto</label>
                    <input className="text-black" type="text" placeholder={prospecto.nombre} name='Nombre' />
                    <label> Apellido Prospecto</label>
                    <input className="text-black" type="text" placeholder="Rojas" name='apellido' />
                    <label> Correo</label>
                    <input className="text-black" type="text" placeholder="est.rojaso@duocuc.cl" name='correo' />
                    <label> Telefono</label>
                    <input className="text-black" type="number" placeholder="988211436" name='telefono' />
                    <label> Estado</label>
                    <select name='Estado' id="Estado">
                        <option value={prospecto.estado}>{prospecto.estado}</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Matriculado">Matriculado</option>
                        <option value="No matriculado">No matriculado</option>
                    </select>
                    <button>Modificar</button>
                </form>
            </div>
        </div>
    );
};
export default SingleProspect;