
import styles from "./SingleCarrera.module.css";

import { obtenerCarrera, obtenerUser } from "@/app/Connection/SupabaseClient";
import { modCarreraAction } from "@/app/Connection/accion";
import Link from "next/link";

interface Params {
    id: string;
}

const SingleCarrera = async ({params} : {params: Params}) => {
    const {id} = params;
    const carrera :any = await obtenerCarrera(id);
    console.log("carrera",carrera);

    return(
        <div className={styles.container}>
            <h1 className={styles.titulo}>Modificar Carrera</h1>
            <form action={modCarreraAction}  className={styles.form}>
                <label>Codigo Carrera</label>
                <input type="text" placeholder={carrera.id_carr} name='id_carr' value={carrera.id_carr}/>
                <label>Nombre Carrera</label>
                <input type="text" placeholder={carrera.nombre_carr} name='nombre_carr' value={carrera.nombre_carr}/>
                <label>Cupos Diurnos</label>
                <input type="number" placeholder={carrera.cupos_di} name='cupos_di'/>
                <label>Cupos Vespertinos</label>
                <input type="number" placeholder={carrera.cupos_vesp} name='cupos_vesp'/>
                <label>Precio Matricula</label>
                <input type="number" placeholder={carrera.precio_mat} name='precio_mat' value={carrera.precio}/>
                <label>Matriculas diurnas</label>
                <input type="number" placeholder={carrera.mat_di} name='mat_di'/>
                <label>Matriculas vespertinas</label>
                <input type="number" placeholder={carrera.mat_vesp} name='mat_vesp'/>
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