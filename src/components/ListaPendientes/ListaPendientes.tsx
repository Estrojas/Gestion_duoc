import { obtenerProspectosPorMatriculador, obtenerProsPend,obtenerProsMat,obtenerProsNotMat } from '@/app/Connection/SupabaseClient';
import styles from './ListaPen.module.css';
import { useState , useEffect } from 'react';
interface ListaProps {
    id: string;

}
const Listas: React.FC<ListaProps> = ({id}) => {

    const [dataProps, setDataProps] = useState<any[]>([]);

    useEffect(() => {
        const fetchPend = async () => {
            const {data, error} = await obtenerProsPend(parseInt(id));
            if(data){
                setDataProps(data);
            }else{
                console.log(error);
            }
        }

        fetchPend();
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
            <h2 className={styles.title}>Lista de Prospectos Pendientes</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Estado</td>
                        <td>Telefono</td>
                        <td>Fecha</td>
                    </tr>
                </thead>
                <tbody>
                    {dataProps && dataProps.map((Pros: any) => (
                       <tr key={Pros.rut_pro}>
                            <td>
                                {Pros.nombre} {Pros.apellido} 
                            </td>
                            <td>
                                <span className={`${styles.status} ${getEstado(Pros.estado)}`}>{Pros.estado}</span>
                            </td>
                            <td>
                                {Pros.telefono || "No tiene telefono"}
                            </td>
                            <td>
                                {Pros.created_at.toString().slice(0,10).split('-').reverse().join('-')}{" / "}{Pros.created_at.toString().slice(11,19)}
                            </td>

                       </tr> 
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Listas;

