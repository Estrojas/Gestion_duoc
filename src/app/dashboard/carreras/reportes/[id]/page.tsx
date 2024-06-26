'use client'
import { numeroDeProspectos, obtenerCarrera, obtenerProspectosPorEstado } from "@/app/Connection/SupabaseClient";
import Card from "@/components/Card/Card";
import Listas from "@/components/Listas/Listas";
import Chart from "@/components/Chart/Chart";
import styles from './reportes.module.css';
import RightBar from "@/components/RightBar/RightBar";
import Transactions from "@/components/Transactions/Transactions";
import { useState , useEffect } from "react";

interface Params {
    id: string;
}

const reportesPage = ({params} : {params: Params}) => {
    const {id} = params;

    const [carrera , setCarrera] = useState<any>();

    const [numCuposTot , setNumCuposTot] = useState(0);
    const [numCupDi , setNumCupDi] = useState(0);
    const [numCupVesp , setNumCupVesp] = useState(0);
    const [numCupRes , setNumCupRes] = useState(0);
    const [numMatDi , setNumMatDi] = useState(0);
    const [numMatVesp , setNumMatVesp] = useState(0);

    useEffect(() => {
        obtenerCarrera(id).then((res) => {
            console.log("flag")
            if(res){
                setCarrera(res);
                setNumCuposTot(res.cupos_di + res.cupos_vesp);
                setNumCupDi(res.cupos_di);
                setNumCupVesp(res.cupos_vesp);
                setNumMatDi(res.mat_di);
                setNumMatVesp(res.mat_vesp);
                setNumCupRes(res.cupos_di + res.cupos_vesp - res.mat_di - res.mat_vesp);
            }else{
                setCarrera(null);
            }
        });
        
    }, []);
    
    console.log("Carrera",carrera);
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <h1 className={styles.titulo}>Reportes {carrera?.nombre_carr}</h1>
                <div className={styles.cards}>
                    <Card numero_prospectos={numCuposTot} titulo="Numero de Cupos Totales"/>
                    <Card numero_prospectos={numCupDi} titulo="Cupos Diurnos"/>
                    <Card numero_prospectos={numCupVesp} titulo="Cupos Vespertinos"/>
                </div>
                <div className={styles.cards}>
                    <Card numero_prospectos={numMatDi+numMatVesp} titulo="Numero de Matriculas"/>
                    <Card numero_prospectos={numMatDi} titulo="Matriculas Diurnas"/>
                    <Card numero_prospectos={numMatVesp} titulo="Matriculas Vespertinas"/>
                </div>
                {/*}<Transactions/>{*/}
                <Listas id={id}/>
                <Chart 
                        nameMatriculados="Cupos Restantes" num_mat={numCupRes} 
                        nameNoMatriculados="Matriculas Diurnas" num_not_mat={numMatDi} 
                        namePendientes="Matriculas Vespertinas" num_pen={numMatVesp}/>
                    
            </div>
            {/*}
            <div className={styles.main}>
                <Chart num_mat={80} num_not_mat={20} num_pen={0}/>
            </div>
            {*/}
        </div>
    );
    }
export default reportesPage;