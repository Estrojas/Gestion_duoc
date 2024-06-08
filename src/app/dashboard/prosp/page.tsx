import Search from '@/components/Search/Search';
import styles from './props.module.css';
import Link from 'next/link';
import Pagination from '@/components/Pagination/Pagination';

const ProspPage = () => {
    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder='Buscar Prospecto'/>
                <Link href="/dashboard/prosp/add">
                    <button className={styles.addButton}>Agregar</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Correo</td>
                        <td>telefono</td>
                        <td>Estado</td>
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
                    <td>Pendiente</td>
                    <td>
                        <div className={styles.botones}>
                            <Link href="/dashboard/prosp/test">
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

export default ProspPage;