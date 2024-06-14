import { obtenerUltimosProspectos } from '@/app/Connection/SupabaseClient';
import styles from './Transactions.module.css';
import Image from 'next/image';
import { useState , useEffect } from 'react';

const Transactions =  () => {

    const [dataProps, setDataProps] = useState<any[]>([]);

    useEffect(() => {
        obtenerUltimosProspectos().then((res) => {
            if(res.data){
                setDataProps(res.data);
            }else{
                console.log(res.error);
            }
        });
    }, []);

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
                            Esteban Rojas
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.pending}`}>Pendiente</span>
                        </td>
                        <td> 03-06-2024</td>
                    </tr>
                    <tr>
                        <td>
                            Cristian Jimenez
                        </td>
                        <td>
                            <span className={`${styles.status} ${styles.done}`}>Matriculado</span>
                        </td>
                        <td> 03-06-2024</td>
                    </tr>
                    <tr>
                        <td>
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