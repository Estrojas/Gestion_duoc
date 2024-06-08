import Search from '@/components/Search/Search';
import styles from './user.module.css';
import Link from 'next/link';
import Pagination from '@/components/Pagination/Pagination';

const UsersPage = () => {
    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder='Buscar Usuario'/>
                <Link href="/dashboard/registrar-user">
                    <button className={styles.addButton}>Agregar</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Correo</td>
                        <td>telefono</td>
                        <td>Rol</td>
                        <td>Acción</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        <div className={styles.prosp}>
                        Esteban Rojas
                        </div>
                    </td>
                    <td>est.rojaso@duoc.cl</td>
                    <td>987654321</td>
                    <td>Administrador</td>
                    <td>
                        <div className={styles.botones}>
                            <Link href="/">
                                <button className={`${styles.button} ${styles.ver}`}>Ver</button>
                            </Link>
                            <button className={`${styles.button} ${styles.delete}`}>Eliminar</button>
                        </div>
                    </td>
                    </tr>
                </tbody>
            </table>
            <Pagination/>
        </div>
    )
}

export default UsersPage;