import { MdSupervisedUserCircle } from 'react-icons/md';
import styles from './Card.module.css';
import { numeroDeProspectos, obtenerNumeroUsers, obtenerUser, obtenerUsers } from '@/app/Connection/SupabaseClient';

interface CardProps {
    numero_prospectos: number;
    titulo: string;
  }


const Card: React.FC<CardProps> = async ({numero_prospectos, titulo}) => {
    //const numero_prospectos = await numeroDeProspectos();
    //const {data,error} = await obtenerUsers();
    //const {data,error} = await obtenerUser(16330999);
    //console.log(data);
    //const data = await obtenerNumeroUsers();
    //console.log(data);
    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24}/>
            <div className={styles.texts}>
                <span className={styles.title}>{titulo}</span>
                <span className={styles.number}>{numero_prospectos}</span>
                <span className={styles.details}>Desde la ultima semana</span>

            </div>
        </div>
    );
};

export default Card;