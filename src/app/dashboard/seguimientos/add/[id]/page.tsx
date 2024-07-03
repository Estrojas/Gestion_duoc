
import { obtenerAllCarreras, obtenerProspecto } from "@/app/Connection/SupabaseClient";
import styles from "./addSeg.module.css";
import {ingresarSeguimientoAction } from "@/app/Connection/accion";
import Link from "next/link";

interface Params {
    id: string;
}

const addSeguimiento = async ({params} : {params: Params}) => {

    const {id} = params;
    const prospecto = await obtenerProspecto(parseInt(id));
    const dataCarr = await obtenerAllCarreras();
    console.log(prospecto)
    
    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Crear Seguimiento a {prospecto.nombre} {prospecto.apellido}</h1>
            <div className={styles.info}>
                <h1 className={styles.subtitulo}>Estado: {prospecto.estado}</h1>
                <h1 className={styles.subtitulo}>telefono: {prospecto.telefono}</h1>
                {prospecto.aut_tel ? (
                        <h1 className={styles.subtitulo}>Autorización para llamar: Si</h1>
                    ) : <h1 className={styles.subtitulo}>Autorización para llamar: No</h1>}
                {prospecto.aut_corr ? (
                    <h1 className={styles.subtitulo}>Autorización para Enviar correo: Si</h1>
                ) : <h1 className={styles.subtitulo}>Autorización para Enviar correo: No</h1>}
                <h1 className={styles.subtitulo}> Carreras de Interes: {prospecto.carr_1|| "No"}{"/"}{prospecto.carr_2 || "No"}{"/"}{prospecto.carr_3 || "No"}</h1>
            </div>
            <form action={ingresarSeguimientoAction}  className={styles.form}>
                <input type="hidden" name="rut_pro" value={parseInt(id)}></input>
                <select name="contactado">
                    <option value="No">¿El Prospecto logro ser contactado?</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                </select>
                <input type="textarea" placeholder="Observaciones" name='observaciones'/>

                <button type="submit">Agregar</button>
                <Link href="/dashboard/prosp">
                    <button className={styles.buttonCancel}>
                        Cancelar
                    </button>
                </Link>

            </form>
        </div>
    );
};

export default addSeguimiento;