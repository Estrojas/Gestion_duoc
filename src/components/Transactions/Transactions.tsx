import styles from './Transactions.module.css';
import Image from 'next/image';

const Transactions = () => {


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Ultimas Actualizaciones</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Estado</td>
                        <td>Fecha</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Image className={styles.userImage} src="/img/noavatar.jpg" alt="" width="50" height="50"/>
                            Esteban Rojas
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.pending}`}>Pendiente</span>
                        </td>
                        <td> 03-06-2024</td>
                    </tr>
                    <tr>
                        <td>
                            <Image className={styles.userImage} src="/img/noavatar.jpg" alt="" width="50" height="50"/>
                            Cristian Jimenez
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.done}`}>Matriculado</span>
                        </td>
                        <td> 03-06-2024</td>
                    </tr>
                    <tr>
                        <td>
                            <Image className={styles.userImage} src="/img/noavatar.jpg" alt="" width="50" height="50"/>
                            Jordano Tapia
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.cancel}`}>No Matriculado</span>
                        </td>
                        <td> 03-06-2024</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;