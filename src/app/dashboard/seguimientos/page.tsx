'use client'
import Search from '@/components/Search/Search';
import styles from './seguimientos.module.css';
import Link from 'next/link';
import Pagination from '@/components/Pagination/Pagination';
import { obtenerSeguimientos, obtener, numeroDeProspectos, obtenerSeguimientosPrueba} from '@/app/Connection/SupabaseClient';
import { useEffect, useState } from 'react';
import { borrarSeguimientoAction } from '@/app/Connection/accion';

interface Props {
    searchParams: any; 
  }

const SegPage = ({searchParams}: Props) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    
    const [dataProps, setDataProps] = useState<any[]>([]);
    const [dataPrueba, setDataPrueba] = useState<any[]>();
    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await obtenerSeguimientosPrueba(q,page);
            if(data){
                setDataProps(data);
            }else{
                console.log(error);
            }
        };

        fetchData();
    },[q,page]);



    return(
        
        <div className={styles.container}>
            <h1>Seguimientos</h1>
            <div className={styles.top}>
                <Search placeholder='Buscar Prospecto'/>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Nombre Prospecto</td>
                        <td>Observacion</td>
                        <td>Contactado el</td>
                        <td>Acción</td>
                    </tr>
                </thead>
                <tbody>
                    {dataProps && dataProps.map((seguimiento) => (
                        <tr key={seguimiento.id}>
                        <td>
                            <div className={styles.prosp}>
                            {seguimiento.Prospectos.nombre} {seguimiento.Prospectos.apellido}
                            </div>
                        </td>
                        <td>{seguimiento.observaciones || "Sin Observaciones"} </td>
                        <td>{seguimiento.created_at.toString().slice(0,10).split('-').reverse().join('-')}{" "}{seguimiento.created_at.toString().slice(11,19)}</td>
                        <td>
                            <div className={styles.botones}>
                                <Link href={`/dashboard/seguimientos/${seguimiento.id}`}>
                                    <button className={`${styles.button} ${styles.email}`}>Ver Seguimiento</button>
                                </Link>
                                <form action={borrarSeguimientoAction}>
                                    <input type="hidden" name="id" value={seguimiento.id}/>
                                    <button className={`${styles.button} ${styles.delete}`}>Eliminar</button>
                                </form>
                                
                            </div>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination/>
        </div>
    )
}

export default SegPage;