'use client'
import Search from '@/components/Search/Search';
import styles from './props.module.css';
import Link from 'next/link';
import Pagination from '@/components/Pagination/Pagination';
import { obtener} from '@/app/Connection/SupabaseClient';
import { useEffect, useState } from 'react';
import { borrarProspectoAction } from '@/app/Connection/accion';

interface Props {
    searchParams: any; // Reemplaza 'any' con el tipo real de 'searchParams'
  }

const ProspPage = /*async*/ ({searchParams}: Props) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;

    
    const [dataProps, setDataProps] = useState<any[]>([]);
    const [rol, setRol] = useState<string>("");
    
    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await obtener(q,page);
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
            <div className={styles.top}>
                <Search placeholder='Buscar Prospecto'/>
                    <Link href="/dashboard/prosp/add">
                        <button className={styles.addButton}>Agregar Prospecto</button>
                    </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.head}>
                        <td>Nombre</td>
                        <td>Correo</td>
                        <td>Teléfono</td>
                        <td>Estado</td>
                        <td>Acción</td>
                    </tr>
                </thead>
                <tbody>
                    {dataProps && dataProps.map((Prospecto) => (
                        <tr key={Prospecto.rut}>
                        <td>
                            <div className={styles.prosp}>
                            {Prospecto.nombre} {Prospecto.apellido}
                            </div>
                        </td>
                        <td>{Prospecto.correo}</td>
                        <td>{Prospecto.telefono || "No tiene telefono"}</td>
                        <td>{Prospecto.estado}</td>
                        <td>
                            <div className={styles.botones}>
                                    <Link href={`/dashboard/prosp/${Prospecto.rut}`}>
                                        <button className={`${styles.button} ${styles.ver}`}>Editar</button>
                                    </Link>
                                <Link href={`/dashboard/send-email/${Prospecto.rut}`}>
                                    <button className={`${styles.button} ${styles.email}`}>Email</button>
                                </Link>
                                <Link href={`/dashboard/seguimientos/add/${Prospecto.rut}`}>
                                    <button className={`${styles.button} ${styles.seguimiento}`}>Crear Seguimiento</button>
                                </Link>
                                <Link href={`/dashboard/lista_espera/add/${Prospecto.rut}`}>
                                    <button className={`${styles.button} ${styles.lista}`}>Lista de Espera</button>
                                </Link>
                                    <form action={borrarProspectoAction}>
                                        <input type="hidden" name="rut" value={Prospecto.rut}/>
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

export default ProspPage;
