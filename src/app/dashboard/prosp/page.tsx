'use client'
import Search from '@/components/Search/Search';
import styles from './props.module.css';
import Link from 'next/link';
import Pagination from '@/components/Pagination/Pagination';
import { obtenerProspectos, obtener, numeroDeProspectos } from '@/app/Connection/SupabaseClient';
import { useEffect, useState } from 'react';

interface Props {
    searchParams: any; // Reemplaza 'any' con el tipo real de 'searchParams'
  }

const ProspPage = async ({searchParams}: Props) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const { data, error } = await obtener(q,page);
    console.log(data)
    /*
    const [dataProps, setDataProps] = useState<any[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await obtener(q,page);
            if(data){
                console.log("flag3")
                setDataProps(data);
            }else{
                console.log(error);
            }
        };
    
        fetchData();
    }, []);
    */
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
                        <td>Creado el</td>
                        <td>Acción</td>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((Prospecto) => (
                        <tr>
                        <td>
                            <div className={styles.prosp}>
                            {Prospecto.nombre} {Prospecto.apellido}
                            </div>
                        </td>
                        <td>{Prospecto.correo}</td>
                        <td>{Prospecto.telefono || "No tiene telefono"}</td>
                        <td>{Prospecto.estado}</td>
                        <td>{Prospecto.created_at.toString().slice(0,10)}</td>
                        <td>
                            <div className={styles.botones}>
                                <Link href={`/dashboard/prosp/${Prospecto.rut}`}>
                                    <button className={`${styles.button} ${styles.ver}`}>Ver</button>
                                </Link>
                                <button className={`${styles.button} ${styles.delete}`}>Eliminar</button>
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

export default ProspPage;