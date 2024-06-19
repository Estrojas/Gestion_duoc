import { User } from "@/app/ModelosDatos/User";
import styles from "./SingleUser.module.css";
import { obtenerProspecto, obtenerUser } from "@/app/Connection/SupabaseClient";
import { modUserAction } from "@/app/Connection/accion";

interface Params {
    id: string;
}

const SingleUser = async ({params} : {params: Params}) => {
    const {id} = params;

    const matriculador = await obtenerUser(parseInt(id));
    return(
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form action={modUserAction} className={styles.form}>
                    <label> Nombre Prospecto</label>
                    <input className="text-black" type="text" placeholder={matriculador.nombre} name='nombre' />
                    <label> Apellido Prospecto</label>
                    <input className="text-black" type="text" placeholder={matriculador.apellido} name='apellido' />
                    <label> Correo</label>
                    <input className="text-black" type="text" placeholder={matriculador.correo} name='correo' />
                    <label> Telefono</label>
                    <input className="text-black" type="number" placeholder={matriculador.telefono} name='telefono' />
                    <input type="hidden" name="rut" value={matriculador.rut}/>
                    <input type="hidden" name="dv" value={matriculador.dv}/>
                    <label> Rol</label>
                    <select name='rol' id="rol">
                        <option value={matriculador.estado}>{matriculador.estado}</option>
                        <option value="Ayudante">Ayudante</option>
                        <option value="Administrativo">Administrativo</option>
                    </select>
                    <button type="submit">Modificar</button>
                </form>
            </div>
        </div>
    );
};
export default SingleUser;