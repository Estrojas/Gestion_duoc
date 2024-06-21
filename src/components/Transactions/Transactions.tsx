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

    const estados = {
        'Pendiente': styles.pending,
        'Matriculado': styles.done,
        'No Matriculado': styles.cancel
    }

    type Estado = 'Pendiente' | 'Matriculado' | 'No Matriculado';

    function getEstado(estado: Estado): string{
        return estados[estado];
    }

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
                    {dataProps && dataProps.map((Prospecto) => (
                       <tr key={Prospecto.rut}>
                            <td>
                                {Prospecto.nombre} {Prospecto.apellido} 
                            </td>
                            <td>
                                <span className={`${styles.status} ${getEstado(Prospecto.estado)}`}>{Prospecto.estado}</span>
                            </td>
                            <td>
                                {Prospecto.created_at.toString().slice(0,10).split('-').reverse().join('-')}
                            </td>

                       </tr> 
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;

