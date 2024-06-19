//"use client"
import { Prospecto } from "@/app/ModelosDatos/Prospecto";
import styles from "./SingleProspect.module.css";
import { useState, useEffect } from "react";
import { obtenerProspecto, obtenerUser } from "@/app/Connection/SupabaseClient";
import { modProspectoAction } from "@/app/Connection/accion";

interface Params {
    id: string;
}

const SingleProspect = async ({params} : {params: Params}) => {
    const {id} = params;
    const prospecto :any = await obtenerProspecto(parseInt(id));

    const matriculador = await obtenerUser(prospecto.Matriculador);
    return(
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <h2 className={styles.titulo}>Información Prospecto</h2>
                <h2 className={styles.infoProspecto}>{prospecto.rut}-{prospecto.dv}</h2>
                <h2 className={styles.infoProspecto}>{prospecto.nombre} {prospecto.apellido}</h2>
                <h1 className={styles.titulo}>Matriculado por</h1>
                <h2 className={styles.infoProspecto}>{matriculador.nombre} {matriculador.apellido}</h2>
                <h2 className={styles.infoProspecto}>El {prospecto.created_at.toString().slice(0,10).split('-').reverse().join('-')}</h2>
                
            </div>
            <div className={styles.formContainer}>
                <form action={modProspectoAction} className={styles.form}>
                    <label> Nombre Prospecto</label>
                    <input className="text-black" type="text" placeholder={prospecto.nombre} name='nombre' />
                    <label> Apellido Prospecto</label>
                    <input className="text-black" type="text" placeholder={prospecto.apellido} name='apellido' />
                    <label> Correo</label>
                    <input className="text-black" type="text" placeholder={prospecto.correo} name='correo' />
                    <label> Telefono</label>
                    <input className="text-black" type="number" placeholder={prospecto.telefono} name='telefono' />
                    <input type="hidden" name="rut" value={prospecto.rut}/>
                    <input type="hidden" name="dv" value={prospecto.dv}/>
                    <input type="hidden" name="aut_corr" value={prospecto.aut_corr}/>
                    <input type="hidden" name="aut_tel" value={prospecto.aut_tel}/>
                    <input type="hidden" name="Matriculador" value={prospecto.Matriculador}/>
                    <label> Estado</label>
                    <select name='estado' id="estado">
                        <option value={prospecto.estado}>{prospecto.estado}</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Matriculado">Matriculado</option>
                        <option value="No matriculado">No matriculado</option>
                    </select>
                    <button type="submit">Modificar</button>
                </form>
            </div>
        </div>
    );
};
export default SingleProspect;