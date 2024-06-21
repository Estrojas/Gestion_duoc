
import styles from "./SingleSeg.module.css";

import { obtenerSeguimiento, obtenerUser } from "@/app/Connection/SupabaseClient";
import Link from "next/link";

interface Params {
    id: string;
}

const SingleCarrera = async ({params} : {params: Params}) => {
    const {id} = params;
    const seguimiento :any = await obtenerSeguimiento(parseInt(id));
    console.log(seguimiento)

    return(
        <div className={styles.container}>
            <h1 className={styles.titulo}>Seguimiento de {seguimiento.Prospectos.nombre} {seguimiento.Prospectos.apellido}</h1>
            <form action=""  className={styles.form}>
                <label>Rut Prospecto</label>
                <input type="number" name="rut_pro" value={seguimiento.rut_pro}></input>
                <label>Contactado</label>
                <input type="text" name="contactado" value={seguimiento.contactado}></input>
                <label>Obervaciones</label>
                <input type="textarea" placeholder="Observaciones" name='observaciones' value={seguimiento.observaciones || "Sin Observaciones"}/>
                <label>Fecha Seguimiento</label>
                <input type="text" value={seguimiento.created_at.toString().slice(0,10).split('-').reverse().join('-')}></input>
                <Link href="/dashboard/seguimientos">
                    <button className={styles.buttonCancel}>
                        Cancelar
                    </button>
                </Link>

            </form>
        </div>
    );
};
export default SingleCarrera;