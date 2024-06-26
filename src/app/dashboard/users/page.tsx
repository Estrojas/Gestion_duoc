'use client'
import Search from '@/components/Search/Search';
import styles from './user.module.css';
import Link from 'next/link';
import Pagination from '@/components/Pagination/Pagination';
import { useEffect, useState } from 'react';
import { obtener2 } from '@/app/Connection/SupabaseClient';
import { borrarUsuarioAction } from '@/app/Connection/accion';


interface Props {
    searchParams: any; // Reemplaza 'any' con el tipo real de 'searchParams'
  }


const UsersPage = /*async*/({searchParams}: Props) => {

    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;

    const [dataUser, setData] = useState<any[]>([]);
    const [rol, setRol] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await obtener2(q,page);
            if(data){
                setData(data);
            }else{
                console.log(error);
            }
        };
        setRol(localStorage.getItem('Rol') || '');
        fetchData();
    },[q,page]);


    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder='Buscar Usuario'/>
                {rol === 'Administrativo' && (
                    <Link href="/dashboard/users/registrar-user">
                        <button className={styles.addButton}>Agregar Usuario</button>
                    </Link>
                )}
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Correo</td>
                        <td>telefono</td>
                        <td>Rol</td>
                        <td>Creado el</td>
                        <td>Acción</td>
                    </tr>
                </thead>
                <tbody>
                {dataUser && dataUser.map((User) => (
                    <tr key={User.rut} >
                    <td>
                        <div className={styles.prosp}>
                        {User.nombre} {User.apellido}
                        </div>
                    </td>
                    <td>{User.correo}</td>
                    <td>{User.telefono}</td>
                    <td>{User.rol}</td>
                    <td>{User.created_at.toString().slice(0,10).split('-').reverse().join('-')}</td>
                    <td>
                        <div className={styles.botones}>
                            {localStorage.getItem('Rol') === 'Administrativo' && (
                                <Link href={`/dashboard/users/upd-user/${User.rut}`}>
                                    <button className={`${styles.button} ${styles.ver}`}>Editar</button>
                                </Link>
                            )}
                            <Link href={`/dashboard/users/reportes/${User.rut}`}>
                                <button className={`${styles.button} ${styles.report}`}>Reportes</button>
                            </Link>
                            {rol === 'Administrativo' && (
                                <form action={borrarUsuarioAction}>
                                    <input type="hidden" name="rut" value={User.rut}/>
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

export default UsersPage;