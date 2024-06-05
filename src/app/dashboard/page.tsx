import Card from "@/components/Card/Card";
import Chart from "@/components/Chart/Chart";
import styles from '@/components/dashboard.module.css';
import RightBar from "@/components/RightBar/RightBar";
import Transactions from "@/components/Transactions/Transactions";
import { obtenerProspectos } from "../Connection/SupabaseClient";

const dashboard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
                <Transactions/>
                <Chart/>
            </div>
            <div className={styles.side}>
                <RightBar/>
            </div>
            
        </div>
    );
    }
export default dashboard;