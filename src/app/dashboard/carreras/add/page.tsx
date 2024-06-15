
import styles from "./addCarrera.module.css";
import {ingresarCarreraAction } from "@/app/Connection/accion";

const addCarrera = () => {

    
    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Crear Carrera</h1>
            <form action={ingresarCarreraAction}  className={styles.form}>
                <input type="text" placeholder="Id Carrera (Obligatorio)" name='id_carr'/>
                <input type="text" placeholder="Nombre Carrera" name='nombre_carr'/>
                <input type="number" placeholder="Cupos Diurna (Opcional)" name='cupos_di'/>
                <input type="number" placeholder="Cupos Vespertino (Opcional)" name='cupos_vesp'/>
                <input type="number" placeholder="Precio Matricula" name='precio_mat'/>
                <select name="tipo">
                    <option value="Tecnica">Tecnica</option>
                    <option value="Profesional">Profesional</option>
                </select>

                <button type="submit">Agregar</button>
                <button type="button"className={styles.buttonCancel}>
                    Cancelar
              </button>
            </form>
        </div>
    );
};

export default addCarrera;