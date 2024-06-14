import { MdSupervisedUserCircle } from 'react-icons/md';
import styles from './Card.module.css';

interface CardProps {
    numero_prospectos: number;
    titulo: string;
  }


const Card: React.FC<CardProps> = ({numero_prospectos, titulo}) => {

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