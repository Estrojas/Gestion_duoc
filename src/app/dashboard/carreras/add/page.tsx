
import Link from "next/link";
import styles from "./addCarrera.module.css";
import {ingresarCarreraAction } from "@/app/Connection/accion";

const addCarrera = () => {

    
    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Crear Carrera</h1>
            <form action={ingresarCarreraAction}  className={styles.form}>
                <input type="text" required placeholder="Id Carrera (Obligatorio)" name='id_carr'/>
                <input type="text" required placeholder="Nombre Carrera" name='nombre_carr'/>
                <input type="number"  placeholder="Cupos Diurna (Opcional)" name='cupos_di'/>
                <input type="number"  placeholder="Cupos Vespertino (Opcional)" name='cupos_vesp'/>
                <input type="number" required placeholder="Precio Matricula" name='precio_mat'/>
                <select name="tipo" required>
                    <option value="Tecnica">Tecnica</option>
                    <option value="Profesional">Profesional</option>
                </select>

                <button type="submit">Agregar</button>
                {/*}<Link href="/dashboard/carreras">{*/}
                <button type="button"className={styles.buttonCancel}>
                    Cancelar
              </button>
                {/*}</form></Link>{*/}

            </form>
        </div>
    );
};

export default addCarrera;