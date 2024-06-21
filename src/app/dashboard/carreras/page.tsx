'use client'
import Search from '@/components/Search/Search';
import styles from './carreras.module.css';
import Link from 'next/link';
import Pagination from '@/components/Pagination/Pagination';
import { obtenerCarreras } from '@/app/Connection/SupabaseClient';
import { useEffect, useState } from 'react';
import { borrarCarreraAction } from '@/app/Connection/accion';

interface Props {
    searchParams: any; // Reemplaza 'any' con el tipo real de 'searchParams'
  }

const CarrerasPage =  ({searchParams}: Props) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    
    const [dataCarr, setDataCarr] = useState<any[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await obtenerCarreras(q,page);
            if(data){
                setDataCarr(data);
            }else{
                console.log(error);
            }
        };
    
        fetchData();
    },[q,page]);

    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder='Buscar Carrera'/>
                {localStorage.getItem('Rol') === 'Administrativo' && (
                    <Link href="/dashboard/carreras/add">
                        <button className={styles.addButton}>Crear Carrera</button>
                    </Link>
                )}
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Nombre Carrera</td>
                        <td>Cupos Diurnos</td>
                        <td>Cupos Vespertinos</td>
                        <td>Precio Matricula</td>
                        <td>Tipo</td>
                        <td>Acción</td>
                    </tr>
                </thead>
                <tbody>
                    {dataCarr && dataCarr.map((Carrera) => (
                        <tr key={Carrera.id}>
                        <td>
                            <div className={styles.prosp}>
                            {Carrera.nombre_carr}
                            </div>
                        </td>
                        <td>{Carrera.cupos_di || "Sin cupos diurnos"}</td>
                        <td>{Carrera.cupos_vesp || "Sin cupos Vespertinos"}</td>
                        <td>${Carrera.precio_mat}</td>
                        <td>{Carrera.tipo}</td>
                        <td>
                            <div className={styles.botones}>
                                {localStorage.getItem('Rol') === 'Administrativo' && (
                                    <Link href={`/dashboard/carreras/${Carrera.id_carr}`}>
                                        <button className={`${styles.button} ${styles.ver}`}>Editar</button>
                                    </Link>
                                )}
                                <Link href={`/dashboard/carreras/reportes/${Carrera.id_carr}`}>
                                    <button className={`${styles.button} ${styles.reportes}`}>Reportes</button>
                                </Link>
                                
                                {localStorage.getItem('Rol') === 'Administrativo' && (
                                    <form action={borrarCarreraAction}>
                                        <input type="hidden" name="id_carr" value={Carrera.id_carr}/>
                                        <button className={`${styles.button} ${styles.delete}`}>Eliminar</button>
                                    </form>
                                )}
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

export default CarrerasPage;