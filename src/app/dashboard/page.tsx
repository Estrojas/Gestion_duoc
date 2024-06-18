'use client'
import Card from "@/components/Card/Card";
import Chart from "@/components/Chart/Chart";
import styles from '@/components/dashboard.module.css';
import RightBar from "@/components/RightBar/RightBar";
import Transactions from "@/components/Transactions/Transactions";
import { useState , useEffect } from "react";
import { numeroDeProspectos, obtenerProspectosPorEstado } from "../Connection/SupabaseClient";

const dashboard = () => {

    const [numPros , setNumPros] = useState(0);
    const [numMat , setNumMat] = useState(0);
    const [numPen , setNumPen] = useState(0);
    const [numNotMat , setNumNotMat] = useState(0);

    useEffect(() => {
        numeroDeProspectos().then((res) => {
            if(res.data){
                setNumPros(res.data.length);
            }else{
                setNumPros(0);
            }
        });
        obtenerProspectosPorEstado("Matriculado").then((res) => {
            if(res.data){
                setNumMat(res.data.length);
            }else{
                setNumMat(0);
            }
        });
        obtenerProspectosPorEstado("Pendiente").then((res) => {
            if(res.data){
                setNumPen(res.data.length);
            }else{
                setNumPen(0);
            }
        });
        obtenerProspectosPorEstado("No Matriculado").then((res) => {
            if(res.data){
                setNumNotMat(res.data.length);
            }else{
                setNumNotMat(0);
            }
        });
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>

                    <Card numero_prospectos={numPros} titulo="Numero de Prospectos Totales"/>
                    <Card numero_prospectos={numMat} titulo="Prospectos Matriculados Totales"/>
                    <Card numero_prospectos={numPen} titulo="Prospectos Pendientes Totales"/>
                </div>
                <Transactions/>
                <Chart 
                        nameMatriculados= "Matriculados" num_mat={numMat} 
                        nameNoMatriculados="No Matriculados" num_not_mat={numNotMat} 
                        namePendientes="Pendientes" num_pen={numPen}/>
                    
            </div>
            <div className={styles.side}>
                <RightBar/>
            </div>
            
        </div>
    );
    }
export default dashboard;