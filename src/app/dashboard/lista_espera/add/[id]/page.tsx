
import { obtenerAllCarreras, obtenerProspecto } from "@/app/Connection/SupabaseClient";
import styles from "./addList.module.css";
import {ingresarListaEsperaAction, ingresarSeguimientoAction } from "@/app/Connection/accion";
import Link from "next/link";

interface Params {
    id: string;
}

const addLista = async ({params} : {params: Params}) => {

    const {id} = params;
    const prospecto = await obtenerProspecto(parseInt(id));
    const dataCarr = await obtenerAllCarreras();

    console.log(dataCarr)
    
    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Agregar a lista de espera a {prospecto.nombre} {prospecto.apellido}</h1>
            <form action={ingresarListaEsperaAction}  className={styles.form}>
                <input type="hidden" name="rut_pro_lista" value={parseInt(id)}></input>
                <select name="id_carr_lista">
                    <option value="No">Carrera de Lista de espera</option>
                    {Array.isArray(dataCarr) && dataCarr.map((carrera) => (  
                        <option key={carrera.id_carr} value={carrera.id_carr}>{carrera.nombre_carr}</option>
                    ))}
                </select>
                
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

export default addLista;