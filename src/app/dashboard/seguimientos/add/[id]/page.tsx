
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
    
    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Crear Seguimiento a {prospecto.nombre} {prospecto.apellido}</h1>
            <form action={ingresarSeguimientoAction}  className={styles.form}>
                <input type="hidden" name="rut_pro" value={parseInt(id)}></input>
                <select name="contactado">
                    <option value="No">¿El Prospecto fue contactado?</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                </select>
                <input type="textarea" placeholder="Observaciones" name='observaciones'/>

                <button type="submit">Agregar</button>
                <Link href="/dashboard/seguimientos">
                    <button className={styles.buttonCancel}>
                        Cancelar
                    </button>
                </Link>

            </form>
        </div>
    );
};

export default addSeguimiento;