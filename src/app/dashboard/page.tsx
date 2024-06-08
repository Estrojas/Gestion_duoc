import Card from "@/components/Card/Card";
import Chart from "@/components/Chart/Chart";
import styles from '@/components/dashboard.module.css';
import RightBar from "@/components/RightBar/RightBar";
import Transactions from "@/components/Transactions/Transactions";
import { obtenerProspectos } from "../Connection/SupabaseClient";
import DonutChartHero from "@/components/DonutChartHero/DonutChartHero";

const dashboard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card numero_prospectos={25} titulo="Numero de Prospectos"/>
                    <Card numero_prospectos={5} titulo="Prospectos Matriculados"/>
                    <Card numero_prospectos={20} titulo="Prospectos Pendientes"/>
                </div>
                <Transactions/>
                <Chart/>
                <DonutChartHero/>
                    
            </div>
            <div className={styles.side}>
                <RightBar/>
            </div>
            
        </div>
    );
    }
export default dashboard;