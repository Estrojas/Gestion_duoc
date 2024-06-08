import styles from "./addProsp.module.css";

const addProsp = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Agregar Prospecto</h1>
            <form action="" className={styles.form}>
                <input type="number" placeholder="Rut" name='Rut' />
                <input type="text" placeholder="Dv" name='Dv' />
                <input type="text" placeholder="Nombre" name='Nombre' />
                <input type="text" placeholder="Apellido" name='Apellido' />
                <input type="email" placeholder="Correo" name='Correo' />
                <input type="number" placeholder="Telefono" name='Telefono' />
                <select name='Estado' id="Estado">
                    <option value="Pendiente">Elija un Estado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Matriculado">Matriculado</option>
                    <option value="No matriculado">No matriculado</option>
                </select>
                {/*}
                <input type="checkbox"></input>
                <label>Autorizo Contactarme por Telefono</label>
                <input type="checkbox"></input>
                <label>Autorizo Contactarme por Correo</label>
                {*/}
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default addProsp;