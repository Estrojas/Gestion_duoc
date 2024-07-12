import { obtenerListaEspera } from '@/app/Connection/SupabaseClient';
import styles from './Listas.module.css';
import Image from 'next/image';
import { useState , useEffect } from 'react';
import { borrarListaEsperaAction } from '@/app/Connection/accion';
interface ListaProps {
    id: String;

}
const Listas: React.FC<ListaProps> = ({id}) => {


    const [dataProps, setDataProps] = useState<any>();

    useEffect(() => {
        obtenerListaEspera(id).then((res) => {
            if(res){
                console.log("res",res);
                setDataProps(res);
            }else{
                console.log(res);
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
            <h2 className={styles.title}>Lista de espera</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Estado</td>
                        <td>Añadido el :</td>
                        <td>accion</td>
                    </tr>
                </thead>
                <tbody>
                    {dataProps && dataProps.map((lista: any) => (
                       <tr key={lista.rut_pro_lista}>
                            <td>
                                {lista.Prospectos.nombre} {lista.Prospectos.apellido} 
                            </td>
                            <td>
                                <span className={`${styles.status} ${getEstado(lista.Prospectos.estado)}`}>{lista.Prospectos.estado}</span>
                            </td>
                            <td>
                                {lista.created_at.toString().slice(0,10).split('-').reverse().join('-')}{" "}{lista.created_at.toString().slice(11,19)}
                            </td>
                            <td>
                                <form action={borrarListaEsperaAction}>
                                    <input type='hidden' name='rut_pro_lista' value={lista.rut_pro_lista}/>
                                    <input type='hidden' name='id_carr_lista' value={id.toString()}/>
                                    <button type='submit' className={styles.delete}>Eliminar</button>
                                </form>
                            </td>
                       </tr> 
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Listas;

