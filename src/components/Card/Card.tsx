import { MdSupervisedUserCircle } from 'react-icons/md';
import styles from './Card.module.css';
import { numeroDeProspectos, obtenerNumeroUsers, obtenerUser, obtenerUsers } from '@/app/Connection/SupabaseClient';


const Card = async () => {
    const numero_prospectos = await numeroDeProspectos();
    const {data,error} = await obtenerUsers();
    //const {data,error} = await obtenerUser(16330999);
    console.log(data);
    //const data = await obtenerNumeroUsers();
    //console.log(data);
    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24}/>
            <div className={styles.texts}>
                <span className={styles.title}>Total Prospectos</span>
                <span className={styles.number}>{numero_prospectos}</span>
                <span className={styles.details}>Desde la ultima semana</span>

            </div>
        </div>
    );
};

export default Card;