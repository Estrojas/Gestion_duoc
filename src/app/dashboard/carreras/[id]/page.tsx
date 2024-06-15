
import styles from "./SingleCarrera.module.css";

import { obtenerCarrera, obtenerUser } from "@/app/Connection/SupabaseClient";
import { modProspectoAction } from "@/app/Connection/accion";
import Link from "next/link";

interface Params {
    id: string;
}

const SingleCarrera = async ({params} : {params: Params}) => {
    const {id} = params;
    const carrera :any = await obtenerCarrera(id);

    return(
        <div className={styles.container}>
            <h1 className={styles.titulo}>Modificar Carrera</h1>
            <form action=''  className={styles.form}>
                <input type="text" placeholder={carrera.id_carr} name='id_carr'/>
                <input type="text" placeholder={carrera.nombre_carr} name='nombre_carr'/>
                <input type="number" placeholder={carrera.cupos_di} name='cupos_di'/>
                <input type="number" placeholder={carrera.cupos_vesp} name='cupos_vesp'/>
                <input type="number" placeholder={carrera.precio_mat} name='precio_mat'/>
                <select name="tipo" value={carrera.tipo}>
                    <option value="Tecnica">Tecnica</option>
                    <option value="Profesional">Profesional</option>
                </select>

                <button type="submit">Agregar</button>
                <Link  href="/dashboard/carreras">
                    <button type="button"className={styles.buttonCancel}>
                        Cancelar
                    </button>
                </Link>
            </form>
        </div>
    );
};
export default SingleCarrera;